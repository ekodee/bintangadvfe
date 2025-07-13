import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function SingleRowFloatingNavbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to determine active menu based on URL
  const getActiveMenu = (pathname: string) => {
    if (pathname === "/" || pathname === "/browse") {
      return "beranda";
    } else if (
      pathname.startsWith("/product") ||
      pathname.startsWith("/category")
    ) {
      return "products";
    } else if (pathname.startsWith("/check-order")) {
      return "pesanan";
    } else if (pathname.startsWith("/help")) {
      return "help";
    }
    return "beranda";
  };

  // Define activeMenu state
  const [activeMenu, setActiveMenu] = useState(
    getActiveMenu(location.pathname)
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update active menu when route changes
    setActiveMenu(getActiveMenu(location.pathname));
  }, [location.pathname]);

  const menuItems = [
    { id: "beranda", label: "Beranda", icon: "🏠", href: "/" },
    { id: "products", label: "Jelajah Produk", icon: "📦", href: "/products" },
    { id: "pesanan", label: "Lacak Produk", icon: "📋", href: "/check-order" },
    { id: "help", label: "Pusat Bantuan", icon: "💬", href: "/help" },
  ];

  return (
    <>
      {/* Desktop Single Row Layout */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl shadow-lg"
            : "bg-white/70 backdrop-blur-md"
        } hidden md:block`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo - Left Side */}
            <Link to="/" className="flex items-center group">
              <div className="relative w-32 h-12 lg:w-40 lg:h-16 group-hover:scale-105 transition-all duration-500">
                <img
                  src="../public/assets/images/logos/logo_transparent.svg" // ganti dengan path file logo kamu
                  alt="Logo Bintang Adv"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
              </div>
            </Link>

            {/* Center - Clean Navigation without wrapper */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`relative px-5 lg:px-6 py-2.5 lg:py-3 font-semibold text-sm lg:text-base transition-all duration-400 rounded-full group ${
                      activeMenu === item.id
                        ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform scale-105"
                        : "text-slate-700 hover:text-slate-900 hover:bg-white/70 hover:scale-105 hover:shadow-md"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Hover background */}
                    {activeMenu !== item.id && (
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/70 rounded-full transition-all duration-300 -z-10 group-hover:backdrop-blur-sm"></div>
                    )}

                    {/* Active state background */}
                    {activeMenu === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-100 transition-all duration-400 shadow-lg"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cart - Right Side */}
            <Link to="/cart" className="group relative">
              <div className="flex items-center space-x-3 px-5 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/70 rounded-xl hover:from-white hover:to-slate-50 hover:border-slate-300 hover:shadow-lg hover:scale-105 transition-all duration-400">
                <div className="relative">
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6 text-slate-700 group-hover:text-blue-600 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.92A2 2 0 007.16 19h8.68a2 2 0 001.84-1.08L19 13M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6M9 9h6"
                    />
                  </svg>
                 
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-all duration-300 text-sm lg:text-base">
                  Cart
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-xl"
            : "bg-white/80 backdrop-blur-lg"
        } md:hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 pointer-events-none"></div>

        <div className="relative px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-32 h-12 lg:w-40 lg:h-16 group-hover:scale-105 transition-all duration-500">
                <img
                  src="/assets/images/logos/logo_transparent.png" // ganti dengan path file logo kamu
                  alt="Logo Bintang Adv"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500"></div>
              </div>
            </Link>

            {/* Mobile Cart */}
            <Link to="/cart" className="relative group">
              <div className="p-3 bg-slate-50 hover:bg-white rounded-xl border border-slate-200/50 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
                <svg
                  className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.92A2 2 0 007.16 19h8.68a2 2 0 001.84-1.08L19 13M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6M9 9h6"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - All items with consistent styling */}
      <nav className="fixed bottom-0 left-0 right-0 z-[60] md:hidden">
        <div className="mx-auto max-w-[640px]">
          <div className="relative bg-white/90 backdrop-blur-xl border-t border-slate-200/50 px-4 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50/30 to-transparent pointer-events-none"></div>

            <ul className="relative flex justify-between items-center">
              {menuItems.map((item) => (
                <li key={item.id} className="flex items-center">
                  <Link
                    to={item.href}
                    className="group relative transition-all duration-400"
                  >
                    {/* All menu items now have consistent styling */}
                    <div className="flex w-16 flex-col items-center gap-1.5 py-3">
                      <div
                        className={`relative p-3 rounded-2xl transition-all duration-400 ${
                          activeMenu === item.id
                            ? "bg-gradient-to-br from-blue-100 to-purple-100 scale-110 shadow-lg"
                            : "group-hover:bg-slate-100 group-hover:scale-105"
                        }`}
                      >
                        <span
                          className={`text-xl transition-all duration-300 ${
                            activeMenu === item.id
                              ? "text-blue-600"
                              : "text-slate-600 group-hover:text-slate-700"
                          }`}
                        >
                          {item.icon}
                        </span>

                        {activeMenu === item.id && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl opacity-30 blur"></div>
                        )}
                      </div>

                      <p
                        className={`text-xs font-semibold leading-tight text-center transition-all duration-300 ${
                          activeMenu === item.id
                            ? "text-blue-600"
                            : "text-slate-600 group-hover:text-slate-700"
                        }`}
                      >
                        {item.label}
                      </p>

                      <div
                        className={`transition-all duration-400 ${
                          activeMenu === item.id
                            ? "w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"
                            : "w-0 h-0"
                        }`}
                      ></div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        @supports (backdrop-filter: blur(20px)) {
          .backdrop-blur-xl {
            backdrop-filter: blur(20px);
          }
          .backdrop-blur-lg {
            backdrop-filter: blur(16px);
          }
          .backdrop-blur-md {
            backdrop-filter: blur(12px);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
}
