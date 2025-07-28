import { useEffect, useState } from "react";
import { CartItem, Product } from "../types/type";
import apiClient from "../services/apiServices";
import { Link } from "react-router-dom";

const minOrderMap: Record<string, number> = {
  "Banner Custom": 2,
  "Banner Promosi Produk": 1,
  "Buku Yasin Soft Cover": 10,
  "Buku Yasin Hard Cover": 5,
  "Neon Box": 1,
  "Kartu Nama Standard": 50,
  "Kartu Nama Premium": 50,
  "X-Banner": 2,
  "Stempel Oval": 1,
  "Stempel Kotak": 1,
  "Sticker Label Bulat": 100,
  "Sticker Cutting Custom": 50,
  "Undangan Custom Tanpa Amplop": 50,
  "Undangan Custom dengan Amplop": 50,
};

export default function MyCartPage() {
  // variabel
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // mengambil seluruh data dari keranjang
  // periksa apakah data ada di database
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems: CartItem[] = JSON.parse(savedCart);
      setCart(cartItems);

      const fetchProductDetails = async () => {
        const validProducts: Product[] = [];
        const updatedCart: CartItem[] = [];

        for (const item of cartItems) {
          try {
            const response = await apiClient.get(`/product/${item.slug}`);
            const product = response.data.data;

            if (product) {
              product.min_order = minOrderMap[product.name] || 1;
              validProducts.push(product);
              updatedCart.push(item);
            } else {
              console.warn(
                `Product with slug ${item.slug} is no longer available`
              );
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              setError(error.message);
              console.error(
                `Error fetching product with slug ${item.slug}: ${error.message}`
              );
              const updatedCartAfterError = cartItems.filter(
                (cartItem) =>
                  !updatedCart.some((item) => item.slug === cartItem.slug)
              );
              setCart(updatedCartAfterError);
              localStorage.setItem(
                "cart",
                JSON.stringify(updatedCartAfterError)
              );
            }
          }
        }
        setProductDetails(validProducts);
        setLoading(false);
      };

      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, []);

  // menambah item dari keranjang
  // dibatasi hanya boleh menambah 10 item saja
  const handleIncreaseQuantity = (slug: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.slug === slug && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // mengurangi item dari keranjang
  const handleDecreaseQuantity = (slug: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.slug === slug && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // menghapus item dari keranjang
  const handleRemoveItem = (slug: string) => {
    const updatedCart = cart.filter((item) => item.slug !== slug);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setProductDetails((prevDetails) =>
      prevDetails.filter((product) => product.slug !== slug)
    );
  };

  const subtotal = productDetails.reduce((acc, product) => {
    const cartItem = cart.find((item) => item.product_id === product.id);
    return acc + (cartItem ? product.price * cartItem.quantity : 0);
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // pajak
  const tax = subtotal * 0.11;
  // total
  const total = subtotal + tax;

  // Tambahkan fungsi ini di dalam komponen MyCartPage
  const handleProceedOrder = () => {
    // Cek setiap produk di cart
    for (const product of productDetails) {
      const cartItem = cart.find((item) => item.product_id === product.id);
      if (
        cartItem &&
        product.min_order &&
        cartItem.quantity < product.min_order
      ) {
        alert(
          `Minimal pembelian untuk "${product.name}" adalah ${product.min_order}.`
        );
        return; // hentikan proses jika ada yang kurang dari minimal
      }
    }
    // Jika semua memenuhi, lanjut ke halaman order
    window.location.href = "/order";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-gray-600">Memuat data keranjang...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600">Gagal memuat keranjang: {error}</p>
        </div>
      </div>
    );
  }

  // Format mata uang ke IDR
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
      {/* Header Navigasi */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/products" className="group flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all group-hover:border-indigo-300 group-hover:bg-indigo-50">
                <svg
                  className="h-5 w-5 text-gray-600 group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <span className="hidden text-sm font-medium text-gray-600 group-hover:text-indigo-600 sm:block">
                Kembali ke Toko
              </span>
            </Link>

            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">
                Keranjang Saya
              </h1>
              <p className="text-xs text-gray-500">
                Solusi percetakan terbaik untuk Anda
              </p>
            </div>

            <div className="flex items-center space-x-1 rounded-full bg-indigo-100 px-3 py-1">
              <svg
                className="h-4 w-4 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3zM7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              <span className="text-sm font-semibold text-indigo-600">
                {totalQuantity}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Item Keranjang */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Keranjang Belanja
                </h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {productDetails.length}{" "}
                  {productDetails.length === 1 ? "item" : "item"}
                </span>
              </div>

              {productDetails.length > 0 ? (
                <div className="space-y-4">
                  {productDetails.map((product) => {
                    const cartItem = cart.find(
                      (item) => item.product_id === product.id
                    );
                    return (
                      <div
                        key={product.id}
                        className="group rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-indigo-200 sm:p-6"
                      >
                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
                          {/* Gambar Produk */}
                          <div className="flex-shrink-0">
                            <div className="h-24 w-24 overflow-hidden rounded-2xl bg-gray-50 p-2 sm:h-32 sm:w-32">
                              <img
                                src={`${BASE_URL}/${product.thumbnail}`}
                                alt={product.name}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          </div>

                          {/* Info Produk */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                  {product.brand.name}
                                </p>
                                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                  {product.name}
                                </h3>
                                <p className="text-lg font-bold text-indigo-600 sm:text-xl">
                                  {formatCurrency(product.price)}
                                  <span className="text-sm font-normal text-gray-500">
                                    /unit
                                  </span>
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(product.slug)}
                                className="group flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Kontrol Jumlah */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600">
                                  Jumlah:
                                </span>
                                <div className="flex items-center space-x-1 rounded-full bg-gray-100 p-1">
                                  <button
                                    onClick={() =>
                                      handleDecreaseQuantity(product.slug)
                                    }
                                    disabled={cartItem?.quantity === 1}
                                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 12H4"
                                      />
                                    </svg>
                                  </button>
                                  <span className="min-w-[2rem] text-center text-sm font-semibold">
                                    {cartItem?.quantity || 1}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleIncreaseQuantity(product.slug)
                                    }
                                    disabled={cartItem?.quantity === 10}
                                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">
                                  {formatCurrency(
                                    product.price * (cartItem?.quantity || 1)
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3zM7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Keranjang Anda kosong
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Mulai berbelanja untuk menambahkan item ke keranjang.
                  </p>
                  <Link
                    to="/"
                    className="mt-4 inline-flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <span>Lanjut Belanja</span>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Ringkasan Pesanan */}
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                  Ringkasan Pesanan
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-gray-600">Total Jumlah</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {totalQuantity} Item
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-gray-600">Sub Total</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span className="text-gray-600">Kode Diskon</span>
                    </div>
                    <span className="font-semibold text-gray-900">Rp 0</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-600">Pajak 11%</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(tax)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="h-5 w-5 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-lg font-semibold text-gray-900">
                          Total Keseluruhan
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-indigo-600">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={handleProceedOrder}
                    className="mt-6 flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  >
                    <span className="font-semibold">Lanjutkan Pemesanan</span>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
