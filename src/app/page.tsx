"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  const [orderedProduct, setOrderedProduct] = useState<string | null>(null);
  const [selectedProductForPurchase, setSelectedProductForPurchase] = useState<any | null>(null);
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://eproduct.onrender.com';
        const res = await fetch(`${API_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOrder = async () => {
    if (!selectedProductForPurchase) return;
    setIsOrdering(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://eproduct.onrender.com';
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: selectedProductForPurchase.name,
          price: selectedProductForPurchase.price,
        }),
      });

      if (response.ok) {
        setOrderedProduct(selectedProductForPurchase.name);
        setSelectedProductForPurchase(null);
      } else {
        alert("There was an error placing your order.");
      }
    } catch (error) {
      console.error("Error ordering:", error);
      alert("There was an error placing your order.");
    } finally {
      setIsOrdering(false);
    }
  };

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
          <p className="hidden md:block text-sm font-bold uppercase tracking-widest">
            Click an item to order
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="text-center py-12 font-bold uppercase tracking-widest">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product) => (
              <div key={product._id} className="group flex flex-col gap-6">
                <div className="relative aspect-square w-full overflow-hidden border border-black bg-neutral-100 cursor-pointer" onClick={() => setSelectedProductForPurchase(product)}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start font-bold uppercase tracking-widest text-sm">
                    <h3>{product.name}</h3>
                    <span>{product.price}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedProductForPurchase(product)}
                    className="w-full border-2 border-black bg-white text-black py-3 font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Purchase Dialog */}
      {selectedProductForPurchase && !orderedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm p-6">
          <div className="bg-white text-black p-8 md:p-12 max-w-lg w-full flex flex-col items-center text-center shadow-2xl border-2 border-black">
            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-2">Confirm Purchase</h3>
            <p className="mb-6 font-medium text-neutral-600">Are you sure you want to purchase this item?</p>
            
            <div className="flex flex-col items-center gap-2 mb-8 bg-neutral-100 w-full p-4 border border-neutral-200">
              <span className="font-bold uppercase tracking-widest">{selectedProductForPurchase.name}</span>
              <span className="font-medium">{selectedProductForPurchase.price}</span>
            </div>

            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setSelectedProductForPurchase(null)}
                disabled={isOrdering}
                className="flex-1 border-2 border-black bg-white text-black py-3 font-bold uppercase tracking-widest transition-colors hover:bg-neutral-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleOrder}
                disabled={isOrdering}
                className="flex-1 border-2 border-black bg-black text-white py-3 font-bold uppercase tracking-widest transition-colors hover:bg-neutral-800 disabled:opacity-50"
              >
                {isOrdering ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm p-6">
          <div className="bg-black text-white p-12 max-w-lg w-full flex flex-col items-center text-center shadow-2xl border border-white">
            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4">Order Confirmed</h3>
            <p className="mb-8 font-medium">Your order for <span className="font-bold border-b border-white pb-1">{orderedProduct}</span> has been successfully placed.</p>
            <button 
              onClick={() => setOrderedProduct(null)}
              className="border-2 border-white bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
