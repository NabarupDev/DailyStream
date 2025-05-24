import React, { useState, useEffect, useRef, useCallback } from 'react';
import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';
import { fetchTopHeadlines } from '../utils/api';

const NewsGrid = ({ category = "general" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const observer = useRef();
  const lastArticleElementRef = useCallback(node => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    
    const fetchNews = async () => {
      try {
        const data = await fetchTopHeadlines(category, 1);
        setArticles(data.articles || []);
        setHasMore(data.articles?.length === 10); 
        setError(null);
      } catch (err) {
        setError('Failed to fetch news articles. Please try again later.');
        //console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  useEffect(() => {
    if (page === 1) return; 
    
    const fetchMoreNews = async () => {
      setLoadingMore(true);
      try {
        const data = await fetchTopHeadlines(category, page);
        if (data.articles?.length === 0) {
          setHasMore(false);
        } else {
          setArticles(prev => [...prev, ...data.articles]);
          setHasMore(data.articles?.length === 10); 
        }
      } catch (err) {
        //console.error("Error loading more articles:", err);
      } finally {
        setLoadingMore(false);
      }
    };

    fetchMoreNews();
  }, [page, category]);

  return (
    <div className="w-[80%] mx-auto py-8">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 capitalize">{category} News</h2>
        <p className="text-gray-600 mt-1">Latest updates and top stories</p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-gray-500 text-lg">No articles found for this category.</p>
          <p className="text-gray-400 mt-1">Please try another category or check back later.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => {
              if (articles.length === index + 1) {
                return <div ref={lastArticleElementRef} key={`${article.title}-${index}`}>
                  <NewsCard article={article} />
                </div>;
              } else {
                return <NewsCard key={`${article.title}-${index}`} article={article} />;
              }
            })}
          </div>
          
          {loadingMore && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <SkeletonCard key={`loading-more-${index}`} />
              ))}
            </div>
          )}
          
          {!hasMore && articles.length > 0 && (
            <div className="text-center py-8 mt-8">
              <p className="text-gray-500">You've reached the end of the news feed.</p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
              >
                Back to Top
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsGrid;
