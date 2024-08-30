"use client";

import React, { useCallback, useEffect, useState } from "react";
import { userSession } from "@/interfaces/LoginRegister";
import { getOrders } from "@/helpers/orders.helper";
import Card from "../Card/Card";
import { IOrder } from "@/interfaces/LoginRegister";
import IProduct from "@/interfaces/Products";

const OrdersPage = () => {
  const [userSession, setUserSession] = useState<userSession | undefined>(undefined);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const sessionUserLocal = localStorage.getItem("sessionStart");
    console.log("Fetched userSession from localStorage:", sessionUserLocal);
    if (sessionUserLocal) {
      try {
        const session = JSON.parse(sessionUserLocal) as userSession;
        console.log("Parsed userSession:", session);
        setUserSession(session);
      } catch (error) {
        console.error("Error parsing userSession:", error);
      }
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (!userSession?.token) {
      console.log("No token available, aborting fetch");
      return;
    }

    try {
      const ordersData = await getOrders(userSession.token);
      console.log("Fetched orders data:", ordersData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [userSession]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700 p-4 w-full">
              <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
              <p className="text-gray-700 dark:text-gray-200">Order Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-gray-700 dark:text-gray-200">Status: {order.status}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Products:</h3>
                <div className="flex flex-wrap gap-4">
                  {order.products.length > 0 ? (
                    order.products.map((product) => (
                      <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                        <Card {...product} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 dark:text-gray-200">No products found</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="m-10 p-2 max-w-80 bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
            <h1>YOU HAVE NO ITEMS IN YOUR ORDERS</h1>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default OrdersPage;
