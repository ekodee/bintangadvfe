import { useEffect, useRef } from "react";

export default function Homepage() {
  const navbarRef = useRef<HTMLElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentSlideRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Slider functionality
    const slides = ["slide1", "slide2", "slide3"];

    const nextSlide = () => {
      if (slideRefs.current[currentSlideRef.current]) {
        const currentSlide = slideRefs.current[currentSlideRef.current];
        if (currentSlide) {
          currentSlide.style.opacity = "0";
        }
      }
      currentSlideRef.current = (currentSlideRef.current + 1) % slides.length;
      if (slideRefs.current[currentSlideRef.current]) {
        const nextSlideElement = slideRefs.current[currentSlideRef.current];
        if (nextSlideElement) {
          nextSlideElement.style.opacity = "0.3";
        }
      }
    };

    const slideInterval = setInterval(nextSlide, 4000);

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
        } else {
          navbar.style.boxShadow = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = "1";
          target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Initialize fade-in elements after component mounts
    setTimeout(() => {
      const fadeInElements = document.querySelectorAll(
        ".homepage-container .fade-in"
      );
      fadeInElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "all 0.6s ease";
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 100);

    // Cleanup
    return () => {
      clearInterval(slideInterval);
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const targetPosition = element.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToGuide = () => {
    // Navigasi ke HelpPage.tsx dengan ID guide
    window.location.href = "/help#guide";
  };

  return (
    <div className="homepage-container font-sans text-gray-800 overflow-x-hidden min-h-screen bg-white">
      <style>{`
        .homepage-container {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          color: #374151;
          background-color: white;
        }
        
        .homepage-container h1,
        .homepage-container h2,
        .homepage-container h3,
        .homepage-container h4,
        .homepage-container h5,
        .homepage-container h6 {
          font-weight: 700;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .homepage-container .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #f87171 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .homepage-container .slide-bg-1 {
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23f0f8ff" width="1200" height="800"/><circle cx="200" cy="200" r="100" fill="%23e6f3ff"/><circle cx="1000" cy="600" r="120" fill="%23cce7ff"/></svg>') center/cover;
        }
        
        .homepage-container .slide-bg-2 {
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23fef2f2" width="1200" height="800"/><polygon points="300,200 500,150 450,350" fill="%23fecaca"/></svg>') center/cover;
        }
        
        .homepage-container .slide-bg-3 {
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23f0f8ff" width="1200" height="800"/><ellipse cx="300" cy="400" rx="150" ry="200" fill="%23dbeafe"/></svg>') center/cover;
        }

        .homepage-container .animate-fade-in-up {
          animation: fadeInUp 1s ease forwards;
        }
      `}</style>

      {/* Navigation */}

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center overflow-hidden"
      >
        {/* Slider Background */}
        <div className="absolute inset-0">
          <div
            ref={(el) => {
              slideRefs.current[0] = el;
            }}
            id="slide1"
            className="slide absolute inset-0 slide-bg-1 opacity-30 transition-opacity duration-1000"
          ></div>
          <div
            ref={(el) => {
              slideRefs.current[1] = el;
            }}
            id="slide2"
            className="slide absolute inset-0 slide-bg-2 opacity-0 transition-opacity duration-1000"
          ></div>
          <div
            ref={(el) => {
              slideRefs.current[2] = el;
            }}
            id="slide3"
            className="slide absolute inset-0 slide-bg-3 opacity-0 transition-opacity duration-1000"
          ></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 opacity-0 transform translate-y-8 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            Wujudkan Ide Cetak Terbaik Anda
          </h1>
          <p
            className="text-lg md:text-xl mb-8 opacity-0 transform translate-y-8 animate-fade-in-up"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            Solusi percetakan premium dengan teknologi modern dan kualitas
            terjamin untuk semua kebutuhan bisnis dan personal Anda
          </p>
          <button
            onClick={() => scrollToSection("services")}
            className="bg-white/20 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 hover:-translate-y-1 transition-all duration-300 opacity-0 transform translate-y-8 animate-fade-in-up"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            Jelajahi Layanan
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            Tentang Bintang Advertising
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in">
              <div>
                <h3 className="text-xl font-semibold text-blue-500 mb-3">
                  Misi Kami
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Bintang Advertising hadir sebagai solusi percetakan terdepan
                  yang menggabungkan teknologi canggih dengan sentuhan personal.
                  Kami berkomitmen untuk menghadirkan kualitas cetak premium
                  yang memenuhi setiap kebutuhan klien.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-500 mb-3">
                  Visi Kami
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi perusahaan percetakan pilihan utama yang dikenal
                  karena inovasi, kualitas, dan pelayanan terbaik di Indonesia.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-500 mb-3">
                  Mengapa Pilih Kami?
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Teknologi percetakan terkini
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Tim profesional berpengalaman
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Kualitas terjamin dengan harga kompetitif
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Pelayanan 24/7 dan pengiriman cepat
                  </li>
                </ul>
              </div>
            </div>

            {/* Ganti emoji dengan gambar */}
            <div className="fade-in">
              <div className="bg-gradient-to-br from-blue-100 to-red-100 rounded-3xl h-96 flex items-center justify-center">
                <img
                  src="/assets/images/photos/profile.jpeg"
                  alt="Tentang Bintang Advertising"
                  className="h-full w-full object-cover object-top rounded-3xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            Layanan Kami
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
          </h2>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "📄",
                title: "Cetak Dokumen",
                desc: "Cetak dokumen berkualitas tinggi untuk kebutuhan kantor, presentasi, dan dokumen penting lainnya dengan berbagai pilihan kertas.",
              },
              {
                icon: "🖼️",
                title: "Cetak Foto & Poster",
                desc: "Cetak foto dan poster dengan kualitas profesional menggunakan teknologi printing terdepan untuk hasil yang tajam dan tahan lama.",
              },
              {
                icon: "📚",
                title: "Percetakan Buku",
                desc: "Layanan percetakan buku lengkap mulai dari novel, katalog, majalah hingga buku tahunan dengan binding berkualitas.",
              },
              {
                icon: "🎨",
                title: "Desain Grafis",
                desc: "Tim desainer profesional siap membantu mewujudkan ide kreatif Anda menjadi desain yang menarik dan efektif.",
              },
              {
                icon: "📦",
                title: "Packaging & Label",
                desc: "Solusi packaging custom dan label produk yang menarik untuk meningkatkan daya tarik produk Anda di pasaran.",
              },
              {
                icon: "🏪",
                title: "Promosi & Banner",
                desc: "Cetak banner, spanduk, dan materi promosi lainnya untuk mendukung kampanye marketing dan branding bisnis Anda.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="fade-in bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Order Process */}
          <div className="fade-in bg-gray-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-center mb-12">
              Cara Pemesanan
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {[
                {
                  num: "1",
                  title: "Konsultasi",
                  desc: "Hubungi kami untuk konsultasi kebutuhan cetak Anda",
                },
                {
                  num: "2",
                  title: "Quote & Design",
                  desc: "Dapatkan penawaran harga dan bantuan desain gratis",
                },
                {
                  num: "3",
                  title: "Produksi",
                  desc: "Proses cetak dengan teknologi dan material terbaik",
                },
                {
                  num: "4",
                  title: "Pengiriman",
                  desc: "Pengiriman cepat dan aman ke lokasi Anda",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {step.num}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Tombol Panduan Lengkap */}
            <div className="text-center">
              <button
                onClick={scrollToGuide}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-500 hover:to-blue-900 hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Lihat Panduan Lengkap
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section
        id="contact"
        className="bg-gradient-to-br from-blue-400 to-purple-500 text-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            Lokasi & Kontak
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-16 h-1 bg-white/30 rounded"></div>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-6">
                Kunjungi Showroom Kami
              </h3>
              <p className="mb-8 opacity-90">
                Datang langsung ke showroom untuk melihat sampel hasil cetak dan
                konsultasi langsung dengan tim ahli kami.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: "📍",
                    text: "Jl. kongsi 1 no 9, RT 06 RW 01 Bencongan, Kelapa Dua, Tangerang",
                  },
                  { icon: "📱", text: "0812-3456-7890" },
                  { icon: "✉️", text: "msafiiekokuncoro1@gmail.com" },
                  { icon: "🕒", text: "Senin - Sabtu: 08:00 - 20:00" },
                  { icon: "🕒", text: "Minggu: 09:00 - 17:00" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xl">{contact.icon}</span>
                    <span>{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl h-80 overflow-hidden">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.354554622775!2d106.60387357414798!3d-6.216887293771069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff94b742b9af%3A0xfb5e4f1e125920f5!2sBintang%20Advertising!5e0!3m2!1sid!2sid!4v1752743437586!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
