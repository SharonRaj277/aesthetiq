/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, Upload, Bell, ScanFace, Stethoscope, PhoneCall, FileText, History, ClipboardList, TrendingUp, BookOpen, Home, Calendar, User, Settings, ChevronLeft, Share2, Sparkles, Clock, Plus, X, Activity, Droplet, Brain, Pill, Search, Star, CheckCircle2, AlertTriangle, Video, Mic, MicOff, VideoOff, Volume2, VolumeX, ChevronDown, ChevronUp, ArrowRight, Mail, Lock, Eye, EyeOff, Shield, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SecuritySettings } from './SecuritySettings';

type Screen = 'Splash' | 'IntroSlider' | 'Login' | 'Dashboard' | 'ProfileSetup' | 'ScanHistory' | 'ScanDetail' | 'ReportsVault' | 'ConsultDoctor' | 'DoctorProfile' | 'AppointmentConfirmed' | 'Emergency' | 'CallScreen' | 'RatingScreen' | 'TreatmentPlan' | 'ProgressTracker';

const SplashScreen = ({ onComplete }: { onComplete: (screen: Screen) => void }) => {
  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      // Simulate Firebase auth check
      const checkAuth = new Promise<boolean>((resolve) => {
        setTimeout(() => {
          // Mock auth state: change to true to test logged-in state
          resolve(false); 
        }, 1000); // Auth check takes 1s
      });

      // Wait for both auth check and 2500ms animation to complete
      const [isLoggedIn] = await Promise.all([
        checkAuth,
        new Promise(resolve => setTimeout(resolve, 2500))
      ]);

      // Simulate AsyncStorage with localStorage
      const hasSeenIntro = localStorage.getItem('hasSeenIntro');

      if (!hasSeenIntro) {
        onComplete('IntroSlider');
      } else if (isLoggedIn) {
        onComplete('Dashboard');
      } else {
        onComplete('Login');
      }
    };

    checkAuthAndNavigate();
  }, [onComplete]);

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full h-full"
      style={{
        background: 'linear-gradient(180deg, #481282 0%, #924391 55%, #f4a2b6 100%)'
      }}
    >
      {/* Logo Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Logo SVG Approximation */}
        <div className="relative w-40 h-48 mb-6 flex items-center justify-center">
            {/* Strong white glow behind logo */}
            <div className="absolute inset-0 bg-white/50 blur-[45px] rounded-full scale-110"></div>
            
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl z-10">
              <defs>
                <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2A0845" />
                  <stop offset="100%" stopColor="#1A0033" />
                </linearGradient>
                <linearGradient id="smileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5A059" />
                  <stop offset="50%" stopColor="#E8C87E" />
                  <stop offset="100%" stopColor="#B38A36" />
                </linearGradient>
              </defs>
              
              {/* Face Profile Silhouette */}
              <path d="M 45 10 C 45 10 52 25 52 35 C 52 40 58 45 58 50 C 58 53 54 55 54 55 C 54 55 58 58 58 62 C 58 65 54 68 54 68 C 54 68 58 72 58 75 C 58 82 45 85 45 85 C 30 85 25 65 25 45 C 25 25 45 10 45 10 Z" fill="url(#faceGrad)" />
              
              {/* Golden Smile */}
              <path d="M 28 80 C 40 100 65 95 72 75 C 68 70 65 85 45 82 C 35 80 28 80 28 80 Z" fill="url(#smileGrad)" />
              <circle cx="74" cy="72" r="3" fill="url(#smileGrad)" />
            </svg>
        </div>
        
        <h1 className="text-6xl font-medium tracking-wide text-white mb-4 drop-shadow-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Aesthetiq
        </h1>
        
        <p className="text-white text-xl tracking-wide drop-shadow-md" style={{ fontFamily: 'Georgia, serif' }}>
          Where Beauty Meets Precision
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-transparent">
        <motion.div 
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #6C63FF 0%, #A78BFA 100%)'
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: "linear" }}
        />
      </div>
    </div>
  );
};

const IntroSlider = ({ onComplete }: { onComplete: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Discover Your Best Self",
      description: "AI-driven insights for your unique facial aesthetics.",
      image: "https://picsum.photos/seed/intro1/800/1200"
    },
    {
      id: 2,
      title: "Precision Analysis",
      description: "Advanced mapping to highlight your natural beauty.",
      image: "https://picsum.photos/seed/intro2/800/1200"
    },
    {
      id: 3,
      title: "Personalized Journey",
      description: "Tailored recommendations just for you.",
      image: "https://picsum.photos/seed/intro3/800/1200"
    }
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="relative w-full h-full bg-[#1A1A2E] overflow-hidden"
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <motion.img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          referrerPolicy="no-referrer"
        />
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* SKIP Button */}
      {currentIndex < slides.length - 1 && (
        <button 
          onClick={handleComplete}
          className="absolute top-12 right-6 text-gray-300 font-medium tracking-wide z-10 hover:text-white transition-colors"
        >
          SKIP
        </button>
      )}

      {/* Content Area */}
      <div className="absolute bottom-0 left-0 w-full p-8 pb-12 flex flex-col z-10">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">{slides[currentIndex].title}</h2>
          <p className="text-white/80 text-base mb-10">{slides[currentIndex].description}</p>
        </motion.div>

        <div className="flex items-center justify-between w-full">
          {/* Dot Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-6 bg-[#6C63FF]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* NEXT / GET STARTED Button */}
          <button 
            onClick={handleNext}
            className="px-6 py-3 bg-white rounded-full text-[#1A1A2E] font-semibold tracking-wide shadow-lg hover:bg-gray-100 transition-colors"
          >
            {currentIndex === slides.length - 1 ? 'GET STARTED' : 'NEXT'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProfileSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number>(25);
  const [phone, setPhone] = useState('+91');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setShowActionSheet(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    // In a real app, this would open the device camera
    fileInputRef.current?.click();
  };

  const handleChooseGallery = () => {
    fileInputRef.current?.click();
  };

  const detectLocation = () => {
    setIsDetecting(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mock reverse geocoding delay
        setTimeout(() => {
          setAddress('123 Tech Park, Phase 1');
          setCity('Bangalore');
          setState('Karnataka');
          setPincode('560001');
          setIsDetecting(false);
        }, 1500);
      },
      (err) => {
        setError('Failed to detect location. Please enter manually.');
        setIsDetecting(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !age || !phone || !address || !city || !state || !pincode) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!phone.startsWith('+91') || phone.length < 13) {
      setError('Please enter a valid phone number starting with +91');
      return;
    }

    setIsLoading(true);
    try {
      // Mock Firebase upload and Firestore write
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center w-full h-full bg-slate-50 overflow-y-auto font-sans relative"
    >
      <div className="w-full max-w-md p-6 pb-12">
        <div className="text-center mb-8 mt-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Profile Setup</h2>
          <p className="text-slate-500">Complete your profile to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          {/* Section 1: Avatar */}
          <div className="flex flex-col items-center">
            <div 
              onClick={() => setShowActionSheet(true)}
              className="relative w-[120px] h-[120px] rounded-full bg-slate-200 border-4 border-white shadow-lg flex items-center justify-center cursor-pointer overflow-hidden group hover:border-indigo-100 transition-colors"
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <button 
              type="button"
              onClick={() => setShowActionSheet(true)}
              className="text-indigo-600 font-medium text-sm mt-4 hover:text-indigo-700"
            >
              Set Photo
            </button>
          </div>

          {/* Section 2: Personal Info */}
          <div className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-slate-800 font-semibold text-lg">Personal Information</h3>
            
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Age</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl h-[50px] px-2">
                  <button 
                    type="button" 
                    onClick={() => setAge(Math.max(1, age - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-slate-900 font-medium">{age}</span>
                  <button 
                    type="button" 
                    onClick={() => setAge(Math.min(120, age + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-2/3">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Phone</label>
                <input 
                  type="tel" 
                  placeholder="+91 Phone Number" 
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || val === '+') setPhone('+91');
                    else if (val.startsWith('+91')) setPhone(val);
                    else setPhone('+91' + val.replace(/^\+?9?1?/, ''));
                  }}
                  onFocus={() => { if (!phone) setPhone('+91'); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all h-[50px]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Location */}
          <div className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-800 font-semibold text-lg">Address Details</h3>
              <button 
                type="button"
                onClick={detectLocation}
                disabled={isDetecting}
                className="flex items-center space-x-1.5 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isDetecting ? 'Detecting...' : 'Detect My Location'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Address</label>
              <input 
                type="text" 
                placeholder="Street Address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">City</label>
                <input 
                  type="text" 
                  placeholder="City" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">State</label>
                <input 
                  type="text" 
                  placeholder="State" 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Pincode</label>
              <input 
                type="text" 
                placeholder="Pincode" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {error && <p className="text-rose-500 text-sm text-center font-medium">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 rounded-2xl font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors disabled:opacity-50 mt-4 text-lg"
          >
            {isLoading ? 'SAVING PROFILE...' : 'COMPLETE SETUP'}
          </button>
        </form>
      </div>

      {/* Action Sheet Modal */}
      {showActionSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Profile Photo</h3>
            
            <div className="space-y-3">
              <button 
                onClick={handleTakePhoto}
                className="w-full py-4 bg-indigo-50 text-indigo-700 rounded-2xl font-semibold text-lg hover:bg-indigo-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Take Photo</span>
              </button>
              <button 
                onClick={handleChooseGallery}
                className="w-full py-4 bg-slate-50 text-slate-700 rounded-2xl font-semibold text-lg hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Choose from Gallery</span>
              </button>
              <button 
                onClick={() => setShowActionSheet(false)}
                className="w-full py-4 mt-4 text-slate-500 font-semibold text-lg hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const Login = ({ onLoginSuccess }: { onLoginSuccess: (isProfileComplete: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI State
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) throw new Error('Please fill in all fields.');
      
      if (password.length !== 6 || !/^\d+$/.test(password)) {
        throw new Error('Password must be a 6-digit PIN.');
      }

      if (activeTab === 'register') {
        if (password !== confirmPassword) throw new Error('Passwords do not match.');
      }

      // Mock Firebase Auth Delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock failure for testing (e.g., if email is 'error@test.com')
      if (email === 'error@test.com') throw new Error('Invalid credentials.');

      // Mock Firestore check for profileComplete
      // Let's say 'new@test.com' simulates a new user without a complete profile
      const isProfileComplete = email !== 'new@test.com';
      
      onLoginSuccess(isProfileComplete);
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLoginSuccess(true); // Assume Google users have complete profiles for this mock
    } catch (err) {
      setError('Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setError('');
    setIsForgotLoading(true);
    try {
      // Mock sendPasswordResetEmail
      await new Promise(resolve => setTimeout(resolve, 1000));
      setToast('PIN reset email sent!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setError('Failed to send reset email.');
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center w-full h-full p-6 bg-[#1A1A2E] overflow-y-auto"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md mt-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">AesthetiQ</h1>
          <p className="text-white/60">Your AI Aesthetic Companion</p>
        </div>

        {/* Tab Switcher (Purple Underline) */}
        <div className="flex w-full border-b border-white/10 mb-8 relative">
          <button 
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'login' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
          >
            LOGIN
          </button>
          <button 
            type="button"
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'register' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
          >
            REGISTER
          </button>
          {/* Animated Underline */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-[#6C63FF] w-1/2"
            initial={false}
            animate={{ left: activeTab === 'login' ? '0%' : '50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/40" />
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/40" />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="6-Digit PIN" 
              value={password}
              maxLength={6}
              inputMode="numeric"
              onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/80 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password (Only on Register) */}
          <AnimatePresence initial={false}>
            {activeTab === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden w-full flex flex-col space-y-4"
              >
                {/* Confirm Password */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/40" />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm 6-Digit PIN" 
                    value={confirmPassword}
                    maxLength={6}
                    inputMode="numeric"
                    onChange={(e) => setConfirmPassword(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#6C63FF] transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Terms & Privacy */}
                <div className="flex items-start space-x-2 mt-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-4 h-4 rounded border border-white/30 flex items-center justify-center bg-white/5">
                      <CheckCircle2 className="w-3 h-3 text-[#6C63FF]" />
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    By registering, you agree to our <button type="button" className="text-[#A78BFA] hover:underline">Terms of Service</button> and <button type="button" className="text-[#A78BFA] hover:underline">Privacy Policy</button>.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-sm px-2 py-1 bg-red-400/10 rounded-lg border border-red-400/20">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Forgot Password (Only on Login) */}
          <AnimatePresence initial={false}>
            {activeTab === 'login' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden flex justify-end"
              >
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isForgotLoading || isLoading}
                  className="text-sm text-[#A78BFA] hover:text-white transition-colors py-1 font-medium flex items-center disabled:opacity-50"
                >
                  {isForgotLoading && <div className="w-3 h-3 border-2 border-[#A78BFA] border-t-transparent rounded-full animate-spin mr-2"></div>}
                  Forgot PIN?
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              activeTab === 'login' ? 'LOGIN' : 'REGISTER'
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-4 text-white/40 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Google Button */}
        <button 
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 py-4 bg-white rounded-xl text-[#1A1A2E] font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Reset App State (Dev Only) */}
        <div className="mt-12 text-center pb-8">
          <button 
            onClick={() => {
              localStorage.removeItem('hasSeenIntro');
              window.location.reload();
            }}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Reset App State (Dev)
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const CubicalBarProgress = ({ value, color, label, icon: Icon }: { value: number, color: string, label: string, icon?: any }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full pt-2">
      <div className="flex flex-col items-center space-y-2 mb-8">
        {Icon && (
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        )}
        <span className="text-slate-900 font-semibold text-2xl tracking-tight leading-none">{value}</span>
      </div>
      
      {/* 3D Bar Container */}
      <div className="relative w-12 h-32 mb-6 mt-6 mr-4">
        {/* Background 3D Bar (Empty state) */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-slate-200/50">
          {/* Right Face */}
          <div 
            className="absolute top-0 left-full w-4 h-full bg-slate-200/50 origin-left"
            style={{ transform: 'skewY(-45deg)' }}
          />
          {/* Top Face */}
          <div 
            className="absolute bottom-full left-0 w-full h-4 bg-slate-300/50 origin-bottom"
            style={{ transform: 'skewX(-45deg)' }}
          />
        </div>

        {/* Foreground 3D Bar (Filled state) */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full"
          style={{ backgroundColor: color }}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Right Face */}
          <div 
            className="absolute top-0 left-full w-4 h-full origin-left"
            style={{ backgroundColor: color, filter: 'brightness(0.85)', transform: 'skewY(-45deg)' }}
          />
          {/* Top Face */}
          <div 
            className="absolute bottom-full left-0 w-full h-4 origin-bottom"
            style={{ backgroundColor: color, filter: 'brightness(1.15)', transform: 'skewX(-45deg)' }}
          />
        </motion.div>
      </div>

      <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
};

type ScanType = 'Face' | 'Dental' | 'Skin';

interface ScanRecord {
  id: string;
  type: ScanType;
  timestamp: Date;
  scores: {
    overall: number;
    [key: string]: number;
  };
  aiInterpretation: string;
  doctorDiagnosis: string | null;
  photos: string[];
}

const MOCK_SCANS: ScanRecord[] = [
  {
    id: '1',
    type: 'Face',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    scores: { overall: 85, symmetry: 90, clarity: 80 },
    aiInterpretation: 'Skin appears clear with good symmetry. Mild dehydration detected in the T-zone.',
    doctorDiagnosis: null,
    photos: ['https://picsum.photos/seed/face1/400/400', 'https://picsum.photos/seed/face2/400/400']
  },
  {
    id: '2',
    type: 'Dental',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    scores: { overall: 72, alignment: 75, hygiene: 70 },
    aiInterpretation: 'Slight plaque buildup on lower incisors. Alignment is generally good.',
    doctorDiagnosis: 'Recommend a routine cleaning. No cavities detected.',
    photos: ['https://picsum.photos/seed/dental1/400/400']
  },
  {
    id: '3',
    type: 'Skin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    scores: { overall: 92, hydration: 95, texture: 90 },
    aiInterpretation: 'Excellent skin hydration and texture. No significant blemishes or concerns.',
    doctorDiagnosis: 'Keep up the current skincare routine. Use SPF 50 daily.',
    photos: ['https://picsum.photos/seed/skin1/400/400', 'https://picsum.photos/seed/skin2/400/400', 'https://picsum.photos/seed/skin3/400/400']
  }
];

const ScanHistory = ({ onBack, onSelectScan }: { onBack: () => void, onSelectScan: (id: string) => void }) => {
  const [filter, setFilter] = useState<'All' | 'Face' | 'Dental' | 'Skin'>('All');
  
  const filteredScans = MOCK_SCANS.filter(scan => filter === 'All' || scan.type === filter).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-slate-50 overflow-hidden font-sans relative"
    >
      {/* Header */}
      <div className="flex items-center px-6 pt-14 pb-4 bg-white border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900 ml-4">Scan History</h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 px-6 py-4 overflow-x-auto hide-scrollbar">
        {['All', 'Face', 'Dental', 'Skin'].map(tab => (
          <button 
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-4">
        {filteredScans.map(scan => {
          const Icon = scan.type === 'Face' ? ScanFace : scan.type === 'Dental' ? Stethoscope : Camera;
          const color = scan.type === 'Face' ? 'text-purple-500' : scan.type === 'Dental' ? 'text-blue-500' : 'text-orange-500';
          const bg = scan.type === 'Face' ? 'bg-purple-50' : scan.type === 'Dental' ? 'bg-blue-50' : 'bg-orange-50';

          return (
            <button 
              key={scan.id}
              onClick={() => onSelectScan(scan.id)}
              className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-slate-900 font-semibold text-lg">{scan.type} Scan</h3>
                  <span className="text-slate-400 text-xs font-medium">{scan.timestamp.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <span className="text-slate-500 text-xs font-medium">Score:</span>
                    <span className="text-slate-900 text-xs font-bold">{scan.scores.overall}</span>
                  </div>
                  {scan.doctorDiagnosis ? (
                    <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md">Reviewed</span>
                  ) : (
                    <span className="text-amber-600 text-[10px] font-bold uppercase tracking-wider bg-amber-50 px-2 py-1 rounded-md">Pending</span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </motion.div>
  );
};

const CircularScore = ({ score, label, color }: { score: number, label: string, color: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center mb-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            cx="40" cy="40" r={radius} 
            stroke="currentColor" strokeWidth="6" fill="transparent" 
            className="text-slate-100"
          />
          <motion.circle 
            cx="40" cy="40" r={radius} 
            stroke={color} strokeWidth="6" fill="transparent" 
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-slate-900 font-bold text-xl">{score}</span>
      </div>
      <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
};

const HarmonyReport = ({ scanId, onBack, onNavigate }: { scanId: string, onBack: () => void, onNavigate: (screen: Screen) => void }) => {
  const scan = MOCK_SCANS.find(s => s.id === scanId);
  const [score, setScore] = useState(0);
  const targetScore = scan ? Math.round((scan.scores.aesthetiq + scan.scores.dental + scan.scores.skin) / 3) : 82;
  const [simulationState, setSimulationState] = useState<'loading' | 'ready'>('loading');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Animate score
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setScore(Math.floor(ease * targetScore));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    // Mock simulation generation
    const timer = setTimeout(() => {
      setSimulationState('ready');
    }, 3000);
    return () => clearTimeout(timer);
  }, [targetScore]);

  if (!scan) return null;

  const handleShare = () => {
    // Mock PDF generation / share
    window.print();
  };

  const getScoreColor = (s: number) => {
    if (s > 75) return '#22C55E';
    if (s >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const scoreColor = getScoreColor(targetScore);
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const aiInterpretation = scan.aiInterpretation || "Based on the comprehensive facial scan, the patient exhibits excellent symmetry in the upper third of the face. There are minor concerns regarding skin hydration levels and slight hyperpigmentation in the cheek areas. Dental alignment shows a slight overjet which could be addressed for optimal harmony. Overall facial proportions align well with the golden ratio, indicating a strong baseline for aesthetic treatments.";

  const findings = [
    { label: 'Good upper symmetry', status: 'good' },
    { label: 'Mild hyperpigmentation', status: 'moderate' },
    { label: 'Slight overjet', status: 'moderate' },
    { label: 'Low hydration', status: 'concern' },
    { label: 'Strong jawline', status: 'good' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-[#0D0D1A] text-white font-sans relative overflow-y-auto pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4 sticky top-0 z-20 bg-[#0D0D1A]/90 backdrop-blur-md">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-white">Facial Harmony Index</h2>
        <button onClick={handleShare} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center mt-6">
        {/* Circular Score */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" stroke="#1A1A2E" strokeWidth="12" fill="none" />
            <motion.circle 
              cx="70" cy="70" r="60" 
              stroke={scoreColor} 
              strokeWidth="12" 
              fill="none" 
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeDasharray={circumference}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-bold" style={{ color: scoreColor }}>{score}</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Score</span>
          </div>
        </div>
      </div>

      {/* Before / After Simulation */}
      <div className="px-6 mt-10">
        <h3 className="text-lg font-bold text-white mb-4">Simulation</h3>
        <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden bg-[#1A1A2E]">
          {simulationState === 'loading' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white font-medium">Generating your simulation...</p>
              <p className="text-slate-400 text-sm mt-2">Analyzing facial features and applying AI enhancements.</p>
            </div>
          ) : (
            <>
              {/* Before Image */}
              <img src={scan.photos[0] || "https://picsum.photos/seed/face1/600/800"} alt="Before" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
              
              {/* After Image (Clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <img src="https://picsum.photos/seed/face2/600/800" alt="After" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-0.5 h-3 bg-slate-300 rounded-full"></div>
                    <div className="w-0.5 h-3 bg-slate-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Invisible Slider Input for interaction */}
              <input 
                type="range" 
                min="0" max="100" 
                value={sliderPosition} 
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
                <span className="text-xs font-bold text-white tracking-wider">BEFORE</span>
              </div>
              <div className="absolute top-4 right-4 bg-[#6C63FF]/80 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
                <span className="text-xs font-bold text-white tracking-wider">AFTER SIM</span>
              </div>
            </>
          )}
        </div>
        {simulationState === 'ready' && (
          <p className="text-center text-slate-400 text-sm mt-3 flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 mr-1" /> Drag to compare <ArrowRight className="w-4 h-4 ml-1" />
          </p>
        )}
      </div>

      {/* Score Breakdown */}
      <div className="px-6 mt-10">
        <h3 className="text-lg font-bold text-white mb-4">Score Breakdown</h3>
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
          {[
            { label: 'Skin', score: scan.scores.skin || 78, color: '#EC4899', icon: Droplet, delay: 0 },
            { label: 'Dental', score: scan.scores.dental || 85, color: '#14B8A6', icon: Stethoscope, delay: 0.2 },
            { label: 'Harmony', score: scan.scores.aesthetiq || 82, color: '#7C6FFF', icon: Sparkles, delay: 0.4 }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay }}
              className="bg-[#FFFFFF] rounded-[20px] p-4 min-w-[120px] flex-1 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-3">
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                <span className="text-slate-800 text-xs font-bold">{item.label}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">{item.score}</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: item.delay + 0.2 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Interpretation */}
      <div className="px-6 mt-10">
        <div className="bg-[#FFFFFF] rounded-[20px] p-5 shadow-lg">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl">🤖</span>
            <h3 className="text-lg font-bold text-slate-900">AI Analysis</h3>
          </div>
          <p className="text-slate-600 text-sm leading-[22px]">
            {isExpanded ? aiInterpretation : `${aiInterpretation.substring(0, 150)}...`}
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[#6C63FF] text-sm font-bold"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      </div>

      {/* Findings List */}
      <div className="px-6 mt-10">
        <h3 className="text-lg font-bold text-white mb-4">Key Findings</h3>
        <div className="flex flex-wrap gap-2">
          {findings.map((finding, idx) => (
            <div key={idx} className="bg-[#1A1A2E] border border-white/10 rounded-full px-4 py-2 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                finding.status === 'good' ? 'bg-[#22C55E]' : 
                finding.status === 'moderate' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
              }`} />
              <span className="text-white text-sm">{finding.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-6 mt-12 mb-8 space-y-4">
        <button 
          onClick={() => onNavigate('ConsultDoctor')}
          className="w-full h-[56px] rounded-[28px] bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-indigo-500/30"
        >
          <span className="text-white font-bold text-lg">Consult a Specialist</span>
        </button>
        <button 
          onClick={handleShare}
          className="w-full h-[56px] rounded-[28px] border-2 border-[#6C63FF] flex items-center justify-center"
        >
          <span className="text-white font-bold text-lg">Save to Reports Vault</span>
        </button>
      </div>
    </motion.div>
  );
};

type ReportType = 'X-Ray' | 'CBCT' | 'Blood' | 'MRI' | 'Prescription' | 'Other';
type UploadedBy = 'patient' | 'doctor' | 'lab';

interface ReportRecord {
  id: string;
  name: string;
  type: ReportType;
  timestamp: Date;
  uploadedBy: UploadedBy;
  fileUrl: string;
  fileType: 'pdf' | 'image';
}

const MOCK_REPORTS: ReportRecord[] = [
  {
    id: '1',
    name: 'Dental X-Ray - Lower Jaw',
    type: 'X-Ray',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    uploadedBy: 'lab',
    fileUrl: 'https://picsum.photos/seed/xray1/800/600',
    fileType: 'image'
  },
  {
    id: '2',
    name: 'Blood Test Results',
    type: 'Blood',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    uploadedBy: 'lab',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'pdf'
  },
  {
    id: '3',
    name: 'Previous Prescription',
    type: 'Prescription',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    uploadedBy: 'doctor',
    fileUrl: 'https://picsum.photos/seed/rx1/800/600',
    fileType: 'image'
  }
];

const ReportsVault = ({ onBack }: { onBack: () => void }) => {
  const [reports, setReports] = useState<ReportRecord[]>(MOCK_REPORTS);
  const [filter, setFilter] = useState<'All' | ReportType>('All');
  const [showUploadSheet, setShowUploadSheet] = useState(false);
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [otherType, setOtherType] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredReports = reports.filter(r => filter === 'All' || r.type === filter).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedType) {
      const isPdf = file.type === 'application/pdf';
      const newReport: ReportRecord = {
        id: Date.now().toString(),
        name: file.name,
        type: selectedType === 'Other' && otherType ? 'Other' as ReportType : selectedType,
        timestamp: new Date(),
        uploadedBy: 'patient',
        fileUrl: URL.createObjectURL(file), // Mock upload
        fileType: isPdf ? 'pdf' : 'image'
      };
      setReports([newReport, ...reports]);
      setShowUploadSheet(false);
      setSelectedType(null);
      setOtherType('');
    }
  };

  const handleReportTap = (report: ReportRecord) => {
    if (report.fileType === 'pdf') {
      window.open(report.fileUrl, '_blank');
    } else {
      setSelectedImage(report.fileUrl);
    }
  };

  const getTypeIcon = (type: ReportType) => {
    switch(type) {
      case 'X-Ray': return Activity;
      case 'CBCT': return Activity;
      case 'Blood': return Droplet;
      case 'MRI': return Brain;
      case 'Prescription': return Pill;
      default: return FileText;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-slate-50 overflow-hidden font-sans relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4 bg-white border-b border-slate-100">
        <div className="flex items-center">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-slate-900 ml-4">Reports Vault</h2>
        </div>
        <button onClick={() => setShowUploadSheet(true)} className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 px-6 py-4 overflow-x-auto hide-scrollbar">
        {['All', 'X-Ray', 'CBCT', 'Blood', 'MRI', 'Prescription', 'Other'].map(tab => (
          <button 
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-4">
        {filteredReports.map(report => {
          const Icon = getTypeIcon(report.type);
          const badgeColor = report.uploadedBy === 'patient' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                             report.uploadedBy === 'doctor' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                             'bg-emerald-50 text-emerald-600 border-emerald-100';

          return (
            <button 
              key={report.id}
              onClick={() => handleReportTap(report)}
              className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <Icon className="w-6 h-6 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 font-semibold text-base truncate mb-1">{report.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs font-medium">{report.timestamp.toLocaleDateString()}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${badgeColor}`}>
                    {report.uploadedBy}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Upload Bottom Sheet */}
      {showUploadSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Upload Report</h3>
              <button onClick={() => setShowUploadSheet(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Select Document Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['X-Ray', 'CBCT', 'Blood', 'MRI', 'Prescription', 'Other'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type as ReportType)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-colors ${selectedType === type ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {selectedType === 'Other' && (
                <input 
                  type="text" 
                  placeholder="Specify other type..." 
                  value={otherType}
                  onChange={(e) => setOtherType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all mt-2"
                />
              )}

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*,application/pdf" 
                className="hidden" 
              />

              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={!selectedType || (selectedType === 'Other' && !otherType)}
                className="w-full py-4 mt-6 bg-indigo-600 text-white rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20"
              >
                <Upload className="w-5 h-5" />
                <span>Select File</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Fullscreen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setSelectedImage(null)} className="p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <img src={selectedImage} alt="Report" className="max-w-full max-h-full object-contain rounded-lg" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

type Specialization = 'Orthodontist' | 'Dermatologist' | 'Aesthetic Dentist' | 'Oral Surgeon' | 'Periodontist';

interface Doctor {
  id: string;
  name: string;
  specialization: Specialization;
  image: string;
  rating: number;
  experience: number;
  fee: number;
  isAvailable: boolean;
  credentials: string;
  education: string;
  about: string;
  availableSlots: Record<string, string[]>;
}

const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    specialization: 'Dermatologist',
    image: 'https://picsum.photos/seed/doc1/400/400',
    rating: 4.9,
    experience: 12,
    fee: 500,
    isAvailable: true,
    credentials: 'MD, FAAD',
    education: 'Harvard Medical School',
    about: 'Dr. Jenkins specializes in cosmetic dermatology and laser treatments with over a decade of experience in advanced skin care.',
    availableSlots: {
      '2026-03-10': ['10:00 AM', '11:30 AM', '02:00 PM'],
      '2026-03-11': ['09:00 AM', '01:00 PM', '04:30 PM'],
    }
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Orthodontist',
    image: 'https://picsum.photos/seed/doc2/400/400',
    rating: 4.8,
    experience: 8,
    fee: 500,
    isAvailable: true,
    credentials: 'DDS, MS',
    education: 'UCLA School of Dentistry',
    about: 'Dr. Chen is an expert in clear aligner therapy and complex orthodontic corrections for both teens and adults.',
    availableSlots: {
      '2026-03-10': ['03:00 PM', '04:00 PM'],
      '2026-03-12': ['10:00 AM', '11:00 AM'],
    }
  },
  {
    id: '3',
    name: 'Dr. Emily Carter',
    specialization: 'Aesthetic Dentist',
    image: 'https://picsum.photos/seed/doc3/400/400',
    rating: 4.7,
    experience: 15,
    fee: 500,
    isAvailable: false,
    credentials: 'DMD, AACD',
    education: 'NYU College of Dentistry',
    about: 'Dr. Carter focuses on full mouth rehabilitation and smile makeovers using the latest digital dentistry techniques.',
    availableSlots: {}
  }
];

const ConsultDoctor = ({ onBack, onSelectDoctor }: { onBack: () => void, onSelectDoctor: (id: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | Specialization>('All');
  
  const filteredDoctors = MOCK_DOCTORS.filter(doc => {
    const matchesFilter = filter === 'All' || doc.specialization === filter;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-slate-50 overflow-hidden font-sans relative"
    >
      {/* Header */}
      <div className="flex items-center px-6 pt-14 pb-4 bg-white">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900 ml-4">Consult a Doctor</h2>
      </div>

      {/* Search */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search doctors, specialities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 px-6 py-4 overflow-x-auto hide-scrollbar bg-white">
        {['All', 'Orthodontist', 'Dermatologist', 'Aesthetic Dentist', 'Oral Surgeon', 'Periodontist'].map(tab => (
          <button 
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4 space-y-4">
        {filteredDoctors.map(doc => (
          <button 
            key={doc.id}
            onClick={() => onSelectDoctor(doc.id)}
            className="w-full bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-4 hover:shadow-md transition-shadow text-left relative overflow-hidden"
          >
            <div className="relative">
              <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doc.isAvailable ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
            
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-slate-900 font-bold text-lg truncate">{doc.name}</h3>
              <p className="text-indigo-600 text-sm font-medium mb-2">{doc.specialization}</p>
              
              <div className="flex items-center space-x-3 text-xs font-medium text-slate-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-slate-700">{doc.rating}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{doc.experience} yrs exp</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold">
              ₹{doc.fee}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const DoctorProfile = ({ doctorId, onBack, onBooked }: { doctorId: string, onBack: () => void, onBooked: () => void }) => {
  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!doctor) return null;

  // Generate next 7 days
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (!selectedDate && next7Days.length > 0) {
      setSelectedDate(next7Days[0]);
    }
  }, []);

  const availableSlots = selectedDate ? doctor.availableSlots[selectedDate] || [] : [];

  const handleBook = async () => {
    setIsProcessing(true);
    // Mock Razorpay payment and Cloud Function trigger
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowBookingModal(false);
    onBooked();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-slate-50 overflow-hidden font-sans relative"
    >
      {/* Header Image & Back */}
      <div className="relative h-64 bg-slate-200">
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button onClick={onBack} className="absolute top-14 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto -mt-6 bg-slate-50 rounded-t-[32px] relative z-10 pb-24">
        <div className="px-6 pt-8 pb-6 bg-white rounded-t-[32px] shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{doctor.name}</h2>
              <p className="text-indigo-600 font-medium">{doctor.specialization}</p>
            </div>
            <div className="bg-amber-50 px-3 py-1.5 rounded-xl flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-amber-700 font-bold">{doctor.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 text-sm font-medium text-slate-600">
            <div className="flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-slate-400" />
              <span>{doctor.experience} Years Exp.</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>{doctor.credentials}</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-slate-800 font-bold text-lg mb-3">About</h3>
          <p className="text-slate-600 leading-relaxed text-sm">{doctor.about}</p>
          <p className="text-slate-600 leading-relaxed text-sm mt-2 font-medium">Education: <span className="font-normal">{doctor.education}</span></p>
        </div>

        <div className="px-6 py-2">
          <h3 className="text-slate-800 font-bold text-lg mb-4">Availability</h3>
          
          {/* Calendar Dates */}
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {next7Days.map(dateStr => {
              const d = new Date(dateStr);
              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = d.getDate();
              const isSelected = selectedDate === dateStr;
              
              return (
                <button 
                  key={dateStr}
                  onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null); }}
                  className={`flex flex-col items-center justify-center min-w-[64px] py-3 rounded-2xl border transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>{dayName}</span>
                  <span className="text-lg font-bold">{dayNum}</span>
                </button>
              )
            })}
          </div>

          {/* Time Slots */}
          <div className="mt-6">
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-colors ${selectedSlot === slot ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-slate-100 rounded-2xl p-6 text-center">
                <p className="text-slate-500 font-medium">No slots available on this date.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Consultation Fee</p>
          <p className="text-slate-900 font-bold text-2xl">₹{doctor.fee}</p>
        </div>
        <button 
          onClick={() => setShowBookingModal(true)}
          disabled={!selectedSlot}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Appointment
        </button>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Confirm Booking</h3>
              <button onClick={() => setShowBookingModal(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
              <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-slate-200">
                <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-slate-900">{doctor.name}</h4>
                  <p className="text-slate-500 text-sm">{doctor.specialization}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 font-medium">Date & Time</span>
                <span className="text-slate-900 font-bold">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 font-medium">Duration</span>
                <span className="text-slate-900 font-bold">15 mins</span>
              </div>
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Total Payable</span>
                <span className="text-indigo-600 font-bold text-lg">₹{doctor.fee}</span>
              </div>
            </div>

            <button 
              onClick={handleBook}
              disabled={isProcessing}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <span>Pay ₹{doctor.fee} & Confirm</span>
              )}
            </button>
            <p className="text-center text-slate-400 text-xs mt-4 flex items-center justify-center space-x-1">
              <Activity className="w-3 h-3" />
              <span>Secured by Razorpay</span>
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const AppointmentConfirmed = ({ onDone, onJoinCall }: { onDone: () => void, onJoinCall: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full h-full bg-indigo-600 font-sans p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-indigo-900/50"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-white mb-4"
      >
        Booking Confirmed!
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="text-indigo-100 text-lg mb-12 max-w-xs"
      >
        Your appointment has been successfully scheduled. The doctor has been notified.
      </motion.p>
      
      <motion.button 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        onClick={onJoinCall}
        className="w-full max-w-xs py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-xl hover:bg-indigo-50 transition-colors mb-4"
      >
        Join Call Now
      </motion.button>

      <motion.button 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        onClick={onDone}
        className="w-full max-w-xs py-4 bg-indigo-700 text-white rounded-2xl font-bold text-lg hover:bg-indigo-800 transition-colors"
      >
        Back to Dashboard
      </motion.button>
    </motion.div>
  );
};

type EmergencyIssue = 'Tooth Pain' | 'Skin Emergency' | 'Jaw/TMJ Pain' | 'Other';
type Severity = 'Mild' | 'Moderate' | 'Severe';

const Emergency = ({ onBack, onCallConnected }: { onBack: () => void, onCallConnected: () => void }) => {
  const [selectedIssue, setSelectedIssue] = useState<EmergencyIssue | null>(null);
  const [otherIssue, setOtherIssue] = useState('');
  const [severity, setSeverity] = useState<Severity>('Moderate');
  const [isConnecting, setIsConnecting] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate Razorpay payment & Cloud Function matching
    setTimeout(() => {
      // Simulate no match in 60s (we'll do 3s for demo) -> show queue
      setQueuePosition(2);
      
      // Then simulate match after another 3s
      setTimeout(() => {
        setIsConnecting(false);
        onCallConnected();
      }, 3000);
      
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col w-full h-full font-sans relative"
      style={{ background: 'linear-gradient(180deg, #7B0000 0%, #1A0000 100%)' }}
    >
      {/* Header */}
      <div className="flex items-center px-6 pt-14 pb-4">
        <button onClick={onBack} disabled={isConnecting} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-white ml-4">Emergency Care</h2>
      </div>

      {isConnecting ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 rounded-full bg-rose-500/20 flex items-center justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-rose-500/40 flex items-center justify-center">
              <PhoneCall className="w-10 h-10 text-rose-200 animate-pulse" />
            </div>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            {queuePosition ? 'Waiting for Doctor...' : 'Connecting...'}
          </h3>
          
          {queuePosition ? (
            <p className="text-rose-200 text-lg">
              You are number <span className="font-bold text-white text-xl">{queuePosition}</span> in the queue.
            </p>
          ) : (
            <p className="text-rose-200 text-lg">
              Finding the best available specialist for your emergency.
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 pb-32 pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                <h3 className="text-lg font-bold text-white">What is your emergency?</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Tooth Pain', icon: '🦷' },
                  { id: 'Skin Emergency', icon: '🔴' },
                  { id: 'Jaw/TMJ Pain', icon: '🦴' },
                  { id: 'Other', icon: '❓' }
                ].map(issue => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue.id as EmergencyIssue)}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${selectedIssue === issue.id ? 'bg-rose-500/30 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  >
                    <span className="text-2xl">{issue.icon}</span>
                    <span className="text-white font-medium text-sm text-center">{issue.id}</span>
                  </button>
                ))}
              </div>

              {selectedIssue === 'Other' && (
                <motion.input 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  type="text" 
                  placeholder="Please specify..." 
                  value={otherIssue}
                  onChange={(e) => setOtherIssue(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-rose-400 mt-4"
                />
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Severity Level</h3>
              <div className="flex space-x-2 bg-black/20 p-1.5 rounded-2xl">
                {['Mild', 'Moderate', 'Severe'].map(level => (
                  <button
                    key={level}
                    onClick={() => setSeverity(level as Severity)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${severity === level ? (level === 'Severe' ? 'bg-rose-600 text-white shadow-lg' : level === 'Moderate' ? 'bg-orange-500 text-white shadow-lg' : 'bg-amber-500 text-white shadow-lg') : 'text-white/60 hover:text-white'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1A0000] to-transparent">
            <button 
              onClick={handleConnect}
              disabled={!selectedIssue || (selectedIssue === 'Other' && !otherIssue)}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-[0_0_30px_rgba(225,29,72,0.4)] disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center space-x-2"
              style={{ background: 'linear-gradient(90deg, #E11D48 0%, #BE123C 100%)' }}
            >
              <PhoneCall className="w-5 h-5" />
              <span>CONNECT NOW (₹350)</span>
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

const CallScreen = ({ callType, doctorId, onEndCall }: { callType: 'Normal' | 'Emergency', doctorId: string, onEndCall: () => void }) => {
  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId) || MOCK_DOCTORS[0];
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [elapsed, setElapsed] = useState(0);
  const [videoPermissionAsked, setVideoPermissionAsked] = useState(false);

  useEffect(() => {
    // Simulate onSnapshot consultations/{callId}/videoEnabled
    const timer = setTimeout(() => {
      if (!videoPermissionAsked) {
        const allow = window.confirm("Doctor is requesting to enable video. Allow?");
        setVideoPermissionAsked(true);
        if (allow) {
          setIsVideoOff(false);
        }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [videoPermissionAsked]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (callType === 'Normal') {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onEndCall();
            return 0;
          }
          return prev - 1;
        });
      } else {
        setElapsed(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [callType, onEndCall]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full h-full bg-slate-900 relative overflow-hidden font-sans">
      {/* Remote Video (Mock) */}
      <div className="absolute inset-0">
        <img src={doctor.image} alt="Doctor" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Local Video (Mock) */}
      {!isVideoOff && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-32 right-6 w-[120px] h-[180px] bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl z-20"
        >
          <img src="https://picsum.photos/seed/patient/400/600" alt="You" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
      )}

      {/* Doctor Info Top */}
      <div className="absolute top-14 left-0 right-0 px-6 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover border border-white/20" referrerPolicy="no-referrer" />
          <div>
            <h3 className="text-white font-bold text-sm">{doctor.name}</h3>
            <p className="text-white/70 text-xs">{doctor.specialization}</p>
          </div>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <p className={`font-mono font-bold ${callType === 'Normal' && timeLeft <= 30 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
            {callType === 'Normal' ? formatTime(timeLeft) : formatTime(elapsed)}
          </p>
        </div>
      </div>

      {/* 30s Warning Banner */}
      <AnimatePresence>
        {callType === 'Normal' && timeLeft <= 30 && timeLeft > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-32 left-6 right-6 bg-rose-500/90 backdrop-blur-md rounded-2xl p-3 flex items-center justify-center space-x-2 shadow-lg shadow-rose-500/20 z-20 border border-rose-400"
          >
            <AlertTriangle className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm">Call ending in {timeLeft} seconds</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center space-x-6 z-20">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${isMuted ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${isVideoOff ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>

        <button 
          onClick={() => setIsSpeaker(!isSpeaker)}
          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${!isSpeaker ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
        >
          {!isSpeaker ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>

        <button 
          onClick={onEndCall}
          className="w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-colors"
        >
          <PhoneCall className="w-7 h-7 text-white transform rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
};

const RatingScreen = ({ doctorId, onSubmit }: { doctorId: string, onSubmit: () => void }) => {
  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId) || MOCK_DOCTORS[0];
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="flex flex-col w-full h-full bg-slate-50 font-sans p-6"
    >
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg" referrerPolicy="no-referrer" />
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Rate your experience</h2>
        <p className="text-slate-500 mb-8 text-center">How was your consultation with {doctor.name}?</p>

        <div className="flex space-x-2 mb-8">
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star}
              onClick={() => setRating(star)}
              className="p-2 transition-transform hover:scale-110"
            >
              <Star className={`w-10 h-10 ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>

        <div className="w-full mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-2">Leave a comment (optional)</label>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe your experience..."
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all h-32 resize-none"
          />
        </div>

        <button 
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Submit Feedback</span>
          )}
        </button>
        
        <button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="mt-4 text-slate-500 font-medium hover:text-slate-700 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </motion.div>
  );
};

type PhaseStatus = 'completed' | 'active' | 'upcoming';

interface TreatmentPhase {
  id: string;
  phaseNumber: number;
  phaseName: string;
  status: PhaseStatus;
  duration: string;
  doctorNotes: string;
  followUpDate: string;
}

interface TreatmentPlanData {
  id: string;
  name: string;
  doctorName: string;
  startDate: string;
  progress: number;
  status: 'active' | 'archived';
  phases: TreatmentPhase[];
}

const MOCK_TREATMENT_PLANS: TreatmentPlanData[] = [
  {
    id: 'plan_1',
    name: 'Clear Aligner Therapy',
    doctorName: 'Dr. Michael Chen',
    startDate: '2026-01-15',
    progress: 45,
    status: 'active',
    phases: [
      {
        id: 'ph_1',
        phaseNumber: 1,
        phaseName: 'Initial Assessment & Impressions',
        status: 'completed',
        duration: '1 week',
        doctorNotes: 'Patient showed mild crowding in lower anteriors. Digital impressions taken successfully. Aligners ordered.',
        followUpDate: '2026-01-22',
      },
      {
        id: 'ph_2',
        phaseNumber: 2,
        phaseName: 'Aligner Set 1-4',
        status: 'completed',
        duration: '4 weeks',
        doctorNotes: 'Attachments placed on teeth 13, 23, 34, 44. Patient instructed to wear aligners 22 hours/day. Good compliance reported.',
        followUpDate: '2026-02-20',
      },
      {
        id: 'ph_3',
        phaseNumber: 3,
        phaseName: 'Aligner Set 5-8',
        status: 'active',
        duration: '4 weeks',
        doctorNotes: 'Tracking well. Minor IPR (0.2mm) performed between 31-41 to relieve crowding. Continue current wear schedule.',
        followUpDate: '2026-03-20',
      },
      {
        id: 'ph_4',
        phaseNumber: 4,
        phaseName: 'Aligner Set 9-12',
        status: 'upcoming',
        duration: '4 weeks',
        doctorNotes: 'Will evaluate need for additional IPR. Expected to close anterior diastema by end of this phase.',
        followUpDate: '2026-04-17',
      },
      {
        id: 'ph_5',
        phaseNumber: 5,
        phaseName: 'Refinement & Retention',
        status: 'upcoming',
        duration: '2 weeks',
        doctorNotes: 'Final scan for Vivera retainers. Discuss whitening options post-treatment.',
        followUpDate: '2026-05-01',
      }
    ]
  },
  {
    id: 'plan_2',
    name: 'Acne Scar Treatment',
    doctorName: 'Dr. Sarah Jenkins',
    startDate: '2025-08-10',
    progress: 100,
    status: 'archived',
    phases: [
      {
        id: 'ph_2_1',
        phaseNumber: 1,
        phaseName: 'Chemical Peel Series',
        status: 'completed',
        duration: '6 weeks',
        doctorNotes: 'Completed 3 sessions of TCA peels. Good response, hyperpigmentation reduced.',
        followUpDate: '2025-09-25',
      },
      {
        id: 'ph_2_2',
        phaseNumber: 2,
        phaseName: 'Microneedling',
        status: 'completed',
        duration: '8 weeks',
        doctorNotes: '4 sessions of microneedling with PRP. Significant improvement in rolling scars.',
        followUpDate: '2025-11-20',
      }
    ]
  }
];

const TreatmentPlan = ({ onBack }: { onBack: () => void }) => {
  const [plans, setPlans] = useState<TreatmentPlanData[]>([]);
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    // Simulate fetching from Firestore
    setTimeout(() => {
      setPlans(MOCK_TREATMENT_PLANS);
    }, 500);
  }, []);

  const activePlans = plans.filter(p => p.status === 'active');
  const archivedPlans = plans.filter(p => p.status === 'archived');

  const getStatusColor = (status: PhaseStatus) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500 text-white border-emerald-500';
      case 'active': return 'bg-indigo-600 text-white border-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)]';
      case 'upcoming': return 'bg-slate-100 text-slate-400 border-slate-300';
    }
  };

  const getLineColor = (status: PhaseStatus) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500';
      case 'active': return 'bg-indigo-600';
      case 'upcoming': return 'bg-slate-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-slate-50 font-sans relative"
    >
      {/* Header */}
      <div className="flex items-center px-6 pt-14 pb-4 bg-white sticky top-0 z-20 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900 ml-4">Treatment Plan</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {activePlans.length > 0 ? (
          activePlans.map(plan => (
            <div key={plan.id} className="mb-10">
              {/* Active Plan Card */}
              <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-indigo-100/40 border border-slate-100 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10" />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                      <User className="w-4 h-4" />
                      <span>{plan.doctorName}</span>
                    </div>
                  </div>
                  <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-xl text-xs font-bold">
                    Active
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-500 font-medium mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>Started: {new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-700">Overall Progress</span>
                    <span className="text-indigo-600">{plan.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${plan.progress}%` }} transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <h4 className="text-lg font-bold text-slate-800 mb-6 px-2">Phases</h4>
              <div className="relative pl-4">
                {plan.phases.map((phase, index) => {
                  const isLast = index === plan.phases.length - 1;
                  const isExpanded = expandedPhaseId === phase.id;
                  
                  return (
                    <div key={phase.id} className="relative pb-8">
                      {/* Connector Line */}
                      {!isLast && (
                        <div className={`absolute left-[15px] top-10 bottom-0 w-0.5 ${getLineColor(phase.status)}`} />
                      )}
                      
                      <div className="flex items-start">
                        {/* Status Icon */}
                        <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${getStatusColor(phase.status)}`}>
                          {phase.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span className="text-xs font-bold">{phase.phaseNumber}</span>
                          )}
                        </div>

                        {/* Phase Content */}
                        <div className="ml-4 flex-1">
                          <button 
                            onClick={() => setExpandedPhaseId(isExpanded ? null : phase.id)}
                            className={`w-full text-left bg-white rounded-2xl p-4 border transition-all ${phase.status === 'active' ? 'border-indigo-200 shadow-md shadow-indigo-100/50' : 'border-slate-100 shadow-sm'}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h5 className={`font-bold ${phase.status === 'upcoming' ? 'text-slate-500' : 'text-slate-900'}`}>
                                {phase.phaseName}
                              </h5>
                              {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </div>
                            
                            <div className="flex items-center space-x-3 text-xs font-medium text-slate-500 mt-2">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{phase.duration}</span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-slate-300" />
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Follow-up: {new Date(phase.followUpDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              </div>
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 mt-4 border-t border-slate-100">
                                    <h6 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Doctor's Notes</h6>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">
                                      {phase.doctorNotes}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Plans</h3>
            <p className="text-slate-500">You don't have any active treatment plans at the moment.</p>
          </div>
        )}

        {/* Archived Plans Section */}
        {archivedPlans.length > 0 && (
          <div className="mt-8">
            <button 
              onClick={() => setShowArchived(!showArchived)}
              className="w-full flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <History className="w-5 h-5 text-slate-500" />
                <span className="font-bold text-slate-700">Past Treatment Plans</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-lg">{archivedPlans.length}</span>
              </div>
              {showArchived ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            <AnimatePresence>
              {showArchived && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden pt-4 space-y-4"
                >
                  {archivedPlans.map(plan => (
                    <div key={plan.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm opacity-70">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-800">{plan.name}</h4>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-sm text-slate-500 mb-3">{plan.doctorName}</p>
                      <div className="text-xs font-medium text-slate-400">
                        Completed on {new Date(plan.phases[plan.phases.length - 1].followUpDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

type TimeFilter = '1M' | '3M' | '6M' | '1Y' | 'All';

interface HistoryScanRecord {
  id: string;
  timestamp: string;
  aesthetiq: number;
  dental: number;
  skin: number;
}

interface Milestone {
  id: string;
  category: 'AesthetiQ' | 'Dental' | 'Skin';
  oldScore: number;
  newScore: number;
  date: string;
}

const MOCK_SCAN_RECORDS: HistoryScanRecord[] = [
  { id: 's1', timestamp: '2025-09-10T10:00:00Z', aesthetiq: 60, dental: 55, skin: 45 },
  { id: 's2', timestamp: '2025-10-15T10:00:00Z', aesthetiq: 65, dental: 58, skin: 48 },
  { id: 's3', timestamp: '2025-11-20T10:00:00Z', aesthetiq: 68, dental: 60, skin: 60 }, // Skin +12
  { id: 's4', timestamp: '2025-12-25T10:00:00Z', aesthetiq: 70, dental: 65, skin: 62 },
  { id: 's5', timestamp: '2026-01-30T10:00:00Z', aesthetiq: 82, dental: 78, skin: 65 }, // AesthetiQ +12, Dental +13
  { id: 's6', timestamp: '2026-02-05T10:00:00Z', aesthetiq: 85, dental: 80, skin: 68 },
];

const ProgressTracker = ({ onBack, onNavigateToScan }: { onBack: () => void, onNavigateToScan: () => void }) => {
  const [records, setRecords] = useState<HistoryScanRecord[]>([]);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('6M');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [needsScan, setNeedsScan] = useState(false);

  useEffect(() => {
    // Simulate fetching from Firestore ordered by timestamp
    setTimeout(() => {
      setRecords(MOCK_SCAN_RECORDS);
      
      // Check if latest scan is > 30 days ago
      if (MOCK_SCAN_RECORDS.length > 0) {
        const latestScanDate = new Date(MOCK_SCAN_RECORDS[MOCK_SCAN_RECORDS.length - 1].timestamp);
        const now = new Date('2026-03-10T03:53:29-07:00'); // Using provided current time
        const diffTime = Math.abs(now.getTime() - latestScanDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 30) {
          setNeedsScan(true);
        }
      }

      // Generate milestones (10+ pts improvement between consecutive scans)
      const newMilestones: Milestone[] = [];
      for (let i = 1; i < MOCK_SCAN_RECORDS.length; i++) {
        const prev = MOCK_SCAN_RECORDS[i - 1];
        const curr = MOCK_SCAN_RECORDS[i];
        
        if (curr.aesthetiq - prev.aesthetiq >= 10) {
          newMilestones.push({ id: `m_a_${i}`, category: 'AesthetiQ', oldScore: prev.aesthetiq, newScore: curr.aesthetiq, date: curr.timestamp });
        }
        if (curr.dental - prev.dental >= 10) {
          newMilestones.push({ id: `m_d_${i}`, category: 'Dental', oldScore: prev.dental, newScore: curr.dental, date: curr.timestamp });
        }
        if (curr.skin - prev.skin >= 10) {
          newMilestones.push({ id: `m_s_${i}`, category: 'Skin', oldScore: prev.skin, newScore: curr.skin, date: curr.timestamp });
        }
      }
      setMilestones(newMilestones.reverse()); // Show newest first
    }, 500);
  }, []);

  const filteredData = useMemo(() => {
    if (!records.length) return [];
    
    const now = new Date('2026-03-10T03:53:29-07:00');
    let cutoffDate = new Date(now);

    switch (timeFilter) {
      case '1M': cutoffDate.setMonth(now.getMonth() - 1); break;
      case '3M': cutoffDate.setMonth(now.getMonth() - 3); break;
      case '6M': cutoffDate.setMonth(now.getMonth() - 6); break;
      case '1Y': cutoffDate.setFullYear(now.getFullYear() - 1); break;
      case 'All': cutoffDate = new Date(0); break;
    }

    return records
      .filter(r => new Date(r.timestamp) >= cutoffDate)
      .map(r => ({
        ...r,
        formattedDate: new Date(r.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }));
  }, [records, timeFilter]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full bg-slate-50 font-sans relative"
    >
      {/* Header */}
      <div className="flex items-center px-6 pt-14 pb-4 bg-white sticky top-0 z-20 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900 ml-4">Progress Tracker</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Reminder Card */}
        {needsScan && (
          <div className="px-6 pt-6">
            <div className="bg-indigo-600 rounded-2xl p-5 shadow-lg shadow-indigo-200 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-indigo-200" />
                  <h3 className="text-white font-bold">Time for your next scan!</h3>
                </div>
                <p className="text-indigo-100 text-sm">It's been over 30 days since your last check-in.</p>
              </div>
              <button 
                onClick={onNavigateToScan}
                className="ml-4 bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors"
              >
                Scan Now
              </button>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="px-6 pt-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Score Trends</h3>
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
                {(['1M', '3M', '6M', '1Y', 'All'] as TimeFilter[]).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${timeFilter === filter ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredData.length > 0 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="formattedDate" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                    />
                    <Line type="monotone" dataKey="aesthetiq" name="AesthetiQ" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="dental" name="Dental" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4, fill: '#14b8a6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="skin" name="Skin" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, fill: '#ec4899', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full flex items-center justify-center text-slate-400 text-sm">
                No data available for this period.
              </div>
            )}
            
            <div className="flex justify-center space-x-4 mt-6">
              <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-purple-500"/><span className="text-xs text-slate-600 font-medium">AesthetiQ</span></div>
              <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-teal-500"/><span className="text-xs text-slate-600 font-medium">Dental</span></div>
              <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-pink-500"/><span className="text-xs text-slate-600 font-medium">Skin</span></div>
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="px-6 pt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
            Milestones
          </h3>
          
          {milestones.length > 0 ? (
            <div className="space-y-3">
              {milestones.map(milestone => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  key={milestone.id} 
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                    milestone.category === 'AesthetiQ' ? 'bg-purple-100 text-purple-600' :
                    milestone.category === 'Dental' ? 'bg-teal-100 text-teal-600' :
                    'bg-pink-100 text-pink-600'
                  }`}>
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium text-sm">
                      <span className="font-bold">{milestone.category}</span> score improved <span className="text-emerald-500 font-bold">{milestone.oldScore} → {milestone.newScore}</span> 🎉
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      {new Date(milestone.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
              <p className="text-slate-500 text-sm">Keep scanning to unlock milestones!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProfileTab = ({ onLogout }: { onLogout: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('Sharon');
  const [photoURL, setPhotoURL] = useState('https://picsum.photos/seed/user/100/100');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Mock fetching user data from Firestore
    setIsLoading(true);
    setTimeout(() => {
      setDisplayName('Sharon');
      setPhotoURL('https://picsum.photos/seed/user/100/100');
      setIsLoading(false);
    }, 600);
  }, []);

  const handleSave = () => {
    setIsLoading(true);
    // Mock saving to Firestore
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 800);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoURL(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full pb-40">
      <div className="flex items-center justify-between px-6 pt-14 pb-6">
        <h2 className="text-slate-900 font-semibold text-3xl tracking-tight">Profile</h2>
        {isEditing ? (
          <button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-sm shadow-indigo-200 disabled:opacity-70"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-white text-indigo-600 border border-indigo-100 px-4 py-2 rounded-xl font-medium text-sm shadow-sm"
          >
            Edit
          </button>
        )}
      </div>

      <div className="px-6 flex flex-col items-center mt-4 mb-8">
        <div className="relative">
          <img 
            src={photoURL} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl shadow-indigo-100/50 object-cover"
            referrerPolicy="no-referrer"
          />
          {isEditing && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          )}
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*" 
            capture="user"
            onChange={handlePhotoChange}
          />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mt-4">{displayName}</h3>
        <p className="text-slate-500 text-sm">sharonraj2770@gmail.com</p>
      </div>

      <div className="px-6 space-y-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-indigo-100/30 rounded-[24px] p-6">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Personal Information</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Display Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              ) : (
                <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-slate-800 font-medium">
                  {displayName}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Email Address</label>
              <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-slate-500 font-medium">
                sharonraj2770@gmail.com
              </div>
              <p className="text-[10px] text-slate-400 mt-1 ml-1">Email cannot be changed</p>
            </div>
          </div>
        </div>

        <SecuritySettings onLogout={onLogout} />

        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-indigo-100/30 rounded-[24px] p-2">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-rose-50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                <Settings className="w-5 h-5 text-rose-600" />
              </div>
              <span className="font-bold text-rose-600">Sign Out</span>
            </div>
            <ChevronLeft className="w-5 h-5 text-rose-300 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (screen: Screen) => void }) => {
  const [scores, setScores] = useState<{aesthetiq: number, dental: number, skin: number} | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Mock Firestore fetch
    setTimeout(() => {
      setScores({
        aesthetiq: 85,
        dental: 72,
        skin: 55
      });
    }, 1000);
  }, []);

  const greeting = getGreeting();

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col w-full h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden relative font-sans"
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {activeTab === 'home' && (
          <div className="pb-32">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-14 pb-6">
              <div>
                <p className="text-slate-500 text-sm font-medium tracking-wide uppercase mb-1">{greeting}</p>
                <h2 className="text-slate-900 font-semibold text-3xl tracking-tight">Sharon</h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border border-slate-200/60 hover:bg-white transition-colors shadow-sm">
                  <Bell className="w-5 h-5 text-slate-700" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <img 
                  src="https://picsum.photos/seed/user/100/100" 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Scores Section */}
            <div className="px-6 mb-10">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-slate-800 font-medium text-lg tracking-tight">Health Overview</h3>
                <button className="text-[#6C63FF] text-sm font-medium">Details</button>
              </div>
              <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6 snap-x">
                {scores ? (
                  <>
                    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 min-w-[160px] flex flex-col justify-center shadow-xl shadow-indigo-100/50 snap-center">
                      <CubicalBarProgress value={scores.aesthetiq} color="#A78BFA" label="Aesthetiq" icon={ScanFace} />
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 min-w-[160px] flex flex-col justify-center shadow-xl shadow-indigo-100/50 snap-center">
                      <CubicalBarProgress value={scores.dental} color="#38BDF8" label="Dental" icon={Stethoscope} />
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 min-w-[160px] flex flex-col justify-center shadow-xl shadow-indigo-100/50 snap-center">
                      <CubicalBarProgress value={scores.skin} color="#FB923C" label="Skin" icon={Camera} />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-[240px] flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 mb-10">
              <h3 className="text-slate-800 font-medium text-lg tracking-tight mb-5">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-indigo-100/40 rounded-[32px] p-5 flex flex-col items-start justify-between h-36 hover:bg-white/90 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#6C63FF]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ScanFace className="w-6 h-6 text-[#6C63FF]" />
                  </div>
                  <span className="text-slate-800 font-medium tracking-tight">Face Scan</span>
                </button>
                <button 
                  onClick={() => onNavigate('ConsultDoctor')}
                  className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-indigo-100/40 rounded-[32px] p-5 flex flex-col items-start justify-between h-36 hover:bg-white/90 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Stethoscope className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-slate-800 font-medium tracking-tight">Consult</span>
                </button>
                
                <button 
                  onClick={() => onNavigate('Emergency')}
                  className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-indigo-100/40 rounded-[32px] p-5 flex flex-col items-start justify-between h-36 hover:bg-white/90 transition-colors group relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-rose-50"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6 text-rose-500" />
                  </div>
                  <span className="text-rose-600 font-medium tracking-tight relative z-10">Emergency</span>
                </button>
                
                <button 
                  onClick={() => onNavigate('ReportsVault')}
                  className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-indigo-100/40 rounded-[32px] p-5 flex flex-col items-start justify-between h-36 hover:bg-white/90 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-emerald-500" />
                  </div>
                  <span className="text-slate-800 font-medium tracking-tight">Vault</span>
                </button>
              </div>
            </div>

            {/* Feature Row */}
            <div className="px-6 mb-8">
              <h3 className="text-slate-800 font-medium text-lg tracking-tight mb-5">Features</h3>
              <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
                {[
                  { id: 'ScanHistory', icon: History, label: 'History', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  { id: 'TreatmentPlan', icon: ClipboardList, label: 'Plan', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                  { id: 'ProgressTracker', icon: TrendingUp, label: 'Progress', color: 'text-green-500', bg: 'bg-green-500/10' },
                  { id: 'Learn', icon: BookOpen, label: 'Learn', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                ].map((feature, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => {
                      if (feature.id === 'ScanHistory') onNavigate('ScanHistory');
                      if (feature.id === 'TreatmentPlan') onNavigate('TreatmentPlan');
                      if (feature.id === 'ProgressTracker') onNavigate('ProgressTracker');
                    }}
                    className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-indigo-100/30 rounded-[24px] p-4 min-w-[100px] flex flex-col items-center justify-center space-y-3 hover:bg-white/90 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full ${feature.bg} flex items-center justify-center`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <span className="text-slate-700 text-sm font-medium tracking-tight">{feature.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <ProfileTab onLogout={onLogout} />
        )}
      </div>

      {/* Floating Bottom Tabs */}
      <div className="absolute bottom-8 left-6 right-6 bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[2rem] px-2 py-2 flex items-center justify-between shadow-xl shadow-indigo-900/5">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'scan', icon: Camera, label: 'Scan' },
          { id: 'appointments', icon: Calendar, label: 'Visits' },
          { id: 'profile', icon: User, label: 'Profile' },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${isActive ? 'bg-white/60 shadow-sm' : 'hover:bg-white/40'}`}
            >
              <tab.icon className={`w-6 h-6 mb-0.5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Splash');
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [callType, setCallType] = useState<'Normal' | 'Emergency'>('Normal');

  return (
    <div className="w-full h-screen bg-[#1A1A2E] text-white font-sans overflow-hidden">
      {currentScreen === 'Splash' && <SplashScreen onComplete={(screen) => setCurrentScreen(screen)} />}
      {currentScreen === 'IntroSlider' && <IntroSlider onComplete={() => setCurrentScreen('Login')} />}
      {currentScreen === 'Login' && (
        <Login 
          onLoginSuccess={(isProfileComplete) => 
            setCurrentScreen(isProfileComplete ? 'Dashboard' : 'ProfileSetup')
          } 
        />
      )}
      {currentScreen === 'ProfileSetup' && <ProfileSetup onComplete={() => setCurrentScreen('Dashboard')} />}
      {currentScreen === 'Dashboard' && <Dashboard onLogout={() => setCurrentScreen('Login')} onNavigate={setCurrentScreen} />}
      {currentScreen === 'ScanHistory' && (
        <ScanHistory 
          onBack={() => setCurrentScreen('Dashboard')} 
          onSelectScan={(id) => {
            setSelectedScanId(id);
            setCurrentScreen('ScanDetail');
          }} 
        />
      )}
      {currentScreen === 'ScanDetail' && selectedScanId && (
        <HarmonyReport 
          scanId={selectedScanId} 
          onBack={() => setCurrentScreen('ScanHistory')} 
          onNavigate={setCurrentScreen}
        />
      )}
      {currentScreen === 'ReportsVault' && (
        <ReportsVault onBack={() => setCurrentScreen('Dashboard')} />
      )}
      {currentScreen === 'ConsultDoctor' && (
        <ConsultDoctor 
          onBack={() => setCurrentScreen('Dashboard')} 
          onSelectDoctor={(id) => {
            setSelectedDoctorId(id);
            setCurrentScreen('DoctorProfile');
          }}
        />
      )}
      {currentScreen === 'DoctorProfile' && selectedDoctorId && (
        <DoctorProfile 
          doctorId={selectedDoctorId} 
          onBack={() => setCurrentScreen('ConsultDoctor')} 
          onBooked={() => setCurrentScreen('AppointmentConfirmed')}
        />
      )}
      {currentScreen === 'AppointmentConfirmed' && (
        <AppointmentConfirmed 
          onDone={() => setCurrentScreen('Dashboard')} 
          onJoinCall={() => {
            setCallType('Normal');
            setCurrentScreen('CallScreen');
          }}
        />
      )}
      {currentScreen === 'Emergency' && (
        <Emergency 
          onBack={() => setCurrentScreen('Dashboard')} 
          onCallConnected={() => {
            setCallType('Emergency');
            setCurrentScreen('CallScreen');
          }}
        />
      )}
      {currentScreen === 'CallScreen' && (
        <CallScreen 
          callType={callType}
          doctorId={selectedDoctorId || '1'}
          onEndCall={() => setCurrentScreen('RatingScreen')} 
        />
      )}
      {currentScreen === 'RatingScreen' && (
        <RatingScreen 
          doctorId={selectedDoctorId || '1'}
          onSubmit={() => setCurrentScreen('Dashboard')} 
        />
      )}
      {currentScreen === 'TreatmentPlan' && (
        <TreatmentPlan onBack={() => setCurrentScreen('Dashboard')} />
      )}
      {currentScreen === 'ProgressTracker' && (
        <ProgressTracker onBack={() => setCurrentScreen('Dashboard')} onNavigateToScan={() => setCurrentScreen('Dashboard')} />
      )}
    </div>
  );
}
