import React, { useState } from 'react';
import LazyImage from './LazyImage';

const NewsCard = ({ article }) => {
  // Format the published date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Data URL for a simple gray placeholder image with text
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%2364748b' text-anchor='middle' dominant-baseline='middle'%3EDailyStream%3C/text%3E%3C/svg%3E";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <LazyImage 
          src={article.urlToImage}
          alt={article.title || "News article"}
          className="w-full h-full object-cover"
          placeholderSrc={fallbackImage}
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs font-medium m-2 rounded">
          {article.source?.name || "News"}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group"
        >
          <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-700 transition duration-150">{article.title}</h2>
        </a>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span className="font-medium">{formatDate(article.publishedAt)}</span>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
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
};

export default NewsCard;
