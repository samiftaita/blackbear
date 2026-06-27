import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function About() {
  const values = [
    {
      title: 'Premium Quality',
      desc: 'Every fabric is sourced for durability and feel. We don\'t cut corners because our customers don\'t settle.',
    },
    {
      title: 'Limited Runs',
      desc: 'No mass production. Each piece is limited. When it\'s gone, it\'s gone. That\'s the point.',
    },
    {
      title: 'Casa Culture',
      desc: 'Casablanca has its own rhythm, its own swagger. We capture that energy and wear it.',
    },
    {
      title: 'Made for the Streets',
      desc: 'Not for the runway. Built to be worn, felt, and respected on every corner of the city.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-[#1e1e1e]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4b4b6e?w=1400&q=80&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-15"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="tag text-[#c9b99a] text-xs mb-4 block">— About Us</span>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] text-[#e8e6e0] tracking-wider leading-none mb-6">
            Black Bear<br /><span className="text-[#c9b99a]">Is A</span><br />Movement
          </h1>
          <p className="text-[#888888] max-w-lg text-base leading-relaxed">
            Premium Streetwear from the shadows of Casa. Made for the culture.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="tag text-[#c9b99a] text-xs mb-4 block">— Origin</span>
              <h2 className="font-display text-5xl md:text-6xl text-[#e8e6e0] tracking-wider mb-8 leading-tight">
                From the<br />streets of<br /><span className="text-[#c9b99a]">Casablanca</span>
              </h2>
              <div className="space-y-5 text-[#888888] text-sm md:text-base leading-relaxed">
                <p>
                  BLACK BEAR started with one idea: Casablanca deserves its own premium streetwear brand. Not a knockoff of a Western label. Something born here. Something that speaks our language.
                </p>
                <p>
                  The bear is a symbol of quiet power. It doesn't chase. It doesn't follow. It moves on its own terms — and that's exactly how we build our collections.
                </p>
                <p>
                  Every piece carries the spirit of Casa: the energy of the corniche at night, the architecture of the old medina, the relentless hustle that makes this city unlike any other.
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-[500px] rounded overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=700&q=80&fit=crop"
                alt="Black Bear brand"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#0d0d0d] border-y border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="tag text-[#c9b99a] text-xs mb-4 block">— What We Stand For</span>
          <h2 className="font-display text-5xl text-[#e8e6e0] tracking-wider mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-[#141414] border border-[#1e1e1e] rounded p-6 hover:border-[#c9b99a]/30 transition-colors"
              >
                <div className="w-8 h-8 rounded border border-[#2a2a2a] flex items-center justify-center mb-4">
                  <span className="font-display text-[#c9b99a] text-sm">0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl text-[#e8e6e0] tracking-wider mb-3">{v.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-5xl md:text-6xl text-[#e8e6e0] tracking-wider mb-6">
            Ready to Wear<br /><span className="text-[#c9b99a]">The Culture?</span>
          </h2>
          <Link
            to="/shop"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded text-sm"
          >
            Shop Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
