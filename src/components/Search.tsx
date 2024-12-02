import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const searchData = [
  { title: 'Introduction', path: '/docs/introduction', content: 'Get started with our platform' },
  { title: 'Installation', path: '/docs/installation', content: 'Learn how to install the package' },
  { title: 'Configuration', path: '/docs/configuration', content: 'Configure your application' },
  { title: 'Basic Usage', path: '/docs/basic-usage', content: 'Learn the basics' },
  { title: 'Advanced Features', path: '/docs/advanced-features', content: 'Explore advanced features' },
];

const fuse = new Fuse(searchData, {
  keys: ['title', 'content'],
  threshold: 0.3,
});

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      setResults(fuse.search(value));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Search documentation..."
          value={query}
          onChange={handleSearch}
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <ul className="py-2">
            {results.map((result) => (
              <li key={result.item.path}>
                <a
                  href={result.item.path}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-medium text-gray-900">{result.item.title}</div>
                  <div className="text-sm text-gray-500">{result.item.content}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}