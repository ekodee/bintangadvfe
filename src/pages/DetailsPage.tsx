import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartItem, Product } from "../types/type";
import apiClient from "../services/apiServices";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      const itemExists = cart.find((item) => item.product_id === product.id);

      if (itemExists) {
        alert("Produk Sudah Tersedia di Cart");
        setIsAdding(false);
      } else {
        const newCartItem: CartItem = {
          product_id: product.id,
          slug: product.slug,
          quantity: 1,
        };

        const updatedCart = [...cart, newCartItem];
        setCart(updatedCart);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Produk berhasil ditambahkan ke Cart");
        setIsAdding(false);
      }
    }
  };

  useEffect(() => {
    apiClient
      .get(`/product/${slug}`)
      .then((response) => {
        setProduct(response.data.data);
        setMainImage(response.data.data.thumbnail);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Memuat detail produk percetakan...</p>
          <p className="text-sm text-gray-500 mt-2">Harap tunggu sebentar, kami sedang menyiapkan yang terbaik untuk Anda</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600">Error loading product: {error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  // Format currency to IDR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/products" className="group flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all group-hover:border-indigo-300 group-hover:bg-indigo-50">
                <svg className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="hidden text-sm font-medium text-gray-600 group-hover:text-indigo-600 sm:block">Back</span>
            </Link>

            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Detail Produk</h1>
            </div>

            <Link to="/cart" className="group flex items-center space-x-2">
              <span className="hidden text-sm font-medium text-gray-600 group-hover:text-indigo-600 sm:block">Cart</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all group-hover:border-indigo-300 group-hover:bg-indigo-50">
                <svg className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3zM7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-100">
              <img
                src={`${BASE_URL}/${mainImage}`}
                alt={product.name}
                className="h-full w-full object-contain p-8"
              />
            </div>

            {/* Image Thumbnails */}
            <div className="flex justify-center space-x-3 overflow-x-auto pb-2 pt-3">
              <button
                onClick={() => setMainImage(product.thumbnail)}
                className={`flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
                  mainImage === product.thumbnail
                    ? "ring-4 ring-indigo-500 ring-offset-2"
                    : "ring-1 ring-gray-200 hover:ring-2 hover:ring-indigo-300"
                }`}
              >
                <div className="h-20 w-20 bg-white p-2">
                  <img
                    src={`${BASE_URL}/${product.thumbnail}`}
                    alt="Thumbnail"
                    className="h-full w-full object-contain"
                  />
                </div>
              </button>

              {product.photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setMainImage(photo.photo)}
                  className={`flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
                    mainImage === photo.photo
                      ? "ring-4 ring-indigo-500 ring-offset-2"
                      : "ring-1 ring-gray-200 hover:ring-2 hover:ring-indigo-300"
                  }`}
                >
                  <div className="h-20 w-20 bg-white p-2">
                    <img
                      src={`${BASE_URL}/${photo.photo}`}
                      alt="Product photo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              {product.is_popular && (
                <div className="flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 text-white">
                  <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-semibold">Produk Populer</span>
                  <div className="ml-auto flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                    {product.brand.name}
                  </p>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center space-x-1 rounded-2xl bg-indigo-600 px-3 py-2">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-bold text-white">4.8</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {formatCurrency(product.price)}
                <span className="text-base font-normal text-gray-500">/quantity</span>
              </div>
            </div>

            {/* Product Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="rounded-xl bg-blue-100 p-2">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{product.category.name}</p>
                    <p className="text-xs text-gray-500">Category</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="rounded-xl bg-green-100 p-2">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Guarantee</p>
                    <p className="text-xs text-gray-500">Bahan Terbaik</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="rounded-xl bg-amber-100 p-2">
                    <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Cepat</p>
                    <p className="text-xs text-gray-500">Pengerjaan Cepat</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="rounded-xl bg-purple-100 p-2">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Top Service</p>
                    <p className="text-xs text-gray-500">Pelayanan Terbaik</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Button - Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="group flex w-full items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAdding ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-semibold">Adding...</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold">Tambah Ke Keranjang</span>
                    <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3zM7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Sections */}
        <div className="mt-12 space-y-12">
          {/* About Product */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Tentang Produk</h2>
            <p className="leading-relaxed text-gray-700">{product.about}</p>
          </section>

          {/* Reviews */}
          {product.testimonials.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <div className="overflow-x-auto">
                <Swiper
                  spaceBetween={16}
                  slidesPerView="auto"
                  className="!overflow-visible"
                >
                  {product.testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id} className="!w-80">
                      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-4 flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i< parseInt(testimonial.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <blockquote className="mb-4 text-gray-700">
                          "{testimonial.message}"
                        </blockquote>
                        <div className="flex items-center space-x-3">
                          <img
                            src={`${BASE_URL}/${testimonial.photo}`}
                            alt={testimonial.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.rating}/5 rating</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          )}

          {/* Natural Benefits */}
          {product.features.length > 0 && (
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Keunggulan Produk</h2>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <div key={feature.id}>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-xl bg-green-100 p-2">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{feature.name}</p>
                    </div>
                    {index < product.features.length - 1 && (
                      <hr className="mt-4 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Fixed Bottom Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="space-y-1">
            <p className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
            <p className="text-sm text-gray-500">/quantity</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-semibold">Adding...</span>
              </>
            ) : (
              <>
                <span className="font-semibold">Add to Cart</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3zM7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom padding for mobile fixed bar */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
}