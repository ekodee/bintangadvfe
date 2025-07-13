import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { viewOrderSchema } from "../types/validationOrder";
import apiClient from "../services/apiServices";
import { isAxiosError } from "axios";
import Navbar from "../components/Navbar"

export default function MyOrdersPage() {
  const [formData, setFormData] = useState({
    email: "",
    order_trx_id: "",
  });
  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod
    const validation = viewOrderSchema.safeParse(formData);

    if (!validation.success) {
      setFormErrors(validation.error.issues);
      return;
    }

    // Clear any existing errors
    setFormErrors([]);
    setLoading(true);

    try {
      const response = await apiClient.post("/check-order", formData);

      if (response.status === 200 && response.data.data) {
        if (response.status === 200 && response.data.data) {
          // Simpan ke localStorage
            console.log(response.data.data);


          // Navigasi ke halaman detail
          navigate("/my-order", {
            state: { orderDetails: response.data.data, notFound: false },
          });
        }
      } else {
        // Navigate to booking details page with notFound flag if not found
        navigate("/my-order", {
          state: { orderDetails: null, notFound: true },
        });
      }
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 404) {
        // Navigate to booking details page with notFound flag if not found
        navigate("/my-order", {
          state: { orderDetails: null, notFound: true },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navigation bar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

        {/* Konten Utama */}
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl mt-10">

            {/* Form Pencarian */}
            <div className="mx-auto max-w-2xl">
              <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 sm:p-8 lg:p-10">
                {/* Header Form */}
                <div className="mb-8 text-center">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Cari Pesanan Anda
                  </h2>
                  <p className="text-gray-600">
                    Masukkan ID pemesanan dan alamat email untuk melanjutkan
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Field ID Transaksi Pemesanan */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-900">
                      ID Transaksi Pemesanan
                    </label>
                    <div className="group relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <div className="flex items-center space-x-3">
                          <svg className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                          <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="order_trx_id"
                        value={formData.order_trx_id}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:text-sm"
                        placeholder="Masukkan ID transaksi pemesanan Anda"
                      />
                    </div>
                    {formErrors.find((error) => error.path.includes("order_trx_id")) && (
                      <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">
                          {formErrors.find((error) => error.path.includes("order_trx_id"))?.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Field Email */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-900">
                      Alamat Email
                    </label>
                    <div className="group relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <div className="flex items-center space-x-3">
                          <svg className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                        </div>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:text-sm"
                        placeholder="Masukkan alamat email Anda"
                      />
                    </div>
                    {formErrors.find((error) => error.path.includes("email")) && (
                      <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">
                          {formErrors.find((error) => error.path.includes("email"))?.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tombol Submit */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-semibold text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Memeriksa...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Cari Pesanan Saya</span>
                      </div>
                    )}
                  </button>
                </form>

  
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}