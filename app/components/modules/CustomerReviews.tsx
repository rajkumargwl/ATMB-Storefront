import React from 'react';

const CustomerReviews = ({ data }) => {
  if (!data) {
    return <div className="text-center p-8">Loading reviews data...</div>;
  }

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2v15.27l-6.18 3.73L7.46 14l-5.46-4.73 7.19-.61L12 2z" />
        </svg>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 ">
      {/* Header Section */}
      <div className="text-center mb-16">
        {data.badge && (
          <span className="inline-block text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">
            {data.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {data.heading}
        </h2>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full transition-transform duration-300 hover:scale-105">
            {/* Rating */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <span className="ml-2 text-gray-600 font-semibold">{review.rating}</span>
              </div>
            </div>
            
            {/* Quote */}
            <p className="text-gray-600 mb-6 flex-grow italic">"{review.quote}"</p>
            
            {/* Author Info */}
            <div className="flex items-center mt-auto">
              <img 
                src={review.authorImage.asset.url} 
                alt={review.authorName}
                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-100"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{review.authorName}</h4>
                <p className="text-sm text-gray-500">{review.authorTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;