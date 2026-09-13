export default function About() {
  return (
    <section aria-labelledby="about-heading" className="py-20 px-6 md:px-12 bg-white" id="about-us">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium tracking-wide text-slate-500 mb-6">/About us</div>
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-slate-900 tracking-tight leading-[1.15] mb-6" id="about-heading">
            With over 15+ years of experience, our team provides top-quality services
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-xl mb-10">
            From urgent plumbing and electrical faults to emergency glazing, locksmith lockouts, and make-safe structural work, Quick Replace delivers precision trade solutions when minutes matter.
          </p>
          <a className="inline-flex items-center gap-4 bg-slate-950 text-white font-medium pl-6 pr-2 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm group" href="#">
            <span className="text-sm sm:text-base font-semibold">About Us</span>
            <div className="w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>
        <div className="w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] lg:aspect-[4/3] w-full">
            <img
              alt="Professional master plumber inspecting pipe systems"
              className="w-full h-full object-cover rounded-3xl shadow-lg"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VVP4Wl0NkrDW-GegKyj2gNBNKyFZ0siG3-REp_-1IYnxvjCsrrkFe4vxoL8OezAchJCsfkeYxdA_zr9I2YGgC6MeR8oECsayE7yExwgXwxj5JK1H-fTsuNdHFH0Rs3D6gTavCCX-LkwLh6vd4-RJ8vcri86hpBbgPniEJnA903KDqsAsYeOwwyRQmc7JTSwOZFEVoYfuuwZCgj6-MHOSixkQW08GhCSEiZZ9S21xJ227hLce20qHxPCw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
