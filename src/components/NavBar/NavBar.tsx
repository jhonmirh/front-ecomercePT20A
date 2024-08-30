'use client';
import { userSession } from '@/interfaces/LoginRegister';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignOutConfirmation from '../SignOutConfirmation/SignOutConfirmation';
import Carousel from '../Carousel/Carousel'; 

interface NavBarProps {
  images: { src: string; link: string }[];
}

export default function NavBar({ images }: NavBarProps) {
  const [userSession, setUserSession] = React.useState<userSession | null>(null);
  const [isClient, setIsClient] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    const sessionUser = localStorage.getItem('sessionStart');
    if (sessionUser) {
      try {
        setUserSession(JSON.parse(sessionUser));
      } catch (error) {
        console.error('Error parsing session data:', error);
        setUserSession(null);
      }
    }
  }, []);

  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const confirmSignOut = () => {
    localStorage.removeItem('sessionStart');
    setUserSession(null);
    localStorage.removeItem('cart'); // Reiniciar el carrito
    window.location.href = '/';
  };

  if (!isClient) return null;

  return (
    <header className="relative bg-gradient-to-r from-lime-300 to-lime-100 w-full">
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <Image src="/logo-JhonDay.png" alt="Logo" width={50} height={50} />
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded border border-gray-300"
        />
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-700">
            Category
          </button>
          {userSession?.token ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center p-2 bg-green-500 text-white rounded hover:bg-green-700">
                    {userSession?.userData?.name}
                    <ChevronDownIcon
                      className="w-5 h-5 ml-2"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/dashboard/profiles" legacyBehavior>
                            <a
                              className={`${
                                active
                                  ? 'bg-green-950 text-white'
                                  : 'bg-green-500 text-white'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              Profiles
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/dashboard/orders" legacyBehavior>
                            <a
                              className={`${
                                active
                                  ? 'bg-green-500 text-white'
                                  : 'bg-green-500 text-white'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              Orders
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
              <Link href="/cart" className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L3 6m4 0l1 5m13 5h-9m-1 4a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Sign In To Buy
              </Link>
              <Link
                href="/register"
                className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Register To Buy
              </Link>
            </>
          )}
        </div>
      </div>

      <Carousel images={images} />

      <SignOutConfirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSignOut}
        title="Sign Out"
        message="Are you sure you want to log out?"
      />
    </header>
  );
}
