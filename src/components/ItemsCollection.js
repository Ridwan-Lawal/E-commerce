import { FaPlus } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useInternationalization } from "../useInternationalization";

export function ItemsCollection({
  products,
  onAddToCart,
  onProductDetail,
  mainSection,
}) {
  return (
    <div ref={mainSection} className="mt-28 px-8 pb-20">
      <h3 className="text-[31px] font-semibold text-center">
        Explore Our Products
      </h3>

      <div className="mt-8 flex flex-col md:flex-row md:flex-wrap max-w-5xl mx-auto  gap-10">
        {products?.map((product) => (
          <ItemCard
            product={product}
            key={product.id}
            onAddToCart={onAddToCart}
            onProductDetail={onProductDetail}
          >
            <AddViewIcons
              bgColor="bg-cyan-500"
              onClick={() => onAddToCart(product)}
            >
              <FaPlus className="text-white" />
            </AddViewIcons>

            <AddViewIcons
              shadow="shadow-lg"
              bgColor="bg-white"
              onClick={() => onProductDetail(product)}
            >
              <FaEye />
            </AddViewIcons>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}
function ItemCard({ children, onProductDetail, product, onAddToCart }) {
  const [isHover, setIsHover] = useState();
  const priceInNaira = useInternationalization(product?.price);

  return (
    <div className=" max-w-sm relative lg:max-w-[300px] w-full mx-auto space-y-5 group ">
      {/* image */}
      <section className="flex h-[310px] items-center shadow-sm justify-center group border  py-10">
        <img
          src={product?.image}
          alt=""
          className="w-40  group-hover:scale-110 h-fit  transition-transform duration-300"
        />
      </section>

      <section className="space-y-1">
        <p className="text-gray-600">{product?.category}</p>
        <p
          onClick={() => onProductDetail(product)}
          className="text-gray-900 font-medium cursor-pointer text-lg transition-transform"
        >
          {product?.title}
        </p>
        <p>{priceInNaira}</p>
      </section>

      {/* w-0 to w-full, transtion */}
      <section className="absolute top-3 w-0 overflow-hidden group-hover:w-fit group-hover:overflow-visible transition-all duration-500 right-6">
        {children}
      </section>
    </div>
  );
}
function AddViewIcons({ bgColor, children, shadow, onClick }) {
  return (
    <div>
      <button onClick={onClick} className={` p-4  ${bgColor} ${shadow}`}>
        {children}
      </button>
    </div>
  );
}
