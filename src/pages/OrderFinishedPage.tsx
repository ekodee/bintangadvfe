import { Link, useLocation } from "react-router-dom";

export default function OrderFinishedPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderTrxId = queryParams.get("trx_id");
  const email = queryParams.get("email");

  const copyToClipboard = (text: string, type: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert(`${type} berhasil disalin ke clipboard!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Pola Latar Belakang */}
      <div className="absolute inset-0 bg-black/10"></div>

      <main className="relative mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 rounded-3xl bg-white/90 backdrop-blur-sm p-6 shadow-lg sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-lg font-bold text-gray-900">Pesanan Selesai</h1>
            <p className="text-sm text-gray-600">Kami berikan layanan terbaik</p>
          </div>

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

            {/* Langkah 2 - Pembayaran (Selesai) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-600">Pembayaran</span>
            </div>

            {/* Garis Progress 2 */}
            <div className="flex-1 mx-4">
              <div className="h-1 rounded-full bg-green-200">
                <div className="h-1 w-full rounded-full bg-green-600"></div>
              </div>
            </div>

            {/* Langkah 3 - Pengiriman (Selesai) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-600">Pengiriman</span>
            </div>
          </div>
        </div>

        {/* Pesan Sukses */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
              <svg className="h-16 w-16 text-white sm:h-20 sm:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Pesanan Selesai!
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
            Gunakan informasi di bawah agar anda dapat melihat status pemesanannya
          </p>
        </div>

        {/* Informasi Pesanan */}
        <div className="mb-8 rounded-3xl bg-white/90 backdrop-blur-sm p-6 shadow-lg sm:p-8">
          <div className="mb-6 flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-100 p-2">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informasi Pesanan</h3>
              <p className="text-sm text-gray-600">Simpan informasi ini untuk catatan Anda</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* ID Transaksi */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                ID Transaksi Pemesanan
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <div className="h-6 w-px bg-gray-200"></div>
                  </div>
                </div>
                <input
                  type="text"
                  value={orderTrxId || "Tidak Terdefinisi"}
                  readOnly
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-16 pr-12 text-gray-900 font-semibold focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(orderTrxId || "", "ID Transaksi")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Salin
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Alamat Email
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <div className="h-6 w-px bg-gray-200"></div>
                  </div>
                </div>
                <input
                  type="text"
                  value={email || "Tidak Terdefinisi"}
                  readOnly
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-16 pr-12 text-gray-900 font-semibold focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(email || "", "Email")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Salin
                </button>
              </div>
            </div>
          </div>

          {/* Pesan Sukses */}
          <div className="mt-6 rounded-2xl bg-green-50 p-4 border border-green-200">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-green-800">
                Pesanan Anda telah berhasil diproses dan akan segera dikirim!
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-2xl bg-green-50 p-4 border border-green-200">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
              </svg>
              <p className="text-sm font-medium text-red-800">
                Harap Catat ID Transaksi atau Screenshoot Halaman Ini
              </p>
            </div>
          </div>
        </div>

        

        {/* Tombol Aksi */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/"
            className="group flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3zM7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span className="font-semibold">Pesan Lagi</span>
          </Link>

          <Link
            to="/check-order"
            className="group flex items-center justify-center space-x-2 rounded-2xl bg-gray-900 px-6 py-4 text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="font-semibold">Cek Pesanan Saya</span>
          </Link>
        </div>

        {/* Bagian Bantuan */}
        <div className="mt-8 rounded-3xl bg-white/90 backdrop-blur-sm p-6 shadow-lg sm:p-8">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Butuh Bantuan?</h3>
            <p className="mb-4 text-gray-600">
              Jika Anda memiliki pertanyaan tentang pesanan Anda, jangan ragu untuk menghubungi tim dukungan kami.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:support@example.com"
                className="flex items-center space-x-2 rounded-xl bg-blue-100 px-4 py-2 text-blue-700 transition-colors hover:bg-blue-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Dukungan Email</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 rounded-xl bg-green-100 px-4 py-2 text-green-700 transition-colors hover:bg-green-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium">Dukungan Chat</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}