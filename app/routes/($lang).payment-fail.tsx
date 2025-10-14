import { loadStripe } from "@stripe/stripe-js";
import {Await, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root'; 
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect,useState } from "react";
import type { LoaderFunction } from "@remix-run/node";

import {
  redirect,
} from '@shopify/remix-oxygen';
import {
  Money,
} from '@shopify/hydrogen-react';
import CartBundleSection from '~/components/cart/CartBundleSection';
import CartEssentialsSection from '~/components/cart/CartEssentialsSection';
import {
  CartActions,
  CartLineItems,
  CartSummary,
} from '~/components/cart/Cart';
import SpinnerIcon from "~/components/icons/Spinner";
import {PRODUCT_QUERY, ALL_PRODUCTS_QUERY} from '~/queries/shopify/product';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {notFound} from '~/lib/utils';
import Button from "~/components/elements/Button";

export const loader: LoaderFunction = async ({ context, params }) => {
  const { env } = context;
  const cart = await context.cart.get();
  
  const customerAccessToken = await context.session.get('customerAccessToken');
  
  if (customerAccessToken === null || customerAccessToken === undefined || customerAccessToken === '') {
    return redirect('/create-account');
  }

  const [virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'virtual-mailbox', selectedOptions: []},
      }),
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'virtual-phone-number', selectedOptions: []},
      }),
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'business-accelerato', selectedOptions: []},
      }),
      // context.storefront.query(ALL_PRODUCTS_QUERY, {
      //   variables: {first: 50}, 
      // }),
      
    ]);
  
    if (!virtualMailbox?.product || !virtualPhone?.product || !BusinessAcc?.product) {
      throw notFound();
    }
   // Combine them into an array
  const AllProducts = [
    virtualMailbox.product,
    virtualPhone.product,
    BusinessAcc.product,
  ];

  return new Response(
    JSON.stringify({
      stripePublishableKey: env.VITE_STRIPE_PUBLISHABLE_KEY,
      bundleProducts: [virtualMailbox.product, virtualPhone.product],
      essentialsProducts: AllProducts ?? [],
      cart
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};


export default function CheckoutPage() {
  const rootData = useRootLoaderData();
  const { bundleProducts, essentialsProducts, cart} = useLoaderData<typeof loader>();
  console.log('cartsss', cart);
  return (
    <>
    <div className=" top-6 border-b border-[#DCDCDC] w-full mx-auto flex items-center justify-center py-4 px-6 md:px-12 lg:px-24 bg-white">
        <img
          src="https://cdn.sanity.io/images/m5xb8z9y/production/6312d6eb4f994397153b67ef3043e166e1f574d4-101x50.svg"
          alt="Anytime Mailbox Logo"
          className="w-[101px]"
        />
    </div>
   <div className="flex flex-col items-center text-center justify-center bg-white">
      {/* Success Icon */}
      <div className="mt-20 md:mt-10 mb-6">
        <div className="rounded-full p-4">
        <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3650_73970)">
        <path d="M93.1115 93.1226C113.614 72.6201 113.614 39.3789 93.1115 18.8764C72.609 -1.62612 39.3678 -1.62612 18.8653 18.8764C-1.63723 39.3789 -1.63723 72.6201 18.8653 93.1226C39.3678 113.625 72.609 113.625 93.1115 93.1226Z" fill="#FF2E32"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M107.745 64.9056C104.009 86.7631 86.7634 104.008 64.9066 107.744L36.6439 79.4809C29.8808 73.8995 25.5703 65.4529 25.5703 55.9994C25.5703 39.1931 39.1941 25.5693 56.0004 25.5693C65.4539 25.5693 73.9005 29.88 79.4819 36.6429L107.745 64.9056Z" fill="#E8161A"/>
        <circle cx="56" cy="55.9995" r="30" fill="white"/>
        <g clip-path="url(#clip1_3650_73970)">
        <path d="M56 72C51.7565 72 47.6869 70.3143 44.6863 67.3137C41.6857 64.3131 40 60.2435 40 56C40 51.7565 41.6857 47.6869 44.6863 44.6863C47.6869 41.6857 51.7565 40 56 40C60.2435 40 64.3131 41.6857 67.3137 44.6863C70.3143 47.6869 72 51.7565 72 56C72 60.2435 70.3143 64.3131 67.3137 67.3137C64.3131 70.3143 60.2435 72 56 72ZM56 43C52.5522 43 49.2456 44.3696 46.8076 46.8076C44.3696 49.2456 43 52.5522 43 56C43 59.4478 44.3696 62.7544 46.8076 65.1924C49.2456 67.6304 52.5522 69 56 69C59.4478 69 62.7544 67.6304 65.1924 65.1924C67.6304 62.7544 69 59.4478 69 56C69 52.5522 67.6304 49.2456 65.1924 46.8076C62.7544 44.3696 59.4478 43 56 43ZM56 64C55.4696 64 54.9609 63.7893 54.5858 63.4142C54.2107 63.0391 54 62.5304 54 62C54 61.4696 54.2107 60.9609 54.5858 60.5858C54.9609 60.2107 55.4696 60 56 60C56.5304 60 57.0391 60.2107 57.4142 60.5858C57.7893 60.9609 58 61.4696 58 62C58 62.5304 57.7893 63.0391 57.4142 63.4142C57.0391 63.7893 56.5304 64 56 64ZM56 48C57.1375 48 58.0437 48.9688 57.9625 50.1062L57.5 56.6063C57.4438 57.3938 56.7875 58 56.0063 58C55.2188 58 54.5687 57.3938 54.5125 56.6063L54.05 50.1062C53.9563 48.9688 54.8625 48 56 48Z" fill="#FF2E32"/>
        </g>
        </g>
        <defs>
        <clipPath id="clip0_3650_73970">
        <rect width="112" height="112" fill="white"/>
        </clipPath>
        <clipPath id="clip1_3650_73970">
        <rect width="32" height="32" fill="white" transform="translate(40 40)"/>
        </clipPath>
        </defs>
        </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
      Payment Failed!<br className="hidden md:block" /> 
      </h1>
      <p className="text-[18px] font-[400]">Your card was declined due to invalid details. <br/>Please review your card information and try again</p>

      {/* Card */}
      <div className="w-full max-w-md border border-gray-200 rounded-xl shadow-sm p-5 mb-8 mt-9">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Transaction details</h2>
          <p className="font-medium">TXN127358GSJY&9</p>
        </div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Date & Time</h2>
          <p className="font-medium">22 Sept, 2025 10:40 AM</p>
        </div>
        
      </div>

      {/* Continue Button */}
     <div className="flex gap-9">
        <button className="px-10 py-3 border border-gray-400 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition">
            Go Back to Checkout
        </button>
        <button className="bg-[#FF6600] px-10 py-3 rounded-full text-[#ffffff] font-medium hover:bg-gray-100 transition">
            Try Again
        </button>
     </div>
    </div>
    </>
  );
}
