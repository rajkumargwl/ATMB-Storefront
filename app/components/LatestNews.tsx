import React from 'react';

const LatestNews = ({ latestNews }) => {
  // Ensure latestNews is always an array
  const newsArray = Array.isArray(latestNews) ? latestNews : latestNews ? [latestNews] : [];
const newsItems = newsArray.map((news, index) =>({
    id: news._id || index, // Prefer _id if available
    imageSrc: news.image?.asset?.url || '',
    title: news.title || 'Untitled',
    date: news.date || '',
    excerpt: news.description || '',
    authorAvatar: news.author?.photo?.asset?.url || '',
    authorName: news.author?.name || 'Unknown Author',
    authorTitle: news.author?.role || 'Staff Writer'
  }));

  // If there is no news, show a friendly message
  if (newsItems.length === 0) {
    return (
      <section className="bg-white px-4 sm:px-6 lg:px-8 font-inter">
        <div className="mx-auto py-10 text-center text-gray-500">
          <p>No news available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 font-inter">
      <div className="mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center mb-10 mt-10">
          Latest News
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="flex flex-col bg-white rounded-lg shadow flex-1 min-w-[280px] max-w-md"
            >
              {/* Image */}
              {news.imageSrc && (
                <img
                  src={news.imageSrc}
                  alt={news.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              )}

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 uppercase mb-2">
                  {news.date}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {news.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center pt-4 border-t border-gray-200 mt-auto">
                  {news.authorAvatar && (
                    <img
                      src={news.authorAvatar}
                      alt={`${news.authorName} avatar`}
                      className="w-10 h-10 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <p className="text-base font-bold text-gray-800 m-0">
                      {news.authorName}
                    </p>
                    <p className="text-base text-gray-500 mt-1 m-0">
                      {news.authorTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
