'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Volume2, VolumeX, Sparkles, Maximize2, X, Eye } from 'lucide-react';

export default function WeddingExperience() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModalCard, setShowModalCard] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer for 27.08.2026
  useEffect(() => {
    const weddingDate = new Date('2026-08-27T10:40:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio Handler
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleEnterExperience = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0a0806] text-amber-50 overflow-x-hidden">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/bg-music.mp3" loop playsInline preload="auto" />

      {/* 1. CINEMATIC OPENING OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070504] p-4 text-center"
          >
            <div className="absolute inset-0 opacity-20">
              <img 
                src="/images/card.png" 
                alt="Background Monogram" 
                className="w-full h-full object-cover blur-sm"
              />
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 glass-card p-8 md:p-12 rounded-2xl max-w-lg w-full text-center gold-border shadow-2xl mx-auto flex flex-col items-center justify-center"
            >
              <p className="font-cinzel text-xs tracking-[0.3em] text-amber-200/70 mb-3">ROYAL INVITATION</p>
              <h1 className="font-serif-custom text-3xl md:text-5xl gold-gradient-text mb-4">
                Gowthamarajah <br /> <span className="text-xl font-sans text-amber-100">&amp;</span> <br /> Jinojini
              </h1>
              <p className="text-xs text-amber-200/60 mb-8 tracking-widest uppercase">August 27, 2026 • Trincomalee</p>

              <button
                onClick={handleEnterExperience}
                className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-semibold text-sm tracking-widest transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                ENTER EXPERIENCE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN EXPERIENCE */}
      {isOpened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          
          {/* Audio Button */}
          <button 
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full glass-card border border-amber-500/30 text-amber-300 hover:text-white transition-colors cursor-pointer shadow-2xl"
          >
            {isPlaying ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5 text-amber-200/50" />}
          </button>

          {/* Hero Banner Section */}
          <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/hero.png" 
                alt="Gowthamarajah &amp; Jinojini Hero" 
                className="w-full h-full object-cover object-[center_25%] opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/30 to-[#0a0806]/70" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center pt-12">
              <p className="font-cinzel tracking-[0.4em] text-xs md:text-sm text-amber-300/90 mb-3 uppercase">
                Together with their families
              </p>

              <h1 className="font-serif-custom text-4xl md:text-7xl gold-gradient-text mb-4 drop-shadow-lg">
                Gowthamarajah &amp; Jinojini
              </h1>

              <p className="text-xs md:text-sm text-amber-100/80 font-light max-w-md mx-auto mb-8 tracking-wide">
                Request the honour of your presence at their celestial union.
              </p>

              <div className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-md mx-auto glass-card p-4 rounded-xl gold-border shadow-2xl">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="text-center">
                    <span className="font-cinzel text-xl md:text-3xl text-amber-200 font-semibold">{value}</span>
                    <p className="text-[9px] md:text-xs text-amber-400/70 uppercase tracking-widest mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="py-20 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cinzel text-2xl md:text-4xl gold-gradient-text mb-2">Our Wedding Story</h2>
              <div className="w-16 h-0.5 bg-amber-500/40 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden gold-border shadow-2xl bg-black/40 p-2 flex items-center justify-center">
                <img 
                  src="/images/story.png" 
                  alt="Story Portrait" 
                  className="w-full h-auto max-h-[650px] object-contain rounded-xl"
                />
              </div>

              <div className="space-y-6 glass-card p-8 rounded-2xl gold-border">
                <h3 className="font-serif-custom text-2xl text-amber-200">The Sacred Muhurtham</h3>
                <p className="text-amber-100/70 text-sm leading-relaxed">
                  Join us as we take our auspicious steps together under the divine grace of Sri Koneswaram Temple.
                </p>
                <div className="border-t border-amber-500/20 pt-6 space-y-3">
                  <div className="flex items-center gap-3 text-amber-300/90 text-sm">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Thursday, 27th August 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-300/90 text-sm">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>10:40 AM - 11:55 AM (Subha Muhurtham)</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-300/90 text-sm">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Hindu Cultural Hall, Trincomalee</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW INTERACTIVE INVITATION CARD DISPLAY */}
          <section className="py-12 md:py-20 px-4 w-full">
            <div className="max-w-3xl mx-auto glass-card p-6 md:p-8 rounded-2xl gold-border text-center">
              <p className="font-cinzel text-xs text-amber-400/80 tracking-widest mb-6">
                OFFICIAL INVITATION
              </p>

              {/* Card Preview Graphic Box */}
              <div 
                onClick={() => setShowModalCard(true)}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-950/40 via-black to-amber-950/40 p-8 text-center transition-all duration-300 hover:border-amber-400"
              >
                <div className="my-6">
                  <Eye className="w-10 h-10 text-amber-400 mx-auto mb-3 animate-pulse" />
                  <h3 className="font-serif-custom text-2xl text-amber-100 mb-2">
                    திருமண அழைப்பிதழ்
                  </h3>
                  <p className="text-xs text-amber-200/60 tracking-wider">
                    TAP TO VIEW FULL DIGITAL INVITATION
                  </p>
                </div>

                <button 
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs tracking-widest font-semibold hover:bg-amber-500 hover:text-black transition-all"
                >
                  <Maximize2 className="w-4 h-4" />
                  EXPAND INVITATION CARD
                </button>
              </div>
            </div>
          </section>

          {/* FULL SCREEN LIGHTBOX MODAL (Zero Flickering, Smooth View) */}
          <AnimatePresence>
            {showModalCard && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-2 md:p-6"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setShowModalCard(false)}
                  className="absolute top-4 right-4 z-50 p-3 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-200 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* High Resolution Printable Invitation */}
                <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl gold-border p-1 bg-black/80 flex items-center justify-center">
                  <img 
                    src="/images/invitation.png" 
                    alt="Official Wedding Invitation Card" 
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RSVP Section */}
          <section className="py-20 px-4 max-w-xl mx-auto text-center">
            <div className="glass-card p-8 rounded-2xl gold-border">
              <Heart className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h2 className="font-serif-custom text-3xl gold-gradient-text mb-2">Are You Attending?</h2>
              <p className="text-xs text-amber-200/60 mb-6">Please confirm your presence to help us celebrate our special day.</p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your RSVP!'); }} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/30 text-amber-100 placeholder-amber-200/30 text-sm focus:outline-none focus:border-amber-400" 
                />
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="1" className="bg-black text-amber-100">1 Guest Attending</option>
                  <option value="2" className="bg-black text-amber-100">2 Guests Attending</option>
                  <option value="family" className="bg-black text-amber-100">Family Attending</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-sm tracking-wider hover:opacity-95 transition-opacity cursor-pointer"
                >
                  CONFIRM RSVP
                </button>
              </form>
            </div>
          </section>

          <footer className="py-8 text-center text-xs text-amber-200/40 border-t border-amber-500/10">
            <p>&copy; 2026 Gowthamarajah &amp; Jinojini. Crafted with love.</p>
          </footer>

        </motion.div>
      )}
    </main>
  );
}