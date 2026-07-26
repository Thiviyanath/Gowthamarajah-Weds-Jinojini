'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Volume2, VolumeX, Sparkles, Scroll, ShieldCheck, ChevronDown } from 'lucide-react';

export default function WeddingExperience() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer calculation for 27.08.2026
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
    <main className="relative min-h-screen bg-[#070504] text-amber-50 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Background Audio */}
      <audio ref={audioRef} src="/bg-music.mp3" loop playsInline preload="auto" />

      {/* 1. ROYAL OPENING CURTAIN / OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100vh' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070504] p-4 text-center overflow-hidden"
          >
            {/* Animated Ambient Background Glow */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[500px] h-[500px] rounded-full bg-amber-600/20 blur-[120px] pointer-events-none"
            />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10 glass-card p-8 md:p-14 rounded-3xl max-w-lg w-full text-center gold-border shadow-2xl mx-auto flex flex-col items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border border-dashed border-amber-400/40 flex items-center justify-center mb-6"
              >
                <Sparkles className="w-6 h-6 text-amber-400" />
              </motion.div>

              <p className="font-cinzel text-xs tracking-[0.4em] text-amber-300/80 mb-3 uppercase">
                THE CELESTIAL WEDDING OF
              </p>

              <h1 className="font-serif-custom text-4xl md:text-6xl gold-gradient-text mb-4 leading-tight">
                Gowthamarajah <br /> 
                <span className="text-xl font-sans text-amber-200/60 font-light">&amp;</span> <br /> 
                Jinojini
              </h1>

              <p className="text-xs text-amber-200/60 mb-8 tracking-[0.2em] uppercase font-light">
                August 27, 2026 • Trincomalee
              </p>

              <button
                onClick={handleEnterExperience}
                className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-bold text-xs tracking-[0.2em] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  ENTER EXPERIENCE
                  <Sparkles className="w-4 h-4" />
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN INTERACTIVE EXPERIENCE */}
      {isOpened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          
          {/* Floating Music Control Switch */}
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-40 p-4 rounded-full glass-card border border-amber-500/40 text-amber-300 hover:text-white transition-all cursor-pointer shadow-2xl backdrop-blur-xl hover:scale-110"
          >
            {isPlaying ? <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" /> : <VolumeX className="w-5 h-5 text-amber-200/50" />}
          </motion.button>

          {/* HERO SECTION */}
          <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/hero.png" 
                alt="Hero Portrait" 
                className="w-full h-full object-cover object-[center_25%] opacity-50 scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-[#070504]/40 to-[#070504]/80" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center pt-16">
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-cinzel tracking-[0.4em] text-xs md:text-sm text-amber-300/90 mb-4 uppercase"
              >
                Together with their families
              </motion.p>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-serif-custom text-5xl md:text-8xl gold-gradient-text mb-6 drop-shadow-2xl"
              >
                Gowthamarajah &amp; Jinojini
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs md:text-sm text-amber-100/70 font-light max-w-md mx-auto mb-10 tracking-widest uppercase"
              >
                Request the honour of your presence at their wedding celebration.
              </motion.p>

              {/* Animated Countdown Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-lg mx-auto glass-card p-5 rounded-2xl gold-border shadow-2xl"
              >
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="text-center">
                    <span className="font-cinzel text-2xl md:text-4xl text-amber-200 font-semibold">{value}</span>
                    <p className="text-[9px] md:text-xs text-amber-400/70 uppercase tracking-widest mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 text-amber-400/60 flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase"
              >
                <span>Scroll Down</span>
                <ChevronDown className="w-4 h-4" />
              </motion.div>

            </div>
          </section>

          {/* SACRED TAMIL INVITATION SECTION */}
          <section className="py-20 px-4 w-full relative">
            <div className="max-w-3xl mx-auto">
              
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel tracking-widest mb-4">
                  <Scroll className="w-4 h-4 text-amber-400" />
                  SACRED INVITATION
                </div>
              </div>

              {/* Royal Golden Card Box */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative glass-card p-6 md:p-14 rounded-3xl gold-border shadow-2xl bg-gradient-to-b from-[#18120c] via-[#070504] to-[#18120c] text-center border-2 border-amber-500/30"
              >
                <p className="text-amber-400 text-xs tracking-widest mb-1 font-serif">உ</p>
                <p className="text-amber-200/80 text-xs tracking-widest mb-6 font-serif">சிவமயம்</p>

                <h2 className="font-serif-custom text-3xl md:text-5xl gold-gradient-text mb-4">
                  திருமண அழைப்பிதழ்
                </h2>

                <p className="text-xs md:text-sm text-amber-200/70 italic mb-8 max-w-lg mx-auto leading-relaxed">
                  &ldquo;அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை பண்பும் பயனும் அது&rdquo;
                </p>

                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mb-8" />

                <p className="text-xs text-amber-300/90 tracking-widest mb-6 uppercase">அன்புடையீர்!</p>

                <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-xl mx-auto mb-8 font-light">
                  நிகழும் சர்வ மங்களகரமான குரோதன வருடம் ஆவணி மாதம் 10 ஆம் நாள் <br className="hidden md:block"/>
                  <span className="text-amber-300 font-semibold">(27.08.2026)</span> வியாழக்கிழமை சுபமுகூர்த்த சுபவேளையில், 
                  ஸ்ரீமன் நாராயணனின் திருவருளோடு நற்பேறுகளுடன் நடைபெறும் எங்கள் திருமண நன்னாளிற்குத் தங்களுடைய மேலான வருகையை விரும்புகின்றோம்.
                </p>

                {/* Monogram Card */}
                <div className="my-8 max-w-xs md:max-w-sm mx-auto rounded-2xl overflow-hidden gold-border p-2 bg-black/50 shadow-2xl">
                  <img 
                    src="/images/invitation.png" 
                    alt="Monogram" 
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>

                {/* Couple Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 py-6 border-y border-amber-500/20">
                  <div className="p-2">
                    <p className="text-xs text-amber-400/80 uppercase tracking-widest mb-1">மணமகன்</p>
                    <h3 className="font-serif-custom text-3xl gold-gradient-text">கௌதமராஜா</h3>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-amber-400/80 uppercase tracking-widest mb-1">மணமகள்</p>
                    <h3 className="font-serif-custom text-3xl gold-gradient-text">ஜினோஜினி</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs md:text-sm text-amber-200/80 font-light">
                  <p className="font-semibold text-amber-300">இடம்: இந்து கலாசார மண்டபம், திருகோணமலை</p>
                  <p>நேரம்: காலை 10.40 மணி முதல் 11.55 மணி வரை (சுபமுகூர்த்தம்)</p>
                </div>

              </motion.div>

            </div>
          </section>

          {/* OUR STORY / DETAILS SECTION */}
          <section className="py-20 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-cinzel text-2xl md:text-4xl gold-gradient-text mb-3">Our Wedding Story</h2>
              <div className="w-16 h-0.5 bg-amber-500/40 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl overflow-hidden gold-border shadow-2xl bg-black/40 p-3"
              >
                <img 
                  src="/images/story.png" 
                  alt="Story Portrait" 
                  className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
                />
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6 glass-card p-8 md:p-10 rounded-3xl gold-border"
              >
                <h3 className="font-serif-custom text-3xl text-amber-200">The Sacred Muhurtham</h3>
                <p className="text-amber-100/70 text-sm leading-relaxed">
                  Join us as we take our auspicious steps together under the divine grace of Sri Koneswaram Temple.
                </p>

                <div className="border-t border-amber-500/20 pt-6 space-y-4">
                  <div className="flex items-center gap-4 text-amber-200/90 text-sm">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <Calendar className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-400/70 uppercase tracking-widest">Date</p>
                      <p className="font-semibold">Thursday, 27th August 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-amber-200/90 text-sm">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-400/70 uppercase tracking-widest">Time</p>
                      <p className="font-semibold">10:40 AM - 11:55 AM (Subha Muhurtham)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-amber-200/90 text-sm">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <MapPin className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-400/70 uppercase tracking-widest">Venue</p>
                      <p className="font-semibold">Hindu Cultural Hall, Trincomalee</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* RSVP FORM SECTION */}
          <section className="py-20 px-4 max-w-xl mx-auto text-center">
            <motion.div 
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 rounded-3xl gold-border shadow-2xl"
            >
              <Heart className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h2 className="font-serif-custom text-3xl md:text-4xl gold-gradient-text mb-2">Are You Attending?</h2>
              <p className="text-xs text-amber-200/60 mb-8">Please confirm your presence to help us celebrate our special day.</p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for confirming your RSVP!'); }} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  required 
                  className="w-full px-5 py-3.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 placeholder-amber-200/30 text-sm focus:outline-none focus:border-amber-400 transition-all" 
                />
                <select 
                  className="w-full px-5 py-3.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-all"
                >
                  <option value="1" className="bg-black text-amber-100">1 Guest Attending</option>
                  <option value="2" className="bg-black text-amber-100">2 Guests Attending</option>
                  <option value="family" className="bg-black text-amber-100">Family Attending</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-bold text-xs tracking-widest hover:opacity-95 transition-all shadow-lg cursor-pointer"
                >
                  CONFIRM RSVP
                </button>
              </form>
            </motion.div>
          </section>

          <footer className="py-8 text-center text-xs text-amber-200/40 border-t border-amber-500/10">
            <p>&copy; 2026 Gowthamarajah &amp; Jinojini. Crafted with love.</p>
          </footer>

        </motion.div>
      )}
    </main>
  );
}