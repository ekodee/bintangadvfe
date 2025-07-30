import { Link, useLocation, useNavigate } from "react-router-dom";
import { OrderDetails } from "../types/type";
import { useEffect, useState } from "react";

interface LocationState {
  orderDetails: OrderDetails | null;
  notFound: boolean;
}

export default function MyOrderDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Check if location.state exists
  const { orderDetails, notFound } = (location.state as LocationState) || {};

  useEffect(() => {
    if (!orderDetails && !notFound) {
      navigate("/"); // Redirect if data not found
    }
  }, [orderDetails, notFound, navigate]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  // Format mata uang ke IDR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!orderDetails && !notFound) {
    return null; // Handle missing data
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header Navigasi */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/check-order" className="group flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all group-hover:border-indigo-300 group-hover:bg-indigo-50">
                <svg className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="hidden text-sm font-medium text-gray-600 group-hover:text-indigo-600 sm:block">Kembali ke Pencarian</span>
            </Link>

            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Detail Pesanan Saya</h1>
              <p className="text-xs text-gray-500">Kami berikan yang terbaik untuk Anda</p>
            </div>

            <a href="#" className="group flex items-center space-x-2">
              <span className="hidden text-sm font-medium text-gray-600 group-hover:text-indigo-600 sm:block">Ekspor</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all group-hover:border-indigo-300 group-hover:bg-indigo-50">
                <svg className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {notFound ? (
          /* Status Tidak Ditemukan */
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                Pesanan Tidak Ditemukan
              </h2>
              <p className="mb-8 text-gray-600">
                Silakan periksa transaksi Anda dengan kode pemesanan dan alamat email yang berbeda
              </p>
              <Link
                to="/check-order"
                className="inline-flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700"
              >
                <span className="font-semibold">Cari Pesanan Lain</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          orderDetails && (
            <div className="space-y-8">
              {/* Header Status Pesanan */}
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                  <div className={`rounded-full p-3 ${orderDetails.is_paid ? 'bg-green-100' : 'bg-amber-100'}`}>
                    <svg className={`h-8 w-8 ${orderDetails.is_paid ? 'text-green-600' : 'text-amber-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {orderDetails.is_paid ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <h2 className="text-2xl font-bold text-gray-900">Pesanan {orderDetails.order_trx_id}</h2>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${orderDetails.is_paid ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {orderDetails.is_paid ? 'BERHASIL' : 'MENUNGGU'}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {orderDetails.quantity} item • {formatCurrency(orderDetails.total_amount)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* Detail Pesanan */}
                <div className="space-y-6 lg:col-span-2">
                  {/* Bagian Produk */}
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                    <button
                      onClick={() => toggleSection('products')}
                      className="flex w-full items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="rounded-xl bg-blue-100 p-2">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11V6" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-gray-900">Produk yang Dibeli</h3>
                          <p className="text-sm text-gray-600">Item dalam pesanan Anda</p>
                        </div>
                      </div>
                      <svg 
                        className={`h-5 w-5 text-gray-400 transition-transform ${expandedSections.includes('products') ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedSections.includes('products') && (
                      <div className="mt-6 space-y-4">
                        {orderDetails.transaction_details.map((detail) => (
                          <div key={detail.id} className="rounded-2xl bg-gray-50 p-4 transition-all hover:bg-gray-100">
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white p-2">
                                <img
                                  src={`${BASE_URL}/${detail.product.thumbnail}`}
                                  alt={detail.product.name}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                  {detail.product.brand.name}
                                </p>
                                <h4 className="font-semibold text-gray-900">{detail.product.name}</h4>
                                <div className="mt-2 flex items-center justify-between">
                                  <p className="text-lg font-bold text-indigo-600">
                                    {formatCurrency(detail.product.price)}
                                  </p>
                                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">
                                    {detail.quantity} item
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Detail Pembayaran */}
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                    <button
                      onClick={() => toggleSection('payment')}
                      className="flex w-full items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="rounded-xl bg-green-100 p-2">
                          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-gray-900">Detail Pembayaran</h3>
                          <p className="text-sm text-gray-600">Rincian transaksi</p>
                        </div>
                      </div>
                      <svg 
                        className={`h-5 w-5 text-gray-400 transition-transform ${expandedSections.includes('payment') ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedSections.includes('payment') && (
                      <div className="mt-6 space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">ID Pemesanan</span>
                            <span className="font-semibold">{orderDetails.order_trx_id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Jumlah</span>
                            <span className="font-semibold">{orderDetails.quantity} Item</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sub Total</span>
                            <span className="font-semibold">{formatCurrency(orderDetails.sub_total_amount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pajak 0%</span>
                            <span className="font-semibold">{formatCurrency(orderDetails.total_tax_amount)}</span>
                          </div>
                          <div className="border-t border-gray-200 pt-3">
                            <div className="flex justify-between">
                              <span className="text-lg font-semibold text-gray-900">Total Keseluruhan</span>
                              <span className="text-2xl font-bold text-indigo-600">{formatCurrency(orderDetails.total_amount)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Informasi Pribadi */}
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                    <button
                      onClick={() => toggleSection('personal')}
                      className="flex w-full items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="rounded-xl bg-purple-100 p-2">
                          <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-gray-900">Informasi Pribadi</h3>
                          <p className="text-sm text-gray-600">Detail pengiriman</p>
                        </div>
                      </div>
                      <svg 
                        className={`h-5 w-5 text-gray-400 transition-transform ${expandedSections.includes('personal') ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedSections.includes('personal') && (
                      <div className="mt-6 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Nama</label>
                            <p className="font-semibold text-gray-900">{orderDetails.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Telepon</label>
                            <p className="font-semibold text-gray-900">{orderDetails.phone}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <p className="font-semibold text-gray-900">{orderDetails.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Kota</label>
                            <p className="font-semibold text-gray-900">{orderDetails.city}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Kode Pos</label>
                            <p className="font-semibold text-gray-900">{orderDetails.post_code}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Alamat</label>
                          <p className="font-semibold text-gray-900">{orderDetails.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar Progress Pesanan */}
                <div className="space-y-6 lg:col-span-1">
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
                    <h3 className="mb-6 text-lg font-semibold text-gray-900">Progress Pesanan</h3>
                    
                    <div className="space-y-6">
                      {/* Langkah 1 */}
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Pesanan Dibuat</h4>
                          <p className="text-sm text-gray-600">Pesanan Anda telah diterima</p>
                        </div>
                      </div>

                      {/* Garis Progress */}
                      <div className="ml-5 h-8 w-px bg-green-600"></div>

                      {/* Langkah 2 */}
                      <div className="flex items-center space-x-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${orderDetails.is_paid ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'}`}>
                          {orderDetails.is_paid ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Verifikasi Pembayaran</h4>
                          <p className="text-sm text-gray-600">
                            {orderDetails.is_paid ? 'Pembayaran dikonfirmasi' : 'Memeriksa status pembayaran'}
                          </p>
                        </div>
                      </div>

                      {/* Garis Progress */}
                      <div className={`ml-5 h-8 w-px ${orderDetails.is_paid ? 'bg-green-600' : 'bg-gray-300'}`}></div>

                      {/* Langkah 3 */}
                      <div className="flex items-center space-x-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${orderDetails.is_paid ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Sedang Dikirim</h4>
                          <p className="text-sm text-gray-600">
                            {orderDetails.is_paid ? 'Produk sedang dikirim' : 'Menunggu pembayaran'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hubungi Dukungan */}
                  <a
                    href="https://api.whatsapp.com/send?phone=6285743275318&text=Halo%20Bintang%20Adv%2C%20saya%20membutuhkan%20bantuan%20terkait%20pesanan%20saya."
                    className="group flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    <span className="font-semibold">Hubungi Pusat Layanan</span>
                    <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}