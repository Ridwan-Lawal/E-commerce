import { IoArrowForward } from "react-icons/io5";
import { IoAdd, IoCloseSharp } from "react-icons/io5";
import { FaMinus, FaTrash } from "react-icons/fa6";
import { Button } from "./Button";
import { useInternationalization } from "../useInternationalization";

export function Cart({
  children,
  cart,
  onQuantityIncreament,
  onQuantityDecreament,
  subtotals,
  onDeleteCartItem,
  onClearCart,
  onProductDetail,
}) {
  return (
    <div className="px-5  bg-white">
      {children}
      <CartItems>
        {cart.map((product) => (
          <CartItemsCard
            onQuantityIncreament={onQuantityIncreament}
            onQuantityDecreament={onQuantityDecreament}
            onDeleteCartItem={onDeleteCartItem}
            onProductDetail={onProductDetail}
            key={product.id}
            product={product}
          >
            {/* for the quantity control */}
            <div className="border flex gap-4 items-center w-fit p-1">
              <button
                onClick={() =>
                  onQuantityDecreament(
                    product.id,
                    product.price * product.quantity
                  )
                }
              >
                <FaMinus className="text-[12px] cursor-pointer text-gray-700" />
              </button>

              <p className="text font-medium text-sm">{product?.quantity}</p>

              <button
                onClick={() =>
                  onQuantityIncreament(
                    product.id,
                    product.price * product.quantity
                  )
                }
              >
                <IoAdd className="text-base cursor-pointer " />
              </button>
            </div>
          </CartItemsCard>
        ))}
      </CartItems>
      <CartFooter>
        <SubTotal
          subtotal={subtotals ? subtotals : 0}
          onClearCart={onClearCart}
        />
      </CartFooter>
    </div>
  );
}
export function CartNav({ cartItems = 2, onOpenCart }) {
  return (
    <nav className="flex justify-between items-center py-6 border-b">
      <p className="font-medium uppercase">shopping bag ({cartItems})</p>
      <p onClick={onOpenCart} className="cursor-pointer">
        <IoArrowForward className="text-[22px]" />
      </p>
    </nav>
  );
}
function CartItems({ children }) {
  return (
    <div className="mt-9 space-y-8 border h-[350px] overflow-y-scroll">
      {children}
    </div>
  );
}

function CartItemsCard({
  children,
  product,
  onDeleteCartItem,
  onProductDetail,
}) {
  const priceInNaira = useInternationalization(product?.price);
  const totalPriceInNaira = useInternationalization(
    product?.price * product?.quantity
  );

  return (
    <div className="flex gap-4 items-center border-b pb-8">
      <section>
        <img src={product?.image} alt="" className="w-20" />
      </section>

      <section className="w-[80%] ">
        {/* name */}
        <div className=" justify-between items-start flex">
          <p
            onClick={() => onProductDetail(product)}
            className="text-gray-800 cursor-pointer hover:underline font-medium"
          >
            {product?.title}
          </p>

          <p onClick={() => onDeleteCartItem(product.id)}>
            <IoCloseSharp className="text-gray-500 cursor-pointer  text-[22px]" />
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* quanity and price */}
          <section className="flex justify-between items-center  w-[60%] lg:w-[50%]">
            {/* for the quantity lncrease and decrease */}
            <div>{children}</div>

            {/* price per quantity */}
            <p className="text-gray-400">{priceInNaira}</p>
          </section>

          {/* final price */}
          <p className="font-medium">{totalPriceInNaira}</p>
        </div>
      </section>
    </div>
  );
}
function CartFooter({ children }) {
  return (
    <div className="space-y-4 border-t py-5 mt-6">
      {children}
      <div className="space-y-4">
        <Button
          bgColor="bg-slate-900"
          textColor="text-white"
          content="Checkout"
        />
      </div>
    </div>
  );
}
function SubTotal({ subtotal = 165.95, onClearCart }) {
  const subTotalInNaira = useInternationalization(subtotal);
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-medium">Subtotal: {subTotalInNaira}</p>

      <button
        onClick={onClearCart}
        className="bg-red-400 flex justify-center items-center p-3.5"
      >
        <FaTrash className="text-white" />
      </button>
    </div>
  );
}
