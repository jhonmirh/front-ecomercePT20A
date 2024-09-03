"use client";
import React, { useEffect, useState } from "react";
import { userSession } from "@/interfaces/LoginRegister";
import { createOrder } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/Products";
import Card from "../Card/Card";
import AlertModal from "../Alert/AlertModal";
import SignOutConfirmation from "../SignOutConfirmation/SignOutConfirmation";

const CartPage = () => {
  const [userSession, setUserSession] = useState<userSession>();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const sessionUserLocal = localStorage.getItem("userSession");
    if (sessionUserLocal) {
      setUserSession(JSON.parse(sessionUserLocal));
    }
  }, []);

  useEffect(() => {
    const cartProducts: IProduct[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    if (cartProducts.length > 0) {
      let total = 0;
      cartProducts.forEach((product: IProduct) => {
        total += product.price;
      });
      setTotal(total);
      setCart(cartProducts);
    }
  }, []);

  useEffect(() => {
    const sessionUserLocal = localStorage.getItem("sessionStart");
    if (sessionUserLocal) {
      const session = JSON.parse(sessionUserLocal);
      console.log("Session Data:", session);
      console.log("Token:", session.token);
      setUserSession(session);
    }
  }, []);

  const handleLinkClick = async () => {
    console.log("User Session Token:", userSession?.token);

    if (!userSession?.token) {
      alert("You do not have an active session");
      return;
    }

    const idproducts = cart.map((product) => product.id);
    try {
      const response = await createOrder(idproducts, userSession.token);
      setModalContent({
        title: "JHONDAY REPORTS",
        message: "SUCCESSFUL PURCHASE CONGRATULATIONS",
      });
      setShowModal(true);
      setCart([]);
      setTotal(0);
      localStorage.setItem("cart", "[]");
    } catch (error) {
      console.error("Error during checkout:", error);
      setModalContent({
        title: "JHONDAY ALERT IN YOUR PURCHASE",
        message: "THERE WAS AN ERROR IN THE PURCHASE PROCESS",
      });
      setShowModal(true);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = "/cart";
  };

  const confirmSignOut = () => {
    if (selectedProductId === null) return;
    const updatedCart = cart.filter((product) => product.id !== selectedProductId);
    setCart(updatedCart);
    setTotal(updatedCart.reduce((sum, product) => sum + product.price, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline p-4 gap-4 justify-center">
        {cart && cart.length > 0 ? (
          cart.map((product: IProduct) => (
            <div key={product.id} className="relative">
              <Card {...product} />
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="absolute top-0 right-0 m-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="m-10 p-2 max-w-80 bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
            <h1>NO TIENE ARTICULOS EN SU CARRITO</h1>
          </div>
        )}
        {cart && cart.length > 0 && (
          <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
            <div className="mb-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                Total: ${total.toFixed(2)}
              </h2>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLinkClick}
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      
      <SignOutConfirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSignOut}
        title="Remove Product Added to Cart"
        message="Are you sure you want to remove this product from the cart?"
      />

      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default CartPage;
