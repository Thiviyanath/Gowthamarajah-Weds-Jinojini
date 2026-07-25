'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Music, Heart, Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WeddingExperience() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#fcf6ba', '#ffffff']
    });
  };

  return (
    <main className="relative min-h-screen bg-[#0a0806] text-amber-50">
      
      {/* 1. CINEMATIC OPENING OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070504] px-4 text-center"
          >
            <div className="absolute inset-0 opacity-30">
              <Image 
                src="/images/card.png" 
                alt="Background Monogram" 
                fill 
                className="object-cover blur-sm" 
                priority 
              />
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 glass-card p-8 md:p-12 rounded-2xl max-w-lg w-full text-center gold-border shadow-2xl"
            >
              <p className="font-cinzel text-xs tracking-[0.3em] text-amber-200/70 mb-2">ROYAL INVITATION</p>
              <h1 className="font-serif-custom text-3xl md:text-5xl gold-gradient-text mb-4">
                Gowthamarajah <br /> <span className="text-xl font-sans text-amber-100">&</span> <br /> Jinojini
              </h1>
              <p className="text-xs text-amber-200/60 mb-8 tracking-widest uppercase">August 27, 2026 • Trincomalee</p>

              <button
                onClick={handleOpenInvitation}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-semibold text-sm tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              >
                <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                ENTER EXPERIENCE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN EXPERIENCE CONTENT */}
      {isOpened && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          {/* Audio Control Floating Button */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full glass-card border border-amber-500/30 text-amber-300 hover:text-white transition-colors"
            title="Toggle Music"
          >
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* 2. HERO PARALLAX SECTION */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image 
                src="/images/hero.png" 
                alt="Gowthamarajah and Jinojini" 
                fill 
                className="object-cover object-top opacity-70 scale-105 animate-pulse" 
                style={{ animationDuration: '8s' }}
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/40 to-transparent" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
              <motion.p 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="font-cinzel tracking-[0.4em] text-xs md:text-sm text-amber-300/80 mb-3"
              >
                TOGETHER WITH THEIR FAMILIES
              </motion.p>
              <h1 className="font-serif-custom text-4xl md:text-7xl gold-gradient-text mb-4 drop-shadow-md">
                Gowthamarajah & Jinojini
              </h1>
              <p className="text-sm md:text-base text-amber-100/80 font-light max-w-lg mx-auto mb-8">
                Request the honour of your presence at their celestial union.
              </p>

              {/* Countdown Display */}
              <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-md mx-auto glass-card p-4 rounded-xl gold-border">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="text-center">
                    <span className="font-cinzel text-xl md:text-3xl text-amber-200 font-semibold">{value}</span>
                    <p className="text-[10px] md:text-xs text-amber-400/60 uppercase tracking-widest mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. CINEMATIC LAYERED PHOTO & STORY SECTION */}
          <section className="py-20 px-4 md:px-12 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cinzel text-2xl md:text-4xl gold-gradient-text mb-2">Our Wedding Story</h2>
              <div className="w-16 h-0.5 bg-amber-500/40 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[480px] rounded-2xl overflow-hidden gold-border group shadow-2xl">
                <Image 
                  src="/images/story.png" 
                  alt="Cinematic Portrait" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-amber-100/90 text-sm italic font-serif">
                  &quot;Two souls with but a single thought, two hearts that beat as one.&quot;
                </div>
              </div>

              <div className="space-y-6 glass-card p-8 rounded-2xl">
                <h3 className="font-serif-custom text-2xl text-amber-200">The Sacred Muhurtham</h3>
                <p className="text-amber-100/70 text-sm leading-relaxed">
                  Join us as we take our auspicious steps together under the divine grace of Pathirakali Amman and Sri Koneswaram Temple.
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

          {/* 4. DIGITAL INVITATION DOCUMENT SECTION */}
          <section className="py-16 px-4 bg-[#0e0a07]">
            <div className="max-w-4xl mx-auto glass-card p-4 md:p-8 rounded-2xl gold-border shadow-2xl">
              <div className="text-center mb-6">
                <p className="font-cinzel text-xs text-amber-400/80 tracking-widest">DIGITAL INVITATION CARD</p>
              </div>
              <div className="relative w-full aspect-[1/1.4] rounded-lg overflow-hidden">
                <Image 
                  src="/images/invitation.png" 
                  alt="Official Wedding Invitation Card" 
                  fill 
                  className="object-contain" 
                />
              </div>
            </div>
          </section>

          {/* 5. RSVP SECTION */}
          <section className="py-20 px-4 max-w-xl mx-auto text-center">
            <div className="glass-card p-8 md:p-10 rounded-2xl gold-border">
              <Heart className="w-8 h-8 text-amber-400 mx-auto mb-4 animate-bounce" />
              <h2 className="font-serif-custom text-3xl gold-gradient-text mb-2">Are You Attending?</h2>
              <p className="text-xs text-amber-200/60 mb-6">Please confirm your presence to help us celebrate our special day.</p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your RSVP!'); }} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-amber-500/20 text-amber-100 placeholder-amber-200/30 text-sm focus:outline-none focus:border-amber-400" 
                />
                <select 
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-amber-500/20 text-amber-200/80 text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="1">1 Guest Attending</option>
                  <option value="2">2 Guests Attending</option>
                  <option value="family">Family Attending</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-sm tracking-wider hover:opacity-95 transition-opacity"
                >
                  CONFIRM RSVP
                </button>
              </form>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-8 text-center text-xs text-amber-200/40 border-t border-amber-500/10">
            <p>© 2026 Gowthamarajah & Jinojini. Crafted with love.</p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}