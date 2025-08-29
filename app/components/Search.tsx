// ~/components/Search.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@remix-run/react';

interface SearchProps {
  initialResults: any[];
  initialQuery: string;
}

export default function Search({ initialResults, initialQuery }: SearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(initialQuery || '');
  const [results, setResults] = useState(initialResults || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
    setResults(initialResults);
  }, [initialQuery, initialResults]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!query.trim()) {
      params.delete('q');
      navigate(`?${params.toString()}`, { replace: true });
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      params.set('q', query);
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, navigate, location.search]);

  const handleResultClick = (item: any) => {
    if (item.type === 'product') {
      navigate(`/products/${item.handle}`);
    } else if (item.type === 'location') {
      navigate(`/locations/${item.slug}`);
    }
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-80">
      <input
        type="text"
        placeholder="Search locations & products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 w-full shadow-sm focus:ring focus:ring-blue-300"
      />

      {isLoading && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10 p-3">
          <div className="text-gray-500">Searching...</div>
        </div>
      )}

      {results.length > 0 && !isLoading && (
        <ul className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item._id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => handleResultClick(item)}
            >
              {item.type === 'location' ? (
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    {item.city && `${item.city}`}
                    {item.postalCode && `, ${item.postalCode}`}
                  </div>
                </div>
              ) : (
                <div className="font-semibold">{item.title}</div>
              )}
            </li>
          ))}
        </ul>
      )}

      {query && results.length === 0 && !isLoading && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10 p-3">
          <div className="text-gray-500">No results found</div>
        </div>
      )}
    </div>
  );
}
