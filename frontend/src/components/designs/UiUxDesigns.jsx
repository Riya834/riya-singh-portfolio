import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ExternalLink, Sparkles, X, Eye, ArrowUpRight, ChevronDown, ChevronUp, Layers, Image as ImageIcon } from 'lucide-react';
import { fetchDesigns } from '../../services/api';

const defaultDesigns = [
  {
    _id: 'd1',
    title: 'BharatTech 2.0 Perience Hackathon Poster',
    category: 'Event Poster & Branding',
    client: 'GDGC on Campus SVIET',
    description: 'Official event poster and community partner branding for BharatTech 2.0 Perience Hackathon with ₹1,00,000 prize pool, featuring sponsor integrations for Kwikpic, Devfolio, ETHIndia, and Polygon.',
    image: '/designs/bharattech-hackathon.jpg',
    tags: ['Figma', 'Event Poster', 'Branding', 'GDGC SVIET', 'Sponsor Identity'],
    driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
    featured: true,
  },
  {
    _id: 'd2',
    title: 'Google IDEATE Ideathon 2024 Poster',
    category: 'Brand Promotion & Graphics',
    client: 'The Uniques & GDGC SVIET',
    description: 'Promotional graphic design for Google IDEATE Ideathon 2024 campus visit to CGC Jhanjheri, showcasing event roadmap and Google brand color palette.',
    image: '/designs/google-ideathon.jpg',
    tags: ['Brand Identity', 'Google Colors', 'Ideathon Poster', 'Graphics'],
    driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
    featured: true,
  },
  {
    _id: 'd3',
    title: 'Tapping into Web using Angular Banner',
    category: 'Tech Workshop Graphics',
    client: 'GDGC on Campus SVIET',
    description: 'Event presentation design and social media announcement collateral for Tech Winter Break Angular workshop reaching over 115 total attendees.',
    image: '/designs/angular-workshop.jpg',
    tags: ['Angular Workshop', 'Social Media Design', 'GDGC SVIET', '115+ Attendees'],
    driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
    featured: true,
  },
  {
    _id: 'd4',
    title: 'Academic Test Conducted Banner',
    category: 'Campus Media & Graphic Design',
    client: 'The Uniques SVIET',
    description: 'Custom hexagonal photo cutout graphic poster designed for Academic Test announcement across Uniques 1.0 and Uniques 2.0 student batches.',
    image: '/designs/academic-test.jpg',
    tags: ['Hexagonal Layout', 'Photoshop/Figma', 'Uniques SVIET', 'Academic Graphic'],
    driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
    featured: false,
  },
  {
    _id: 'd5',
    title: 'Unlocking Opportunities at SVGOI Brochure',
    category: 'Marketing & Visual Design',
    client: 'Swami Vivekanand Group of Institutes',
    description: 'Institutional brochure layout and informational visual design highlighting SVGOI academic excellence, modern infrastructure, and student growth opportunities.',
    image: '/designs/svgoi-brochure.jpg',
    tags: ['Brochure Design', 'Print & Web Layout', 'Institutional Branding'],
    driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
    featured: false,
  }
];

const UiUxDesigns = () => {
  const [designs, setDesigns] = useState(defaultDesigns);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadDesigns = async () => {
      try {
        const data = await fetchDesigns();
        if (data && data.length > 0) {
          setDesigns(data);
        }
      } catch (err) {
        console.log('Using default UI/UX design showcase items');
      }
    };
    loadDesigns();
  }, []);

  const visibleDesigns = showAll ? designs : designs.slice(0, 3);

  return (
    <section id="designs" className="py-24 relative overflow-hidden bg-brand-bg/50">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-electric shadow-electric animate-pulse" />
              <p className="font-mono text-xs uppercase tracking-widest text-brand-electric font-bold">
                DESIGN PORTFOLIO & VISUAL IDENTITY
              </p>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
              UI/UX DESIGN <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-paper to-brand-electric">SHOWCASE.</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-muted max-w-2xl mt-3 leading-relaxed">
              Authentic design posters, event branding, and promotional collateral created as <strong className="text-white">UI/UX Designer for GDGC on Campus SVIET & The Uniques</strong>.
            </p>
          </div>

          {/* Drive Folder CTA */}
          <a
            href="https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-end px-5 py-3 rounded-xl bg-brand-electric/10 border border-brand-electric/40 hover:bg-brand-electric hover:text-white text-brand-electric text-xs font-mono font-bold tracking-wider flex items-center gap-2 transition-all duration-300 shadow-electric group"
          >
            <Folder className="w-4 h-4" />
            <span>Open Google Drive Design Folder</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Gallery Showcase Reel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleDesigns.map((design, idx) => (
            <motion.div
              key={design._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl border border-brand-border/80 overflow-hidden flex flex-col group hover:border-brand-electric/60 transition-all duration-300 shadow-card-glow cursor-pointer"
              onClick={() => setSelectedDesign(design)}
            >
              {/* Image Preview */}
              <div className="relative h-72 overflow-hidden bg-brand-card">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80" />

                {/* Organization Badge */}
                <div className="absolute top-3 left-3 bg-brand-bg/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-electric/40">
                  <span className="font-mono text-[10px] text-brand-electric font-semibold uppercase tracking-wider">
                    {design.client}
                  </span>
                </div>

                {/* Hover Quick Action Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-brand-bg/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold flex items-center gap-2 shadow-electric transform group-hover:scale-105 transition-transform">
                    <Eye className="w-4 h-4" />
                    <span>View High-Res Poster</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-brand-muted uppercase tracking-widest block mb-1">
                    {design.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-brand-electric transition-colors mb-2">
                    {design.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4">
                    {design.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {design.tags && design.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-brand-card border border-brand-border/60 font-mono text-[10px] text-brand-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-brand-border/40 text-xs font-mono">
                    <span className="text-brand-electric font-semibold flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to Enlarge</span>
                    </span>
                    <span className="text-brand-muted group-hover:text-white transition-colors flex items-center gap-1">
                      <Folder className="w-3.5 h-3.5" />
                      <span>Drive Linked</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Show Less Toggle Button */}
        {designs.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border hover:border-brand-electric/60 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-electric group"
            >
              <span>{showAll ? 'Show Fewer Reference Posters' : `Show More (${designs.length} Total Posters)`}</span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-brand-electric group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-brand-electric group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox High-Res Poster Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-4xl rounded-3xl border border-brand-border overflow-hidden bg-brand-bg max-h-[92vh] flex flex-col shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-brand-card/60">
                <div>
                  <span className="font-mono text-xs text-brand-electric uppercase tracking-widest block">
                    {selectedDesign.client} // {selectedDesign.category}
                  </span>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    {selectedDesign.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="w-9 h-9 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-electric transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal High-Res View Area */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-brand-card border border-brand-border max-h-[60vh] flex items-center justify-center">
                  <img
                    src={selectedDesign.image}
                    alt={selectedDesign.title}
                    className="max-h-[58vh] w-auto object-contain rounded-xl"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-brand-muted font-bold">
                    DESIGN SPECIFICATIONS & OVERVIEW
                  </h4>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {selectedDesign.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedDesign.tags && selectedDesign.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-brand-card border border-brand-electric/40 font-mono text-xs text-brand-electric font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-brand-border bg-brand-card/40 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-brand-muted">
                  Design Role: <strong className="text-white">UI/UX Designer (GDGC on Campus SVIET)</strong>
                </span>

                <a
                  href={selectedDesign.driveUrl || 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-brand-electric text-white text-xs font-mono font-bold shadow-electric flex items-center gap-2 hover:bg-brand-electricHover transition-all"
                >
                  <Folder className="w-4 h-4" />
                  <span>Open Drive Folder ↗</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UiUxDesigns;
