import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/Illustration.png"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate=useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (rememberMe) {
      sessionStorage.setItem('rememberedEmail', email);
    } else {
      sessionStorage.removeItem('rememberedEmail');
    }

    sessionStorage.setItem('userSession', JSON.stringify({ email, isLoggedIn: true }));

    setAlertMessage(`Success! Logged in successfully as ${email}`);
    navigate('/dashboard');
    
    setTimeout(() => setAlertMessage(null), 4000);
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
              alt="Login Workspace Illustration" 
              className="w-full h-auto object-contain max-h-[460px] drop-shadow-xl"
            />
          </div>
        </div>

        <div className="w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md md:max-w-xl bg-white rounded-[24px] shadow-2xl p-8 md:p-14 flex flex-col justify-between min-h-[620px]">
            
            <div className="space-y-6">
              <h2 className="text-[28px] md:text-[32px] font-bold text-gray-800 text-center tracking-tight pt-4">
                Login To Your Account
              </h2>

              <button 
                type="button"
                onClick={() => alert("Google Login functionality triggered.")}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200/90 rounded-xl hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.93 5.93 0 0 1 8 12.583a5.93 5.93 0 0 1 5.99-5.935c1.45 0 2.76.51 3.8 1.35l3.17-3.17C18.99 2.85 16.25 1.5 13.99 1.5a10.5 10.5 0 0 0-10.5 10.5 10.5 10.5 0 0 0 10.5 10.5c5.73 0 10.14-4.04 10.14-10.21 0-.48-.04-.84-.13-1.21H12.24Z"/>
                </svg>
                <span>Login with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-gray-100" />
                <span className="absolute bg-white px-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  Or Login With Email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Email</label>
                  <input 
                    type="email"
                    placeholder="cooper@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all shadow-sm"
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

                <div className="flex items-center justify-between pt-1 text-sm font-semibold">
                  <label className="flex items-center gap-2.5 cursor-pointer text-gray-500">
                    <input 
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 bg-white border-gray-300 rounded text-[#21943A] accent-[#21943A] focus:ring-0 transition-all cursor-pointer"
                    />
                    <span>Remember Me</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => alert("Redirecting to password recovery...")}
                    className="text-[#21943A] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="pt-3">
                  <button 
                    type="submit"
                    className="w-full bg-[#21943A] hover:bg-[#21943A] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-[#21943A]/10 active:scale-[0.99]"
                  >
                    Log In
                  </button>
                </div>

              </form>
            </div>

            <div className="text-center pt-8 text-sm font-semibold text-gray-400 pb-2">
              Don't have an account?{' '}
              <button onClick={() => navigate("/signup")} className="text-[#21943A] font-bold hover:underline">
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}