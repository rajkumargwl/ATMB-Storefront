import React, { useState } from "react";
import spanBg from "~/components/media/span-bg.svg";
import star1 from "~/components/media/Star1.svg";
import star2 from "~/components/media/Star2.svg";
import star3 from "~/components/media/Star3.svg";
 
type Rating = {
  icon: { url: string };
  ratingnum:string;
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const openVideo = (url: string) => {
    if (!url) return;
  
    let embedUrl = url;
  
    // Convert YouTube watch link to embed link
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1].split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  
    // Handle youtu.be short links
    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  
    setActiveVideo(embedUrl);
    setIsOpen(true);
  };
  
  const closeVideo = () => {
    setActiveVideo(null);
    setIsOpen(false);
  };
  return (
    <section className="bg-white px-5 py-[40px] md:py-[60px] lg:py-[100px]">
     
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-[44px] md:mb-[64px]">
          <div className="flex flex-col gap-3">
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {heading}
            </h2>
            <p className="relative flex align-center items-center justify-start gap-2 font-Roboto text-DarkOrange font-semibold leading-[28px] tracking-[-0.3px] text-[20px] relative">
              {highlightedWord}{" "}
              <span className="font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">
                powering virtual operations
              </span>
                <span className="absolute bottom-[-4px] left-[11px]">
                  <img
                    src={spanBg}
                    alt="highlight-bg"
                    className="w-[66px] md:w-[66px] h-[8px] md:h-[8px]"
                  />
                </span>
            </p>
          </div>
 
          {/* Ratings */}
          <div className="flex flex-wrap gap-[8px] md:gap-[26px] items-center justify-between">
            {ratings.map((rating, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white text-PrimaryBlack px-2 md:px-3 py-2 rounded-[12px]">
                <img
                  src={rating.icon.url}
                  alt={`Rating ${rating.ratingnum} ${rating.ratingText}`}
                  className="w-6 md:w-10 h-6 md:h-10"
                />
              
                <div className="flex flex-col gap-0 md:gap-1">
                 <div className="flex flex-col md:flex-row">
                    {/* Static stars */}
                    <div className="flex flex-row ">
                    <img src={star1} alt="star" className="w-4 md:w-5 h-4 md:h-5" />
                    <img src={star1} alt="star" className="w-5 h-5 hidden md:inline" />
                    <img src={star1} alt="star" className="w-5 h-5 hidden md:inline" />
                    <img src={star1} alt="star" className="w-5 h-5 hidden md:inline" />
                    <img
                      src={idx === 0 ? star2 : star3}
                      alt="star"
                      className="w-5 h-5 hidden md:inline"
                    />
                     <p className="md:hidden font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]">{rating.ratingnum}</p>
                     </div>
                     <p className="md:hidden font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]">{rating.ratingText}</p>
                  </div>
                  {idx === 0 ? (
                      <p className="hidden md:flex font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]"><span className=" md:inline"> {rating.ratingnum} {rating.ratingText}</span></p>
                    ) : (
                      <p className="hidden md:flex font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]"><span className="md:inline"> {rating.ratingnum}{rating.ratingText}</span></p>
                    )}
               
                 </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-[44px] md:gap-[56px] items-center">
          {/* Left: Testimonial Video */}
          <div className="w-full md:w-[56.3%]">
            <div className="bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <img
                  src={testimonialVideo.customerImage.url}
                  alt={testimonialVideo.customerName}
                  className="w-[44px] md:w-[64px] h-[44px] md:h-[64px] rounded-full"
                />
                {/* Rating Badge */}
                <div className=" bg-white border border-LightWhite px-4 py-2 md:py-3 rounded-full flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-[18px] md:w-[20px] h-[18px] md:h-[20px]">
                    <path d="M11.0881 0.703046C10.8873 0.273407 10.4631 0 9.99728 0C9.53142 0 9.11101 0.273407 8.90649 0.703046L6.47114 5.87044L1.03233 6.69847C0.577834 6.76877 0.199086 7.09686 0.05895 7.54603C-0.0811866 7.9952 0.0324375 8.49124 0.35816 8.82323L4.30471 12.8501L3.37299 18.5409C3.29724 19.0096 3.48661 19.4861 3.86157 19.7634C4.23653 20.0407 4.73269 20.0759 5.14174 19.8532L10.0011 17.1778L14.8604 19.8532C15.2694 20.0759 15.7656 20.0446 16.1406 19.7634C16.5155 19.4822 16.7049 19.0096 16.6291 18.5409L15.6936 12.8501L19.6402 8.82323C19.9659 8.49124 20.0833 7.9952 19.9394 7.54603C19.7955 7.09686 19.4205 6.76877 18.966 6.69847L13.5234 5.87044L11.0881 0.703046Z" fill="#537D1B"/>
                  </svg>
                  <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]">
                    {testimonialVideo.ratingBadge}
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  src={testimonialVideo.thumbnail.url}
                  alt="Customer video thumbnail"
                  className="rounded-[12px] w-full object-cover"
                />
                {/* Play Button */}
                <button
                  // onClick={() => openVideo("https://youtu.be/TJArEqaZgnA")}
                 onClick={() => testimonialVideo.videoUrl && openVideo(testimonialVideo.videoUrl)}
                  aria-label="Play testimonial video"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition rounded-xl"
                >
                  <img
                    src={testimonialVideo.playIcon.url}
                    alt="Play"
                    className="w-[57px] h-[57px] md:w-[116px] md:h-[116px]"
                  />
                </button>
 
                
              </div>
 
            {/* Customer Info */}
              <div className="flex flex-col items-start mt-[44px] md:mt-[62px]">
               
                <div className="flex flex-col items-start gap-1 pl-4">
                  <p className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                    {testimonialVideo.customerName}
                  </p>
                  <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                    {testimonialVideo.customerRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
 
          {/* Right: Proven Results */}
          <div className="w-full md:w-[43.7%]">
            <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[38.4px] text-[20px] md:text-[32px] tracking-[-0.3px] md:tracking-[-0.48px] mb-6">
              Proven Results
            </h3>
 
            <div className="flex flex-col gap-6">
              {provenResults.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-LightWhite rounded-[20px] p-6 bg-white"
                >
                  <h4 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px] mb-2">
                    {item.title}
                  </h4>
                  <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
 
 
       {/* Video Popup */}
       {isOpen && activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] lg:w-[60%]">
            <button
              onClick={closeVideo}
              className="absolute top-[-20px] right-[-10px] text-white text-2xl"
            >
              ✕
            </button>
            <iframe
              src={activeVideo}
              title="Video Player"
              className="w-full h-[400px] md:h-[500px] rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
 
export default BusinessTrustedSection;