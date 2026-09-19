import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#070711] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px]" />

      <div className="absolute top-[200px] right-[-200px] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[140px]" />


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30">
            ♪
          </div>

          <div>

            <h1 className="text-xl font-bold tracking-tight">
              MuseAI
            </h1>

            <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
              AI Music Composer
            </p>

          </div>

        </div>


        <Link
          to="/login"
          className="hidden sm:block px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium"
        >
          Sign In
        </Link>

      </nav>


      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">


          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div>

            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/10 text-purple-300 text-sm mb-7">

              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />

              Powered by Artificial Intelligence

            </div>


            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">

              Turn your ideas

              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                into music.
              </span>

            </h2>


            {/* Description */}
            <p className="mt-7 text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">

              Describe the music you imagine and let AI transform
              your words into an original melodic composition.

            </p>


            {/* CTA Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4">

              <Link
                to="/login"
                className="group px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-semibold text-center shadow-xl shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1"
              >

                Start Creating

                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>

              </Link>


              <a
                href="#features"
                className="px-7 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 font-medium text-center transition-all"
              >
                Explore Features
              </a>

            </div>


            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8">

              {/* Stat 1 */}
              <div>

                <p className="text-2xl font-bold">
                  AI
                </p>

                <p className="text-sm text-gray-500">
                  AI composition
                </p>

              </div>


              <div className="w-px bg-white/10" />


              {/* Stat 2 */}
              <div>

                <p className="text-2xl font-bold">
                  AI
                </p>

                <p className="text-sm text-gray-500">
                  Music generation
                </p>

              </div>


              <div className="w-px bg-white/10" />


              {/* Stat 3 */}
              <div>

                <p className="text-2xl font-bold">
                  WAV
                </p>

                <p className="text-sm text-gray-500">
                  High-quality output
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE — MUSIC PREVIEW
          ================================================= */}

          <div className="relative">

            {/* Main Music Card */}
            <div className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl">


              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Now composing
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    Dreamy Piano
                  </h3>

                </div>


                <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-300">
                  ♪
                </div>

              </div>


              {/* =================================================
                  VINYL
              ================================================= */}

              <div className="flex justify-center py-5">

                <div className="relative w-52 h-52 rounded-full bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 border border-white/10 shadow-2xl flex items-center justify-center">

                  {/* Vinyl Ring */}
                  <div className="absolute inset-5 rounded-full border border-purple-400/20" />

                  <div className="absolute inset-10 rounded-full border border-pink-400/10" />


                  {/* Center */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/40 flex items-center justify-center">

                    <span className="text-2xl">
                      ♪
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  WAVEFORM
              ================================================= */}

              <div className="flex items-center justify-center gap-1.5 h-16 mt-6">

                {[22, 35, 48, 30, 55, 70, 42, 64, 78, 45, 60, 35, 50, 70, 40, 28, 52, 38, 65, 45].map(
                  (height, index) => (

                    <div
                      key={index}
                      className="w-1.5 rounded-full bg-gradient-to-t from-purple-600 to-pink-400 opacity-80"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                  )
                )}

              </div>


              {/* =================================================
                  PROGRESS BAR
              ================================================= */}

              <div className="mt-5 flex items-center gap-4">

                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">

                  <div className="w-[58%] h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />

                </div>


                <span className="text-xs text-gray-500 whitespace-nowrap">
                  AI Preview
                </span>

              </div>


              {/* =================================================
                  COMPOSITION READY CARD
              ================================================= */}

              <div className="mt-6 pt-5 border-t border-white/10">

                <div className="flex items-center justify-between gap-4">


                  {/* Left */}
                  <div className="flex items-center gap-3">

                    {/* Check Icon */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-500/10 border border-green-400/20 flex items-center justify-center">

                      <span className="text-green-400 text-sm font-bold">
                        ✓
                      </span>

                    </div>


                    {/* Text */}
                    <div>

                      <p className="text-sm font-semibold text-white">
                        Composition ready
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        AI-generated music
                      </p>

                    </div>

                  </div>


                  {/* Duration */}
                  <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/10">

                    <span className="text-xs text-purple-300">
                      20 sec
                    </span>

                  </div>

                </div>

              </div>


            </div>

          </div>

        </div>


        {/* =====================================================
            FEATURES
        ===================================================== */}

        <section
          id="features"
          className="mt-32"
        >

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto">

            <p className="text-purple-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Built for creativity
            </p>

            <h3 className="text-3xl md:text-4xl font-bold mt-3">
              Everything you need to create
            </h3>

            <p className="text-gray-500 mt-4">
              A simple creative workspace powered by AI,
              designed to turn ideas into music quickly.
            </p>

          </div>


          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-5 mt-12">


            {/* Feature 1 */}
            <div className="group p-7 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all">

              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/10 flex items-center justify-center text-purple-400 text-xl mb-6">
                ✨
              </div>

              <h4 className="text-lg font-semibold">
                AI-Powered Creation
              </h4>

              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                Describe your musical idea in natural language
                and let AI transform it into an original composition.
              </p>

            </div>


            {/* Feature 2 */}
            <div className="group p-7 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all">

              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-400/10 flex items-center justify-center text-pink-400 text-xl mb-6">
                ♫
              </div>

              <h4 className="text-lg font-semibold">
                Melodic Results
              </h4>

              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                Generate expressive melodies with balanced
                instrumentation and a more natural musical feel.
              </p>

            </div>


            {/* Feature 3 */}
            <div className="group p-7 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all">

              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/10 flex items-center justify-center text-blue-400 text-xl mb-6">
                ↓
              </div>

              <h4 className="text-lg font-semibold">
                Download & Enjoy
              </h4>

              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                Listen to your generated composition directly
                in the browser and download the final WAV file.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-600">
            © 2026 MuseAI — AI Music Composer
          </p>

          <p className="text-xs text-gray-700">
            Created with Artificial Intelligence
          </p>

        </div>

      </footer>

    </div>
  );
}