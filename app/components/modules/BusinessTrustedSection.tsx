import React from "react";

type Rating = {
  icon: { url: string };
  ratingText: string;
};

type ProvenResult = {
  title: string;
  description: string;
};

type TestimonialVideo = {
  customerImage: { url: string };
  customerName: string;
  customerRole: string;
  playIcon: { url: string };
  ratingBadge: string;
  thumbnail: { url: string };
  videoUrl?: string | null;
};

type Props = {
  heading: string;
  highlightedWord: string;
  subHeading: string;
  ratings: Rating[];
  testimonialVideo: TestimonialVideo;
  provenResults: ProvenResult[];
};

const BusinessTrustedSection: React.FC<Props> = ({
  heading,
  highlightedWord,
  subHeading,
  ratings,
  testimonialVideo,
  provenResults,
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
              {heading}
            </h2>
            <p className="text-[#FF6600] font-semibold">
              {highlightedWord}{" "}
              <span className="text-gray-700 font-normal">
                powering virtual operations
              </span>
            </p>
          </div>

          {/* Ratings */}
          <div className="flex flex-wrap gap-6 items-center">
            {ratings.map((rating, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <img
                  src={rating.icon.url}
                  alt={`Rating ${rating.ratingText}`}
                  className="w-8 h-8"
                />
                <p className="text-sm text-gray-700">{rating.ratingText}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Testimonial Video */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="relative">
              <img
                src={testimonialVideo.thumbnail.url}
                alt="Customer video thumbnail"
                className="rounded-xl w-full object-cover"
              />
              {/* Play Button */}
              <button
                aria-label="Play testimonial video"
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition rounded-xl"
              >
                <img
                  src={testimonialVideo.playIcon.url}
                  alt="Play"
                  className="w-16 h-16 md:w-24 md:h-24"
                />
              </button>

              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow">
                <span className="text-[#22C55E] font-semibold text-sm">
                  {testimonialVideo.ratingBadge}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#22C55E"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.417 8.263L12 19.771l-7.417 4.092L6 15.6 0 9.753l8.332-1.735z" />
                </svg>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex items-center gap-3 mt-4">
              <img
                src={testimonialVideo.customerImage.url}
                alt={testimonialVideo.customerName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {testimonialVideo.customerName}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonialVideo.customerRole}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Proven Results */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900">
              Proven Results
            </h3>

            <div className="flex flex-col gap-5">
              {provenResults.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessTrustedSection;
