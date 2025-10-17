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
   <div className="flex flex-col items-center justify-center bg-white">

      {/* Success Icon */}
      <div className="mt-20 md:mt-24 mb-6">
        <div className="rounded-full p-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
        <g clip-path="url(#clip0_2232_18108)">
            <path d="M93.1115 93.1226C113.614 72.6201 113.614 39.3789 93.1115 18.8764C72.609 -1.62612 39.3678 -1.62612 18.8653 18.8764C-1.63723 39.3789 -1.63723 72.6201 18.8653 93.1226C39.3678 113.625 72.609 113.625 93.1115 93.1226Z" fill="#46CC6B"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M107.745 64.9056C104.009 86.7631 86.7634 104.008 64.9066 107.744L36.6439 79.4809C29.8808 73.8995 25.5703 65.4529 25.5703 55.9994C25.5703 39.1931 39.1941 25.5693 56.0004 25.5693C65.4539 25.5693 73.9005 29.88 79.4819 36.6429L107.745 64.9056Z" fill="#179C5F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.7567 57.8063L50.4232 65.7649C51.6873 66.9286 53.644 66.8667 54.8329 65.6408L70.294 50.8378C71.5516 49.6286 71.5896 47.6279 70.3799 46.3696C69.1702 45.1133 67.1707 45.074 65.9131 46.2832L52.5208 59.1057L46.0381 53.1528C44.7538 51.9711 42.7529 52.0541 41.5706 53.3396C40.3884 54.6239 40.4718 56.6235 41.7567 57.8063ZM56.0004 25.5693C72.8068 25.5693 86.4305 39.1931 86.4305 55.9994C86.4305 72.8058 72.8068 86.4295 56.0004 86.4295C39.1941 86.4295 25.5703 72.8058 25.5703 55.9994C25.5703 39.1931 39.1941 25.5693 56.0004 25.5693Z" fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0_2232_18108">
            <rect width="112" height="112" fill="white"/>
            </clipPath>
        </defs>
        </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-[36px] font-bold text-gray-900 text-center mb-8">
        Payment Successful You’re All Set!
      </h1>

      {/* Card */}
      <div className="w-full max-w-md border border-gray-200 rounded-xl shadow-sm p-5 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500 text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V5a2 2 0 012-2h4a2 2 0 012 2v16m-8 0h-4a2 2 0 01-2-2V5"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Virtual Mailbox</h2>
        </div>

        <div className="flex justify-between items-center text-gray-700 mb-2">
          <p className="text-sm">Silver Plan</p>
          <p className="font-medium">$19.99<span className="text-sm text-gray-500">/month</span></p>
        </div>

        <p className="font-semibold text-gray-800">Anaheim - Ball Rd</p>
        <p className="text-gray-600 text-sm">
          1720 W Ball Rd Anaheim, CA 92804,<br />
          United States
        </p>
      </div>

      {/* Continue Button */}
      <button className="px-10 py-3 border border-gray-400 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition">
        Continue
      </button>
    </div>
    </>
  );
}
