import {CartForm} from '@shopify/hydrogen';
import type {
  Cart,
  CartCost,
  CartLine,
  CartLineUpdateInput,
  ComponentizableCartLine,
} from '@shopify/hydrogen/storefront-api-types';
import {
  flattenConnection,
  Image,
  Money,
  ShopPayButton,
} from '@shopify/hydrogen-react';
import clsx from 'clsx';

import Button, {defaultButtonStyles} from '~/components/elements/Button';
import MinusCircleIcon from '~/components/icons/MinusCircle';
import PlusCircleIcon from '~/components/icons/PlusCircle';
import RemoveIcon from '~/components/icons/Remove';
import SpinnerIcon from '~/components/icons/Spinner';
import {Link} from '~/components/Link';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import {useRootLoaderData} from '~/root';
import ChangePlanButton from './ChangePlanButton';
import { usePrefixPathWithLocale } from '~/lib/utils';
export function CartLineItems({
  linesObj,
}: {
  linesObj: Cart['lines'] | undefined;
}) {
  const lines = flattenConnection(linesObj);
  return (
    <div className="flex flex-col gap-4" role="table" aria-label="Shopping cart">
      <div role="row" className="sr-only hidden">
        <div role="columnheader">Product image</div>
        <div role="columnheader">Product details</div>
        <div role="columnheader">Price</div>
      </div>
      {lines.map((line) => {
        return <LineItem key={line.id} lineItem={line} />;
      })}
    </div>
  );
}

function LineItem({lineItem}: {lineItem: CartLine | ComponentizableCartLine}) {
  const {merchandise, attributes} = lineItem;

  const updatingItems = useCartFetchers(CartForm.ACTIONS.LinesUpdate);
  const removingItems = useCartFetchers(CartForm.ACTIONS.LinesRemove);

  // Check if the line item is being updated, as we want to show the new quantity as optimistic UI
  let updatingQty;
  const updating =
    updatingItems?.find((fetcher) => {
      const formData = fetcher?.formData;

      if (formData) {
        const formInputs = CartForm.getFormInput(formData);
        return (
          Array.isArray(formInputs?.inputs?.lines) &&
          formInputs?.inputs?.lines?.find((line: CartLineUpdateInput) => {
            updatingQty = line.quantity;
            return line.id === lineItem.id;
          })
        );
      }
    }) && updatingQty;

  // Check if the line item is being removed, as we want to show the line item as being deleted
  const deleting = removingItems.find((fetcher) => {
    const formData = fetcher?.formData;
    if (formData) {
      const formInputs = CartForm.getFormInput(formData);
      return (
        Array.isArray(formInputs?.inputs?.lineIds) &&
        formInputs?.inputs?.lineIds?.find(
          (lineId: CartLineUpdateInput['id']) => lineId === lineItem.id,
        )
      );
    }
  });

  const firstVariant = merchandise.selectedOptions[0];
  const hasDefaultVariantOnly =
    firstVariant.name === 'Title' && firstVariant.value === 'Default Title';
    const VISIBLE_ATTRIBUTES = [
      'locationId',
      'displayName',
      'addressLine1',
      'city',
      'state',
      'postalCode',
      'country',
    ];

  return (
    <div
      role="row"
      className={clsx(
        'flex flex-col p-6 border border-LightWhite rounded-[12px]',
        deleting && 'opacity-50',
      )}
    >
      {/* Image */}
      <div role="cell" className="mr-3 aspect-square w-[66px] flex-shrink-0 hidden">
        {merchandise.image && (
          <Link to={`/products/${merchandise.product.handle}`}>
            <Image
              className="rounded"
              data={merchandise.image}
              width={110}
              height={110}
              alt={merchandise.title}
            />
          </Link>
        )}
      </div>

      {/* Title */}
      <div
        role="cell"
        className="flex-grow-1 flex w-full flex-col items-start">
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-[16px]'>
          <div className='flex flex-row items-center gap-3'>
            <span className='flex items-center justify-center w-8 h-8 bg-DarkOrange rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <mask id="path-1-inside-1_1393_28172" fill="white">
                  <path d="M12.0016 3.6001C12.0016 2.9376 12.5391 2.4001 13.2016 2.4001C13.8641 2.4001 14.4016 2.9376 14.4016 3.6001C14.4016 4.2626 13.8641 4.8001 13.2016 4.8001C12.5391 4.8001 12.0016 4.2626 12.0016 3.6001ZM15.2016 3.6001C15.2016 2.4951 14.3066 1.6001 13.2016 1.6001C12.0966 1.6001 11.2016 2.4951 11.2016 3.6001C11.2016 4.7051 12.0966 5.6001 13.2016 5.6001C14.3066 5.6001 15.2016 4.7051 15.2016 3.6001ZM14.4016 11.2001V6.5676C14.1491 6.6701 13.8816 6.7401 13.6016 6.7751V11.2001C13.6016 11.6426 13.2441 12.0001 12.8016 12.0001H3.20156C2.75906 12.0001 2.40156 11.6426 2.40156 11.2001V5.9901L6.81906 9.2301C7.52406 9.7451 8.48156 9.7451 9.18406 9.2301L12.5791 6.7401C12.2566 6.6776 11.9516 6.5651 11.6741 6.4126L8.71156 8.5826C8.28906 8.8926 7.71406 8.8926 7.29156 8.5826L2.67156 5.1951C2.50156 5.0701 2.40156 4.8726 2.40156 4.6626C2.40156 4.2976 2.69906 4.0001 3.06406 4.0001H10.0266C10.0091 3.8701 10.0016 3.7351 10.0016 3.6001C10.0016 3.4651 10.0091 3.3301 10.0266 3.2001H3.06406C2.27656 3.2001 1.63406 3.8226 1.60406 4.6001H1.60156V11.2001C1.60156 12.0826 2.31906 12.8001 3.20156 12.8001H12.8016C13.6841 12.8001 14.4016 12.0826 14.4016 11.2001Z"/>
                </mask>
                <path d="M12.0016 3.6001C12.0016 2.9376 12.5391 2.4001 13.2016 2.4001C13.8641 2.4001 14.4016 2.9376 14.4016 3.6001C14.4016 4.2626 13.8641 4.8001 13.2016 4.8001C12.5391 4.8001 12.0016 4.2626 12.0016 3.6001ZM15.2016 3.6001C15.2016 2.4951 14.3066 1.6001 13.2016 1.6001C12.0966 1.6001 11.2016 2.4951 11.2016 3.6001C11.2016 4.7051 12.0966 5.6001 13.2016 5.6001C14.3066 5.6001 15.2016 4.7051 15.2016 3.6001ZM14.4016 11.2001V6.5676C14.1491 6.6701 13.8816 6.7401 13.6016 6.7751V11.2001C13.6016 11.6426 13.2441 12.0001 12.8016 12.0001H3.20156C2.75906 12.0001 2.40156 11.6426 2.40156 11.2001V5.9901L6.81906 9.2301C7.52406 9.7451 8.48156 9.7451 9.18406 9.2301L12.5791 6.7401C12.2566 6.6776 11.9516 6.5651 11.6741 6.4126L8.71156 8.5826C8.28906 8.8926 7.71406 8.8926 7.29156 8.5826L2.67156 5.1951C2.50156 5.0701 2.40156 4.8726 2.40156 4.6626C2.40156 4.2976 2.69906 4.0001 3.06406 4.0001H10.0266C10.0091 3.8701 10.0016 3.7351 10.0016 3.6001C10.0016 3.4651 10.0091 3.3301 10.0266 3.2001H3.06406C2.27656 3.2001 1.63406 3.8226 1.60406 4.6001H1.60156V11.2001C1.60156 12.0826 2.31906 12.8001 3.20156 12.8001H12.8016C13.6841 12.8001 14.4016 12.0826 14.4016 11.2001Z" fill="#091019"/>
                <path d="M14.4016 6.5676H15.6016V4.78536L13.9502 5.45572L14.4016 6.5676ZM13.6016 6.7751L13.4527 5.58436L12.4016 5.71576V6.7751H13.6016ZM2.40156 5.9901L3.11127 5.02246L1.20156 3.6218V5.9901H2.40156ZM6.81906 9.2301L6.10935 10.1977L6.11122 10.1991L6.81906 9.2301ZM9.18406 9.2301L9.89355 10.1979L9.89376 10.1977L9.18406 9.2301ZM12.5791 6.7401L13.2888 7.70774L15.5023 6.08428L12.8074 5.56202L12.5791 6.7401ZM11.6741 6.4126L12.252 5.36094L11.5818 4.99266L10.965 5.44452L11.6741 6.4126ZM8.71156 8.5826L8.00246 7.61452L8.00168 7.61509L8.71156 8.5826ZM7.29156 8.5826L8.00145 7.61509L8.00113 7.61486L7.29156 8.5826ZM2.67156 5.1951L1.96069 6.16188L1.96199 6.16283L2.67156 5.1951ZM10.0266 4.0001V5.2001H11.3989L11.2158 3.84L10.0266 4.0001ZM10.0266 3.2001L11.2158 3.36019L11.3989 2.0001H10.0266V3.2001ZM1.60406 4.6001V5.8001H2.75865L2.80317 4.64637L1.60406 4.6001ZM1.60156 4.6001V3.4001H0.401562V4.6001H1.60156ZM12.0016 3.6001H13.2016V3.6001V2.4001V1.2001C11.8763 1.2001 10.8016 2.27486 10.8016 3.6001H12.0016ZM13.2016 2.4001V3.6001V3.6001H14.4016H15.6016C15.6016 2.27486 14.5268 1.2001 13.2016 1.2001V2.4001ZM14.4016 3.6001H13.2016V3.6001V4.8001V6.0001C14.5268 6.0001 15.6016 4.92534 15.6016 3.6001H14.4016ZM13.2016 4.8001V3.6001V3.6001H12.0016H10.8016C10.8016 4.92534 11.8763 6.0001 13.2016 6.0001V4.8001ZM15.2016 3.6001H16.4016C16.4016 1.83236 14.9693 0.400098 13.2016 0.400098V1.6001V2.8001C13.6438 2.8001 14.0016 3.15784 14.0016 3.6001H15.2016ZM13.2016 1.6001V0.400098C11.4338 0.400098 10.0016 1.83236 10.0016 3.6001H11.2016H12.4016C12.4016 3.15784 12.7593 2.8001 13.2016 2.8001V1.6001ZM11.2016 3.6001H10.0016C10.0016 5.36784 11.4338 6.8001 13.2016 6.8001V5.6001V4.4001C12.7593 4.4001 12.4016 4.04236 12.4016 3.6001H11.2016ZM13.2016 5.6001V6.8001C14.9693 6.8001 16.4016 5.36784 16.4016 3.6001H15.2016H14.0016C14.0016 4.04236 13.6438 4.4001 13.2016 4.4001V5.6001ZM14.4016 11.2001H15.6016V6.5676H14.4016H13.2016V11.2001H14.4016ZM14.4016 6.5676L13.9502 5.45572C13.7957 5.51845 13.6299 5.56221 13.4527 5.58436L13.6016 6.7751L13.7504 7.96583C14.1332 7.91798 14.5025 7.82174 14.8529 7.67948L14.4016 6.5676ZM13.6016 6.7751H12.4016V11.2001H13.6016H14.8016V6.7751H13.6016ZM13.6016 11.2001H12.4016C12.4016 10.9799 12.5813 10.8001 12.8016 10.8001V12.0001V13.2001C13.9068 13.2001 14.8016 12.3053 14.8016 11.2001H13.6016ZM12.8016 12.0001V10.8001H3.20156V12.0001V13.2001H12.8016V12.0001ZM3.20156 12.0001V10.8001C3.4218 10.8001 3.60156 10.9799 3.60156 11.2001H2.40156H1.20156C1.20156 12.3053 2.09632 13.2001 3.20156 13.2001V12.0001ZM2.40156 11.2001H3.60156V5.9901H2.40156H1.20156V11.2001H2.40156ZM2.40156 5.9901L1.69185 6.95773L6.10935 10.1977L6.81906 9.2301L7.52877 8.26246L3.11127 5.02246L2.40156 5.9901ZM6.81906 9.2301L6.11122 10.1991C7.2371 11.0216 8.76797 11.023 9.89355 10.1979L9.18406 9.2301L8.47457 8.2623C8.19515 8.46715 7.81102 8.46864 7.52691 8.2611L6.81906 9.2301ZM9.18406 9.2301L9.89376 10.1977L13.2888 7.70774L12.5791 6.7401L11.8694 5.77246L8.47436 8.26246L9.18406 9.2301ZM12.5791 6.7401L12.8074 5.56202C12.6101 5.52379 12.4228 5.45481 12.252 5.36094L11.6741 6.4126L11.0961 7.46426C11.4803 7.67538 11.903 7.8314 12.3508 7.91818L12.5791 6.7401ZM11.6741 6.4126L10.965 5.44452L8.00246 7.61452L8.71156 8.5826L9.42067 9.55067L12.3832 7.38067L11.6741 6.4126ZM8.71156 8.5826L8.00168 7.61509H8.00145L7.29156 8.5826L6.58168 9.5501C7.42667 10.1701 8.57645 10.1701 9.42145 9.5501L8.71156 8.5826ZM7.29156 8.5826L8.00113 7.61486L3.38113 4.22736L2.67156 5.1951L1.96199 6.16283L6.58199 9.55033L7.29156 8.5826ZM2.67156 5.1951L3.38243 4.22832C3.51891 4.32867 3.60156 4.48958 3.60156 4.6626H2.40156H1.20156C1.20156 5.25561 1.48421 5.81153 1.96069 6.16188L2.67156 5.1951ZM2.40156 4.6626H3.60156C3.60156 4.96034 3.3618 5.2001 3.06406 5.2001V4.0001V2.8001C2.03632 2.8001 1.20156 3.63486 1.20156 4.6626H2.40156ZM3.06406 4.0001V5.2001H10.0266V4.0001V2.8001H3.06406V4.0001ZM10.0266 4.0001L11.2158 3.84C11.2067 3.77251 11.2016 3.69201 11.2016 3.6001H10.0016H8.80156C8.80156 3.77818 8.81137 3.96768 8.83729 4.16019L10.0266 4.0001ZM10.0016 3.6001H11.2016C11.2016 3.50818 11.2067 3.42768 11.2158 3.36019L10.0266 3.2001L8.83729 3.04C8.81137 3.23251 8.80156 3.42201 8.80156 3.6001H10.0016ZM10.0266 3.2001V2.0001H3.06406V3.2001V4.4001H10.0266V3.2001ZM3.06406 3.2001V2.0001C1.63206 2.0001 0.459823 3.13183 0.404955 4.55383L1.60406 4.6001L2.80317 4.64637C2.8083 4.51337 2.92106 4.4001 3.06406 4.4001V3.2001ZM1.60406 4.6001V3.4001H1.60156V4.6001V5.8001H1.60406V4.6001ZM1.60156 4.6001H0.401562V11.2001H1.60156H2.80156V4.6001H1.60156ZM1.60156 11.2001H0.401562C0.401562 12.7453 1.65632 14.0001 3.20156 14.0001V12.8001V11.6001C2.9818 11.6001 2.80156 11.4199 2.80156 11.2001H1.60156ZM3.20156 12.8001V14.0001H12.8016V12.8001V11.6001H3.20156V12.8001ZM12.8016 12.8001V14.0001C14.3468 14.0001 15.6016 12.7453 15.6016 11.2001H14.4016H13.2016C13.2016 11.4199 13.0213 11.6001 12.8016 11.6001V12.8001Z" fill="white" mask="url(#path-1-inside-1_1393_28172)"/>
              </svg>
            </span>
        {(merchandise.product.handle==='virtual-mailbox')? <Link
        to={`/PDP/${merchandise.product.handle}?locationId=${attributes?.find(attr => attr.key === 'locationId')?.value}`}
        className="font-Roboto text-LightGray font-medium leading-[27px] text-[18px] tracking-[0px]"
      >
        {merchandise.product.title}
        </Link>
        :<Link
        to={`/PDP/${merchandise.product.handle}`}
        className="font-Roboto text-LightGray font-medium leading-[27px] text-[18px] tracking-[0px]"
        >
        {merchandise.product.title}
        </Link>
      }
      </div>

      <div className="flex font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">
        {updating ? (
          <SpinnerIcon width={24} height={24} />
        ) : (
          <Money data={lineItem.cost.totalAmount} />
        )} <span className='font-Roboto text-LightGray font-normal leading-[27px] text-[18px] tracking-[0px]'>/month</span>
      </div>
      </div>  

        {/* <Link
          to={`/products/${merchandise.product.handle}`}
          className="text-sm font-bold hover:underline"
        >
          {merchandise.product.title}
        </Link> */}

        {/* Options */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end w-full'>
          <div>
        {!hasDefaultVariantOnly && (
          <ul className="mt-4 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
            {merchandise.selectedOptions.map(({name, value}) => (
              <li key={name}>
                {name}: {value}
              </li>
            ))}
          </ul>
        )}
          {attributes?.length > 0 && (
      <div className="mt-2 ">
    {attributes
     .filter((attr) => VISIBLE_ATTRIBUTES.includes(attr.key))
      .map((attr) => (
        <p key={attr.key} className='font-Roboto text-LightGray font-normal leading-[24px] text-[16px] tracking-[0px]'>
           {attr.value}
        </p>
      ))}
       

  </div>
  
)}
 
      </div>
      <div className='flex flex-row gap-2 items-center justify-center mt-[16px] md:mt-[0px]'>
        <Link
          to={`/sublocations`}
          className="p-2 font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px] md:tracking-[0.07px]
                      underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto"
        >
         Change Location
        </Link>
        {/* {(merchandise.product.handle==='virtual-mailbox')? <Link
        to={`/PDP/${merchandise.product.handle}?locationId=${attributes?.find(attr => attr.key === 'locationId')?.value}`}
        className="p-2 p-2 font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px] md:tracking-[0.07px]
                      underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto"
      >
        Change Plan
            </Link>
      :<Link
      to={`/PDP/${merchandise.product.handle}`}
      className="p-2 p-2 font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px] md:tracking-[0.07px]
                      underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto"
      >
      Change Plan
      </Link>
      } */}
      <ChangePlanButton
        lineId={lineItem.id}
        productHandle={merchandise.product.handle}
        locationId={attributes?.find(attr => attr.key === 'locationId')?.value ?? undefined}
       />
            
      
            {/* Quantity */}
            {/* <CartItemQuantity line={lineItem} submissionQuantity={updating} /> */}
      
            {/* Price */}
            <div className="flex  font-Roboto text-PrimaryBlack font-medium leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px] md:tracking-[0.07px]">
              {updating ? (
                <SpinnerIcon width={24} height={24} />
              ) : (
                <Money data={lineItem.cost.totalAmount} />
              )}
            </div>
      <div role="cell" className="flex flex-col items-end justify-between">
        <ItemRemoveButton lineIds={[lineItem.id]} />
      </div>
      </div>
      </div>
      </div>

      </div>


  );
}

function CartItemQuantity({
  line,
  submissionQuantity,
}: {
  line: CartLine | ComponentizableCartLine;
  submissionQuantity: number | undefined;
}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;

  // // The below handles optimistic updates for the quantity
  const lineQuantity = submissionQuantity ? submissionQuantity : quantity;

  const prevQuantity = Number(Math.max(0, lineQuantity - 1).toFixed(0));
  const nextQuantity = Number((lineQuantity + 1).toFixed(0));

  return (
    <div className="flex items-center gap-2">
      <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          value={prevQuantity}
          disabled={quantity <= 1}
        >
          <MinusCircleIcon />
        </button>
      </UpdateCartButton>

      <div className="min-w-[1rem] text-center text-sm font-bold leading-none text-black">
        {lineQuantity}
      </div>

      <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button aria-label="Increase quantity" value={prevQuantity}>
          <PlusCircleIcon />
        </button>
      </UpdateCartButton>
    </div>
  );
}

function UpdateCartButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route={usePrefixPathWithLocale('/cart')}
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function ItemRemoveButton({lineIds}: {lineIds: CartLine['id'][]}) {
  return (
    <CartForm
      route={usePrefixPathWithLocale('/cart')}
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        className="disabled:pointer-events-all disabled:cursor-wait"
        type="submit"
      >
        <RemoveIcon />
      </button>
    </CartForm>
  );
}

export function CartSummary({cart,cost}: {cart: Cart,cost: CartCost}) {
  const lines = flattenConnection(cart.lines);
  const VISIBLE_ATTRIBUTES = [
     'locationId',
    'displayName',
    'addressLine1',
    'city',
    'state',
    'postalCode',
    'country',
  ];
  return (
    <>
      <div role="table" aria-label="Cost summary" className="p-6 border border-LightWhite rounded-[12px]">
      <h2 className='mb-6 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.6px] md:tracking-[-0.36px]'>Order Summary</h2>
      {lines.map((line, index) => (
        <div
          key={line?.id}
          className={`flex flex-col border-b border-LightWhite pb-6 mb-6 
            ${index === lines.length - 1 ? 'border-b-0 pb-0 mb-0' : ''}`}
        >
      
          <div className="flex justify-between mb-4">
            <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">{line.merchandise.product.title}</span>
            
          </div>

          {/* ✅ Show selective attributes */}
          <div className='flex  gap-5 justify-between'>
            {line.attributes?.length > 0 && (
              <div className="">
                <div className="font-Roboto text-[#091019] font-[400] leading-[21px] text-[14px] mb-2">{line.merchandise.title} Plan</div>
                {line.attributes
                .filter((attr) => VISIBLE_ATTRIBUTES.includes(attr.key))
                .map((attr, index) => (
                  <p
                    key={attr.key}
                    className={`font-Roboto  tracking-[0px] 
                      ${index === 0 ? 'font-semibold text-[18px] text-[#091019] leading-[27px] mb-1' : 'font-normal text-[#4D4E4F] text-[16px] leading-[24px]'}`}
                  >
                    <span className={index === 0 ? 'font-semibold' : 'font-normal'}>
                    </span>{' '}
                    {attr.value}
                  </p>
                ))}

              </div>
            )}
            <div>
              <span className="font-Roboto text-[#171717] font-medium leading-[24px] text-[16px] tracking-[0px]">
              <Money data={line.cost.totalAmount} />
            </span>
            </div>
          </div>
        </div>
      ))}

        <div className='p-4 border border-LightWhite bg-[#F6F6F6] rounded-[12px]'>
        <div
          className="flex justify-between"role="row">
          <span className="font-Roboto text-[#262626] font-normal leading-[24px] text-[16px] tracking-[0px]" role="rowheader">
            Subtotal
          </span>
          <span role="cell" className="font-Roboto text-[#262626] font-normal leading-[24px] text-[16px] tracking-[0px]">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </span>
        </div>
        <div
          className="flex justify-between mt-3"role="row">
          <span className="font-Roboto text-[#262626] font-normal leading-[24px] text-[16px] tracking-[0px]" role="rowheader">
            Taxes & Fees
          </span>
          <span role="cell" className="font-Roboto text-[#262626] font-normal leading-[24px] text-[16px] tracking-[0px]">
            $0.00
          </span>
        </div>

        <div role="row"className="flex gap-3 justify-between border-t border-LightWhite pt-3 mt-3">
          <span className="font-Roboto text-[#262626] font-medium leading-[28px] text-[20px] tracking-[0px]" role="rowheader">
            Total
          </span>
          <span role="cell" className="font-Roboto text-[#262626] font-medium leading-[28px] text-[20px] tracking-[0px] text-right">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </span>
        </div>
        </div>

      </div>
    </>
  );
}

export function CartActions({cart}: {cart: Cart}) {
  const {storeDomain} = useRootLoaderData();

  if (!cart || !cart.checkoutUrl) return null;

  const shopPayLineItems = flattenConnection(cart.lines).map((line) => ({
    id: line.merchandise.id,
    quantity: line.quantity,
  }));

  return (
    <div className="flex w-full gap-3">
      <ShopPayButton
        className={clsx([defaultButtonStyles({tone: 'shopPay'}), 'w-1/2 h-[52px]'])}
        variantIdsAndQuantities={shopPayLineItems}
        storeDomain={storeDomain}
      />
      {/* {cart.checkoutUrl} */}
      <Button
        to="/checkout"
        className={clsx([defaultButtonStyles(), 'w-1/2 flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full h-[52px] transition-all  hover:bg-[#DF5D07] hover:text-white hover:opacity-100'])}
      >
        Checkout         
      </Button>
    </div>
  );
}