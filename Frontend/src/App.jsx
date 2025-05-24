import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NewsGrid from './components/NewsGrid';
import Footer from './components/Footer';
import './App.css'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onCategorySelect={handleCategorySelect} />
      <main className="flex-grow pt-6">
        <NewsGrid category={categoryName} />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
