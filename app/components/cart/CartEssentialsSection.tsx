import {Money, CartForm} from '@shopify/hydrogen';
import {useNavigate} from '@remix-run/react';

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
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Power up your virtual office with these essentials
      </h2>

      <div className="flex border rounded-lg p-4 justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h3 className="font-medium">{firstEssential.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-3">{firstEssential.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-lg font-bold">
            <Money data={firstVariant.price} />
            <span className="text-base font-normal">/month</span>
          </p>

          {isVirtualMailbox ? (
            <button
              className="border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100"
              onClick={() => navigate(`/sublocations`)}
            >
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
                  className="border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100"
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
