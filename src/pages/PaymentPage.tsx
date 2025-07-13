import { useEffect, useState } from "react";
import { CartItem, OrderFormData, Product } from "../types/type";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiServices";
import { paymentSchema } from "../types/validationOrder";
// import AccordionSection from "../components/AccordionSection";

type FormData = {
  proof: File | null;
  product_ids: { id: number; quantity: number }[]; // Updated to include quantity
};

export default function PaymentPage() {
  const [formData, setFormData] = useState<FormData>({
    proof: null,
    product_ids: [],
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);
  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // pajak
  const TAX_RATE = 0.11;
  const navigate = useNavigate();

  // Fetch Service Details and Booking Data
  const fetchProductDetails = async (cartItems: CartItem[]) => {
    try {
      const fetchedDetails = await Promise.all(
        cartItems.map(async (item) => {
          const response = await apiClient.get(`/product/${item.slug}`);
          return response.data.data;
        })
      );
      setProductDetails(fetchedDetails);
      setLoading(false);

      // Map each cart item to include both 'id' and 'quantity'
      const productIdsWithQuantities = cartItems.map((cartItem) => ({
        id: cartItem.product_id,
        quantity: cartItem.quantity,
      }));

      setFormData((prevData) => ({
        ...prevData,
        product_ids: productIdsWithQuantities,
      }));
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Gagal memuat detail produk");
      setLoading(false);
    }
  };

  // Load cart and booking data, and fetch services
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const savedOrderData = localStorage.getItem("orderData");

    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData) as OrderFormData);
    }

    if (!cartData || (cartData && JSON.parse(cartData).length === 0)) {
      navigate("/");
      return;
    }

    const cartItems = JSON.parse(cartData) as CartItem[];
    setCart(cartItems);
    fetchProductDetails(cartItems);
  }, [navigate]);

  // pajak
  const subtotal = productDetails.reduce((acc, product) => {
    const cartItem = cart.find((item) => item.product_id === product.id);
    return acc + (cartItem ? product.price * cartItem.quantity : 0);
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Handle file input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      proof: file,
    }));
    setFileName(file ? file.name : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = paymentSchema.safeParse(formData);

    if (!validation.success) {
      setFormErrors(validation.error.issues);
      return;
    }

    setFormErrors([]);

    const submissionData = new FormData();

    if (formData.proof) {
      submissionData.append("proof", formData.proof);
    }

    if (orderData) {
      submissionData.append("name", orderData.name);
      submissionData.append("email", orderData.email);
      submissionData.append("phone", orderData.phone);
      submissionData.append("address", orderData.address);
      submissionData.append("city", orderData.city);
      submissionData.append("post_code", orderData.post_code);
    }

    // Append each cosmetic ID and quantity to the form data with correct structure
    formData.product_ids.forEach((item, index) => {
      submissionData.append(`product_ids[${index}][id]`, String(item.id));
      submissionData.append(
        `product_ids[${index}][quantity]`,
        String(item.quantity)
      );
    });

    try {
      setLoading(true);
      const response = await apiClient.post(
        "/order-transaction",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Transaction response data:", response.data.data); // Check the response
        const orderTrxId = response.data.data.order_trx_id;
        const email = response.data.data.email;

        if (!orderTrxId) {
          console.error("Error: order_trx_id is undefined");
        }
        localStorage.removeItem("cart");
        localStorage.removeItem("orderData");
        setFormData({ proof: null, product_ids: [] });
        setLoading(false);
        navigate(`/order-finished?trx_id=${orderTrxId}&email=${email}`);
      } else {
        console.error("Unexpected response status:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting payment proof:", error);
      setLoading(false);
      setFormErrors([]);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-gray-600">Memuat data pembayaran...</p>
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
          <p className="text-red-600">Gagal memuat pembayaran: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header Navigasi */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/order" className="group flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all group-hover:border-indigo-300 group-hover:bg-indigo-50">
                <svg className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="hidden text-sm font-medium text-gray-600 group-hover:text-indigo-600 sm:block">Kembali ke Pemesanan</span>
            </Link>

            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Pembayaran</h1>
              <p className="text-xs text-gray-500">Kami berikan layanan terbaik</p>
            </div>

            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <div className="flex items-center justify-between">
            {/* Langkah 1 - Pemesanan (Selesai) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-600">Pemesanan</span>
            </div>

            {/* Garis Progress 1 */}
            <div className="flex-1 mx-4">
              <div className="h-1 rounded-full bg-green-200">
                <div className="h-1 w-full rounded-full bg-green-600"></div>
              </div>
            </div>

            {/* Langkah 2 - Pembayaran (Aktif) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                2
              </div>
              <span className="text-sm font-semibold text-indigo-600">Pembayaran</span>
            </div>

            {/* Garis Progress 2 */}
            <div className="flex-1 mx-4">
              <div className="h-1 rounded-full bg-gray-200"></div>
            </div>

            {/* Langkah 3 - Pengiriman (Tidak Aktif) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-600">
                3
              </div>
              <span className="text-sm font-semibold text-gray-500">Pengiriman</span>
            </div>
          </div>
        </div>

        {/* Judul Halaman */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Lakukan Pembayaran</h2>
          <p className="mt-2 text-gray-600">Selesaikan pesanan Anda dengan memberikan bukti pembayaran</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Detail Pembayaran dan Metode */}
          <div className="space-y-6 lg:col-span-2">
            {/* Ringkasan Pembayaran */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
              <div className="mb-6 flex items-center space-x-3">
                <div className="rounded-xl bg-blue-100 p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Ringkasan Pesanan</h3>
                  <p className="text-sm text-gray-600">Tinjau detail pesanan Anda</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-600">Total Jumlah</span>
                  </div>
                  <span className="font-semibold text-gray-900">{totalQuantity} Item</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-gray-600">Sub Total</span>
                  </div>
                  <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-gray-600">Kode Diskon</span>
                  </div>
                  <span className="font-semibold text-gray-900">Rp 0</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11V6" />
                    </svg>
                    <span className="text-gray-600">Ongkos Kirim</span>
                  </div>
                  <span className="font-semibold text-green-600">Rp 0 (Promo)</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-600">Asuransi</span>
                  </div>
                  <span className="font-semibold text-green-600">Termasuk</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">Pajak 11%</span>
                  </div>
                  <span className="font-semibold text-gray-900">{formatCurrency(tax)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-lg font-semibold text-gray-900">Total Keseluruhan</span>
                    </div>
                    <span className="text-2xl font-bold text-indigo-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="space-y-6">
              {/* Transfer Bank */}
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                <div className="mb-6 flex items-center space-x-3">
                  <div className="rounded-xl bg-blue-100 p-2">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Transfer Bank</h3>
                    <p className="text-sm text-gray-600">Transfer ke rekening bank kami</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-2xl bg-blue-50 p-4">
                    <img
                      src="/assets/images/thumbnails/bca.png"
                      alt="BCA"
                      className="h-12 w-16 rounded-lg object-contain"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-600">Bank Central Asia</h4>
                      <p className="text-lg font-bold text-gray-900">9893981092</p>
                      <p className="text-sm text-gray-600">Suginto</p>
                    </div>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                      Salin
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 rounded-2xl bg-yellow-50 p-4">
                    <img
                      src="/assets/images/thumbnails/mandiri.png"
                      alt="Mandiri"
                      className="h-12 w-16 rounded-lg object-contain"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-600">Bank Mandiri</h4>
                      <p className="text-lg font-bold text-gray-900">193084820912</p>
                      <p className="text-sm text-gray-600">Sugianto</p>
                    </div>
                    <button className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700">
                      Salin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Konfirmasi Pembayaran */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <form onSubmit={handleSubmit}>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                  <div className="mb-6 flex items-center space-x-3">
                    <div className="rounded-xl bg-indigo-100 p-2">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Pembayaran</h3>
                      <p className="text-sm text-gray-600">Upload bukti pembayaran Anda</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-900">Bukti Pembayaran</label>
                      <div className="group relative">
                        <div className="flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-all hover:border-indigo-400 hover:bg-indigo-50">
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="mt-4">
                              <label htmlFor="file-upload" className="cursor-pointer">
                                <span className="mt-2 block text-sm font-medium text-gray-900">
                                  {fileName || 'Upload bukti pembayaran'}
                                </span>
                                <span className="mt-1 block text-xs text-gray-500">
                                  PNG, JPG, PDF maksimal 10MB
                                </span>
                              </label>
                              <input
                                id="file-upload"
                                name="proof"
                                type="file"
                                className="sr-only"
                                onChange={handleChange}
                                accept="image/*,.pdf"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {formErrors.find((error) => error.path.includes("proof")) && (
                        <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm">
                            {formErrors.find((error) => error.path.includes("proof"))?.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="font-semibold">Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-semibold">Konfirmasi Pembayaran</span>
                          <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}