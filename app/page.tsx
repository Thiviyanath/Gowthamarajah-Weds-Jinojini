'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Volume2, VolumeX, Sparkles, Scroll, ShieldCheck, ChevronDown, Globe } from 'lucide-react';

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
            {/* Background Picture (Sharp & Visible on Mobile & Desktop) */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/overlay-bg.png" 
                alt="Opening Background" 
                className="w-full h-full object-cover object-center opacity-55 scale-105"
              />
              {/* Dark Vignette Gradient for Perfect Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-[#070504]/40 to-[#070504]/70" />
            </div>

            {/* Ambient Gold Glow Effect */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[500px] h-[500px] rounded-full bg-amber-600/20 blur-[100px] pointer-events-none z-0"
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
          <section className="relative w-full min-h-screen py-16 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/hero.png" 
                alt="Hero Portrait" 
                className="w-full h-full object-cover object-[center_25%] opacity-50 scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-[#070504]/40 to-[#070504]/80" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center">
              
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
                className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-lg mx-auto glass-card p-5 rounded-2xl gold-border shadow-2xl mb-8"
              >
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="text-center">
                    <span className="font-cinzel text-2xl md:text-4xl text-amber-200 font-semibold">{value}</span>
                    <p className="text-[9px] md:text-xs text-amber-400/70 uppercase tracking-widest mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Clean Scroll Down Indicator (Placed in flow below countdown box) */}
              <motion.div 
                animate={{ y: [0, 6, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1 text-amber-400/70 text-[10px] tracking-[0.3em] uppercase pt-2 cursor-pointer"
              >
                <span>Scroll Down</span>
                <ChevronDown className="w-4 h-4 text-amber-400" />
              </motion.div>

            </div>
          </section>

          {/* SACRED TAMIL INVITATION SECTION */}
          <section className="py-12 md:py-20 px-4 w-full relative">
            <div className="max-w-3xl mx-auto">
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel tracking-widest mb-3">
                  <Scroll className="w-4 h-4 text-amber-400" />
                  SACRED INVITATION
                </div>
              </div>

              {/* Royal Gold Frame displaying invitation.jpg */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative glass-card p-2 md:p-6 rounded-3xl gold-border shadow-2xl bg-gradient-to-b from-[#18120c] via-[#070504] to-[#18120c] border-2 border-amber-500/30"
              >
                <div className="w-full rounded-2xl overflow-hidden border border-amber-500/20 bg-black/60 shadow-2xl flex items-center justify-center min-h-[300px]">
                  <img 
                    src="/images/invitation.jpg?v=10" 
                    alt="Official Tamil Wedding Invitation Card" 
                    className="w-full h-auto object-contain block mx-auto rounded-xl max-h-[85vh]"
                    loading="eager"
                    decoding="sync"
                    style={{ WebkitTransform: 'translateZ(0)' }}
                  />
                </div>
              </motion.div>

            </div>
          </section>

          {/* OUR JOURNEY / COUPLE PORTRAIT SECTION */}
          <section className="py-20 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel tracking-widest mb-3">
                <Heart className="w-4 h-4 text-amber-400" />
                OUR SACRED JOURNEY
              </div>
              <h2 className="font-serif-custom text-3xl md:text-5xl gold-gradient-text">Gowthamarajah &amp; Jinojini</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* story.png Portrait Showcase */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl overflow-hidden gold-border shadow-2xl bg-black/40 p-3"
              >
                <img 
                  src="/images/story.png" 
                  alt="Gowthamarajah and Jinojini Portrait" 
                  className="w-full h-auto max-h-[600px] object-cover rounded-2xl mx-auto"
                  loading="lazy"
                />
              </motion.div>

              {/* Story Description Box */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6 glass-card p-8 md:p-10 rounded-3xl gold-border"
              >
                <h3 className="font-serif-custom text-3xl text-amber-200">Two Souls, One Destiny</h3>
                <p className="text-amber-100/80 text-sm leading-relaxed font-light">
                  Under the divine grace of Pathirakali Amman and Sri Koneswaram Temple, we begin our eternal journey together. We warmly invite you to share in our joy, laughter, and lifelong memories on our auspicious Muhurtham day.
                </p>

                <div className="border-t border-amber-500/20 pt-6 space-y-3 text-amber-200/90 text-sm font-light">
                  <p className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Traditional Hindu Wedding Rituals</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>August 27, 2026 • Trincomalee</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* VENUE & LOCATION SECTION */}
          <section className="py-20 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-cinzel text-2xl md:text-4xl gold-gradient-text mb-3">Venue &amp; Location</h2>
              <div className="w-16 h-0.5 bg-amber-500/40 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
              
              {/* Event Details Card */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6 glass-card p-8 md:p-10 rounded-3xl gold-border flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif-custom text-3xl text-amber-200 mb-2">Hindu Cultural Hall</h3>
                  <p className="text-amber-100/70 text-sm leading-relaxed mb-6">
                    Join us as we take our auspicious steps together in Trincomalee.
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
                        <p className="text-[10px] text-amber-400/70 uppercase tracking-widest">Address</p>
                        <p className="font-semibold">294 Inner Harbour Rd, Trincomalee</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Google Maps Directions Button */}
                <a
                  href="https://maps.google.com/?q=294+Inner+Harbour+Rd,+Trincomalee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 mt-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-bold text-xs tracking-widest hover:scale-[1.02] transition-all shadow-lg cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-black" />
                  OPEN IN GOOGLE MAPS
                </a>
              </motion.div>

              {/* Embedded Interactive Map Container */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl overflow-hidden gold-border shadow-2xl bg-black/40 p-2 min-h-[350px] flex items-center justify-center"
              >
                <iframe
                  title="Hindu Cultural Hall Trincomalee Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.348625902092!2d81.2312!3d8.5721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afbb959247ad895%3A0x6b1ec27b132f831!2sHindu%20Cultural%20Hall%20-%20Trincomalee!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px', borderRadius: '1rem', filter: 'grayscale(0.2) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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

          {/* DIGITAL WEBSITE CREATION & PORTFOLIO SECTION */}
          <section className="py-16 px-4 max-w-2xl mx-auto text-center">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 md:p-10 rounded-3xl gold-border shadow-2xl bg-gradient-to-b from-[#140f0a] via-[#070504] to-[#140f0a]"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                GET YOUR OWN WEBSITE
              </div>

              <h3 className="font-serif-custom text-2xl md:text-3xl gold-gradient-text mb-3">
                Need a Custom Event Website?
              </h3>

              <p className="text-xs md:text-sm text-amber-100/70 font-light leading-relaxed max-w-md mx-auto mb-6">
                Crafted by <span className="text-amber-300 font-semibold">Thiviyanath</span>. I build modern, interactive invitation cards and web experiences for weddings and special occasions.
              </p>

              {/* Action Buttons: Portfolio, WhatsApp & Call */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
                {/* Developer Portfolio Link */}
                <a
                  href="https://thiviyanath.github.io/thivi.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-bold text-xs tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-black" />
                  VIEW PORTFOLIO
                </a>

                {/* WhatsApp Support Button */}
                <a
                  href="https://wa.me/94770649966?text=Hi!%20I%20saw%20your%20wedding%20website%20and%20I%20would%20like%20to%20create%20one%20for%20my%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WHATSAPP US
                </a>

                {/* Direct Phone Call Button */}
                <a
                  href="tel:+94770649966"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 font-semibold text-xs tracking-wider hover:bg-amber-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  📞 077 064 9966
                </a>
              </div>
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