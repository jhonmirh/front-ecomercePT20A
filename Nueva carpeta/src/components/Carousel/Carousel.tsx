'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AlertModal from '../Alert/AlertModal';
import { CarouselProps } from './types';

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const sessionData = localStorage.getItem('sessionStart');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      setHasToken(!!session.token);
    } else {
      setHasToken(false);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleLinkClick = (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
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
    <div className="relative w-full h-80 overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <a
            key={index}
            href={image.link}
            onClick={(event) => handleLinkClick(image.link, event)}
            className="w-full flex-shrink-0 relative h-80"
          >
            <Image
              src={image.src}
              alt={`Slide ${index}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </a>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-700 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-700 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        ›
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-green-700' : 'bg-green-300'
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {hasToken && (
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

export default Carousel;
