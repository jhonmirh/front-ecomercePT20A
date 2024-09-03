"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/helpers/auth.helper";
import { validateLogin, validatePassword } from "@/helpers/validate";
import { ILogin, ILoginError } from "@/interfaces/LoginRegister";
import AlertModal from "../Alert/AlertModal";

const Login = () => {
  const router = useRouter();
  const startState: ILogin = { email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setData] = useState<ILogin>(startState);
  const [error, setError] = useState<ILoginError>({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...dataUser, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await loginUser(dataUser);
    if (response.error) {
      setModalContent({
        title: "Error",
        message: "There was an error in the login",
      });
      setShowModal(true);
      return;
    }

    const { token, user } = response;
    const clearUser = {
      id: user.id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      email: user.email,
      orders: user.orders,
    };

    localStorage.setItem(
      "sessionStart",
      JSON.stringify({ token, userData: clearUser })
    );

    setModalContent({
      title: "Welcome! You can now shop at JhonDay",
      message: "Successfully Logged In",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/");
  };

  useEffect(() => {
    const loginErrors = validateLogin(dataUser);

    setError((prevErrors) => ({
      ...prevErrors,
      ...loginErrors,
      email: loginErrors.email || "", // Asigna una cadena vacía si no hay error
    }));

    const passwordError = validatePassword(dataUser.password);
    setError((prevErrors) => ({
      ...prevErrors,
      password: passwordError || "", // Asigna una cadena vacía si no hay error
    }));
  }, [dataUser]);

  return (
    <div>
      <div className="text-center text-green-900 font-bold mb-5">
        <h1>Sign In To JhonDay your Store Technology</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-5 rounded-md max-w-sm mx-auto shadow-lg border border-green-800 p-5"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-green-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={dataUser.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@xxx.com"
            required
          />
          {error.email && typeof error.email === "string" && (
            <span className="text-red-600">{error.email}</span>
          )}
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-green-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={dataUser.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10" // Añade espacio para el botón
            placeholder="********"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            style={{ marginRight: "0.5rem", marginTop:"0.3rem" }} 
          >
            {showPassword ? (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.083.326-.17.649-.264.969"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 01.637-2.08M8.25 6.218a3 3 0 014.5 0M9 12a3 3 0 006 0M4.338 4.338l15.324 15.324"
                />
              </svg>
            )}
          </button>
          {error.password && (
            <span className="text-red-600">{error.password}</span>
          )}
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-bold text-green-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          disabled={Object.values(error).some((err) => err)}
          type="submit"
          className={`mb-2 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
    ${
      Object.values(error).some((err) => err)
        ? "bg-gray-400 cursor-not-allowed" 
        : "bg-green-900 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    }`} 
        >
          Submit
        </button>
      </form>

      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default Login;

