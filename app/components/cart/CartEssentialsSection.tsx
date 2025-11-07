import {Money, CartForm} from '@shopify/hydrogen';
import {useNavigate} from '@remix-run/react';
import { useRootLoaderData } from '~/root';
import { DEFAULT_LOCALE } from '~/lib/utils';
 
export default function CartEssentialsSection({
  essentialsProducts,
  cartLines = [], // ✅ default to empty array
  onAddToCart,
}: {
  essentialsProducts: any[];
  cartLines?: any[];
  onAddToCart: (newLine: any) => void;
}) {
  const navigate = useNavigate();
  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  let currencyCode = selectedLocale?.currency || 'USD';
 
  // Filter out already-added products safely
  const availableEssentials = essentialsProducts.filter(
    (product) =>
      !cartLines.some(
        (line) => line.node.merchandise.product.handle === product.handle
      )
  );
 
  if (!availableEssentials.length) return null;
 
  const firstEssential =
    availableEssentials[Math.floor(Math.random() * availableEssentials.length)];
  const firstVariant = firstEssential.variants.nodes[0];
 
  const isVirtualMailbox = firstEssential.handle === 'virtual-mailbox';
  return (
     <div className='w-full lg:w-[50%]'>
      <div className='flex flex-col gap-1 mb-[24px] md:mb-[40px]'>
        <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
          Power up your virtual office with these essentials
        </h2>
        <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
          Top-rated services that grow with your company
        </p>
      </div>
 
      <div className="flex flex-col gap-6 p-5 md:p-6 rounded-[12px] border border-LightWhite bg-white">
        <div className='flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-[16px] md:gap-[28px]'>
        <div className="flex flex-col">
          <h3 className="mb-2 flex font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[-0.36px] md:tracking-[-0.3px]">{firstEssential.title}</h3>
          <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] line-clamp-3">{firstEssential.description}</p>
        </div>
 
        <div className="flex flex-col items-end">
          <p className="flex items-end font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                      <Money data={{ amount: firstVariant.price.amount, currencyCode: currencyCode }}/>
                      <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">/month</span>
          </p>
 
          
        </div>
      </div>
      <div className='flex flex-row items-center justify-center cart-form'>
        {isVirtualMailbox ? (
            <button
              className="flex items-center justify-center gap-[12px] w-full md:w-[202px] h-[44px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px]"
              onClick={() => navigate(`/sublocations`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12.002 4.1001C12.0555 4.10032 12.1013 4.14615 12.1016 4.19971V11.8999H19.8018C19.8555 11.9 19.9014 11.9467 19.9014 12.0005C19.9011 12.0541 19.8554 12.1 19.8018 12.1001H12.1016V19.8003C12.1015 19.8539 12.0556 19.8997 12.002 19.8999C11.9482 19.8999 11.9015 19.8541 11.9014 19.8003V12.1001H4.20117C4.14761 12.0999 4.10178 12.054 4.10156 12.0005C4.10156 11.9468 4.14748 11.9001 4.20117 11.8999H11.9014V4.19971C11.9016 4.14602 11.9482 4.1001 12.002 4.1001Z" fill="#091019" stroke="#091019"/>
              </svg>
              Add to Cart
            </button>
          ) : (
            <CartForm
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{lines: [{merchandiseId: firstVariant.id, quantity: 1}]}}
            >
              {({state}) => (
                <button
                  type="submit"
                  className="flex items-center justify-center gap-[12px] w-full md:w-[202px] h-[44px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px] transition-all  hover:bg-PrimaryBlack hover:text-white"
                  disabled={state !== 'idle'}
                >
                  {state !== 'idle' ? 'Adding...' : '+ Add to Cart'}
                </button>
              )}
            </CartForm>
          )}
      </div>
      </div>
    </div>
  );
}