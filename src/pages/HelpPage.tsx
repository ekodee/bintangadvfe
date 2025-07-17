import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HelpPage() {
  return (
    <>
      {/* Header */}
      <header>
        <Navbar />
      </header>
      {/* Hero Section */}
      <section className="relative py-26 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6 float-animation">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Ada yang bisa kami{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              bantu?
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Temukan jawaban atas pertanyaan Anda seputar layanan percetakan kami
          </p>
        </div>
      </section>
      {/* Quick Links */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Bantuan Cepat
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="#faq"
              className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-blue-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">FAQ</h3>
              <p className="text-slate-600">
                Pertanyaan yang sering ditanyakan
              </p>
            </a>
            <a
              href="#contact"
              className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-green-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Hubungi Kami
              </h3>
              <p className="text-slate-600">Kontak customer service</p>
            </a>
            <a
              href="#guide"
              className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-purple-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Panduan
              </h3>
              <p className="text-slate-600">Tutorial cara memesan</p>
            </a>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Pertanyaan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Umum
            </span>
          </h2>
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-slate-50 rounded-xl border border-slate-200">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors rounded-xl"
                // onclick="toggleAccordion(1)"
              >
                <span className="font-semibold text-slate-800">
                  Jenis file apa saja yang bisa dicetak?
                </span>
              </button>
              <div className="accordion-content px-6 pb-4" id="content-1">
                <p className="text-slate-600">
                  Kami menerima file dalam format PDF, JPG, PNG, AI, PSD, dan
                  CDR. Untuk hasil terbaik, gunakan resolusi 300 DPI dengan
                  format PDF atau AI.
                </p>
              </div>
            </div>
            {/* FAQ Item 2 */}
            <div className="bg-slate-50 rounded-xl border border-slate-200">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors rounded-xl"
                // onclick="toggleAccordion(2)"
              >
                <span className="font-semibold text-slate-800">
                  Berapa lama waktu pengerjaan?
                </span>
              </button>
              <div className="accordion-content px-6 pb-4" id="content-2">
                <p className="text-slate-600">
                  • Poster, flyer, kartu nama: 1-2 hari kerja
                  <br />
                  • Banner, spanduk: 2-3 hari kerja
                  <br />
                  • Buku, majalah: 3-5 hari kerja
                  <br />• Packaging, dus: 5-7 hari kerja
                </p>
              </div>
            </div>
            {/* FAQ Item 3 */}
            <div className="bg-slate-50 rounded-xl border border-slate-200">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors rounded-xl"
                // onclick="toggleAccordion(3)"
              >
                <span className="font-semibold text-slate-800">
                  Bagaimana cara melakukan pembayaran?
                </span>
              </button>
              <div className="accordion-content px-6 pb-4" id="content-3">
                <p className="text-slate-600">
                  Kami menerima pembayaran melalui transfer bank (BCA, Mandiri,
                  BRI), e-wallet (OVO, DANA, GoPay), dan tunai untuk pengambilan
                  langsung di tempat.
                </p>
              </div>
            </div>
            {/* FAQ Item 4 */}
            <div className="bg-slate-50 rounded-xl border border-slate-200">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors rounded-xl"
                // onclick="toggleAccordion(4)"
              >
                <span className="font-semibold text-slate-800">
                  Apakah ada layanan antar?
                </span>
              </button>
              <div className="accordion-content px-6 pb-4" id="content-4">
                <p className="text-slate-600">
                  Ya, kami menyediakan layanan antar untuk area Jakarta, Bogor,
                  Depok, Tangerang, dan Bekasi. Biaya pengiriman mulai dari Rp
                  25.000 tergantung jarak dan berat pesanan.
                </p>
              </div>
            </div>
            {/* FAQ Item 5 */}
            <div className="bg-slate-50 rounded-xl border border-slate-200">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors rounded-xl"
                // onclick="toggleAccordion(5)"
              >
                <span className="font-semibold text-slate-800">
                  Bagaimana jika hasil cetak tidak sesuai?
                </span>
              </button>
              <div className="accordion-content px-6 pb-4" id="content-5">
                <p className="text-slate-600">
                  Jika hasil cetak tidak sesuai karena kesalahan dari pihak
                  kami, kami akan melakukan cetak ulang gratis. Untuk keluhan,
                  silakan hubungi customer service dalam maksimal 3 hari setelah
                  pengambilan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Hubungi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Kami
            </span>
          </h2>
          <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.746" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">WhatsApp</h3>
              <p className="text-slate-600 mb-3">Chat langsung dengan kami</p>
              <a
                href="https://wa.me/6285743275318"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Chat Sekarang
              </a>
            </div>
            {/* Email */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Email</h3>
              <p className="text-slate-600 mb-3">Kirim pertanyaan Anda</p>
              <a
                href="mailto:msafiiekokuncoro1@gmail.com"
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Kirim Email
              </a>
            </div>
            {/* Location */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
              <h3 className="font-semibold text-slate-800 mb-2">Alamat</h3>
              <p className="text-slate-600 mb-3">Kunjungi toko kami</p>
              <a
                href="https://maps.app.goo.gl/DNP47xmWGADWq6Kr7"
                className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Lihat Lokasi
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>
      {/* Guide Section */}
      <section id="guide" className="pt-9 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Panduan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Pemesanan
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                1
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Pilih Produk
              </h3>
              <p className="text-slate-600 text-sm">
                Pilih jenis produk yang ingin dicetak dari katalog kami
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                2
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Upload File</h3>
              <p className="text-slate-600 text-sm">
                Upload file desain Anda atau gunakan template yang tersedia
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                3
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Konfirmasi</h3>
              <p className="text-slate-600 text-sm">
                Konfirmasi detail pesanan dan lakukan pembayaran
              </p>
            </div>
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                4
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Selesai</h3>
              <p className="text-slate-600 text-sm">
                Pesanan akan diproses dan siap diambil sesuai jadwal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <svg
                className="w-7 h-7 text-blue-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Ketentuan Pengiriman
            </h3>
            <ul className="space-y-3 text-lg text-slate-700">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Pengiriman tersedia untuk seluruh wilayah Indonesia.
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Seluruh biaya pengiriman ditanggung oleh pembeli.
              </li>
            </ul>
          </div>

          <hr className="my-8 border-slate-300" />

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <svg
                className="w-7 h-7 text-purple-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Langkah-langkah Detail
            </h3>
            <ol className="space-y-4 text-lg text-slate-700">
              <li className="flex items-start">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-4 mt-0.5 flex-shrink-0">
                  1
                </span>
                Pilih produk yang diinginkan.
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-4 mt-0.5 flex-shrink-0">
                  2
                </span>
                Kirim file desain melalui email di menu "Order".
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-4 mt-0.5 flex-shrink-0">
                  3
                </span>
                Lakukan pembayaran ke rekening yang tercantum.
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-4 mt-0.5 flex-shrink-0">
                  4
                </span>
                Upload bukti pembayaran di halaman website.
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-base font-bold mr-4 mt-0.5 flex-shrink-0">
                  5
                </span>
                Lacak status pesanan melalui menu "Lacak Produk".
              </li>
            </ol>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </>
  );
}
