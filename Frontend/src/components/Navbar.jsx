import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const categories = [
    { name: "General", path: "/category/general" },
    { name: "Technology", path: "/category/technology" },
    { name: "Business", path: "/category/business" },
    { name: "Sports", path: "/category/sports" },
    { name: "Health", path: "/category/health" },
    { name: "Entertainment", path: "/category/entertainment" },
    { name: "Science", path: "/category/science" }
  ];

  const handleCategoryClick = (e, path) => {
    e.preventDefault();
    try {
      const category = path.split('/').pop();
      if (onCategorySelect && typeof onCategorySelect === 'function') {
        onCategorySelect(category);
      } else {
        navigate(path);
      }
    } catch (error) {
      //console.error("Error handling category click:", error);
      navigate(path);
    }
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="w-[80%] mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-700">DailyStream</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {categories.map((category, index) => (
              <a 
                key={index}
                href={category.path}
                onClick={(e) => handleCategoryClick(e, category.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${
                  isActive(category.path)
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50 focus:outline-none transition duration-150"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="w-[80%] mx-auto px-2 pt-2 pb-3 space-y-1">
            {categories.map((category, index) => (
              <a 
                key={index}
                href={category.path}
                onClick={(e) => handleCategoryClick(e, category.path)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(category.path)
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
