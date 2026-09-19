import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo authentication for the project.
    // Backend authentication can be connected later.
    navigate("/composer");
  };

  return (
    <div className="min-h-screen bg-[#070711] text-white flex items-center justify-center px-6 py-10 overflow-hidden relative">

      {/* Background Effects */}
      <div className="absolute top-[-200px] left-[-150px] w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[140px]" />

      <div className="absolute bottom-[-200px] right-[-150px] w-[450px] h-[450px] bg-pink-600/20 rounded-full blur-[140px]" />


      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
      >
        <span>←</span>
        Back to home
      </Link>


      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-[32px] border border-white/10 bg-white/[0.035] backdrop-blur-2xl overflow-hidden shadow-2xl">


        {/* Left Branding Section */}
        <div className="hidden lg:flex relative p-12 bg-gradient-to-br from-purple-900/30 via-[#11111d] to-pink-900/20 flex-col justify-between">

          <div>

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30">
                ♪
              </div>

              <div>
                <h1 className="font-bold text-xl">
                  MuseAI
                </h1>

                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                  AI Music Composer
                </p>
              </div>

            </div>


            <div className="mt-24">

              <p className="text-purple-400 text-sm font-medium mb-4">
                YOUR CREATIVE STUDIO
              </p>

              <h2 className="text-4xl font-bold leading-tight">
                Your next melody
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  starts here.
                </span>
              </h2>

              <p className="mt-6 text-gray-500 leading-relaxed max-w-sm">
                Enter your creative space and turn simple ideas
                into original AI-generated music.
              </p>

            </div>

          </div>


          {/* Music Visual */}
          <div className="mt-16">

            <div className="flex items-end justify-center gap-1 h-24 opacity-70">

              {[30, 55, 40, 75, 48, 90, 62, 42, 78, 52, 68, 35, 60, 82, 45, 70, 38, 58, 76, 44].map(
                (height, index) => (
                  <div
                    key={index}
                    className="w-1.5 rounded-full bg-gradient-to-t from-purple-600 to-pink-400"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                )
              )}

            </div>

          </div>

        </div>


        {/* Right Login Section */}
        <div className="p-8 sm:p-12 lg:p-14">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
              ♪
            </div>

            <div>
              <h1 className="font-bold text-xl">
                MuseAI
              </h1>

              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                AI Music Composer
              </p>
            </div>

          </div>


          {/* Heading */}
          <div>

            <p className="text-purple-400 text-sm font-medium">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Sign in to create
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              Continue creating beautiful music with AI.
            </p>

          </div>


          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="mt-9 space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-600 outline-none transition-all focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
              />

            </div>


            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="text-sm text-gray-400">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-purple-400 hover:text-purple-300"
                  onClick={() =>
                    alert("Password recovery can be connected later.")
                  }
                >
                  Forgot password?
                </button>

              </div>


              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-600 outline-none transition-all focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* Remember */}
            <div className="flex items-center gap-2">

              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 accent-purple-600"
              />

              <label
                htmlFor="remember"
                className="text-sm text-gray-500 cursor-pointer"
              >
                Remember me
              </label>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="group w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-semibold shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Continue to Composer
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">
                →
              </span>
            </button>

          </form>


          {/* Demo Note */}
          <div className="mt-7 p-4 rounded-xl border border-white/5 bg-white/[0.025]">

            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="text-gray-300 font-medium">
                Demo mode:
              </span>{" "}
              This project currently uses frontend-only login.
              Any valid email and password will open the composer.
            </p>

          </div>


          {/* Footer */}
          <p className="text-center text-xs text-gray-600 mt-8">
            AI Music Composer • 20-second AI compositions
          </p>

        </div>

      </div>

    </div>
  );
}