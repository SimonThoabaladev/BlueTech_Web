const services = [
  'Web design',
  'Portfolio design',
  'Logo design',
  'Business profile design',
  'Network design & trouble shoot',
  'Shop/store front branding',
  'Computer repair',
  'Microsoft installation',
  'Microsoft activation',
  'Anti virus installation',
  'Flyer/poster design',
  'Computer/laptop repair',
  'Professional CV & resume',
  'Hybrid apps',
  'Album art design',
  'Phone repair',
  'And many more...'
]

export default function Services() {
  return (
    <div className="space-y-8">
      <section className="card-glow">
        <span className="hero-pill">What I Sell</span>
        <div className="mt-4 space-y-4">
          <h2 className="page-title">Services designed to launch your business.</h2>
          <p className="max-w-2xl text-slate-300">
            These offerings come straight from your brand image and the services list you shared. Use this page to show pricing, bundles, and the work you do.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.84fr_0.96fr]">
        <div className="card-glow">
          <h3 className="text-2xl font-semibold text-white">Creative services and support</h3>
          <p className="mt-4 text-slate-400">
            Whether visitors want a website, repair, design, or a professional service package, this section helps convert them fast.
          </p>
          <div className="mt-6 space-y-4">
            {services.slice(0, 5).map((service) => (
              <div key={service} className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
                <h4 className="text-lg font-semibold text-white">{service}</h4>
                <p className="mt-2 text-slate-400">Professional delivery with strong visuals, clear communication, and fast completion.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glow space-y-4">
          {services.map((service, index) => (
            <div key={service} className="flex items-start gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/85 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20">
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-white">{service}</h4>
                <p className="mt-1 text-sm text-slate-400">Clear service details and easy next-step actions help customers decide quickly.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
