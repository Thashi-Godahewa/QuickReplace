export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-6 md:px-12 overflow-hidden bg-slate-900">
      {/* Hero Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Professional handyman technician performing property maintenance"
          className="w-full h-full object-cover object-center scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrLF0mZbhpwPmlGPapwj1s-32Porpr-JJHkCXJsumvgm-UaReyr1TwfJwh5vrBSx5QIiPlzwghBlHk_v82kvjETfDhyfWmb7HPjNLYyNJH-RhFYxAQh4CYefd6cAu0VTU8gBrkUQugmLXDozSyhQZfNb44DRqYc7JHxWkMFuHG695onDPxTUz5HsoJcvXfA8B_2jJBRCNbmoOp299zj3qIw4KNtXLV4tdBy_xGDj_k7_CqOZrO6GCy"
        />
        <div className="absolute inset-0 hero-mask"></div>
      </div>

      {/* Hero Content Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        {/* Left Hero Text Column */}
        <div className="lg:col-span-7 text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-200 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            24/7 Rapid Dispatch Available • Licensed Trades &amp; Make-Safe Pros
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight text-white max-w-2xl" id="hero-heading">
            Reliable Property Maintenance &amp; <span className="text-blue-500 font-bold">Quick Replace</span> Solutions
          </h1>

          <p className="text-base sm:text-lg text-slate-200/90 max-w-xl font-normal leading-relaxed">
            Rapid, certified property maintenance, emergency make-safe repairs, and installations for homes &amp; commercial premises. When you need it done right, fast.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a className="inline-flex items-center gap-3 bg-white text-slate-900 hover:bg-blue-600 hover:text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all duration-200 group" href="#contact">
              <span>Book a Free Call</span>
              <div className="w-6 h-6 rounded-full bg-slate-900 group-hover:bg-white group-hover:text-blue-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-all">
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
            <a className="inline-flex items-center gap-2 text-white/90 hover:text-blue-400 font-medium text-sm px-4 py-3 rounded-full border border-white/20 hover:border-blue-400 backdrop-blur-sm transition-colors" href="#projects">
              <span>Explore Past Works</span>
            </a>
          </div>

          {/* Star Rating Widget */}
          <div className="pt-6 flex items-center gap-3 border-t border-white/10 max-w-md">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-300">500+ Verified Customer Reviews</span>
          </div>
        </div>

        {/* Right Floating Glassmorphism Metric Card */}
        <div className="lg:col-span-5 flex justify-end">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl dark-glass-effect shadow-glass text-white space-y-6 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center">
                  50K<span className="text-blue-500 font-bold">+</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium leading-snug">
                  Cured satisfied customers around the globe with precision care.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-3 overflow-hidden p-1">
                {[
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAklHJqtSXk7-k_6cZ5Emt3FAG6cdVNyJ3v9XZjLW3BOGVVqKKia2aY_qLeU1xbctNyxy69staqwfgchrj9JA-km1BP5QNiH4HOKoAA-a9tJFguLXmi8Y7wq6C_lZnVHa2wBP5yEaSc7K1moXtr98kLx9E6Qsc9D9W3GrC9FpCEc6BrmAfBLXl_f_hC2MU2F7nUAsV7vOWHHOhUj3fO-ibl2YQLDcxVl2lHaYBUZJvNWOv9EEvkTI3L',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDEEeEcw-xpj4uBxmozFs5Wc6RJduLq0HzM7rW_gCXUrU1Dxo4rGsPfy_rpVMa8OhZd7N7YpqkXmsEuBJaejW2CD0BeLfsDzaN2kHqPLTZcXhfJuazhYn4bXKmQWQSeUMuwbkCSvCZwwjglNs7z2m9Ot9K5ayCyX9tTT1Fl1pG-SpXUIxwiKzRDxVGqmyj7yIlDMik9q17zE3S-pZTa0HjsqVgauKyM4cty8dlT6t1U0SBblDpFHU7z',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBBUwgqXDhSQg5pWT7GnioEiN10muK1UI2G0KlcjCBOwIPTi6WeIACl3C-GUVUCV2DNH7EPqXhj8kSEY07_B3rb8XNhR7hRzA_kv17TUyfDRmwY8TXRm_PTptU8lGflhWWXbdZbPDDdshrUcI24Nj4U_kXru6pc2854nCEy6ms9SKx_j4kff6oeRktPvna8S4BX5MdcgSIt952Jl5BruTzaa-LjB8_7M6YBsRgLDaEecHEqoadST0Ph',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtrjFWfLliCOC2cvOSSOlaUGPL1lK4MR_xSbPZGScJgU2hrLkvw2M_mCDo1uZPAtNU8vZhJhBExSjbBEMQP3oAcov5NZoaukife-9Mdc2oSyW-u606KKcBCZr2QTHOewtUl0hV4PZ5saXNQe_SuGi4ZPN5d70N7lMf3OPrAWAxqIWLtb6TyvjStDE3SD3S0WNm546uDUMl_eVqV8NtmvsIFoYEbA4lzJmiAmuLjQoi6vDdhQG0ubzf',
                ].map((src, i) => (
                  <img key={i} alt="Customer avatar" className="inline-block h-11 w-11 rounded-full ring-2 ring-slate-900 object-cover" src={src} />
                ))}
              </div>
              <a className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-blue-600 hover:text-white text-xs font-bold py-2.5 px-4 rounded-full transition-colors shadow-sm" href="#contact">
                <span>Contact Now</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
