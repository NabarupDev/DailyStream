import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewsGrid from '../components/NewsGrid';
import SkeletonCard from '../components/SkeletonCard';
import Footer from '../components/Footer';
import LazyImage from '../components/LazyImage';
import { searchNews } from '../utils/api';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [loadingMoreResults, setLoadingMoreResults] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the API base URL from environment or use the relative path for proxy
    const getApiBaseUrl = () => {
      return import.meta.env.DEV ? '/api' : 
        (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api');
    };
    
    const apiUrl = `${getApiBaseUrl()}/wake`;
      
    fetch(apiUrl)
      .then(response => {
        // Wake request sent
      })
      .catch(error => {
        // Continue anyway
      });
  }, []); // Empty dependency array ensures this runs only once
  
  const observer = useRef();
  const lastSearchResultRef = useCallback(node => {
    if (isSearching || loadingMoreResults) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreResults) {
        setSearchPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [isSearching, loadingMoreResults, hasMoreResults]);
  
  const handleSearch = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchError(null);
    setSearchPage(1);
    
    try {
      const results = await searchNews(searchQuery, 1);
      setSearchResults({
        articles: results.articles || [],
        totalResults: results.totalResults || 0
      });
      setHasMoreResults((results.articles?.length || 0) === 10);
    } catch (error) {
      //console.error("Search failed:", error);
      setSearchError("An error occurred while searching. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchPage === 1 || !searchResults) return;
    
    const loadMoreResults = async () => {
      setLoadingMoreResults(true);
      
      try {
        const moreResults = await searchNews(searchQuery, searchPage);
        
        if (!moreResults.articles || moreResults.articles.length === 0) {
          setHasMoreResults(false);
        } else {
          setSearchResults(prev => ({
            ...prev,
            articles: [...prev.articles, ...moreResults.articles]
          }));
          setHasMoreResults(moreResults.articles.length === 10);
        }
      } catch (error) {
        //console.error("Failed to load more search results:", error);
      } finally {
        setLoadingMoreResults(false);
      }
    };
    
    loadMoreResults();
  }, [searchPage, searchQuery]);

  const handleCategorySelect = (category) => {
    setSearchResults(null);
    setSearchQuery("");
    setSearchError(null);
    setSearchPage(1);
    navigate(`/category/${category}`);
  };
  
  const hasSearchResults = () => {
    return searchResults && 
           searchResults.articles && 
           Array.isArray(searchResults.articles) && 
           searchResults.articles.length > 0;
  };

  const renderSearchResults = () => {
    if (searchError) {
      return (
        <div className="col-span-full text-center py-8 bg-red-50 rounded-lg border border-red-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-600 font-medium">{searchError}</p>
        </div>
      );
    }

    if (isSearching && searchPage === 1) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    if (!hasSearchResults()) {
      return (
        <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-gray-500 text-lg">No articles found for "{searchQuery}"</p>
          <p className="text-gray-400 mt-1">Try a different search term or explore our categories</p>
          <button 
            onClick={() => {
              setSearchResults(null);
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
          >
            Back to headlines
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.articles.map((article, index) => {
            if (searchResults.articles.length === index + 1) {
              return (
                <div key={`search-${index}`} ref={lastSearchResultRef}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <LazyImage 
                        src={article.urlToImage}
                        alt={article.title || "News article"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.description}</p>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center mt-auto"
                      >
                        Read Full Story
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={`search-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <LazyImage 
                      src={article.urlToImage}
                      alt={article.title || "News article"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.description}</p>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center mt-auto"
                    >
                      Read Full Story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            }
          })}
        </div>
        
        {loadingMoreResults && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={`loading-more-search-${index}`} />
            ))}
          </div>
        )}
        
        {!hasMoreResults && searchResults.articles.length > 0 && (
          <div className="text-center py-8 mt-8">
            <p className="text-gray-500">You've reached the end of search results for "{searchQuery}".</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
            >
              Back to Top
            </button>
          </div>
        )}
      </>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onCategorySelect={handleCategorySelect} />
      <main className="flex-grow pt-6">
        <div className="w-[80%] mx-auto">
          <section className="py-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome to <span className="text-blue-700">DailyStream</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your trusted source for the latest news and updates from around the world
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for news..."
                  className="flex-grow px-5 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg transition duration-150 flex items-center"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  Search
                </button>
              </form>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Trending Topics</h2>
              <div className="flex flex-wrap gap-2">
                {["COVID-19", "Climate Change", "Elections", "Economy", "Tech", "Sports"].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setSearchQuery(topic);
                      // Use setTimeout to ensure the state is updated before searching
                      setTimeout(() => {
                        handleSearch({ preventDefault: () => {} });
                      }, 0);
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </section>
          
          {searchResults ? (
            <>
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Search Results</h2>
                <p className="text-gray-600 mt-1">Results for "{searchQuery}"</p>
              </div>
              {renderSearchResults()}
            </>
          ) : (
            <NewsGrid category={activeCategory} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
