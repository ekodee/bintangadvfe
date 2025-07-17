import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Category, Product } from "../types/type";
import apiClient from "../services/apiServices";
// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// Mock Link component untuk demo
const Link = ({
  to,
  children,
  className,
  ...props
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

const fetchCategories = async () => {
  const response = await apiClient.get("/categories?limit=6");
  return response.data.data;
};

const fetchPopularProducts = async () => {
  const response = await apiClient.get("/products?limit=4&is_popular=1");
  return response.data.data;
};

const fetchAllProducts = async () => {
  const response = await apiClient.get("/products?limit=4");
  return response.data.data;
};

export default function BrowsePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPopularProducts, setLoadingPopularProducts] = useState(true);
  const [loadingAllProducts, setLoadingAllProducts] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError("Gagal memuat kategori");
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchPopularProductsData = async () => {
      try {
        const popularProductsData = await fetchPopularProducts();
        setPopularProducts(popularProductsData);
      } catch (error) {
        setError("Gagal memuat layanan");
      } finally {
        setLoadingPopularProducts(false);
      }
    };

    const fetchProductsData = async () => {
      try {
        const productsData = await fetchAllProducts();
        setAllProducts(productsData);
      } catch (error) {
        setError("Gagal memuat layanan");
      } finally {
        setLoadingAllProducts(false);
      }
    };

    fetchCategoriesData();
    fetchPopularProductsData();
    fetchProductsData();
  }, []);

  if (loadingCategories && loadingAllProducts && loadingPopularProducts) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">
            Memuat layanan percetakan terbaik...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Harap tunggu sebentar, kami sedang menyiapkan yang terbaik untuk
            Anda
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-xl text-red-600 font-semibold mb-2">
            Ups! Terjadi kesalahan
          </p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header yang Disempurnakan */}
      <header>
        {/* Navigasi Utama - Gunakan margin-top untuk menghindari overlap dengan navbar */}

        <Navbar />
      </header>

      {/* Konten Utama dengan padding yang tepat */}
      <main className="pt-20 md:pt-36 pb-20 md:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Bagian Hero Slider */}
        <section className="relative">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bintang Advertising
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Temukan layanan percetakan berkualitas tinggi yang dikurasi khusus
              untuk Anda
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <Swiper
              spaceBetween={20}
              slidesPerView="auto"
              className="hero-swiper"
              breakpoints={{
                640: { spaceBetween: 24 },
                1024: { spaceBetween: 32 },
              }}
            >
              {[
                {
                  image: "/assets/images/thumbnails/thumbnail3.png",
                  title: "Harga Grosir Super Hemat",
                  subtitle: "Harga spesial untuk pemesanan dalam jumlah besar",
                },
                {
                  image: "/assets/images/thumbnails/thumbnail1.png",
                  title: "Tips Desain Profesional",
                  subtitle: "Konsultasi gratis dengan ahli desain",
                },
                {
                  image: "/assets/images/thumbnails/thumbnail2.png",
                  title: "Cetak Berkualitas, Harga Bersahabat",
                  subtitle: "Cocok untuk semua kebutuhan promosi!",
                },
              ].map((slide, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <div className="relative group cursor-pointer">
                    <div className="w-80 h-48 md:w-96 md:h-56 lg:w-[500px] lg:h-64 rounded-2xl overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {slide.title}
                        </h3>
                        <p className="text-sm opacity-90">{slide.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Bagian Kategori */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Jelajahi Berdasarkan Kategori
              </h2>
              <p className="text-gray-600">
                Temukan layanan percetakan yang Anda cari
              </p>
            </div>
            
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  to={`/category/${category.slug}`}
                  key={category.id}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
                    <div className="aspect-square w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                      <img
                        src={`${BASE_URL}/${category.photo}`}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-center font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-center text-sm text-gray-500">
                      {category.products_count} produk
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 text-lg">
                  Belum ada kategori tersedia
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bagian Produk Populer */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                🔥 Layanan Paling Diminati
              </h2>
              <p className="text-gray-600">
                Produk percetakan yang sedang trending dan banyak dipesan
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Sedang populer</span>
              </div>
        
            </div>
          </div>

          {/* Slider Mobile */}
          <div className="block lg:hidden">
            <Swiper
              spaceBetween={16}
              slidesPerView="auto"
              className="popular-mobile-swiper"
            >
              {popularProducts.length > 0 ? (
                popularProducts.map((product) => (
                  <SwiperSlide key={product.id} className="!w-64">
                    <Link to={`/product/${product.slug}`} className="block">
                      <div className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                        <div className="relative mb-4">
                          <div className="aspect-square rounded-xl overflow-hidden bg-white">
                            <img
                              src={`${BASE_URL}/${product.thumbnail}`}
                              alt={product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                            <span>⭐</span>
                            <span>4.8</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                            {product.brand.name}
                          </p>
                          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <div className="w-full text-center py-8">
                  <p className="text-gray-500">Belum ada produk populer</p>
                </div>
              )}
            </Swiper>
          </div>

          {/* Grid Desktop */}
          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6">
            {popularProducts.length > 0 ? (
              popularProducts.map((product) => (
                <Link
                  to={`/product/${product.slug}`}
                  key={product.id}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="relative mb-6">
                      <div className="aspect-square rounded-xl overflow-hidden bg-white">
                        <img
                          src={`${BASE_URL}/${product.thumbnail}`}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                        <span>⭐</span>
                        <span>4.8</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                        {product.brand.name}
                      </p>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔥</div>
                <p className="text-gray-500 text-lg">
                  Belum ada produk populer
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bagian Produk Terbaru */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                🌟 Produk Terbaru
              </h2>
              <p className="text-gray-600">
                Layanan percetakan terdepan dan inovasi terbaru
              </p>
            </div>

          </div>

          {/* Daftar Mobile */}
          <div className="block lg:hidden space-y-4">
            {allProducts.length > 0 ? (
              allProducts.map((product) => (
                <Link
                  to={`/product/${product.slug}`}
                  key={product.id}
                  className="block"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={`${BASE_URL}/${product.thumbnail}`}
                          alt={product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                          {product.brand.name}
                        </p>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-gray-900">
                            {formatCurrency(product.price)}
                          </p>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <span>⭐</span>
                            <span>4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌟</div>
                <p className="text-gray-500 text-lg">
                  Belum ada produk terbaru
                </p>
              </div>
            )}
          </div>

          {/* Grid Desktop */}
          <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6">
            {allProducts.length > 0 ? (
              allProducts.map((product) => (
                <Link
                  to={`/product/${product.slug}`}
                  key={product.id}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={`${BASE_URL}/${product.thumbnail}`}
                          alt={product.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
                          {product.brand.name}
                        </p>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(product.price)}
                          </p>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <span>⭐</span>
                            <span className="font-medium">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🌟</div>
                <p className="text-gray-500 text-lg">
                  Belum ada produk terbaru
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <style>{`
        .hero-swiper .swiper-slide {
          width: auto !important;
        }
        .popular-mobile-swiper .swiper-slide {
          width: 256px !important;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
