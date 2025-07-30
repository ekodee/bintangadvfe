import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OrderFormData } from "../types/type";
import { z } from "zod";
import { orderSchema } from "../types/validationOrder";

export default function OrderPage() {
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    email: "",
    phone: "",
    post_code: "",
    address: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("orderData");
    const cartData = localStorage.getItem("cart");

    if (!cartData || JSON.parse(cartData).length === 0) {
      navigate("/");
      return;
    }
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = orderSchema.safeParse(formData);

    if (!validation.success) {
      setFormErrors(validation.error.issues);
      return;
    }

    localStorage.setItem("orderData", JSON.stringify(formData));
    alert("Informasi pemesanan berhasil disimpan!");
    navigate("/payment");
    setFormErrors([]);
  };
  // Fungsi untuk membuka email dengan data customer
  const openEmailClient = () => {
    const subject = encodeURIComponent(
      `File Upload dari ${formData.name || "Customer"} - Pesanan`
    );

    const emailBody = encodeURIComponent(`Halo,

Saya ingin mengirimkan file desain untuk pesanan saya.

CUSTOMER: ${formData.name || "Belum diisi"}
EMAIL: ${formData.email || "Belum diisi"}
TELEPON: ${formData.phone || "Belum diisi"}
ALAMAT: ${formData.address || "Belum diisi"}, ${formData.city || "Belum diisi"}

Terima kasih!`);

    // Direct Gmail Compose Link
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=msafiiekokuncoro1@gmail.com&su=${subject}&body=${emailBody}`;

    // Coba buka Gmail langsung
    const newWindow = window.open(gmailLink, "_blank");

    // Check jika popup diblokir
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      alert(
        "Pop-up diblokir! Silakan izinkan pop-up untuk situs ini atau copy link berikut:\n\n" +
          gmailLink
      );
    } else {
      alert("Gmail terbuka di tab baru. Silakan attach file dan kirim email.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/cart" className="group flex items-center space-x-2">
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
                Kembali Ke Keranjang
              </span>
            </Link>

            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Pemesanan</h1>
              <p className="text-xs text-gray-500">Kami Berikan Layanan Terbaik</p>
            </div>

            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <div className="flex items-center justify-between">
            {/* Step 1 - Booking (Active) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                1
              </div>
              <span className="text-sm font-semibold text-indigo-600">
                Pemesanan
              </span>
            </div>

            {/* Progress Line 1 */}
            <div className="flex-1 mx-4">
              <div className="h-1 rounded-full bg-gray-200">
                <div className="h-1 w-0 rounded-full bg-indigo-600"></div>
              </div>
            </div>

            {/* Step 2 - Payment (Inactive) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-600">
                2
              </div>
              <span className="text-sm font-semibold text-gray-500">
                Pembayaran
              </span>
            </div>

            {/* Progress Line 2 */}
            <div className="flex-1 mx-4">
              <div className="h-1 rounded-full bg-gray-200"></div>
            </div>

            {/* Step 3 - Delivery (Inactive) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-600">
                3
              </div>
              <span className="text-sm font-semibold text-gray-500">
                Pengiriman
              </span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Mulai Pemesanan
          </h2>
          <p className="mt-2 text-gray-600">
            Silakan berikan informasi yang akurat untuk pesanan Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Personal Information */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
              <div className="mb-6 flex items-center space-x-3">
                <div className="rounded-xl bg-indigo-100 p-2">
                  <svg
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informasi Pribadi
                  </h3>
                  <p className="text-sm text-gray-600">
                    Masukkan detail kontak Anda
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Nama Lengkap
                  </label>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  {formErrors.find((error) => error.path.includes("name")) && (
                    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
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
                      <p className="text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("name")
                          )?.message
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Nomor Telepon
                  </label>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                      </div>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      placeholder="Masukkan nomor telepon Anda"
                    />
                  </div>
                  {formErrors.find((error) => error.path.includes("phone")) && (
                    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
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
                      <p className="text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("phone")
                          )?.message
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Alamat Email
                  </label>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                        <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                      </div>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      placeholder="Masukkan alamat email Anda"
                    />
                  </div>
                  {formErrors.find((error) => error.path.includes("email")) && (
                    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
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
                      <p className="text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("email")
                          )?.message
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
              <div className="mb-6 flex items-center space-x-3">
                <div className="rounded-xl bg-green-100 p-2">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informasi Pengiriman
                  </h3>
                  <p className="text-sm text-gray-600">
                    Kemana kami harus mengirim pesanan Anda?
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* City */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Kota
                  </label>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      placeholder="Masukkan nama kota Anda"
                    />
                  </div>
                  {formErrors.find((error) => error.path.includes("city")) && (
                    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
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
                      <p className="text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("city")
                          )?.message
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Alamat Lengkap
                  </label>
                  <div className="group relative">
                    <div className="absolute left-4 top-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                      </div>
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 resize-none"
                      placeholder="Masukkan alamat lengkap termasuk jalan, nomor, kecamatan, dll."
                    />
                  </div>
                  {formErrors.find((error) =>
                    error.path.includes("address")
                  ) && (
                    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
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
                      <p className="text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("address")
                          )?.message
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Post Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Kode Pos
                  </label>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-indigo-500"
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
                        <div className="h-6 w-px bg-gray-200 transition-colors group-focus-within:bg-indigo-300"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="post_code"
                      value={formData.post_code}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-4 pl-16 pr-4 text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      placeholder="Masukkan kode pos Anda"
                    />
                  </div>
                  {formErrors.find((error) =>
                    error.path.includes("post_code")
                  ) && (
                    <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-700">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
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
                      <p className="text-sm">
                        {
                          formErrors.find((error) =>
                            error.path.includes("post_code")
                          )?.message
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          

          {/* Section Kirim File Desain - Simplified */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <div className="mb-6 flex items-center space-x-3">
              <div className="rounded-xl bg-orange-100 p-2">
                <svg
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Kirim File Desain
                </h3>
                <p className="text-sm text-gray-600">
                  Kirim desain atau file pendukung untuk pesanan Anda
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Tombol Kirim Email */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  type="button"
                  onClick={openEmailClient}
                  className="group flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white transition-all duration-200 hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-4 focus:ring-orange-200"
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span className="font-semibold">
                    Buka Email & Kirim Desain
                  </span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>

                {/* Info Email */}
                <div className="rounded-xl bg-blue-50 p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-blue-800">
                      Email akan dikirim ke:{" "}
                      <span className="font-semibold">msafiiekokuncoro1@gmail.com</span>
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-blue-600">
                    Klik tombol di atas untuk membuka Gmail dan attach file
                    secara manual
                  </p>
                </div>
              </div>

              {/* Instruksi Sederhana */}
              <div className="rounded-xl bg-yellow-50 p-4">
                <div className="flex items-start space-x-3">
                  <svg
                    className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800">
                      Cara Mengirim File Desain:
                    </h4>
                    <ol className="mt-2 text-sm text-yellow-700 list-decimal list-inside space-y-1">
                      <li>Klik tombol "Buka Email & Kirim Desain"</li>
                      <li>
                        Gmail akan terbuka dengan template email siap pakai
                      </li>
                      <li>
                        Attach file desain Anda (drag & drop atau klik attach)
                      </li>
                      <li>Kirim email</li>
                    </ol>
                    <p className="mt-2 text-xs text-yellow-600">
                      Kami menerima file: JPG, PNG, PDF, DOC, AI, PSD, EPS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="group flex w-full max-w-md items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              <span className="font-semibold">Lanjut ke Pembayaran</span>
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
          </div>
        </form>
      </main>
    </div>
  );
}
