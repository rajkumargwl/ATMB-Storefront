import React from 'react';
import AddToCartButton from '~/components/product/buttons/AddToCartButton';
import { Link } from 'react-router-dom';
 
type Icon = {
  url: string;
  alt?: string | null;
};
 
type Feature = {
  icon?: Icon;
  text: string;
};
 
type Testimonial = {
  authorImage?: Icon;
  authorName: string;
  authorTitle?: string;
  quote: string;
};
 
type MainImage = {
  url: string;
  alt?: string;
};
 
// Shopify product data
type ProductData = {
  product: any;
  defaultVariant: any;
  billingCycle: 'monthly' | 'yearly';
  displayPrice: string;
  setBillingCycle: React.Dispatch<React.SetStateAction<'monthly' | 'yearly'>>;
  productAnalytics: any;
};
 
type Props = {
  title: string;
  description: string;
  features: Feature[];
  mainImage?: MainImage | null;
  testimonial?: Testimonial;
  breadcrumb?: string;
  productData?: ProductData;
};
 
const PdpAnytimePhoneSection: React.FC<Props> = ({
  title,
  description,
  features = [],
  mainImage,
  testimonial,
  breadcrumb = 'Home > Anytime Phone',
  productData,
}) => {
  const hasImage = !!mainImage?.url;
 
  return (
    <section className="px-5 pt-[24px] md:pt-[32px] pb-[40px] relative z-[2] bg-white">
       <div className="hidden md:flex absolute z-[1] top-[0px] right-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="418" height="583" viewBox="0 0 418 583" fill="none">
          <g opacity="0.8" filter="url(#filter0_f_4061_29568)">
            <path d="M370.294 320.883C363.018 324.686 358.562 308.607 350.66 306.371C342.608 304.092 333.877 305.965 325.84 308.299C316.057 311.141 305.655 314.189 298.571 321.5C291.384 328.918 279.276 341.589 285.932 349.486C297.47 363.174 324.634 352.997 336.455 366.443C342.902 373.775 324.992 382.892 323.819 392.578C322.49 403.544 318.354 426.044 329.365 424.962C346.469 423.282 350.079 396.762 365.151 388.517C370.088 385.816 374.432 394.624 379.108 397.751C389.831 404.922 399.569 425.214 410.957 419.15C421.803 413.374 408.357 395.058 407.087 382.851C406.482 377.038 404.735 371.36 405.378 365.551C405.913 360.712 407.259 355.64 410.5 352.004C422.524 338.516 448.641 333.525 449.977 315.519C450.896 303.131 424.116 314.744 413.777 307.833C405.231 302.121 408.563 278.297 398.714 281.253C382.995 285.97 384.835 313.282 370.294 320.883Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4061_29568" x="7.62939e-06" y="-3" width="734" height="712" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4061_29568"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="max-w-[1240px] mx-auto mb-6 relative z-[2] flex flex-row justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center flex-row gap-[7px]" aria-label="Breadcrumb">
              <ol className="flex items-center flex-row gap-[7px]">
                <li><Link to={`/`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Home</span> </Link></li>
                
                {hasImage ? ( <li className="flex items-center flex-row gap-[7px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                  </svg>                  
                    <Link to={`#`} aria-current="page"><span className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Anytime Phone</span> </Link></li>) : (<li className="flex items-center flex-row gap-[7px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                  </svg>                  
                    <Link to={`#`} aria-current="page"><span className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Business Accelerator</span> </Link></li>) }
              </ol>  
          </nav>
          {!hasImage ? (
                <div className="hidden md:flex items-center justify-end gap-2">
            <span className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">Monthly</span>
            <button className="bg-[#BFBFBF] rounded-[16px] w-10 h-[22px] relative">
              <span className="absolute left-[2px] top-[2px] w-[18px] h-[18px] bg-white rounded-[16px]"></span>
            </button>
            <span className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">Yearly</span>
            <span className="font-Roboto text-white font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px] px-2 py-1 rounded-full bg-[#537D1B]">20% Off</span>
 
          </div>
          ) : null}
      </div>
      <div className="relative z-[2] max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] md:gap-[40px] ">
        
        {/* LEFT: Text Content */}
        <div className="w-full md:w-[60.14%] flex flex-col">
          {/* Title */}
          <h1 className="mb-4 md:mb-6 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]"
    >
            {title}
          </h1>
 
 
          {/* Description */}
          <p className="mb-6 md:mb-8 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{description}</p>
 
          {/* Features list */}
          {features?.length > 0 && (
            <ul className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-9 mb-6 md:mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 after:content-[''] after:w-[1px] after:h-[21px] after:bg-LightWhite after:absolute after:top-[2px] after:right-[-20px] last:after:hidden relative">
                  {feature.icon?.url && (
                    <img
                      src={feature.icon.url}
                      alt={feature.text}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  <span className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
 
          {/* Testimonial */}
          {testimonial && (
            <blockquote className="border-t border-LightWhite pt-6 md:pt-8">
                <span aria-hidden="true" className="mb-3 block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M0 10.0002V18.5716H8.57144V10.0002H2.85716C2.85716 6.84936 5.42065 4.28588 8.57144 4.28588V1.42871C3.84486 1.42871 0 5.27358 0 10.0002ZM20 4.28588V1.42871C15.2734 1.42871 11.4286 5.27358 11.4286 10.0002V18.5716H20V10.0002H14.2857C14.2857 6.84936 16.8492 4.28588 20 4.28588Z" fill="#FF6600"/>
                </svg>
              </span>
              <p className="mb-3 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                “{testimonial.quote}”
              </p>
              <footer className="flex items-center gap-2">
                {testimonial.authorImage?.url && (
                  <img
                    src={testimonial.authorImage.url}
                    alt={testimonial.authorName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <p className="font-Roboto text-PrimaryBlack font-medium leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                    {testimonial.authorName}
                  </p>
                  {testimonial.authorTitle && (
                     <p className="font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]">
                      {testimonial.authorTitle}
                    </p>
                  )}
                </div>
              </footer>
            </blockquote>
          )}
            
        </div>
 
        {/* RIGHT: Main Image or Shopify Product Card */}
        <div className="w-full md:w-[39.86%]">
          {!hasImage ? (
            <div className="flex md:hidden items-center justify-center gap-2 mb-6">
            <span className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">Monthly</span>
            <button className="bg-[#BFBFBF] rounded-[16px] w-10 h-[22px] relative">
              <span className="absolute left-[2px] top-[2px] w-[18px] h-[18px] bg-white rounded-[16px]"></span>
            </button>
            <span className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">Yearly</span>
            <span className="font-Roboto text-white font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px] px-2 py-1 rounded-full bg-[#537D1B]">20% Off</span>
 
          </div>
          ) : null}
          {hasImage ? (
            <img
              src={mainImage.url}
              alt={mainImage.alt || title}
              className="rounded-[20px] max-w-full h-auto object-cover"
            />
          ) : productData ? (
            <div className="p-6 md:p-8 bg-white border border-LightWhite rounded-[24px]">
              <h3 className="mb-[11px] font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                {productData.product.title}
              </h3>
              <p className="mb-5 md:mb-6 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                Resources, mentorship, and tools to grow faster.
              </p>
 
              <p className="mb-1 font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">Starting from</p>
              <p className="mb-5 md:mb-6 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">
                ${productData.displayPrice}
                <span className="font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">
                  /{productData.billingCycle}
                </span>
              </p>
 
              <ul className="flex flex-col gap-4 mb-8 md:mb-10 pt-5 md:pt-6 border-t border-LightWhite">
                {['Expert guidance', 'Partner network', 'Growth planning tools'].map(
                  (feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-[24px] h-[24px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none">
                          <path
                            d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z"
                            fill="#091019"
                          />
                        </svg>
                      </span>
                      <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                        {feature}
                      </span>
                    </li>
                  ),
                )}
              </ul>
 
              <AddToCartButton
                lines={[{merchandiseId: productData.defaultVariant.id, quantity: 1}]}
                disabled={!productData.defaultVariant.availableForSale}
                analytics={{
                  products: [productData.productAnalytics],
                  totalValue: parseFloat(productData.productAnalytics.price),
                }}
                buttonClassName="flex items-center justify-center w-full h-[44px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-white md:text-PrimaryBlack border border-DarkOrange md:border-[#091019] px-4 py-[12px] bg-DarkOrange md:bg-white hover:opacity-100 group relative overflow-hidden transition-all hover:bg-DarkOrange hover:text-white hover:border-DarkOrange"
                text="Add to Cart"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
 
export default PdpAnytimePhoneSection;