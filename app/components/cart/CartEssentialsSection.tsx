// components/cart/CartEssentialsSection.tsx
import {Image, Money} from '@shopify/hydrogen';
import {Link} from '~/components/Link';

export default function CartEssentialsSection({
  essentialsProducts,
}: {
  essentialsProducts: any[];
}) {
  console.log("essentialsProducts in CartEssentialsSection", essentialsProducts);
  return (
    <div >
      <h2 className="text-lg font-semibold mb-2">
        Power up your virtual office with these essentials
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Top-rated services that grow with your company
      </p>

      <div className="grid">
        {essentialsProducts.map((product) => {
          const firstVariant = product?.variants?.nodes?.[0];
          return (
            <div
              key={product.id}
              className="flex border rounded-lg p-4 justify-between items-center"
            >
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">{product.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>
                {firstVariant?.metafields?.nodes?.length ? (
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    {firstVariant.metafields.nodes.map((mf: any) => (
                      <li key={mf.id}>{mf.value}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="flex flex-col items-end gap-2">
                {firstVariant && (
                  <>
                    <p className="text-lg font-bold">
                      <Money data={firstVariant.price} />
                      <span className="text-base font-normal">/month</span>
                    </p>
                    <Link
                      to={`/PDP/${product.handle}`}
                      className="border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100"
                    >
                     + Add to Cart
                    </Link>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
