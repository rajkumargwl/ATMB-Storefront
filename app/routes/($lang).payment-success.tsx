import { useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@shopify/remix-oxygen";
import { DEFAULT_LOCALE, notFound } from "~/lib/utils";
import type { Product } from "@shopify/hydrogen/storefront-api-types";
import { PRODUCT_QUERY } from "~/queries/shopify/product";
import { useRootLoaderData } from "~/root";

export const loader: LoaderFunction = async ({ context }) => {
const { env } = context;
const cart = await context.cart.get();
const customerAccessToken = await context.session.get("customerAccessToken");

if (!customerAccessToken) {
return redirect("/create-account");
}

const [virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
context.storefront.query<{ product: Product }>(PRODUCT_QUERY, {
variables: { handle: "virtual-mailbox", selectedOptions: [] },
}),
context.storefront.query<{ product: Product }>(PRODUCT_QUERY, {
variables: { handle: "virtual-phone-number", selectedOptions: [] },
}),
context.storefront.query<{ product: Product }>(PRODUCT_QUERY, {
variables: { handle: "business-accelerato", selectedOptions: [] },
}),
]);

if (!virtualMailbox?.product || !virtualPhone?.product || !BusinessAcc?.product) {
throw notFound();
}

return new Response(
JSON.stringify({
stripePublishableKey: env.VITE_STRIPE_PUBLISHABLE_KEY,
essentialsProducts: [virtualMailbox.product, virtualPhone.product, BusinessAcc.product],
cart,
}),
{ headers: { "Content-Type": "application/json" } }
);
};

export default function CheckoutPage() {
const { cart } = useLoaderData<typeof loader>();
const navigate = useNavigate();
const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
let currencyCode = selectedLocale?.currency || 'USD';

// Define visible attribute keys
const VISIBLE_ATTRIBUTES = [
"locationId",
"displayName",
"addressLine1",
"city",
"state",
"postalCode",
"country",
];

return (
<>
{/* Header */} <div className="top-6 border-b border-[#DCDCDC] w-full mx-auto flex items-center justify-center py-5 px-5 md:px-25 bg-white"> <img
       src="https://cdn.sanity.io/images/m5xb8z9y/production/6312d6eb4f994397153b67ef3043e166e1f574d4-101x50.svg"
       alt="Anytime Mailbox Logo"
       className="w-[101px]"
     /> </div>
  <div className="flex flex-col items-center justify-center bg-white py-10 sm:py-10 sm:px-5">
    {/* Success Icon */}
    <div className="">
      <div className="rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
          <g clipPath="url(#clip0_2232_18108)">
            <path
              d="M93.1115 93.1226C113.614 72.6201 113.614 39.3789 93.1115 18.8764C72.609 -1.62612 39.3678 -1.62612 18.8653 18.8764C-1.63723 39.3789 -1.63723 72.6201 18.8653 93.1226C39.3678 113.625 72.609 113.625 93.1115 93.1226Z"
              fill="#46CC6B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M107.745 64.9056C104.009 86.7631 86.7634 104.008 64.9066 107.744L36.6439 79.4809C29.8808 73.8995 25.5703 65.4529 25.5703 55.9994C25.5703 39.1931 39.1941 25.5693 56.0004 25.5693C65.4539 25.5693 73.9005 29.88 79.4819 36.6429L107.745 64.9056Z"
              fill="#179C5F"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M41.7567 57.8063L50.4232 65.7649C51.6873 66.9286 53.644 66.8667 54.8329 65.6408L70.294 50.8378C71.5516 49.6286 71.5896 47.6279 70.3799 46.3696C69.1702 45.1133 67.1707 45.074 65.9131 46.2832L52.5208 59.1057L46.0381 53.1528C44.7538 51.9711 42.7529 52.0541 41.5706 53.3396C40.3884 54.6239 40.4718 56.6235 41.7567 57.8063ZM56.0004 25.5693C72.8068 25.5693 86.4305 39.1931 86.4305 55.9994C86.4305 72.8058 72.8068 86.4295 56.0004 86.4295C39.1941 86.4295 25.5703 72.8058 25.5703 55.9994C25.5703 39.1931 39.1941 25.5693 56.0004 25.5693Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_2232_18108">
              <rect width="112" height="112" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>

    {/* Title */}
    <h1 className="text-[24px] md:text-[36px] font-[600] md:leading-[43.2px] md:tracking-[-0.54px] leading-[31.2px] tracking-[-0.36px] text-[#091019] text-center mb-7 mt-7 sm:mb-10">
      Payment Successful — You’re All Set!
    </h1>

    {/* Cart Layout */}
    {cart?.lines?.edges?.length > 0 && (
      <>
        {cart.lines.edges.map((edge: any) => {
          const line = edge.node;
          const variant = line.merchandise;
          const productTitle = variant?.product?.title || "Untitled Product";
          const price = line.cost?.totalAmount?.amount;
          const currency = line.cost?.totalAmount?.currencyCode;

          return (
            <div className="w-full max-w-[410px] border border-[#DCDCDC] rounded-xl shadow-sm p-6 mb-2 sm:mb-6">
            <div key={line.id} className="mb-6 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <mask id="path-1-inside-1_2285_18691" fill="white">
                      <path d="M11.9996 3.6001C11.9996 2.9376 12.5371 2.4001 13.1996 2.4001C13.8621 2.4001 14.3996 2.9376 14.3996 3.6001C14.3996 4.2626 13.8621 4.8001 13.1996 4.8001C12.5371 4.8001 11.9996 4.2626 11.9996 3.6001ZM15.1996 3.6001C15.1996 2.4951 14.3046 1.6001 13.1996 1.6001C12.0946 1.6001 11.1996 2.4951 11.1996 3.6001C11.1996 4.7051 12.0946 5.6001 13.1996 5.6001C14.3046 5.6001 15.1996 4.7051 15.1996 3.6001ZM14.3996 11.2001V6.5676C14.1471 6.6701 13.8796 6.7401 13.5996 6.7751V11.2001C13.5996 11.6426 13.2421 12.0001 12.7996 12.0001H3.19961C2.75711 12.0001 2.39961 11.6426 2.39961 11.2001V5.9901L6.81711 9.2301C7.52211 9.7451 8.47961 9.7451 9.18211 9.2301L12.5771 6.7401C12.2546 6.6776 11.9496 6.5651 11.6721 6.4126L8.70961 8.5826C8.28711 8.8926 7.71211 8.8926 7.28961 8.5826L2.66961 5.1951C2.49961 5.0701 2.39961 4.8726 2.39961 4.6626C2.39961 4.2976 2.69711 4.0001 3.06211 4.0001H10.0246C10.0071 3.8701 9.99961 3.7351 9.99961 3.6001C9.99961 3.4651 10.0071 3.3301 10.0246 3.2001H3.06211C2.27461 3.2001 1.63211 3.8226 1.60211 4.6001H1.59961V11.2001C1.59961 12.0826 2.31711 12.8001 3.19961 12.8001H12.7996C13.6821 12.8001 14.3996 12.0826 14.3996 11.2001Z"/>
                    </mask>
                    <path d="M11.9996 3.6001C11.9996 2.9376 12.5371 2.4001 13.1996 2.4001C13.8621 2.4001 14.3996 2.9376 14.3996 3.6001C14.3996 4.2626 13.8621 4.8001 13.1996 4.8001C12.5371 4.8001 11.9996 4.2626 11.9996 3.6001ZM15.1996 3.6001C15.1996 2.4951 14.3046 1.6001 13.1996 1.6001C12.0946 1.6001 11.1996 2.4951 11.1996 3.6001C11.1996 4.7051 12.0946 5.6001 13.1996 5.6001C14.3046 5.6001 15.1996 4.7051 15.1996 3.6001ZM14.3996 11.2001V6.5676C14.1471 6.6701 13.8796 6.7401 13.5996 6.7751V11.2001C13.5996 11.6426 13.2421 12.0001 12.7996 12.0001H3.19961C2.75711 12.0001 2.39961 11.6426 2.39961 11.2001V5.9901L6.81711 9.2301C7.52211 9.7451 8.47961 9.7451 9.18211 9.2301L12.5771 6.7401C12.2546 6.6776 11.9496 6.5651 11.6721 6.4126L8.70961 8.5826C8.28711 8.8926 7.71211 8.8926 7.28961 8.5826L2.66961 5.1951C2.49961 5.0701 2.39961 4.8726 2.39961 4.6626C2.39961 4.2976 2.69711 4.0001 3.06211 4.0001H10.0246C10.0071 3.8701 9.99961 3.7351 9.99961 3.6001C9.99961 3.4651 10.0071 3.3301 10.0246 3.2001H3.06211C2.27461 3.2001 1.63211 3.8226 1.60211 4.6001H1.59961V11.2001C1.59961 12.0826 2.31711 12.8001 3.19961 12.8001H12.7996C13.6821 12.8001 14.3996 12.0826 14.3996 11.2001Z" fill="#091019"/>
                    <path d="M14.3996 6.5676H15.5996V4.78536L13.9483 5.45572L14.3996 6.5676ZM13.5996 6.7751L13.4508 5.58436L12.3996 5.71576V6.7751H13.5996ZM2.39961 5.9901L3.10932 5.02246L1.19961 3.6218V5.9901H2.39961ZM6.81711 9.2301L6.1074 10.1977L6.10926 10.1991L6.81711 9.2301ZM9.18211 9.2301L9.8916 10.1979L9.89181 10.1977L9.18211 9.2301ZM12.5771 6.7401L13.2868 7.70774L15.5003 6.08428L12.8054 5.56202L12.5771 6.7401ZM11.6721 6.4126L12.25 5.36094L11.5799 4.99266L10.963 5.44452L11.6721 6.4126ZM8.70961 8.5826L8.0005 7.61452L7.99972 7.61509L8.70961 8.5826ZM7.28961 8.5826L7.99949 7.61509L7.99918 7.61486L7.28961 8.5826ZM2.66961 5.1951L1.95874 6.16188L1.96004 6.16283L2.66961 5.1951ZM10.0246 4.0001V5.2001H11.397L11.2139 3.84L10.0246 4.0001ZM10.0246 3.2001L11.2139 3.36019L11.397 2.0001H10.0246V3.2001ZM1.60211 4.6001V5.8001H2.7567L2.80122 4.64637L1.60211 4.6001ZM1.59961 4.6001V3.4001H0.399609V4.6001H1.59961ZM11.9996 3.6001H13.1996V3.6001V2.4001V1.2001C11.8744 1.2001 10.7996 2.27486 10.7996 3.6001H11.9996ZM13.1996 2.4001V3.6001V3.6001H14.3996H15.5996C15.5996 2.27486 14.5248 1.2001 13.1996 1.2001V2.4001ZM14.3996 3.6001H13.1996V3.6001V4.8001V6.0001C14.5248 6.0001 15.5996 4.92534 15.5996 3.6001H14.3996ZM13.1996 4.8001V3.6001V3.6001H11.9996H10.7996C10.7996 4.92534 11.8744 6.0001 13.1996 6.0001V4.8001ZM15.1996 3.6001H16.3996C16.3996 1.83236 14.9674 0.400098 13.1996 0.400098V1.6001V2.8001C13.6419 2.8001 13.9996 3.15784 13.9996 3.6001H15.1996ZM13.1996 1.6001V0.400098C11.4319 0.400098 9.99961 1.83236 9.99961 3.6001H11.1996H12.3996C12.3996 3.15784 12.7573 2.8001 13.1996 2.8001V1.6001ZM11.1996 3.6001H9.99961C9.99961 5.36784 11.4319 6.8001 13.1996 6.8001V5.6001V4.4001C12.7573 4.4001 12.3996 4.04236 12.3996 3.6001H11.1996ZM13.1996 5.6001V6.8001C14.9674 6.8001 16.3996 5.36784 16.3996 3.6001H15.1996H13.9996C13.9996 4.04236 13.6419 4.4001 13.1996 4.4001V5.6001ZM14.3996 11.2001H15.5996V6.5676H14.3996H13.1996V11.2001H14.3996ZM14.3996 6.5676L13.9483 5.45572C13.7937 5.51845 13.628 5.56221 13.4508 5.58436L13.5996 6.7751L13.7485 7.96583C14.1312 7.91798 14.5005 7.82174 14.851 7.67948L14.3996 6.5676ZM13.5996 6.7751H12.3996V11.2001H13.5996H14.7996V6.7751H13.5996ZM13.5996 11.2001H12.3996C12.3996 10.9799 12.5794 10.8001 12.7996 10.8001V12.0001V13.2001C13.9049 13.2001 14.7996 12.3053 14.7996 11.2001H13.5996ZM12.7996 12.0001V10.8001H3.19961V12.0001V13.2001H12.7996V12.0001ZM3.19961 12.0001V10.8001C3.41985 10.8001 3.59961 10.9799 3.59961 11.2001H2.39961H1.19961C1.19961 12.3053 2.09437 13.2001 3.19961 13.2001V12.0001ZM2.39961 11.2001H3.59961V5.9901H2.39961H1.19961V11.2001H2.39961ZM2.39961 5.9901L1.6899 6.95773L6.1074 10.1977L6.81711 9.2301L7.52682 8.26246L3.10932 5.02246L2.39961 5.9901ZM6.81711 9.2301L6.10926 10.1991C7.23515 11.0216 8.76602 11.023 9.8916 10.1979L9.18211 9.2301L8.47262 8.2623C8.1932 8.46715 7.80907 8.46864 7.52496 8.2611L6.81711 9.2301ZM9.18211 9.2301L9.89181 10.1977L13.2868 7.70774L12.5771 6.7401L11.8674 5.77246L8.47241 8.26246L9.18211 9.2301ZM12.5771 6.7401L12.8054 5.56202C12.6082 5.52379 12.4209 5.45481 12.25 5.36094L11.6721 6.4126L11.0942 7.46426C11.4784 7.67538 11.901 7.8314 12.3488 7.91818L12.5771 6.7401ZM11.6721 6.4126L10.963 5.44452L8.0005 7.61452L8.70961 8.5826L9.41871 9.55067L12.3812 7.38067L11.6721 6.4126ZM8.70961 8.5826L7.99972 7.61509H7.99949L7.28961 8.5826L6.57972 9.5501C7.42472 10.1701 8.5745 10.1701 9.41949 9.5501L8.70961 8.5826ZM7.28961 8.5826L7.99918 7.61486L3.37918 4.22736L2.66961 5.1951L1.96004 6.16283L6.58004 9.55033L7.28961 8.5826ZM2.66961 5.1951L3.38048 4.22832C3.51696 4.32867 3.59961 4.48958 3.59961 4.6626H2.39961H1.19961C1.19961 5.25561 1.48226 5.81153 1.95874 6.16188L2.66961 5.1951ZM2.39961 4.6626H3.59961C3.59961 4.96034 3.35985 5.2001 3.06211 5.2001V4.0001V2.8001C2.03437 2.8001 1.19961 3.63486 1.19961 4.6626H2.39961ZM3.06211 4.0001V5.2001H10.0246V4.0001V2.8001H3.06211V4.0001ZM10.0246 4.0001L11.2139 3.84C11.2048 3.77251 11.1996 3.69201 11.1996 3.6001H9.99961H8.79961C8.79961 3.77818 8.80942 3.96768 8.83534 4.16019L10.0246 4.0001ZM9.99961 3.6001H11.1996C11.1996 3.50818 11.2048 3.42768 11.2139 3.36019L10.0246 3.2001L8.83534 3.04C8.80942 3.23251 8.79961 3.42201 8.79961 3.6001H9.99961ZM10.0246 3.2001V2.0001H3.06211V3.2001V4.4001H10.0246V3.2001ZM3.06211 3.2001V2.0001C1.63011 2.0001 0.45787 3.13183 0.403002 4.55383L1.60211 4.6001L2.80122 4.64637C2.80635 4.51337 2.91911 4.4001 3.06211 4.4001V3.2001ZM1.60211 4.6001V3.4001H1.59961V4.6001V5.8001H1.60211V4.6001ZM1.59961 4.6001H0.399609V11.2001H1.59961H2.79961V4.6001H1.59961ZM1.59961 11.2001H0.399609C0.399609 12.7453 1.65437 14.0001 3.19961 14.0001V12.8001V11.6001C2.97985 11.6001 2.79961 11.4199 2.79961 11.2001H1.59961ZM3.19961 12.8001V14.0001H12.7996V12.8001V11.6001H3.19961V12.8001ZM12.7996 12.8001V14.0001C14.3449 14.0001 15.5996 12.7453 15.5996 11.2001H14.3996H13.1996C13.1996 11.4199 13.0194 11.6001 12.7996 11.6001V12.8001Z" fill="white" mask="url(#path-1-inside-1_2285_18691)"/>
                  </svg>
                </div>
                <h2 className="text-[18px] font-[500] text-[#091019] leading-[27px]">{productTitle}</h2>
              </div>
          
              {/* Plan title + price on same line */}
              <div className="flex justify-between items-center">
                <div className="font-Roboto text-[14px] font-[400] text-[#091019] leading-[21px] mb-2">
                  {variant.title} Plan
                </div>
                <div className="text-[16px] font-[500] text-[#171717] leading-[24px]">
                  {currencyCode} {price}{" "}
                  <span className="text-[16px] font-[500] text-[#4D4E4F] leading-[24px]">/ month</span>
                </div>
              </div>
          
              {/* Filtered attributes display */}
              {line.attributes?.length > 0 && (
                <div className="flex gap-5 justify-between">
                  <div>
                    {line.attributes
                      .filter((attr: any) => VISIBLE_ATTRIBUTES.includes(attr.key))
                      .map((attr: any, index: number) => (
                        <p
                          key={attr.key}
                          className={`font-Roboto tracking-[0px] ${
                            index === 0
                              ? "font-[500] text-[18px] text-[#4D4E4F] leading-[27px] mb-1"
                              : "font-[400] text-[#4D4E4F] text-[18px] leading-[27px]"
                          }`}
                        >
                          {attr.value}
                        </p>
                      ))}
                  </div>
                </div>
              )}
            </div>
            </div>
          );
        })}
      </>
    )}

    {/* Continue Button */}
        <button
        aria-label="Continue"
        title="Continue"
      onClick={async () => {
        try {
          await fetch("/api/clear-cart", { method: "POST" });
          await fetch("/api/clear-customer-metafields", { method: "POST" });
          localStorage.removeItem("checkoutCart");
          navigate("/");
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      }}
      className="px-4 py-3 max-w-[236px] w-full border border-gray-400 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition"
    >
      Continue
    </button>

  </div>
</>
);
}
