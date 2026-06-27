import { MapPin, Clock, Phone, Navigation } from 'lucide-react'

export default function Location() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="border-b border-[#1e1e1e] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="tag text-[#c9b99a] text-xs mb-3 block">— Where to Find Us</span>
          <h1 className="font-display text-5xl md:text-7xl text-[#e8e6e0] tracking-wider">Location</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            {/* Address card */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded bg-[#c9b99a]/10 border border-[#c9b99a]/20 flex items-center justify-center">
                  <MapPin size={18} className="text-[#c9b99a]" />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-[#e8e6e0] tracking-wider">Our Store</h2>
                  <p className="tag text-[#888888] text-[10px]">BLACK BEAR HQ</p>
                </div>
              </div>
              <p className="text-[#888888] text-sm leading-relaxed mb-4">
                Casablanca, Morocco<br />
                Maarif District — Casa
              </p>
              <a
                href="https://maps.app.goo.gl/BBm6ZqbKpvEcn2ug7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary px-5 py-3 rounded text-xs"
              >
                <Navigation size={14} />
                Open in Maps
              </a>
            </div>

            {/* Hours */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded bg-[#c9b99a]/10 border border-[#c9b99a]/20 flex items-center justify-center">
                  <Clock size={18} className="text-[#c9b99a]" />
                </div>
                <h2 className="font-display text-2xl text-[#e8e6e0] tracking-wider">Hours</h2>
              </div>
              <div className="space-y-3">
                {[
                  { day: 'Monday – Friday', hours: '10:00 – 21:00' },
                  { day: 'Saturday', hours: '10:00 – 22:00' },
                  { day: 'Sunday', hours: '12:00 – 20:00' },
                ].map((entry) => (
                  <div key={entry.day} className="flex justify-between items-center text-sm border-b border-[#1e1e1e] pb-3">
                    <span className="text-[#888888]">{entry.day}</span>
                    <span className="text-[#e8e6e0] font-medium">{entry.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded bg-[#c9b99a]/10 border border-[#c9b99a]/20 flex items-center justify-center">
                  <Phone size={18} className="text-[#c9b99a]" />
                </div>
                <h2 className="font-display text-2xl text-[#e8e6e0] tracking-wider">Contact</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-[#888888]">
                  WhatsApp:{' '}
                  <a
                    href="https://wa.me/212600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e8e6e0] hover:text-[#c9b99a] transition-colors"
                  >
                    +212 600-000-000
                  </a>
                </p>
                <p className="text-[#888888]">
                  Email:{' '}
                  <a
                    href="mailto:contact@blackbear.ma"
                    className="text-[#e8e6e0] hover:text-[#c9b99a] transition-colors"
                  >
                    contact@blackbear.ma
                  </a>
                </p>
                <p className="text-[#888888]">
                  Instagram:{' '}
                  <a
                    href="https://www.instagram.com/blackbear.ma/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e8e6e0] hover:text-[#c9b99a] transition-colors"
                  >
                    @blackbear.ma
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div className="space-y-4">
            <div className="bg-[#141414] border border-[#1e1e1e] rounded overflow-hidden aspect-video lg:aspect-auto lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d-7.6192!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d282b800e2fb%3A0x7c52420f48f4ed62!2sCasablanca!5e0!3m2!1sen!2sma!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BLACK BEAR Location"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/BBm6ZqbKpvEcn2ug7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full flex items-center justify-center gap-2 py-4 rounded text-sm"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
