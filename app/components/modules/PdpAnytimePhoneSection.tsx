import React from 'react';
import AddToCartButton from '~/components/product/buttons/AddToCartButton';

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
    <section className="px-5 pt-[24px] md:pt-[40px] pb-[60px] relative z-[2] bg-white">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-start">
        
        {/* LEFT: Text Content */}
        <div className="w-full md:w-[55%] flex flex-col">
          {/* Title */}
          <h2 className="font-Roboto font-semibold text-[#091019] text-[28px] md:text-[36px] leading-[1.2] mb-4">
            {title}
          </h2>

          {/* Description */}
          <p className="text-[#4B5563] font-Roboto text-[16px] md:text-[18px] leading-[1.6] mb-6">
            {description}
          </p>

          {/* Features list */}
          {features?.length > 0 && (
            <ul className="flex flex-col gap-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {feature.icon?.url && (
                    <img
                      src={feature.icon.url}
                      alt={feature.text}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  <span className="text-[#091019] font-medium text-[16px]">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Testimonial */}
          {testimonial && (
            <blockquote className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-[#091019] italic text-[16px] mb-4 leading-relaxed">
                “{testimonial.quote}”
              </p>
              <footer className="flex items-center gap-3">
                {testimonial.authorImage?.url && (
                  <img
                    src={testimonial.authorImage.url}
                    alt={testimonial.authorName}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                )}
                <div>
                  <p className="font-medium text-[#091019] text-[14px]">
                    {testimonial.authorName}
                  </p>
                  {testimonial.authorTitle && (
                    <p className="text-[#6B7280] text-[12px]">
                      {testimonial.authorTitle}
                    </p>
                  )}
                </div>
              </footer>
            </blockquote>
          )}
        </div>

        {/* RIGHT: Main Image or Shopify Product Card */}
        <div className="w-full md:w-[45%] flex justify-center">
          {hasImage ? (
            <img
              src={mainImage.url}
              alt={mainImage.alt || title}
              className="rounded-[20px] max-w-full h-auto object-cover"
            />
          ) : productData ? (
            <div className="p-6 md:p-8 bg-white border border-[#E5E7EB] rounded-[24px] shadow-sm w-full max-w-[400px]">
              <h3 className="mb-[11px] font-Roboto text-[#091019] font-semibold text-[24px]">
                {productData.product.title}
              </h3>
              <p className="mb-6 font-Roboto text-[#6B7280] text-[16px]">
                Resources, mentorship, and tools to grow faster.
              </p>

              <p className="mb-1 text-[#4B5563] text-[14px]">Starting from</p>
              <p className="mb-6 font-semibold text-[#091019] text-[32px]">
                ${productData.displayPrice}
                <span className="text-[#4B5563] text-[14px]">
                  /{productData.billingCycle}
                </span>
              </p>

              <ul className="flex flex-col gap-4 mb-8 pt-5 border-t border-[#E5E7EB]">
                {['Expert guidance', 'Partner network', 'Growth planning tools'].map(
                  (feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-[24px] h-[24px] flex items-center justify-center">
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
                      <span className="text-[#091019] text-[16px]">
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
                buttonClassName="flex items-center justify-center w-full h-[52px] rounded-[100px] text-[16px] text-[#091019] border border-[#091019] bg-white hover:bg-[#091019] hover:text-white transition"
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
