'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
    setFormState({ name: '', email: '', message: '' });
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-8">
      {/* Name Input */}
      <div className="relative group">
        <input
          type="text"
          id="name"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white outline-none transition-all duration-300 ${
             focusedField === 'name' ? 'border-primary-electricBlue shadow-[0_0_20px_rgba(46,92,255,0.3)]' : 'hover:border-white/20'
          }`}
          placeholder=" " 
        />
        <label
          htmlFor="name"
          className={`absolute left-6 transition-all duration-300 pointer-events-none text-white/50
            ${focusedField === 'name' || formState.name 
              ? '-top-3 left-4 text-xs bg-primary-black px-2 text-primary-electricBlue' 
              : 'top-4'}`}
        >
          Your Name
        </label>
      </div>

      {/* Email Input */}
      <div className="relative group">
        <input
          type="email"
          id="email"
          required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white outline-none transition-all duration-300 ${
             focusedField === 'email' ? 'border-primary-electricBlue shadow-[0_0_20px_rgba(46,92,255,0.3)]' : 'hover:border-white/20'
          }`}
          placeholder=" "
        />
        <label
          htmlFor="email"
          className={`absolute left-6 transition-all duration-300 pointer-events-none text-white/50
            ${focusedField === 'email' || formState.email
              ? '-top-3 left-4 text-xs bg-primary-black px-2 text-primary-electricBlue' 
              : 'top-4'}`}
        >
          Email Address
        </label>
      </div>

      {/* Message Input */}
      <div className="relative group">
        <textarea
          id="message"
          required
          rows={4}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white outline-none transition-all duration-300 resize-none ${
             focusedField === 'message' ? 'border-primary-electricBlue shadow-[0_0_20px_rgba(46,92,255,0.3)]' : 'hover:border-white/20'
          }`}
          placeholder=" "
        />
        <label
          htmlFor="message"
          className={`absolute left-6 transition-all duration-300 pointer-events-none text-white/50
            ${focusedField === 'message' || formState.message 
              ? '-top-3 left-4 text-xs bg-primary-black px-2 text-primary-electricBlue' 
              : 'top-4'}`}
        >
          Tell me about your project
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(46, 92, 255, 0.4)" }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden relative
          ${status === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-primary-electricBlue text-white hover:bg-primary-vividPurple'}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : status === 'success' ? (
            'Message Sent! 🎉'
          ) : (
            'Send Message'
          )}
        </span>
      </motion.button>
    </form>
  );
}
