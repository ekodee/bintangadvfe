export default function Footer() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285743275318"; // Nomor WhatsApp yang sama dengan yang ada di footer
    const message = encodeURIComponent("Halo! Saya tertarik dengan layanan percetakan Bintang Advertising. Bisa bantu saya?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .whatsapp-float {
          position: fixed;
          z-index: 1000;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .whatsapp-float:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
        }

        /* Desktop (1024px and up) */
        @media (min-width: 1024px) {
          .whatsapp-float {
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
          }
        }

        /* Laptop/Small Desktop (768px to 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .whatsapp-float {
            bottom: 25px;
            right: 25px;
            width: 55px;
            height: 55px;
          }
        }

        /* Tablet (481px to 767px) */
        @media (min-width: 481px) and (max-width: 767px) {
          .whatsapp-float {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
          }
        }

        /* Mobile/Handphone (up to 480px) */
        @media (max-width: 480px) {
          .whatsapp-float {
            bottom: 170px;
            right: 15px;
            width: 45px;
            height: 45px;
          }
        }

        .whatsapp-icon {
          color: white;
          font-size: 28px;
        }

        /* Responsive icon size */
        @media (max-width: 767px) {
          .whatsapp-icon {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-icon {
            font-size: 20px;
          }
        }
      `}</style>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        {/* Main Footer */}
        <div className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                 <div className="relative w-32 h-12 lg:w-40 lg:h-16 group-hover:scale-105 transition-all duration-500">
                    <img
                      src="/assets/images/logos/logo_transparent.png" // ganti dengan path file logo kamu
                      alt="Logo Bintang Adv"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
                  </div>
                </div>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                  Solusi percetakan terpercaya untuk segala kebutuhan bisnis dan
                  personal Anda dengan kualitas terbaik.
                </p>
                {/* Social Media */}
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017.017" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Services */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Layanan Kami</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Poster &amp; Banner
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Kartu Nama
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Brosur &amp; Flyer
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Spanduk
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Sticker &amp; Label
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Packaging &amp; Dus
                    </a>
                  </li>
                </ul>
              </div>
              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Menu</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Beranda
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Produk
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Cek Pesanan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Bantuan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Tentang Kami
                    </a>
                  </li>
                </ul>
              </div>
              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Kontak</h4>
                <div className="space-y-3 text-slate-400 text-sm">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0"
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
                    <div>
                      <p>Jl. kongsi 1 no 9, RT 06 RW 01 Bencongan, Kelapa Dua, Tangerang</p>
                    </div>
                  </div>
                
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-blue-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.746" />
                    </svg>
                    <a
                      href="https://wa.me/6285743275318"
                      className="hover:text-white transition-colors"
                    >
                      +62 8574 3275 318
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 text-blue-500 flex-shrink-0"
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
                    <a
                      href="mailto:msafiiekokuncoro1@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      msafiiekokuncoro1@gmail.com
                    </a>
                  </div>
                </div>
                {/* Operating Hours */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-500 mb-1">Jam Operasional:</p>
                  <p className="text-sm text-slate-400">
                    Senin - Sabtu: 08:00 - 18:00
                  </p>
                  <p className="text-sm text-slate-400">Minggu: 09:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="border-t border-slate-700 py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-slate-400">
                © 2024{" "}
                <span className="text-white font-semibold">Bintang Advertising</span>.
                All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <div 
          className="whatsapp-float"
          onClick={handleWhatsAppClick}
          title="Chat dengan kami di WhatsApp"
        >
          <svg
            className="whatsapp-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="28"
            height="28"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.746" />
          </svg>
        </div>
      </footer>
    </>
  );
}