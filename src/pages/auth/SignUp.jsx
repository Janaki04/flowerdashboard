import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/Illustration.png"


export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!acceptTerms) {
      alert("You must accept the Terms and Conditions to proceed.");
      return;
    }

    const newUser = { fullName, email, password };
    sessionStorage.setItem('registeredUser', JSON.stringify(newUser));

    setAlertMessage(`Success! Account created for ${fullName}`);
    navigate('/dashboard');
    
    setTimeout(() => setAlertMessage(null), 4000);
      
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAcceptTerms(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#21943A] flex items-center justify-center p-4 md:p-8 font-sans relative">
      
      {alertMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800 animate-bounce duration-300 text-sm font-semibold">
          <div className="w-2.5 h-2.5 rounded-full bg-[#21943A] animate-pulse" />
          <span>{alertMessage}</span>
        </div>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-8 xl:gap-12">
        
        <div className="hidden lg:flex flex-col items-center justify-center text-center p-4">
          <div className="relative max-w-lg">
            <img 
              src={image} 
              alt="Sign Up Workspace Illustration" 
              className="w-full h-auto object-contain max-h-[460px] drop-shadow-xl"
            />
          </div>
        </div>

        <div className="w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md md:max-w-xl bg-white rounded-[24px] shadow-2xl p-8 md:p-12 flex flex-col justify-between min-h-[660px]">
            
            <div className="space-y-5">
              <h2 className="text-[28px] md:text-[32px] font-bold text-gray-800 text-center tracking-tight pt-2">
                Create Account
              </h2>

              <button 
                type="button"
                onClick={() => alert("Google Sign-up flow triggered.")}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200/90 rounded-xl hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.93 5.93 0 0 1 8 12.583a5.93 5.93 0 0 1 5.99-5.935c1.45 0 2.76.51 3.8 1.35l3.17-3.17C18.99 2.85 16.25 1.5 13.99 1.5a10.5 10.5 0 0 0-10.5 10.5 10.5 10.5 0 0 0 10.5 10.5c5.73 0 10.14-4.04 10.14-10.21 0-.48-.04-.84-.13-1.21H12.24Z"/>
                </svg>
                <span>Sign Up with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="w-full border-t border-gray-100" />
                <span className="absolute bg-white px-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  Or Sign Up With Email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-400">Full Name</label>
                  <input 
                    type="text"
                    placeholder="Regina Cooper"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-400">Email</label>
                  <input 
                    type="email"
                    placeholder="cooper@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-400">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all shadow-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-400">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all shadow-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center pt-1 text-sm font-semibold">
                  <label className="flex items-center gap-2.5 cursor-pointer text-gray-500">
                    <input 
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 bg-white border-gray-300 rounded text-[#21943A] accent-[#21943A] focus:ring-0 transition-all cursor-pointer"
                    />
                    <span>
                      I accept{' '}
                      <span 
                        onClick={(e) => { e.preventDefault(); alert("Open Terms & Conditions popup"); }} 
                        className="text-[#21943A] hover:underline"
                      >
                        Terms and Conditions
                      </span>
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-[#21943A] hover:bg-[#21943A] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-[#1b8a3f]/10 active:scale-[0.99]"
                  >
                    Create Account
                  </button>
                </div>

              </form>
            </div>

            <div className="text-center pt-6 text-sm font-semibold text-gray-400 pb-1">
              Already have an account?{' '}
              <button onClick={() => navigate("/login")} className="text-[#21943A] font-bold hover:underline">
                Login
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}