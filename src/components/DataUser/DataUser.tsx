"use client";
import React, { useState } from "react";
import { userSession } from "@/interfaces/LoginRegister";

const DataUser = () => {
  const [userSession, setUserSession] = React.useState<userSession | null>(
    null
  );

  React.useEffect(() => {
    const sessionUser = localStorage.getItem("sessionStart");
    if (sessionUser) {
      try {
        setUserSession(JSON.parse(sessionUser));
      } catch (error) {
        console.error("Error parsing session data:", error);
        setUserSession(null);
      }
    }
  }, []);

  return (
    <>
      <hr className="border-t-4 border-green-950 my-4 mx-auto w-full sm:w-3/4 lg:w-1/2" />
      <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            Your Profile User Data JhonDay
          </h2>
        </div>
      </div>

      <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userSession?.userData.name}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userSession?.userData.email}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userSession?.userData.phone}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userSession?.userData.ordes}
        </span>
      </div>
    </>
  );
};

export default DataUser;
