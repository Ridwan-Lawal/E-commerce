export function Banner() {
  return (
    <header>
      <aside className="flex  md:max-w-7xl mx-auto px-8 md:justify-between flex-col md:flex-row items-center gap-8 pt-16 md:pt-24">
        <section className="md:order-2">
          <img src="/hero.png" alt="" />
        </section>

        <section className="uppercase md:order-1 max-w-xl  flex flex-col items-center md:items-start">
          <p className="flex items-center font-medium gap-4">
            <span className=" w-10 h-0.5 bg-blue-950"></span>
            hot trend
          </p>

          <h1 className="text-6xl mt-1 text-center md:text-left font-bold text-gray-900">
            Fresh fashion finds
          </h1>
          <h2 className="text-6xl mt-1 text-center md:text-left  text-gray-900">
            New collection
          </h2>

          {/* discover more */}
          <button className="uppercase font-medium border-b-2 border-gray-950 hover:scale-105 transition-transform mt-6">
            Discover More
          </button>
        </section>
      </aside>
    </header>
  );
}
