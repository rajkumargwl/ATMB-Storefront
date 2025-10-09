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
      subheadline: "Real stories from real people",
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
            url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg",
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
            url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg",
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
            url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg",
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
            url: "https://randomuser.me/api/portraits/men/12.jpg",
          },
          starIcon: {
            url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg",
          },
          rating: "4.8",
          readMoreText: "Read more...",
          readMoreUrl: "#",
        },
      ],
    };

    const dummyBusinessData = {
      headline: "Advantages of a New South Wales Business Address",
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
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none"><path d="M17.5087 1.03025C17.3678 0.863969 17.1923 0.730393 16.9946 0.638819C16.7968 0.547244 16.5814 0.499873 16.3635 0.5H1.63495C1.41707 0.499973 1.20181 0.547411 1.00412 0.639013C0.806435 0.730615 0.631078 0.864183 0.490246 1.03043C0.349414 1.19667 0.246488 1.3916 0.188627 1.60165C0.130766 1.8117 0.119359 2.03184 0.1552 2.24675L0.65545 5.24675C0.7127 5.59739 0.893031 5.91615 1.16409 6.14583C1.43514 6.37551 1.77917 6.50108 2.13445 6.5H15.864C16.2192 6.50108 16.5633 6.37551 16.8343 6.14583C17.1054 5.91615 17.2857 5.59739 17.343 5.24675L17.8432 2.24675C17.8791 2.03185 17.8678 1.81171 17.8101 1.60162C17.7523 1.39154 17.6495 1.19656 17.5087 1.03025ZM15.8632 5H2.13445L1.63495 2H16.3642L15.8632 5ZM12.459 15.5H5.53945C5.30165 15.4997 5.06718 15.556 4.85539 15.6641C4.6436 15.7723 4.46056 15.9292 4.32137 16.122C4.18218 16.3148 4.09083 16.538 4.05486 16.7731C4.01888 17.0081 4.0393 17.2484 4.11445 17.474L5.1142 20.474C5.21384 20.7732 5.40524 21.0333 5.66119 21.2175C5.91713 21.4017 6.22462 21.5006 6.53995 21.5H11.4584C11.7737 21.5004 12.081 21.4015 12.3368 21.2173C12.5926 21.0331 12.7838 20.7731 12.8835 20.474L13.8832 17.474C13.9583 17.2484 13.9788 17.0083 13.9428 16.7732C13.9069 16.5382 13.8156 16.3151 13.6765 16.1223C13.5374 15.9295 13.3545 15.7726 13.1428 15.6644C12.9311 15.5562 12.6967 15.4998 12.459 15.5ZM11.4584 20H6.53995L5.53945 17H12.4582L11.4584 20Z" fill="white"/></svg>' 
           },
        },

        {
          _key: "2",
          title: "Market Access",
          description:
            "New South Wales, located in the southeastern region of Australia, provides businesses of any size domestic and international market access.",
          icon: {
            tooltipTitle: "Inventory",
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M5.54352 5.46385C5.74977 5.0551 6.16227 4.8001 6.61977 4.8001H18.0535C18.5073 4.8001 18.9235 5.0551 19.126 5.46385L21.256 9.7276C21.3085 9.82885 21.3348 9.9451 21.3348 10.0576C21.3348 10.4663 21.001 10.8001 20.5923 10.8001H4.07727C3.66852 10.8001 3.33477 10.4663 3.33477 10.0576C3.33477 9.94135 3.36102 9.82885 3.41352 9.7276L5.54352 5.46385ZM2.13477 10.0576C2.13477 11.0813 2.92977 11.9213 3.93477 11.9926V18.6001C3.93477 19.5938 4.74102 20.4001 5.73477 20.4001H12.9348C13.9285 20.4001 14.7348 19.5938 14.7348 18.6001V12.0001H19.5348V19.8001C19.5348 20.1301 19.8048 20.4001 20.1348 20.4001C20.4648 20.4001 20.7348 20.1301 20.7348 19.8001V11.9963C21.7398 11.9251 22.5348 11.0851 22.5348 10.0613C22.5348 9.76135 22.4635 9.46135 22.3285 9.19135L20.1985 4.9276C19.7898 4.11385 18.961 3.6001 18.0498 3.6001H6.61977C5.71227 3.6001 4.87977 4.11385 4.47477 4.9276L2.34102 9.19135C2.20602 9.46135 2.13477 9.7576 2.13477 10.0613V10.0576ZM5.13477 15.6001V12.0001H13.5348V15.6001H5.13477ZM5.13477 16.8001H13.5348V18.6001C13.5348 18.9301 13.2648 19.2001 12.9348 19.2001H5.73477C5.40477 19.2001 5.13477 18.9301 5.13477 18.6001V16.8001Z" fill="white"/></svg>'
          },
        },
        {
          _key: "3",
          title: "Supportive Policies",
          description:
            "New South Wales offers grants, subsidies, mentorship programs, and access to resources to support small businesses and startups.",
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


   
    return (
      <>
      <LocationsList locations={locations} />

      <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] lg:gap-[142px] items-center">
          
          {/* Image Section */}
          <div className="w-full md:w-[50.3%] relative order-1 md:order-1">
            <img
              src="https://cdn.sanity.io/images/m5xb8z9y/production/0a914c1742706760c5b68605cfccf1ea143c86e9-550x446.png"
              alt="How it started"
              className="rounded-[20px] w-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-[49.7%] space-y-4 order-1 md:order-1">
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            Why Get a Mailing Address in<br/><span className='text-[#FF6600]'>New South Wales</span> 
            </h2>

            <div className="prose prose-lg how-started text-PrimaryBlack">
              <p>
              New South Wales, Australia’s business capital, is an attractive destination for entrepreneurs looking to expand their market reach. With a thriving economy, a wide range of industries, and a strategic location in Australia, this region presents businesses with many opportunities for growth.
                <br />
                <br />
                By setting up a virtual mailbox address in New South Wales, you get to call Australia’s top-performing region home. It is a prime spot for accessing markets in the Asia-Pacific region and is a top destination for investors.
                <br />
                <br />
                With a Virtual Mailbox address in New South Wales, your business can tap into business opportunities and world-class markets.
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
      <div className="bg-[#091019] text-white py-25 text-center">
        <div className=' max-w-[1240px] mx-auto'>
          <h2 className="font-Roboto font-semibold text-[24px] md:text-[36px] mb-16 leading-[43.2px] tracking-[-0.54px]">
            How Virtual Mailbox Works
          </h2>

          <div className="flex flex-col md:flex-row gap-10 md:gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-[386px]">
              <div className="bg-[#FF6600] rounded-full p-4 mb-8 w-20 h-20 flex items-center justify-center">
                s
              </div>
              <h3 className="font-[600] text-[18px] md:text-[24px] mb-4">
                Select a New South Wales Address
              </h3>
              <p className="font-[400]  text-[14px] md:text-[18px] leading-[27px]">
                Select a real street address and subscription plan by browsing our
                list of locations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-[386px] relative">
              <div className="bg-[#FF6600] rounded-full p-4 mb-8 w-20 h-20 flex items-center justify-center">
                s
              </div>
              <h3 className="font-semibold text-[18px] md:text-[24px] mb-4">
                We Receive Your Mail
              </h3>
              <p className="font-[400] text-[14px] md:text-[18px] leading-[27px]">
                Have your mail and packages delivered to your New South Wales
                address. We upload a photo of the mail items to the app.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-[386px]">
              <div className="bg-[#FF6600] rounded-full p-4 mb-8 w-20 h-20 flex items-center justify-center">
                s
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
      </div>
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
                      <p className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] group-hover:text-white">
                        {item.quote}
                      </p>
                      {item.readMoreText && (
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
              Get a New South Wales Address
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




      </>
    );

}
