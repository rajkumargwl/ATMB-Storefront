import {useLoaderData, useNavigate, useParams} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import LocationsList, {LocationAPI} from '~/components/location/LocationList';
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import ArrowLeftIcon from "~/components/icons/ArrowLeftIcon";
import CityImage from "~/components/media/city.svg";
import KeyFactor from "~/components/media/key-factor.svg";
import Testimonial from "~/components/icons/Testimonial";

// Loader
export async function loader({context, params}: LoaderFunctionArgs) {
  const {country, state} = params;
  if (!country || !state)
    throw new Response('Country or State not found', {status: 404});

  const decodedCountry = decodeURIComponent(country);
  const decodedState = decodeURIComponent(state);

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });
console.log("decodedCountry, decodedState", decodedCountry, decodedState);
  const [locations] = await Promise.all([
    context.sanity.query({
      query: /* groq */ `
        *[_type == "location" && country == $country && state == $state]{
          _id, displayName, city, stateCode, addressLine1, addressLine2, postalCode, coordinates, "latitude":coordinates.lat, "longitude":coordinates.lng, featureList[]{feature_id,label,description,status,type}, ratingList[]{rating_id,type,status,value}, planTier, priceRange
        }
      `,
      params: {country: decodedCountry, state: decodedState},
      cache,
    }),
  ]);
  // Count how many locations per city
  const cityMap: Record<string, number> = {};
  locations.forEach((loc: any) => {
    const city = loc.city || 'Unknown';
    if (!cityMap[city]) cityMap[city] = 0;
    cityMap[city] += 1;
  });

  const cities = Object.entries(cityMap)
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => a.name.localeCompare(b.name));

    const dummyTestimonialData = {
      headline: "What Our Customers Say",
      subheadline: "Thousand trust Anytime Mailbox",
      testimonials: [
        {
          _key: "1",
          type: "quote",
          quote:
            "I travel for work most of the year, and Anytime Mailbox has made managing my mail effortless. I get scans within hours, can forward packages anywhere, and never worry about missing important documents again.",
          authorName: "John Doe",
          authorTitle: "Founder, Startup Co.",
          authorImage: {
            url: "https://cdn.sanity.io/images/m5xb8z9y/production/6c6013ec1d9c25ee9d2a190fe7e936188ac4934b-64x64.png",
          },
          starIcon: {
            url: "https://cdn.sanity.io/files/m5xb8z9y/production/c543ab461d31dac8d7435372643c376b63e5623a.svg",
          },
          rating: "4.8",
          readMoreText: "Read more...",
          readMoreUrl: "#",
        },
        {
          _key: "2",
          type: "quote",
          quote:
            "I travel for work most of the year, and Anytime Mailbox has made managing my mail effortless. I get scans within hours, can forward packages anywhere, and never worry about missing important documents again.",
          authorName: "Jane Smith",
          authorTitle: "Marketing Lead, Creative Inc.",
          authorImage: {
            url: "https://cdn.sanity.io/images/m5xb8z9y/production/6c6013ec1d9c25ee9d2a190fe7e936188ac4934b-64x64.png",
          },
          starIcon: {
            url: "https://cdn.sanity.io/files/m5xb8z9y/production/c543ab461d31dac8d7435372643c376b63e5623a.svg",
          },
          rating: "5.0",
          readMoreText: "Read more...",
          readMoreUrl: "#",
        },
        {
          _key: "3",
          type: "video",
          authorName: "Raj Patel",
          authorTitle: "Product Designer, UX Labs",
          authorImage: {
            url: "https://cdn.sanity.io/images/m5xb8z9y/production/6c6013ec1d9c25ee9d2a190fe7e936188ac4934b-64x64.png",
          },
          starIcon: {
            url: "https://cdn.sanity.io/files/m5xb8z9y/production/c543ab461d31dac8d7435372643c376b63e5623a.svg",
          },
          rating: "4.9",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          videoThumbnail: {
            url: "https://cdn.sanity.io/images/m5xb8z9y/production/4da40797caf56c12fe5e95816470cb198b95f1a6-349x250.png",
          },
          playIcon: {
            url: "https://cdn.sanity.io/files/m5xb8z9y/production/9107bb3818c3b05330736ec84ea60379f1eb6221.svg",
          },
        },
        {
          _key: "1",
          type: "quote",
          quote:
            "I travel for work most of the year, and Anytime Mailbox has made managing my mail effortless. I get scans within hours, can forward packages anywhere, and never worry about missing important documents again.",
          authorName: "John Doe",
          authorTitle: "Founder, Startup Co.",
          authorImage: {
            url: "https://cdn.sanity.io/images/m5xb8z9y/production/6c6013ec1d9c25ee9d2a190fe7e936188ac4934b-64x64.png",
          },
          starIcon: {
            url: "https://cdn.sanity.io/files/m5xb8z9y/production/c543ab461d31dac8d7435372643c376b63e5623a.svg",
          },
          rating: "4.8",
          readMoreText: "Read more...",
          readMoreUrl: "#",
        },
      ],
    };

    const dummyBusinessData = {
      headline: "Advantages of a " + locations[0]?.city + " Business Address",
      features: [
        {
          _key: "1",
          title: "Key Sectors",
          description:
            "A wide range of industries including technology, finance, tourism, and manufacturing offer a wealth of opportunities for business growth.",
          icon: {
            tooltipTitle: "Sales Analytics",
            // iconFile: {
            //   url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            // },
            svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.459 16.5C15.6966 16.4998 15.931 16.556 16.1426 16.6641C16.3542 16.7723 16.5377 16.9293 16.6768 17.1221C16.8159 17.3149 16.9064 17.5384 16.9424 17.7734C16.9783 18.0083 16.9579 18.2482 16.8828 18.4736L15.8838 21.4736C15.7842 21.7727 15.5927 22.0336 15.3369 22.2178C15.0811 22.4019 14.7732 22.5004 14.458 22.5H9.54004C9.22474 22.5005 8.91706 22.4019 8.66113 22.2178C8.40518 22.0336 8.2139 21.7728 8.11426 21.4736L7.11426 18.4736C7.03926 18.2483 7.01881 18.0082 7.05469 17.7734C7.09066 17.5384 7.18212 17.3149 7.32129 17.1221C7.46048 16.9293 7.64368 16.7722 7.85547 16.6641C8.06712 16.556 8.30142 16.4998 8.53906 16.5H15.459ZM8.53906 18L9.54004 21H14.458L15.458 18H8.53906ZM17.71 9C17.9478 8.99967 18.1827 9.05587 18.3945 9.16406C18.6063 9.27225 18.7895 9.42922 18.9287 9.62207C19.0679 9.81496 19.1594 10.0383 19.1953 10.2734C19.2312 10.5086 19.21 10.749 19.1348 10.9746L18.1348 13.9746C18.035 14.2736 17.8438 14.5337 17.5879 14.7178C17.332 14.9018 17.0242 15.0006 16.709 15H7.29101C6.97602 15.0004 6.66882 14.9017 6.41309 14.7178C6.1573 14.5337 5.96594 14.2735 5.86621 13.9746L4.86621 10.9746C4.79097 10.749 4.77078 10.5085 4.80664 10.2734C4.84255 10.0385 4.93322 9.81486 5.07226 9.62207C5.21137 9.42928 5.39476 9.27227 5.60644 9.16406C5.81805 9.05594 6.05241 8.99985 6.29004 9H17.71ZM7.29101 13.5H16.709L17.709 10.5H6.29004L7.29101 13.5ZM19.3633 1.5C19.5811 1.49987 19.7965 1.54722 19.9941 1.63867C20.1919 1.73025 20.3679 1.86399 20.5088 2.03027C20.6495 2.19657 20.7528 2.3915 20.8105 2.60156C20.8683 2.81163 20.8787 3.0322 20.8428 3.24707L20.3428 6.24707C20.2855 6.59757 20.105 6.9159 19.834 7.14551C19.563 7.3751 19.2194 7.501 18.8643 7.5H5.13476C4.77949 7.50108 4.43512 7.37519 4.16406 7.14551C3.89318 6.9159 3.71256 6.59752 3.65527 6.24707L3.15527 3.24707C3.11943 3.03216 3.13062 2.81162 3.18848 2.60156C3.24634 2.39153 3.34941 2.19651 3.49023 2.03027C3.63104 1.86408 3.80627 1.73026 4.00391 1.63867C4.20154 1.5471 4.41695 1.5 4.63476 1.5H19.3633ZM4.63476 3L5.13476 6H18.8633L19.3643 3H4.63476Z" fill="white"/></svg>' 
           },
        },

        {
          _key: "2",
          title: "Market Access",
          description:
            locations[0]?.city + ", located in the southeastern region of Australia, provides businesses of any size domestic and international market access.",
          icon: {
            tooltipTitle: "Inventory",
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M5.54352 5.46385C5.74977 5.0551 6.16227 4.8001 6.61977 4.8001H18.0535C18.5073 4.8001 18.9235 5.0551 19.126 5.46385L21.256 9.7276C21.3085 9.82885 21.3348 9.9451 21.3348 10.0576C21.3348 10.4663 21.001 10.8001 20.5923 10.8001H4.07727C3.66852 10.8001 3.33477 10.4663 3.33477 10.0576C3.33477 9.94135 3.36102 9.82885 3.41352 9.7276L5.54352 5.46385ZM2.13477 10.0576C2.13477 11.0813 2.92977 11.9213 3.93477 11.9926V18.6001C3.93477 19.5938 4.74102 20.4001 5.73477 20.4001H12.9348C13.9285 20.4001 14.7348 19.5938 14.7348 18.6001V12.0001H19.5348V19.8001C19.5348 20.1301 19.8048 20.4001 20.1348 20.4001C20.4648 20.4001 20.7348 20.1301 20.7348 19.8001V11.9963C21.7398 11.9251 22.5348 11.0851 22.5348 10.0613C22.5348 9.76135 22.4635 9.46135 22.3285 9.19135L20.1985 4.9276C19.7898 4.11385 18.961 3.6001 18.0498 3.6001H6.61977C5.71227 3.6001 4.87977 4.11385 4.47477 4.9276L2.34102 9.19135C2.20602 9.46135 2.13477 9.7576 2.13477 10.0613V10.0576ZM5.13477 15.6001V12.0001H13.5348V15.6001H5.13477ZM5.13477 16.8001H13.5348V18.6001C13.5348 18.9301 13.2648 19.2001 12.9348 19.2001H5.73477C5.40477 19.2001 5.13477 18.9301 5.13477 18.6001V16.8001Z" fill="white"/></svg>'
          },
        },
        {
          _key: "3",
          title: "Supportive Policies",
          description:
            locations[0]?.city + " offers grants, subsidies, mentorship programs, and access to resources to support small businesses and startups.",
          icon: {
            tooltipTitle: "Dashboard Insights",
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M6.66602 1.5H12.666V6C12.666 7.65469 14.0113 9 15.666 9H20.166V21C20.166 21.8297 19.4957 22.5 18.666 22.5H6.66602C5.83633 22.5 5.16602 21.8297 5.16602 21V3C5.16602 2.17031 5.83633 1.5 6.66602 1.5ZM14.166 2.12344L19.5426 7.5H15.666C14.8363 7.5 14.166 6.82969 14.166 6V2.12344ZM6.66602 0C5.01133 0 3.66602 1.34531 3.66602 3V21C3.66602 22.6547 5.01133 24 6.66602 24H18.666C20.3207 24 21.666 22.6547 21.666 21V8.74219C21.666 7.94531 21.352 7.18125 20.7895 6.61875L15.0426 0.876563C14.4801 0.314063 13.7207 0 12.9238 0H6.66602ZM8.91602 12C8.50352 12 8.16602 12.3375 8.16602 12.75C8.16602 13.1625 8.50352 13.5 8.91602 13.5H16.416C16.8285 13.5 17.166 13.1625 17.166 12.75C17.166 12.3375 16.8285 12 16.416 12H8.91602ZM8.91602 16.5C8.50352 16.5 8.16602 16.8375 8.16602 17.25C8.16602 17.6625 8.50352 18 8.91602 18H16.416C16.8285 18 17.166 17.6625 17.166 17.25C17.166 16.8375 16.8285 16.5 16.416 16.5H8.91602Z" fill="white"/></svg>'
            },
        }
      ],
    };
    

  return defer({decodedCountry, decodedState, cities, locations, data: dummyTestimonialData, dummyBusinessData});
}


// Component
export default function StatePage() {
  const {decodedCountry, decodedState, cities, locations, data, dummyBusinessData} =
    useLoaderData<typeof loader>();

    // Testimonial slider state
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
  
    const openVideo = (url: string) => {
      if (!url) return;
      let embedUrl = url;
      if (url.includes("youtube.com/watch")) {
        const videoId = url.split("v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
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
    // Testimonial slider data


    const [showButton, setShowButton] = useState(false);

    // Show button only after scrolling down
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

   
    return (
      <>
      <LocationsList locations={locations} isCityPage={true} country={decodedCountry} />

      <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] lg:gap-[142px] items-center">
          
          {/* Image Section */}
          <div className="w-full md:w-[50.3%] relative order-1 md:order-1">
            <img
              src={CityImage}
              alt="How it started"
              className="rounded-[20px] w-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-[49.7%] space-y-4 order-1 md:order-1">
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            Why Get a Mailing Address in<br/><span className='text-[#FF6600]'>{locations[0]?.city}</span> 
            </h2>

            <div className="prose prose-lg how-started text-PrimaryBlack">
              <p>
              {locations[0]?.city}, Australia’s business capital, is an attractive destination for entrepreneurs looking to expand their market reach. With a thriving economy, a wide range of industries, and a strategic location in Australia, this region presents businesses with many opportunities for growth.
                <br />
                <br />
                By setting up a virtual mailbox address in {locations[0]?.city}, you get to call Australia’s top-performing region home. It is a prime spot for accessing markets in the Asia-Pacific region and is a top destination for investors.
                <br />
                <br />
                With a Virtual Mailbox address in {locations[0]?.city}, your business can tap into business opportunities and world-class markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-DarkOrange py-[40px] md:py-[60px] lg:py-[100px] px-5 text-center">
        <div className="max-w-[1240px] mx-auto">
          {/* Heading */}
          <div className="flex flex-col gap-5 max-w-[850px] mx-auto">
            <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
              {dummyBusinessData?.headline}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="mt-14 gap-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 auto-rows-min">
            {dummyBusinessData?.features.map((item, index) => {
  
              return (
                <div
                  key={item._key || index}
                  className={`flex flex-col items-start justify-between text-left rounded-[20px] p-5 md:p-6 border transition-all duration-500
                    md:row-span-1 bg-white border-LightWhite cursor-pointer`}
                >
                  {/* Icon */}
                  <div className="w-full">
                    <div className="bg-DarkOrange rounded-full p-[8px] md:p-[10px] mb-5 md:mb-6 inline-block">
                    {item.icon?.svg ? (
                      <span
                        className="w-5 md:w-6 h-5 md:h-6 text-white"
                        title={item.icon?.tooltipTitle}
                        dangerouslySetInnerHTML={{ __html: item.icon.svg }}
                      />
                    ) : (
                      <img
                        src={item.icon?.iconFile?.url || ""}
                        alt={item.title}
                        className="w-5 md:w-6 h-5 md:h-6 object-cover"
                        title={item.icon?.tooltipTitle}
                      />
                    )}
                    </div>
                    {/* Title */}
                    <h3 className={`max-w-[100%] md:max-w-[238px] font-Roboto font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]
                      text-PrimaryBlack`}>
                      {item.title}
                    </h3>
                    {/* Description */}
                    <p className={`mt-2 font-Roboto font-normal leading-[21px] text-[14px] tracking-[0px]
                      text-PrimaryBlack`}>
                      {item.description}
                    </p>
                  </div>

                
                </div>
              );
            })}
          </div>
        </div>
      </section>
     
      <section className="w-full bg-white">
      {/* ==== Video Section ==== */}
      <div className="w-full bg-white py-10 md:py-16 flex justify-center">
        <div className="w-full md:w-[1184px] aspect-video rounded-[10px] overflow-hidden shadow-lg md:h-[665px] h-[199px] w-[353px]">
        <iframe className='w-full h-full' src="https://www.youtube.com/embed/TJArEqaZgnA?rel=0" title="Anytime Mailbox Digital Mailbox Features" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>

      {/* ==== How It Works Section ==== */}
      <section className="bg-[#091019] text-white py-20 text-center">
        <div className="max-w-[1240px] mx-auto mx-auto px-5 md:px-0">
          <h2 className="font-Roboto font-semibold text-[24px] md:text-[36px] mb-16 leading-[43.2px] tracking-[-0.54px]">
            How Virtual Mailbox Works
          </h2>

          <div className="relative flex flex-col md:flex-row items-start justify-between gap-14 md:gap-6">

            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-[386px]">
              <div className="bg-[#FF6600] rounded-full p-4 mb-8 w-20 h-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20 26" fill="none">
                  <path d="M2.33438 9.62995C2.33438 5.32995 5.88938 1.79995 10.3344 1.79995C14.7794 1.79995 18.3344 5.32995 18.3344 9.62995C18.3344 12.145 17.0394 15.1 15.2644 17.91C13.5644 20.6 11.5644 22.9349 10.3344 24.28C9.10437 22.9349 7.10437 20.595 5.40437 17.91C3.62937 15.1 2.33438 12.145 2.33438 9.62995ZM10.3344 0.199951C5.03438 0.199951 0.734375 4.41995 0.734375 9.62995C0.734375 15.595 6.74437 22.745 9.25437 25.47C9.84437 26.11 10.8244 26.11 11.4144 25.47C13.9244 22.745 19.9344 15.595 19.9344 9.62995C19.9344 4.41995 15.6344 0.199951 10.3344 0.199951ZM12.7344 9.79995C12.7344 11.125 11.6594 12.2 10.3344 12.2C9.00938 12.2 7.93438 11.125 7.93438 9.79995C7.93438 8.47495 9.00938 7.39995 10.3344 7.39995C11.6594 7.39995 12.7344 8.47495 12.7344 9.79995ZM10.3344 5.79995C8.12437 5.79995 6.33437 7.58995 6.33437 9.79995C6.33437 12.01 8.12437 13.8 10.3344 13.8C12.5444 13.8 14.3344 12.01 14.3344 9.79995C14.3344 7.58995 12.5444 5.79995 10.3344 5.79995Z" fill="white"/>
                </svg>
              </div>
              <h3 className="font-[600] text-[18px] md:text-[24px] mb-4">
                Select a {locations[0]?.city} Address
              </h3>
              <p className="font-[400]  text-[14px] md:text-[18px] leading-[27px]">
                Select a real street address and subscription plan by browsing our
                list of locations.
              </p>
            </div>

            {/* SVG Arrow Between Step 1 & 2 */}
            <div className="hidden md:block absolute left-[26%] top-[50px] transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" width="169" height="25" viewBox="0 0 169 25" fill="none">
                <path d="M168.533 4.77744C168.708 4.25373 168.425 3.68703 167.902 3.5117L159.367 0.654379C158.844 0.47904 158.277 0.761452 158.102 1.28516C157.926 1.80888 158.209 2.37557 158.732 2.55091L166.319 5.09075L163.779 12.6769C163.603 13.2006 163.886 13.7673 164.409 13.9426C164.933 14.118 165.5 13.8355 165.675 13.3118L168.533 4.77744ZM1 4.45996L0.543637 5.34975C1.10693 5.63866 1.68792 5.92974 2.28622 6.22251L2.72576 5.32429L3.1653 4.42606C2.57793 4.13864 2.00816 3.85318 1.45636 3.57017L1 4.45996ZM6.28358 6.99077L5.87401 7.90304C7.03367 8.42368 8.24434 8.9468 9.50394 9.46978L9.8874 8.54623L10.2709 7.62267C9.02828 7.10675 7.83503 6.59114 6.69315 6.07849L6.28358 6.99077ZM13.5164 9.99849L13.1565 10.9315C14.3501 11.3919 15.5806 11.8504 16.8466 12.3051L17.1846 11.364L17.5226 10.4229C16.2712 9.97338 15.0553 9.52032 13.8763 9.06551L13.5164 9.99849ZM20.8862 12.6474L20.5689 13.5958C21.7883 14.0037 23.0362 14.4071 24.3117 14.8044L24.6091 13.8497L24.9066 12.8949C23.6444 12.5017 22.4097 12.1027 21.2035 11.6991L20.8862 12.6474ZM28.3506 14.9739L28.0724 15.9345C29.3109 16.2932 30.5724 16.6454 31.8561 16.9902L32.1155 16.0244L32.3749 15.0586C31.1038 14.7173 29.8548 14.3685 28.6288 14.0134L28.3506 14.9739ZM35.9035 17.0028L35.6627 17.9734C36.9201 18.2853 38.1966 18.5896 39.4916 18.885L39.714 17.9101L39.9365 16.9351C38.6539 16.6425 37.3896 16.3412 36.1443 16.0322L35.9035 17.0028ZM43.5463 18.7468L43.3421 19.7257C44.6125 19.9907 45.8989 20.2468 47.2008 20.4932L47.3868 19.5106L47.5728 18.5281C46.2831 18.284 45.0088 18.0303 43.7504 17.7678L43.5463 18.7468ZM51.2309 20.2015L51.0631 21.1873C52.3437 21.4053 53.6381 21.6136 54.9455 21.8114L55.0951 20.8226L55.2446 19.8339C53.9495 19.638 52.6673 19.4317 51.3987 19.2157L51.2309 20.2015ZM58.978 21.3733L58.8468 22.3646C60.1364 22.5353 61.4378 22.6955 62.7504 22.8445L62.8632 21.8509L62.976 20.8573C61.6758 20.7097 60.3867 20.551 59.1092 20.3819L58.978 21.3733ZM66.7497 22.2554L66.6555 23.251C67.9527 23.3738 69.2601 23.4854 70.5771 23.5851L70.6526 22.588L70.7281 21.5908C69.4238 21.492 68.1289 21.3815 66.8439 21.2599L66.7497 22.2554ZM74.5671 22.8471L74.5105 23.8455C75.8084 23.9191 77.1149 23.9809 78.4296 24.0303L78.4672 23.031L78.5047 22.0317C77.2029 21.9827 75.909 21.9216 74.6237 21.8487L74.5671 22.8471ZM82.3805 23.1404L82.3622 24.1402C83.6695 24.1641 84.9843 24.1755 86.3061 24.1739L86.3049 23.1739L86.3037 22.1739C84.995 22.1755 83.6933 22.1642 82.3988 22.1405L82.3805 23.1404ZM90.2086 23.131L90.2295 24.1308C91.5342 24.1036 92.8453 24.0635 94.1623 24.0099L94.1217 23.0107L94.081 22.0115C92.7774 22.0646 91.4795 22.1043 90.1878 22.1312L90.2086 23.131ZM98.0388 22.8118L98.0995 23.81C99.3996 23.7309 100.705 23.6383 102.015 23.5319L101.934 22.5352L101.853 21.5385C100.557 21.6438 99.2647 21.7354 97.978 21.8137L98.0388 22.8118ZM105.835 22.1782L105.936 23.173C107.236 23.0406 108.541 22.8941 109.849 22.7333L109.727 21.7408L109.605 20.7483C108.311 20.9074 107.02 21.0522 105.733 21.1833L105.835 22.1782ZM113.601 21.2237L113.744 22.2134C115.039 22.0268 116.337 21.8258 117.639 21.6099L117.476 20.6234L117.312 19.6369C116.024 19.8504 114.74 20.0492 113.459 20.2339L113.601 21.2237ZM121.326 19.9428L121.511 20.9256C122.794 20.6846 124.08 20.4289 125.369 20.1581L125.164 19.1795L124.958 18.2008C123.683 18.4687 122.411 18.7216 121.142 18.96L121.326 19.9428ZM128.993 18.3314L129.22 19.3054C130.489 19.0097 131.761 18.6991 133.034 18.3731L132.786 17.4043L132.538 16.4356C131.279 16.7579 130.022 17.0651 128.766 17.3575L128.993 18.3314ZM136.573 16.3906L136.842 17.3537C138.099 17.0022 139.358 16.6355 140.617 16.2532L140.327 15.2963L140.037 14.3394C138.791 14.7174 137.547 15.08 136.303 15.4276L136.573 16.3906ZM144.058 14.1184L144.37 15.0686C145.613 14.6609 146.858 14.2376 148.102 13.7984L147.77 12.8553L147.437 11.9123C146.206 12.3465 144.976 12.765 143.747 13.1682L144.058 14.1184ZM151.438 11.5148L151.792 12.4502C153.017 11.9869 154.243 11.5078 155.468 11.0127L155.094 10.0855L154.719 9.15832C153.507 9.64779 152.296 10.1214 151.084 10.5794L151.438 11.5148ZM158.696 8.58304L159.091 9.50163C160.293 8.98471 161.494 8.45203 162.694 7.90326L162.279 6.99377L161.863 6.08428C160.676 6.62681 159.489 7.15342 158.301 7.66445L158.696 8.58304ZM165.817 5.32841L166.253 6.22838C166.845 5.94127 167.438 5.65015 168.03 5.35498L167.584 4.45996L167.138 3.56494C166.553 3.85677 165.967 4.14458 165.381 4.42844L165.817 5.32841Z" fill="white"/>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-[386px] relative">
              <div className="bg-[#FF6600] rounded-full p-4 mb-8 w-20 h-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M23.9992 7.19995C23.9992 5.87495 25.0742 4.79995 26.3992 4.79995C27.7242 4.79995 28.7992 5.87495 28.7992 7.19995C28.7992 8.52495 27.7242 9.59995 26.3992 9.59995C25.0742 9.59995 23.9992 8.52495 23.9992 7.19995ZM30.3992 7.19995C30.3992 4.98995 28.6092 3.19995 26.3992 3.19995C24.1892 3.19995 22.3992 4.98995 22.3992 7.19995C22.3992 9.40995 24.1892 11.2 26.3992 11.2C28.6092 11.2 30.3992 9.40995 30.3992 7.19995ZM28.7992 22.3999V13.135C28.2942 13.34 27.7592 13.4799 27.1992 13.5499V22.3999C27.1992 23.2849 26.4842 23.9999 25.5992 23.9999H6.39922C5.51422 23.9999 4.79922 23.2849 4.79922 22.3999V11.9799L13.6342 18.4599C15.0442 19.49 16.9592 19.49 18.3642 18.4599L25.1542 13.4799C24.5092 13.3549 23.8992 13.1299 23.3442 12.825L17.4192 17.1649C16.5742 17.7849 15.4242 17.7849 14.5792 17.1649L5.33922 10.39C4.99922 10.14 4.79922 9.74495 4.79922 9.32495C4.79922 8.59495 5.39422 7.99995 6.12422 7.99995H20.0492C20.0142 7.73995 19.9992 7.46995 19.9992 7.19995C19.9992 6.92995 20.0142 6.65995 20.0492 6.39995H6.12422C4.54922 6.39995 3.26422 7.64495 3.20422 9.19995H3.19922V22.3999C3.19922 24.1649 4.63422 25.5999 6.39922 25.5999H25.5992C27.3642 25.5999 28.7992 24.1649 28.7992 22.3999Z" fill="white"/>
                </svg>
              </div>
              <h3 className="font-semibold text-[18px] md:text-[24px] mb-4">
                We Receive Your Mail
              </h3>
              <p className="font-[400] text-[14px] md:text-[18px] leading-[27px]">
                Have your mail and packages delivered to your {locations[0]?.city}
                address. We upload a photo of the mail items to the app.
              </p>
            </div>

            {/* SVG Arrow Between Step 2 & 3 */}
            <div className="hidden md:block absolute left-[62%] top-[50px] transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="169" height="25" viewBox="0 0 169 25" fill="none">
              <path d="M168.384 20.2306C168.559 20.7543 168.277 21.321 167.753 21.4964L159.219 24.3537C158.695 24.529 158.129 24.2466 157.953 23.7229C157.778 23.1992 158.06 22.6325 158.584 22.4571L166.17 19.9173L163.63 12.3312C163.455 11.8075 163.737 11.2408 164.261 11.0654C164.785 10.8901 165.351 11.1725 165.527 11.6962L168.384 20.2306ZM0.851562 20.5481L0.395199 19.6583C0.958491 19.3694 1.53949 19.0783 2.13778 18.7855L2.57732 19.6838L3.01686 20.582C2.42949 20.8694 1.85972 21.1549 1.30793 21.4379L0.851562 20.5481ZM6.13514 18.0173L5.72557 17.105C6.88523 16.5844 8.0959 16.0613 9.3555 15.5383L9.73896 16.4618L10.1224 17.3854C8.87984 17.9013 7.68659 18.4169 6.54471 18.9296L6.13514 18.0173ZM13.368 15.0096L13.008 14.0766C14.2017 13.6161 15.4322 13.1576 16.6981 12.7029L17.0362 13.644L17.3742 14.5852C16.1227 15.0347 14.9068 15.4877 13.7279 15.9426L13.368 15.0096ZM20.7378 12.3606L20.4205 11.4123C21.6399 11.0043 22.8878 10.601 24.1633 10.2036L24.4607 11.1584L24.7581 12.1131C23.4959 12.5063 22.2612 12.9054 21.0551 13.309L20.7378 12.3606ZM28.2022 10.0341L27.924 9.0736C29.1625 8.7149 30.424 8.36262 31.7077 8.01787L31.9671 8.98365L32.2264 9.94943C30.9554 10.2908 29.7064 10.6396 28.4803 10.9947L28.2022 10.0341ZM35.7551 8.00527L35.5142 7.0347C36.7716 6.72271 38.0482 6.4185 39.3431 6.12303L39.5656 7.09797L39.788 8.07292C38.5054 8.36557 37.2411 8.66686 35.9959 8.97584L35.7551 8.00527ZM43.3978 6.26127L43.1937 5.28234C44.464 5.01739 45.7505 4.76129 47.0524 4.51487L47.2384 5.49743L47.4243 6.47999C46.1347 6.72408 44.8603 6.97777 43.602 7.24021L43.3978 6.26127ZM51.0825 4.80653L50.9146 3.82072C52.1953 3.60272 53.4896 3.39445 54.7971 3.19667L54.9466 4.18542L55.0962 5.17417C53.801 5.37009 52.5189 5.5764 51.2503 5.79235L51.0825 4.80653ZM58.8296 3.63478L58.6983 2.64343C59.988 2.47273 61.2894 2.31255 62.602 2.16356L62.7147 3.15718L62.8275 4.1508C61.5274 4.29838 60.2383 4.45705 58.9608 4.62614L58.8296 3.63478ZM66.6013 2.75264L66.507 1.75709C67.8043 1.63428 69.1117 1.52269 70.4287 1.42295L70.5042 2.4201L70.5797 3.41724C69.2753 3.51602 67.9804 3.62654 66.6955 3.74819L66.6013 2.75264ZM74.4186 2.16093L74.3621 1.16253C75.66 1.08898 76.9665 1.0272 78.2812 0.977793L78.3187 1.97709L78.3563 2.97638C77.0544 3.02531 75.7606 3.08648 74.4752 3.15933L74.4186 2.16093ZM82.2321 1.8677L82.2138 0.867865C83.5211 0.843945 84.8359 0.832512 86.1577 0.834118L86.1565 1.83412L86.1553 2.83412C84.8466 2.83253 83.5448 2.84385 82.2504 2.86753L82.2321 1.8677ZM90.0602 1.87706L90.081 0.877275C91.3858 0.904442 92.6969 0.944574 94.0139 0.998184L93.9732 1.99736L93.9326 2.99653C92.6289 2.94346 91.3311 2.90374 90.0394 2.87684L90.0602 1.87706ZM97.8903 2.19621L97.9511 1.19806C99.2512 1.2772 100.557 1.36973 101.867 1.47614L101.786 2.47286L101.705 3.46958C100.408 3.36427 99.1163 3.27269 97.8296 3.19436L97.8903 2.19621ZM105.686 2.82986L105.788 1.83501C107.088 1.9675 108.392 2.11392 109.701 2.27473L109.579 3.26727L109.457 4.2598C108.162 4.10069 106.871 3.95581 105.585 3.82471L105.686 2.82986ZM113.453 3.78438L113.596 2.79461C114.89 2.98127 116.189 3.1823 117.491 3.39814L117.327 4.38467L117.164 5.3712C115.876 5.15769 114.591 4.95881 113.31 4.77415L113.453 3.78438ZM121.178 5.06527L121.362 4.08245C122.646 4.32347 123.932 4.57916 125.221 4.84996L125.015 5.82859L124.81 6.80722C123.535 6.5394 122.263 6.28649 120.993 6.0481L121.178 5.06527ZM128.844 6.67662L129.071 5.70269C130.341 5.99837 131.612 6.309 132.886 6.63496L132.638 7.60372L132.39 8.57248C131.131 8.25015 129.873 7.94297 128.618 7.65056L128.844 6.67662ZM136.424 8.61741L136.693 7.65434C137.951 8.00582 139.209 8.37255 140.469 8.7549L140.179 9.7118L139.888 10.6687C138.643 10.2906 137.398 9.92803 136.155 9.58049L136.424 8.61741ZM143.91 10.8896L144.221 9.93943C145.465 10.3472 146.709 10.7705 147.954 11.2097L147.621 12.1527L147.289 13.0957C146.058 12.6615 144.828 12.243 143.598 11.8399L143.91 10.8896ZM151.29 13.4932L151.643 12.5579C152.869 13.0212 154.094 13.5003 155.32 13.9954L154.945 14.9226L154.571 15.8497C153.359 15.3603 152.147 14.8867 150.936 14.4286L151.29 13.4932ZM158.548 16.425L158.943 15.5064C160.144 16.0233 161.345 16.556 162.546 17.1048L162.13 18.0143L161.714 18.9238C160.528 18.3813 159.34 17.8546 158.152 17.3436L158.548 16.425ZM165.668 19.6796L166.104 18.7797C166.697 19.0668 167.29 19.3579 167.882 19.6531L167.436 20.5481L166.99 21.4431C166.404 21.1513 165.818 20.8635 165.232 20.5796L165.668 19.6796Z" fill="white"/>
            </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-[386px]">
              <div className="bg-[#FF6600] rounded-full p-4 mb-8 w-20 h-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                  <path d="M3.00199 22C3.00199 21.4477 3.4497 21 4.00199 21C4.55427 21 5.00199 21.4477 5.00199 22C5.00199 23.2866 5.00697 23.7841 5.08532 24.1783C5.42725 25.8973 6.77129 27.2414 8.49027 27.5833C8.88441 27.6617 9.38186 27.6666 10.6687 27.6666C11.2209 27.6666 11.6687 28.1143 11.6687 28.6666C11.6687 29.2189 11.2209 29.6666 10.6687 29.6666C9.47753 29.6666 8.73584 29.6708 8.09964 29.5442C5.58738 29.0444 3.62281 27.0812 3.12308 24.569C2.99656 23.9328 3.00199 23.191 3.00199 22ZM28.3353 22C28.3353 21.4477 28.783 21 29.3353 21C29.8876 21 30.3353 21.4477 30.3353 22C30.3353 23.0418 30.3384 23.7398 30.2546 24.3242L30.2129 24.569C29.7444 26.924 27.99 28.7981 25.7025 29.4348L25.2377 29.5442C24.6015 29.6708 23.8598 29.6666 22.6687 29.6666C22.1164 29.6666 21.6687 29.2189 21.6687 28.6666C21.6687 28.1143 22.1164 27.6666 22.6687 27.6666C23.9554 27.6666 24.4529 27.6617 24.847 27.5833C26.5659 27.2414 27.9101 25.8972 28.252 24.1783C28.3304 23.7842 28.3353 23.2867 28.3353 22ZM3.00199 9.99995C3.00199 8.80882 2.99654 8.06708 3.12308 7.43094C3.62283 4.91857 5.58727 2.95413 8.09964 2.45438C8.73578 2.32784 9.47752 2.33329 10.6687 2.33329C11.2209 2.33329 11.6687 2.781 11.6687 3.33329C11.6687 3.88557 11.2209 4.33329 10.6687 4.33329C9.38197 4.33329 8.88445 4.33826 8.49027 4.41662C6.77128 4.75855 5.42725 6.10258 5.08532 7.82157C5.00696 8.21575 5.00199 8.71327 5.00199 9.99995C5.00199 10.5522 4.55427 11 4.00199 11C3.4497 11 3.00199 10.5522 3.00199 9.99995ZM28.3353 9.99995C28.3353 8.71315 28.3304 8.21571 28.252 7.82157C27.9101 6.10259 26.566 4.75855 24.847 4.41662C24.4528 4.33827 23.9553 4.33329 22.6687 4.33329C22.1164 4.33329 21.6687 3.88557 21.6687 3.33329C21.6687 2.781 22.1164 2.33329 22.6687 2.33329C23.8597 2.33329 24.6015 2.32785 25.2377 2.45438C27.7499 2.95413 29.7145 4.91856 30.2142 7.43094C30.3408 8.06711 30.3353 8.80891 30.3353 9.99995C30.3353 10.5522 29.8876 11 29.3353 11C28.783 11 28.3353 10.5522 28.3353 9.99995Z" fill="white"/>
                  <path d="M22.3353 14C22.8876 14 23.3353 14.4477 23.3353 15C23.3353 15.5523 22.8876 16 22.3353 16H11.002C10.4497 16 10.002 15.5523 10.002 15C10.002 14.4477 10.4497 14 11.002 14H22.3353Z" fill="white"/>
                </svg>
              </div>
              <h3 className="font-semibold text-[18px] md:text-[24px] mb-4">
                Tell Us What To Do
              </h3>
              <p className="font-[400] text-[14px] md:text-[18px] leading-[27px]">
                Request to open and scan, shred or recycle, or forward your mail
                items. You can also set a schedule for local pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

    </section>

      {/* // Testimonials Section */}
      <section className="py-[40px] md:py-[60px] lg:py-[100px] bg-white px-5">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-11 md:gap-14">

          {/* Heading + Arrows */}
          <div className="flex flex-col md:flex-row justify-between items-end">
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center md:text-left">
              {data?.subheadline || data?.headline}
            </h2>
            <div className="hidden md:flex justify-end gap-5">
              <button
                ref={prevRef}
                className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                  isBeginning ? "bg-[#D3D3D3]" : "bg-DarkOrange"
                }`}
              >
                <ArrowLeftIcon />
              </button>
              <button
                ref={nextRef}
                className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                  isEnd ? "bg-[#D3D3D3]" : "bg-DarkOrange"
                }`}
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onInit={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
            >
              {data?.testimonials?.map((item, idx) =>
                item.type === "quote" ? (
                  <SwiperSlide key={item._key} className="!h-auto !flex-shrink-0">
                    <div className="transition-all duration-500 ease-in-out group bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between hover:bg-PrimaryBlack">

                      {/* Top: Quote + Rating */}
                      <div className="flex items-center justify-between">
                        {item.authorImage && (
                          <img
                            src={item.authorImage.url}
                            alt={item.authorImage.altText || item.authorName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                          {item.starIcon?.url && (
                            <img src={item.starIcon.url} alt="Star Icon" className="w-5 h-5" />
                          )}
                          <span className="transition-all duration-500 ease-in-out font-Roboto text-base font-normal leading-[24px] group-hover:text-white">
                            {item.rating || "4.5"}
                          </span>
                        </div>
                      </div>

                      <span className="mt-[28px] mb-[22px]"><Testimonial /></span>

                      {/* Quote */}
                      <p
                      className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] group-hover:text-white overflow-hidden text-ellipsis line-clamp-6"
                    >
                      {item?.quote}
                    </p>
                      {item?.readMoreText && (
                        <a
                          href={item.readMoreUrl || "#"}
                          className="font-Roboto text-DarkOrange text-[14px] leading-[14px] tracking-[0.07px] font-normal mt-4 inline-block"
                        >
                          <span className="sr-only">(click to  Read Full Article written by {item.authorName})</span>
                          {item.readMoreText}
                        </a>
                      )}

                      {/* Author */}
                      <div className="mt-[72px] pl-4 border-l border-LightWhite flex flex-col gap-1">
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium tracking-[0px] group-hover:text-white">
                          {item.authorName}
                        </p>
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-LightGray text-[14px] leading-[21px] font-normal tracking-[0px] group-hover:text-white">
                          {item.authorTitle}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ) : (
                  <SwiperSlide key={item._key} className="!h-auto !flex-shrink-0">
                    <div className="transition-all duration-500 ease-in-out group bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between hover:bg-PrimaryBlack">

                      {/* Top: Author */}
                      <div className="flex items-center justify-between">
                        {item.authorImage && (
                          <img
                            src={item.authorImage.url}
                            alt={item.authorImage.altText || item.authorName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                          {item.starIcon?.url && (
                            <img src={item.starIcon.url} alt="Star Icon" className="w-5 h-5" />
                          )}
                          <span className="transition-all duration-500 ease-in-out font-Roboto text-base font-normal leading-[24px] group-hover:text-white">
                            {item.rating || "4.5"}
                          </span>
                        </div>
                      </div>

                      {/* Video */}
                      {item.videoThumbnail?.url && (
                        <div className="relative mt-6">
                          <img
                            src={item.videoThumbnail.url}
                            alt={item.videoThumbnail.altText || "Video Thumbnail"}
                            className="w-full h-[250px] object-cover"
                          />
                          {item.playIcon?.url && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={() => openVideo(item.videoUrl || "")}
                                className="cursor-pointer"
                              >
                                <div className="bg-[#FFFFFFB2] rounded-full p-2 shadow-lg flex items-center justify-center">
                                  <img src={item.playIcon.url} alt="Play Icon" className="w-10 h-10" />
                                </div>
                                <span className="sr-only">(click to play video of {item.authorName})</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Author */}
                      <div className="mt-[62px] pl-4 border-l border-LightWhite flex flex-col gap-1">
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium group-hover:text-white">
                          {item.authorName}
                        </p>
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-LightGray text-[14px] leading-[21px] font-normal group-hover:text-white">
                          {item.authorTitle}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
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
      {/* // Testimonials Section */}


      <section className="relative bg-[#FF6600] md:px-12 overflow-hidden">
        <div className="relative max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between h-auto md:h-[363px]">

          {/* Left Text */}
          <div className="z-10 text-left mb-6 px-5 md:px-0 md:mb-0 order-1 mt-10 md:mt-0 pt-0 md:pt-25">
            <h2 className="text-white font-Roboto font-[600] text-[28px] md:text-[56px] leading-[38px] md:leading-[61.6px] tracking-[-1.12px] md:mb-6 mb-4">
              Plans start at $9.99
            </h2>
            <button className="bg-white text-[#041E2C] font-[400] text-[16px] leading-[16px] tracking-[0.08px] px-5 py-4 rounded-full hover:bg-gray-100 transition">
              Get a {locations[0]?.city} Address
            </button>
          </div>

          {/* Right Image (Responsive position) */}
          <div className="order-2 md:order-2 px-5 flex justify-center items-center md:justify-end w-full md:w-auto">
            <img
              src={require('~/components/media/boy-city.svg')}
              alt="Person checking phone"
              className="w-full max-w-[400px] md:max-w-[500px] h-auto object-contain"
            />
          </div>

        </div>
      </section>



      {/* Floating Scroll to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#FF6600] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:bg-[#e45a00] z-50"
        >
          <span className="text-[16px] leading-[16px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path d="M6.57672 0.976133C6.80922 0.743633 7.19172 0.743633 7.42422 0.976133L13.4242 6.97613C13.6567 7.20863 13.6567 7.59113 13.4242 7.82363C13.1917 8.05613 12.8092 8.05613 12.5767 7.82363L7.00047 2.24738L1.42422 7.82363C1.19172 8.05613 0.809219 8.05613 0.576719 7.82363C0.344219 7.59113 0.344219 7.20863 0.576719 6.97613L6.57672 0.976133Z" fill="white"/>
            </svg>
          </span>
          <span>Get a {locations[0]?.city} Address</span>
        </button>
      )}
      </>
    );

}
