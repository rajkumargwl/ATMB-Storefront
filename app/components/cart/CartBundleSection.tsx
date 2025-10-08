// components/cart/CartBundleSection.tsx
import {Image, Money} from '@shopify/hydrogen';
import {Link} from '~/components/Link';

//import AddToCartButton from '~/components/product/buttons/AddToCartButton';

export default function CartBundleSection({bundleProducts}: {bundleProducts: any[]}) {
  return (
    <div className="w-full lg:w-[50%]">
      <div className='flex flex-col gap-1 mb-[24px] md:mb-[40px]'>
        <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">  Bundle smart and save 15% on the plan </h2>
        <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]"> 80% of our customers pick this winning combination </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 p-6 rounded-[12px] border border-LightWhite bg-white">
        {bundleProducts.map((product) => {
          const firstVariant = product?.variants?.nodes?.[0];
          return (
            <div
              key={product.id}
              className="border border-LightWhite rounded-[12px] p-[20px] bg-white flex flex-col"
            >
              {product.images?.nodes?.[0] && (
                <Image
                  data={product.images.nodes[0]}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h3 className="mb-4 flex font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[-0.3px] md:tracking-[-0.3px]">{product.title}</h3>
              <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] line-clamp-3">{product.description}</p>

              {firstVariant && (
                <div className="mt-4 flex flex-col gap-4">
                  <p className="font-Roboto text-[#171717] font-medium leading-[24px] text-[16px] tracking-[0px]">
                    <Money data={firstVariant.price} />
                  </p>
                   <Link to={`/PDP/${product.handle}`} className={'flex items-center justify-center w-full md:w-[202px] h-[44px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px]'}>Upgrade to Bundle</Link>
                  {/* <AddToCartButton
                    lines={[{merchandiseId: firstVariant.id, quantity: 1}]}
                    buttonClassName="mt-3 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
                    text="Upgrade to Bundle"
                  /> */}
                </div>
              )}
            </div>
          );
        })}
        
      </div>
    </div>
  );
}
