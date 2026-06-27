import Image from "next/image";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Minimalist Headphones",
      price: "$299",
      image: "/product_headphones_1782553061327.png",
    },
    {
      id: 2,
      name: "Modern Timepiece",
      price: "$199",
      image: "/product_watch_1782553101043.png",
    },
    {
      id: 3,
      name: "Essential Mug",
      price: "$29",
      image: "/product_mug_1782553132400.png",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center border-b border-black">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-200 via-white to-white" />
        <h1 className="max-w-4xl text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6 leading-none">
          Simplicity is <br/> the ultimate sophistication
        </h1>
        <p className="max-w-xl text-lg md:text-xl font-medium tracking-wide uppercase mb-10">
          Discover our curated collection of premium black and white essentials.
        </p>
        <a
          href="#products"
          className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-black bg-black px-12 py-4 font-bold text-white uppercase tracking-widest transition-all hover:bg-white hover:text-black"
        >
          <span>Shop the Collection</span>
        </a>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-24 px-6 mx-auto w-full max-w-7xl">
        <div className="flex justify-between items-end mb-16 border-b-2 border-black pb-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Featured</h2>
          <a href="#" className="hidden md:block text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product) => (
            <a key={product.id} href="#" className="group flex flex-col gap-6">
              <div className="relative aspect-square w-full overflow-hidden border border-black bg-neutral-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex justify-between items-start font-bold uppercase tracking-widest text-sm">
                <h3>{product.name}</h3>
                <span>{product.price}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
