export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="card-glow text-center">
        <span className="hero-pill">Contact</span>
        <h2 className="page-title">Get in touch with BlueTech</h2>
        <p className="mx-auto max-w-2xl text-slate-300">
          Use this page to let visitors reach out for services, consultations, repairs, or partnership requests.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_0.85fr]">
        <div className="card-glow space-y-6">
          <div>
            <p className="section-heading">Write to us</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Questions, quotes, or business requests.</h3>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Email</p>
              <p className="mt-3 text-lg font-semibold text-white">bluetechsolutionsls@gmail.com</p>
            </div>
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Phone</p>
              <p className="mt-3 text-lg font-semibold text-white">+266 62757604</p>
            </div>
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Social</p>
              <p className="mt-3 text-lg font-semibold text-white">@blue_techsolutions</p>
            </div>
          </div>
        </div>

        <form className="card-glow space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Tell us about your project or question"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
            />
          </div>
          <button className="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
            Send message
          </button>
        </form>
      </section>
    </div>
  )
}
