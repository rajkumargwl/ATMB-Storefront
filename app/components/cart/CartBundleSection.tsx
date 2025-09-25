// components/cart/CartBundleSection.tsx
import {Image, Money} from '@shopify/hydrogen';
import {Link} from '~/components/Link';

//import AddToCartButton from '~/components/product/buttons/AddToCartButton';

export default function CartBundleSection({bundleProducts}: {bundleProducts: any[]}) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">  Bundle smart and save 15% on the plan </h2>
      <p className="text-sm text-gray-600 mb-4"> 80% of our customers pick this winning combination </p>
      <div className="grid md:grid-cols-2 gap-6">
        {bundleProducts.map((product) => {
          const firstVariant = product?.variants?.nodes?.[0];
          return (
            <div
              key={product.id}
              className="border rounded-lg p-6 bg-white shadow-sm flex flex-col"
            >
              {product.images?.nodes?.[0] && (
                <Image
                  data={product.images.nodes[0]}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>

              {firstVariant && (
                <div className="mt-4">
                  <p className="font-semibold">
                    <Money data={firstVariant.price} />
                  </p>
                   <Link to={`/PDP/${product.handle}`}>Upgrade to Bundle</Link>
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
