import { IoBagOutline } from "react-icons/io5";

export function Nav({ cartItemCount = 0, onOpenCart, navFixed }) {
  return (
    <nav
      className={` px-8 ${
        navFixed ? "fixed w-full bg-white shadow-lg" : "static"
      } flex py-5 transition-all duration-500  justify-between items-center z-10`}
    >
      {/* logo */}
      <section>
        <img src="/logo.svg" className="w-10" alt="" />
      </section>

      <section onClick={onOpenCart} className="relative cursor-pointer ">
        <IoBagOutline className="text-3xl" />
        <p className="bg-red-500 font-medium rounded-full text-[12px] px-[6px] absolute top-4 -right-1 text-white">
          {cartItemCount}
        </p>
      </section>
    </nav>
  );
}
