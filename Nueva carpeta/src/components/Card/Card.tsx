"use client";

import React, { useState, useEffect } from "react";
import AddCart from "../AddCart/AddCart";
import AlertModal from "../Alert/AlertModal";
import CardsProps from "./types";

interface CardProps extends CardsProps {}

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  price,
  stock,
  image,
  categoryId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);

  const product = {
    id,
    name,
    image,
    description,
    stock,
    price,
    categoryId,
  };

  // Efecto para leer el token desde localStorage
  useEffect(() => {
    const sessionData = localStorage.getItem("sessionStart");
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (session.token) {
        setHasToken(true);
      } else {
        setHasToken(false);
      }
    } else {
      setHasToken(false);
    }
  }, []);

  const handleLinkClick = (path: string) => {
    setRedirectPath(path);

    if (!hasToken) {
      setShowModal(true);
    } else {
      window.location.href = path; 
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (redirectPath) {
      window.location.href = redirectPath; 
    }
  };

  return (
    <div className="relative max-w-80 bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
      <div
        className="block cursor-pointer"
        onClick={() => handleLinkClick(`/product/${categoryId}`)}
      >
        <img className="rounded-t-lg" src={image} alt={`Producto ${name}`} />
        
        <div className="flex items-center space-x-1 rtl:space-x-reverse pl-4">
          {[...Array(4)].map((_, index) => (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <svg
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <span className="bg-green-500 text-green-950 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div className="p-5">
          <hr />
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700 dark:text-black">
            {name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Price: ${price}
          </p>
          <p>Stock: {stock}</p>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <AddCart product={product} />
      </div>

      { !hasToken && (
        <AlertModal
          show={showModal}
          onClose={handleModalClose}
          title="Navigate"
          message="Do you want to navigate to the product page?"
        />
      )}
    </div>
  );
};

export default Card;
