import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className, placeholderSrc, onLoad, onError }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  // Default placeholder for images
  const defaultPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%2364748b' text-anchor='middle' dominant-baseline='middle'%3EDailyStream%3C/text%3E%3C/svg%3E";

  useEffect(() => {
    setHasError(false);
  }, [src]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    if (onError) onError();
  };

  return (
    <div ref={imgRef} className="relative w-full h-full">
      <div 
        className={`absolute inset-0 bg-gray-200 ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} 
        aria-hidden="true"
      />
      
      {isInView && !hasError && (
        <img
          src={src || placeholderSrc || defaultPlaceholder}
          alt={alt}
          className={`${className || 'w-full h-full object-cover'} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {(!isInView || hasError) && (
        <img
          src={placeholderSrc || defaultPlaceholder}
          alt={alt}
          className={`${className || 'w-full h-full object-cover'}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
