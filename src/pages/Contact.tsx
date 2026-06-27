import { useState } from 'react'
import { MessageCircle, Mail, Send, CheckCircle } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app this would call an API
    setSent(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contacts = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+212 600-000-000',
      href: 'https://wa.me/212600000000',
      desc: 'Fastest response — we reply within minutes',
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      value: '@blackbear.ma',
      href: 'https://www.instagram.com/blackbear.ma/',
      desc: 'DM us for collabs, wholesale, or general inquiries',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@blackbear.ma',
      href: 'mailto:contact@blackbear.ma',
      desc: 'For business inquiries and partnerships',
    },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="border-b border-[#1e1e1e] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="tag text-[#c9b99a] text-xs mb-3 block">— Get in Touch</span>
          <h1 className="font-display text-5xl md:text-7xl text-[#e8e6e0] tracking-wider">Contact</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — contact methods */}
          <div>
            <h2 className="font-display text-4xl text-[#e8e6e0] tracking-wider mb-3">
              Talk to Us
            </h2>
            <p className="text-[#888888] text-sm mb-10 leading-relaxed max-w-sm">
              For orders, collabs, wholesale or just to say what's up — we're always reachable. WhatsApp is fastest.
            </p>

            <div className="space-y-4">
              {contacts.map(({ icon: Icon, label, value, href, desc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-[#141414] border border-[#1e1e1e] hover:border-[#c9b99a]/30 rounded p-5 transition-all group"
                >
                  <div className="w-10 h-10 rounded bg-[#c9b99a]/10 border border-[#c9b99a]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#c9b99a]" />
                  </div>
                  <div>
                    <p className="tag text-[#888888] text-[10px] mb-0.5">{label}</p>
                    <p className="text-[#e8e6e0] font-medium text-sm group-hover:text-[#c9b99a] transition-colors">
                      {value}
                    </p>
                    <p className="text-[#3a3a3a] text-xs mt-1">{desc}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12">
              <p className="tag text-[#3a3a3a] text-[10px]">
                Based in Casablanca, Morocco · blackbear.ma
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="bg-[#141414] border border-[#1e1e1e] rounded p-6 md:p-8">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
                  <h3 className="font-display text-3xl text-[#e8e6e0] tracking-wider mb-2">Message Sent</h3>
                  <p className="text-[#888888] text-sm">We'll get back to you soon. Stay fresh.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-2xl text-[#e8e6e0] tracking-wider mb-6">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="tag text-[#888888] text-[11px] block mb-2">Name *</label>
                      <input
                        id="name" name="name" required
                        value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="tag text-[#888888] text-[11px] block mb-2">Email *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="tag text-[#888888] text-[11px] block mb-2">Subject</label>
                    <input
                      id="subject" name="subject"
                      value={form.subject} onChange={handleChange}
                      placeholder="Order inquiry, collab, wholesale..."
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="tag text-[#888888] text-[11px] block mb-2">Message *</label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-4 py-3 text-[#e8e6e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#c9b99a] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded text-sm"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
