import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Category } from "../types/type";
import apiClient from "../services/apiServices";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get(`/category/${slug}`)
      .then((response) => {
        setCategory(response.data.data);
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
          <p className="text-xl text-gray-700 font-medium">Memuat layanan percetakan terbaik...</p>
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
          <p className="text-red-600">Error loading category: {error}</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-gray-600">Category not found</p>
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
              <h1 className="text-lg font-bold text-gray-900">Kategori</h1>
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
        {/* Category Header */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          {/* Category Info */}
          <div className="flex flex-col items-center justify-between space-y-6 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-4 text-center sm:text-left">
              <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 p-1 sm:h-24 sm:w-24">
                <img
                  src={`${BASE_URL}/${category.photo}`}
                  alt={category.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {category.name}
                </h1>
                <p className="text-gray-600">
                  {category.products_count} Produk Tersedia
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600">4.8</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-gray-200"></div>

          {/* Category Features */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-green-100 p-2">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Guarantee</h3>
                <p className="text-sm text-gray-600">Bahan Terbaik</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-purple-100 p-2">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Top Service</h3>
                <p className="text-sm text-gray-600">Pelayanan Terbaik</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Produk</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{category.products.length} items</span>
            </div>
          </div>

          {category.products.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.products.map((product) => (
                <Link
                  to={`/product/${product.slug}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-indigo-200 sm:rounded-3xl">
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                      <img
                        src={`${BASE_URL}/${product.thumbnail}`}
                        alt={product.name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 sm:p-6">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                          {product.brand.name}
                        </p>
                        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-indigo-600 sm:text-base">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-indigo-600 sm:text-xl">
                            {formatCurrency(product.price)}
                          </p>
                          <div className="flex items-center space-x-1">
                            <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-600">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11V6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tidak ada Produk Tersedia</h3>
              <p className="mt-1 text-gray-600">Kategori ini tidak memiliki produk.</p>
            </div>
          )}
        </div>

        {/* Bottom spacing for mobile filter button */}
        <div className="h-20 sm:h-8"></div>
      </main>

      {/* Filter Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 sm:hidden">
        <div className="p-4">
          <button
            type="button"
            className="group flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <span className="font-semibold">Item Filters</span>
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Button - Desktop */}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
        <button
          type="button"
          className="group flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/25"
        >
          <span className="font-semibold">Filters</span>
          <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}