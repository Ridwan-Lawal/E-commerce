import { Banner } from "./components/Banner";
import { ItemsCollection } from "./components/ItemsCollection";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { Nav } from "./components/Nav";
import { Button } from "./components/Button";
import { useEffect, useRef, useState } from "react";
import { useProduct } from "./useProducts";
import { CartNav } from "./components/Cart";
import { FaArrowLeft } from "react-icons/fa6";
import { Triangle } from "react-loader-spinner";

// nav and the total price, and subtotal

export default function App() {
  const { products, isLoading, error } = useProduct();
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart"))
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productDetail, setProductDetail] = useState("");
  const [navFixed, setNavFixed] = useState(false);
  const mainSection = useRef(null);

  function handleAddToCart(product) {
    const isProductExistInCart = cart.some((item) => item.id === product.id);

    isProductExistInCart
      ? setCart((curProducts) =>
          curProducts.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      : setCart((curProducts) => [
          ...curProducts,
          {
            ...product,
            quantity: 1,
          },
        ]);
  }

  function handleOpenCart() {
    setIsCartOpen((curBool) => !curBool);
  }

  function handleQuantityIncreament(id, totalPrice) {
    setCart((curProducts) =>
      curProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
              totalPrice,
            }
          : product
      )
    );
  }

  function handleQuantityDecreament(id, totalPrice) {
    setCart((curProducts) =>
      curProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1, totalPrice }
          : product
      )
    );
  }

  function handleDeleteCartItem(id) {
    setCart((curItem) => curItem.filter((item) => item.id !== id));
  }

  const subTotal = cart.reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );

  function handleClearCart() {
    setCart([]);
  }

  function handleProductDetail(product) {
    setProductDetail(product);
  }

  useEffect(function () {
    const mainSectionCoords = mainSection.current.getBoundingClientRect();

    window.addEventListener("scroll", (e) => {
      if (window.scrollY > mainSectionCoords.top) setNavFixed(true);
      else setNavFixed(false);
    });
    console.log(mainSectionCoords);
  }, []);

  useEffect(
    function () {
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    [cart]
  );

  return (
    <div className="font-poppins relative">
      <div>
        <Nav
          navFixed={navFixed}
          cartItemCount={cart.length}
          onOpenCart={handleOpenCart}
        />
        {error && <Error error={error} />}
        {isLoading && <Loader />}
        {productDetail && !error && !isLoading && (
          <ItemDetail
            productDetail={productDetail}
            onAddToCart={handleAddToCart}
            onProductDetail={handleProductDetail}
          />
        )}

        {!productDetail && !error && !isLoading && (
          <>
            <Banner />
            <ItemsCollection
              products={products}
              onAddToCart={handleAddToCart}
              onProductDetail={handleProductDetail}
              mainSection={mainSection}
            />
          </>
        )}

        <Footer />
      </div>

      <div
        className={`fixed ${
          isCartOpen ? "sm:w-[55%] md:w-[45%] lg:w-[40%] w-[100%]" : "w-0"
        } transition-all duration-500 shadow-2xl bg-white  bottom-0 min-h-screen z-40  top-0  right-0`}
      >
        <Cart
          cart={cart}
          subtotals={subTotal}
          onClearCart={handleClearCart}
          onDeleteCartItem={handleDeleteCartItem}
          onQuantityIncreament={handleQuantityIncreament}
          onQuantityDecreament={handleQuantityDecreament}
          onProductDetail={handleProductDetail}
        >
          <CartNav cartItems={cart.length} onOpenCart={handleOpenCart} />
        </Cart>
      </div>
    </div>
  );
}

function Error({ error = "An Error occured" }) {
  return (
    <div>
      <p>{error}</p>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

function ItemDetail({
  imgSrc = "./shirt.jpg",
  itemName = "Mens cotton jackets",
  price = "22.3",
  productDetail,
  onAddToCart,
  onProductDetail,
}) {
  return (
    <>
      <section onClick={() => onProductDetail("")} className="px-8 mt-8 w-fit">
        <FaArrowLeft className="text-2xl cursor-pointer" />
      </section>

      <div className="flex mt-10 px-8 max-w-xl flex-col md:flex-row items-center md:max-w-[950px] justify-between mx-auto pb-20 gap-16">
        <section className=" ">
          <img
            src={productDetail?.image}
            className="w-64 md:w-96"
            alt="itemImg"
          />
        </section>

        <section className=" md:w-[50%] text-center md:text-left">
          <h1 className="text-[24px] md:text-[26px]  uppercase tracking-wide font-semibold">
            {productDetail?.title}
          </h1>
          <p className="text-2xl md:text-[26px] text-red-600 font-semibold mt-2">
            $ {productDetail?.price}
          </p>

          <p className="mt-5 text-lg text-black">
            {productDetail?.description}
          </p>

          <section className="mt-8" onClick={() => onAddToCart(productDetail)}>
            <Button
              width="px-10"
              bgColor="bg-slate-950"
              content="Add to cart"
            />
          </section>
        </section>
      </div>
    </>
  );
}
