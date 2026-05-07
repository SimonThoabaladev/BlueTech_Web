const experts = [
  {
    name: 'Mia Nkosi',
    role: 'Business strategist',
    notes: 'Helps clients shape service packages and market launches.',
  },
  {
    name: 'Daniel Moyo',
    role: 'Web & systems expert',
    notes: 'Guides technical setup, repair, and live support for your brand.',
  },
  {
    name: 'Lily Thamae',
    role: 'Creative consultant',
    notes: 'Advises on design direction, branding, and customer experience.',
  },
]

export default function Consult() {
  return (
    <div className="space-y-8">
      <section className="card-glow">
        <span className="hero-pill">People to consult</span>
        <div className="mt-4 space-y-4">
          <h2 className="page-title">Book a consultation with our team.</h2>
          <p className="max-w-2xl text-slate-300">
            Built to help visitors understand who they can talk to and how to start a project or support request.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {experts.map((expert) => (
          <div key={expert.name} className="card-glow flex flex-col gap-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Consultant</p>
              <h3 className="text-xl font-semibold text-white">{expert.name}</h3>
              <p className="text-slate-400">{expert.role}</p>
            </div>
            <p className="text-slate-300">{expert.notes}</p>
            <div className="mt-auto">
              <button className="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                Schedule call
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="card-glow grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="text-2xl font-semibold text-white">How consulting works</h3>
          <p className="mt-4 text-slate-300">
            Guide your visitors through the consulting process using clear steps, easy contact, and a strong service promise.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
            <p className="font-semibold text-white">1. Share your idea</p>
            <p className="mt-2 text-slate-400">Tell us the service or project you want, and we’ll recommend the right path.</p>
          </div>
          <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
            <p className="font-semibold text-white">2. Choose the right service</p>
            <p className="mt-2 text-slate-400">From design to repair and support, we match your needs to the right offering.</p>
          </div>
          <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
            <p className="font-semibold text-white">3. Start the project</p>
            <p className="mt-2 text-slate-400">Book a call, agree on deliverables, and begin fast with transparent communication.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
