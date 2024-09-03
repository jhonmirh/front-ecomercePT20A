import React, { useState, useEffect } from "react";
import { userSession } from "@/interfaces/LoginRegister";
import { usePathname } from "next/navigation";
import IProduct from "@/interfaces/Products";
import AlertModal from "../Alert/AlertModal";

const AddCart = ({ product }: { product: IProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const [showNavigation, setShowNavigation] = useState<userSession | null>(
    null
  );
  const pathname = usePathname();
  useEffect(() => {
    const sessionUser = localStorage.getItem("sessionStart");
    if (sessionUser) {
      setShowNavigation(JSON.parse(sessionUser));
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cleanedCart = cart.filter((item: any) => item !== null);
    if (cleanedCart.length !== cart.length) {
      localStorage.setItem("cart", JSON.stringify(cleanedCart));
    }
  }, []);

  const handleClick = () => {
    try {
      const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const isProductInCart = cart.some((p) => p.id === product.id);

      if (isProductInCart) {
        setModalContent({
          title: "Check your Cart",
          message: "The product is already in the cart",
        });
        setShowModal(true);
      } else {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        setModalContent({
          title: "Added Satisfactorily",
          message: "Product added to cart successfully",
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Cart Error Warning", error);
      setModalContent({
        title: "Cart Error Warning",
        message: "There was an error adding the product to the cart",
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = "/cart";
  };
  return (
    <>
      {showNavigation?.token && pathname !== "/cart" && pathname !== "/dashboard/orders" && (
        <button
          onClick={handleClick}
          className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-400 dark:bg-green-950 dark:hover:bg-green-950 dark:focus:bg-green-950"
        >
          Add Cart {showNavigation?.userData?.name}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          <AlertModal
            show={showModal}
            onClose={handleCloseModal}
            title={modalContent.title}
            message={modalContent.message}
          />
        </button>
      )}
    </>
  );
};

export default AddCart;
