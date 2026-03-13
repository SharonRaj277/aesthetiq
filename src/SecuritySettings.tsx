import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, ChevronLeft, Shield, Check, Eye, EyeOff, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

const BottomSheet = ({ isOpen, onClose, title, snapPoint, children, step, emailSuccess, activeModal, onBack }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative bg-white rounded-t-3xl w-full flex flex-col overflow-hidden"
        style={{ height: snapPoint }}
      >
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-6 py-2 border-b border-slate-100 relative">
          {step > 1 && !emailSuccess && onBack && (
            <button onClick={onBack} className="absolute left-6 p-2 -ml-2 text-slate-400 hover:text-slate-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <h3 className="text-lg font-bold text-slate-800 flex-1 text-center">{title}</h3>
          <button onClick={onClose} className="absolute right-6 p-2 -mr-2 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        {step > 1 && !emailSuccess && activeModal && (
          <div className="w-full text-center py-1">
            <span className="text-xs text-slate-400 font-medium">Step {step} of {activeModal === 'email' ? 3 : 2}</span>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6 relative overflow-x-hidden">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const SecuritySettings = ({ onLogout }: { onLogout: () => void }) => {
  const [activeModal, setActiveModal] = useState<'password' | 'email' | 'google' | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Password Flow State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passError, setPassError] = useState('');
  const [passToast, setPassToast] = useState('');
  
  // Email Flow State
  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [timer, setTimer] = useState(152); // 2:32
  const [showEmailCurrent, setShowEmailCurrent] = useState(false);
  
  const isGoogleUser = false; // Mock
  const currentEmail = 'sharonraj2770@gmail.com';
  const maskedEmail = currentEmail.replace(/(.{2})(.*)(?=@)/,
    (gp1, gp2, gp3) => { 
      let mask = ''; 
      for(let i=0; i<gp3.length; i++) mask+='*'; 
      return gp2 + mask; 
    }
  );

  const getPinStrength = (pin: string) => {
    if (pin.length === 0) return 0;
    if (pin.length < 6) return 1; // Too short, weak
    
    // Check for sequential (123456, 654321, etc)
    const isSequential = '01234567890 9876543210'.includes(pin);
    // Check for all same digits (111111)
    const isRepeated = /^(\d)\1{5}$/.test(pin);
    
    if (isSequential || isRepeated) return 1; // Weak
    
    const uniqueDigits = new Set(pin).size;
    if (uniqueDigits <= 3) return 2; // Fair (e.g., 112233)
    
    return 3; // Strong
  };

  const strength = getPinStrength(newPassword);
  const strengthLabel = strength === 0 ? '' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : 'Strong';
  const strengthColor = strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-amber-500' : 'bg-green-500';
  const strengthTextColor = strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : 'text-green-500';

  const handleRowTap = (type: 'password' | 'email') => {
    if (isGoogleUser) {
      setActiveModal('google');
    } else {
      setActiveModal(type);
      setStep(1);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setNewEmail('');
      setOtp(['', '', '', '', '', '']);
      setPassError('');
      setEmailError('');
      setPassToast('');
      setEmailSuccess(false);
    }
  };

  const handleVerifyCurrentPassword = async (flow: 'password' | 'email') => {
    setIsLoading(true);
    const setError = flow === 'password' ? setPassError : setEmailError;
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (currentPassword !== '123456') { // Mock correct PIN
        throw new Error('Incorrect PIN. Please try again.');
      }
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    setPassError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (newPassword.length !== 6 || !/^\d+$/.test(newPassword)) {
        throw new Error('PIN must be exactly 6 digits.');
      }
      if (newPassword === currentPassword) {
        throw new Error('New PIN cannot be the same as current PIN.');
      }
      setPassToast('✓ PIN updated successfully');
      setTimeout(() => {
        setActiveModal(null);
        setPassToast('');
      }, 2000);
    } catch (err: any) {
      setPassError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    setEmailError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (newEmail === currentEmail) {
        throw new Error('New email must be different from current email.');
      }
      if (newEmail === 'taken@gmail.com') { // Mock taken email
        throw new Error('This email is already linked to another AesthetiQ account.');
      }
      setStep(3);
      setTimer(152);
    } catch (err: any) {
      setEmailError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setEmailError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (otp.join('') !== '123456') { // Mock correct OTP
        throw new Error('Incorrect code. Please try again.');
      }
      setEmailSuccess(true);
    } catch (err: any) {
      setEmailError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (activeModal === 'email' && step === 3 && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [activeModal, step, timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextEmpty = newOtp.findIndex(v => !v);
      const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
      document.getElementById(`otp-${focusIndex}`)?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center space-x-2 mb-4 px-2">
        <Lock className="w-5 h-5 text-slate-800" />
        <h3 className="text-lg font-bold text-slate-800">Security</h3>
      </div>

      <div className="space-y-3">
        {/* Change Password Row */}
        <button 
          onClick={() => handleRowTap('password')}
          className="w-full h-[56px] bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-between px-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-indigo-500" />
            <span className="text-slate-700 font-medium">Change PIN</span>
          </div>
          <ChevronLeft className="w-5 h-5 text-slate-400 rotate-180" />
        </button>

        {/* Change Email Row */}
        <button 
          onClick={() => handleRowTap('email')}
          className="w-full h-[56px] bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-between px-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <div className="flex flex-col items-start">
              <span className="text-slate-700 font-medium">Change Email Address</span>
              <span className="text-xs text-slate-400">{maskedEmail}</span>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 text-slate-400 rotate-180" />
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {passToast && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-[60] flex items-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{passToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {activeModal === 'password' && (
          <BottomSheet 
            isOpen={true} 
            onClose={() => setActiveModal(null)} 
            title="Change PIN" 
            snapPoint="65%"
            step={step}
            emailSuccess={emailSuccess}
            activeModal={activeModal}
            onBack={() => setStep(step - 1)}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current PIN</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        maxLength={6}
                        inputMode="numeric"
                        onChange={(e) => setCurrentPassword(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter current 6-digit PIN"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 py-4 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {passError && <p className="text-red-500 text-sm mt-2">{passError}</p>}
                  </div>
                  <button 
                    onClick={() => handleVerifyCurrentPassword('password')}
                    disabled={isLoading || currentPassword.length !== 6}
                    className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center mt-4"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Verify & Continue'}
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">New PIN</label>
                      <div className="relative">
                        <input 
                          type={showNew ? "text" : "password"}
                          value={newPassword}
                          maxLength={6}
                          inputMode="numeric"
                          onChange={(e) => setNewPassword(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter new 6-digit PIN"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {newPassword.length > 0 && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="flex-1 flex space-x-1 h-1.5">
                            {[1, 2, 3].map((idx) => (
                              <div key={idx} className={`flex-1 rounded-full transition-colors duration-300 ${idx <= strength ? strengthColor : 'bg-slate-200'}`} />
                            ))}
                          </div>
                          <span className={`text-xs font-bold ${strengthTextColor}`}>{strengthLabel}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New PIN</label>
                      <div className="relative">
                        <input 
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          maxLength={6}
                          inputMode="numeric"
                          onChange={(e) => setConfirmPassword(e.target.value.replace(/\D/g, ''))}
                          placeholder="Confirm new 6-digit PIN"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors pr-12"
                        />
                        <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                          {confirmPassword.length > 0 && (
                            newPassword === confirmPassword ? 
                              <Check className="h-5 w-5 text-green-500" /> : 
                              <X className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <button 
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    {passError && <p className="text-red-500 text-sm">{passError}</p>}
                  </div>
                  <button 
                    onClick={handleUpdatePassword}
                    disabled={isLoading || newPassword.length !== 6 || newPassword !== confirmPassword}
                    className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center mt-4"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Update PIN'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </BottomSheet>
        )}
      </AnimatePresence>

      {/* Change Email Modal */}
      <AnimatePresence>
        {activeModal === 'email' && (
          <BottomSheet 
            isOpen={true} 
            onClose={() => setActiveModal(null)} 
            title="Change Email Address" 
            snapPoint="70%"
            step={step}
            emailSuccess={emailSuccess}
            activeModal={activeModal}
            onBack={() => setStep(step - 1)}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex-1">
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-center border border-slate-100">
                      <span className="text-slate-500 text-sm">Current: </span>
                      <span className="text-slate-800 font-bold">{maskedEmail}</span>
                    </div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current PIN</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type={showEmailCurrent ? "text" : "password"}
                        value={currentPassword}
                        maxLength={6}
                        inputMode="numeric"
                        onChange={(e) => setCurrentPassword(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter current 6-digit PIN"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 py-4 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowEmailCurrent(!showEmailCurrent)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showEmailCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">Enter your PIN to verify it's you</p>
                    {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                  </div>
                  <button 
                    onClick={() => handleVerifyCurrentPassword('email')}
                    disabled={isLoading || currentPassword.length !== 6}
                    className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center mt-4"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Verify & Continue'}
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter new email"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 py-4 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) && <Check className="h-5 w-5 text-green-500" />}
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">A verification code will be sent to this address</p>
                    
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-700 text-sm leading-snug">
                        ⚠ Your login email will change. Make sure you have access to this inbox.
                      </p>
                    </div>

                    {emailError && <p className="text-red-500 text-sm mt-4">{emailError}</p>}
                  </div>
                  <button 
                    onClick={handleSendOTP}
                    disabled={isLoading || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) || newEmail === currentEmail}
                    className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center mt-4"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Send OTP'}
                  </button>
                </motion.div>
              )}

              {step === 3 && !emailSuccess && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex-1">
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-slate-800 mb-2">Enter Verification Code</h4>
                      <p className="text-slate-500 text-sm">We sent a 6-digit code to <span className="font-bold text-slate-700">{newEmail}</span>. Check your inbox (and spam folder).</p>
                    </div>
                    
                    <div className="flex justify-between space-x-2 mb-6">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={`w-12 h-14 text-center text-xl font-bold rounded-xl border ${emailError ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'} focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-colors`}
                        />
                      ))}
                    </div>

                    <div className="text-center">
                      {timer > 0 ? (
                        <p className="text-slate-500 text-sm">Resend code in {formatTime(timer)}</p>
                      ) : (
                        <button onClick={handleSendOTP} className="text-[#6C63FF] font-bold text-sm hover:underline">Resend Code</button>
                      )}
                    </div>

                    {emailError && <p className="text-red-500 text-sm mt-4 text-center">{emailError}</p>}
                  </div>
                  <button 
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.some(d => !d)}
                    className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center mt-4"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Verify & Update Email'}
                  </button>
                </motion.div>
              )}

              {emailSuccess && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Email Updated!</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Your email has been changed to <span className="font-bold">{newEmail}</span>.
                    A confirmation link was also sent there by Firebase as an extra security step.
                    You will be logged out now — please sign in with your new email.
                  </p>
                  <button 
                    onClick={onLogout}
                    className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity"
                  >
                    Got it
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </BottomSheet>
        )}
      </AnimatePresence>

      {/* Google Account Modal */}
      <AnimatePresence>
        {activeModal === 'google' && (
          <BottomSheet isOpen={true} onClose={() => setActiveModal(null)} title="Signed in with Google" snapPoint="50%">
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Your account is linked to Google. To change your email or PIN, please update them directly in your Google Account settings. Your AesthetiQ account will automatically reflect the changes on next login.
              </p>
              <div className="mt-auto w-full space-y-3">
                <button 
                  onClick={() => window.open('https://myaccount.google.com', '_blank')}
                  className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-xl font-bold text-white shadow-lg shadow-[#6C63FF]/20 hover:opacity-90 transition-opacity"
                >
                  Open Google Account Settings
                </button>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </BottomSheet>
        )}
      </AnimatePresence>
    </div>
  );
};
