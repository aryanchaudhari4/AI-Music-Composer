import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000";

const suggestions = [
  "Calm piano melody for a peaceful evening",
  "Energetic electronic music for a workout",
  "Emotional cinematic orchestral soundtrack",
  "Relaxing acoustic guitar with soft piano",
  "Dreamy ambient music for studying",
];

export default function Composer() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  // Reference to generated music section
  const resultRef = useRef(null);

  // Automatically scroll to generated music
  useEffect(() => {
    if (audioUrl && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    }
  }, [audioUrl]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please describe the music you want to create.");
      return;
    }

    setLoading(true);
    setAudioUrl(null);
    setError("");

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.audio_url) {
        throw new Error(
          data.error || "Music generation failed."
        );
      }

      setAudioUrl(
        `${API_URL}/${data.audio_url}?t=${Date.now()}`
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to connect to the music generation server."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (text) => {
    setPrompt(text);
    setSelectedSuggestion(text);
    setError("");
  };

  const handleClear = () => {
    setPrompt("");
    setAudioUrl(null);
    setError("");
    setSelectedSuggestion("");
  };

  return (
    <div className="min-h-screen bg-[#070711] text-white">

      {/* Background */}
      <div className="fixed top-[-250px] left-[-200px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="fixed bottom-[-250px] right-[-200px] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />


      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10 bg-[#070711]/80 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
              ♪
            </div>

            <div>

              <h1 className="font-bold text-lg">
                MuseAI
              </h1>

              <p className="hidden sm:block text-[9px] text-gray-600 uppercase tracking-[0.2em]">
                AI Music Composer
              </p>

            </div>

          </Link>


          <div className="flex items-center gap-4">

            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-green-500/10 bg-green-500/5">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-xs text-gray-400">
                AI Studio Online
              </span>

            </div>

            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Home
            </Link>

          </div>

        </div>

      </nav>


      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">

          <p className="text-purple-400 text-sm font-medium uppercase tracking-[0.2em]">
            Creative Studio
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Create your music.
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl">
            Describe the sound you're imagining and let AI
            compose an original musical experience.
          </p>

        </div>


        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">


          {/* Composer */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6 md:p-8">

            <div className="flex items-center justify-between mb-7">

              <div>

                <h3 className="text-xl font-semibold">
                  Music Prompt
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Tell the AI what you want to hear.
                </p>

              </div>

              <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/10 text-purple-300 text-xs">
                AI Generation
              </div>

            </div>


            {/* Prompt */}
            <div className="relative">

              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setError("");
                }}
                placeholder="Example: A peaceful piano melody with soft strings, warm atmosphere and an emotional cinematic feeling..."
                maxLength={500}
                rows={8}
                className="w-full resize-none rounded-2xl bg-black/20 border border-white/10 p-5 pb-12 text-white placeholder-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all leading-relaxed"
              />

              <div className="absolute bottom-4 right-4 text-xs text-gray-600">
                {prompt.length}/500
              </div>

            </div>


            {/* Error */}
            {error && (

              <div className="mt-4 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
                {error}
              </div>

            )}


            {/* Generate */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="group mt-5 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-purple-900/20 transition-all duration-300"
            >

              {loading ? (

                <span className="flex items-center justify-center gap-3">

                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                  Creating your music...

                </span>

              ) : (

                <span>

                  Generate Music

                  <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">
                    →
                  </span>

                </span>

              )}

            </button>


            {/* Suggestions */}
            <div className="mt-7">

              <div className="flex items-center justify-between mb-3">

                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Try an idea
                </p>

                {prompt && (

                  <button
                    onClick={handleClear}
                    className="text-xs text-gray-600 hover:text-gray-300"
                  >
                    Clear
                  </button>

                )}

              </div>


              <div className="flex flex-wrap gap-2">

                {suggestions.map((suggestion) => (

                  <button
                    key={suggestion}
                    onClick={() =>
                      handleSuggestion(suggestion)
                    }
                    className={`text-left text-xs px-3 py-2 rounded-xl border transition-all ${
                      selectedSuggestion === suggestion
                        ? "border-purple-500/40 bg-purple-500/10 text-purple-300"
                        : "border-white/10 bg-white/[0.02] text-gray-500 hover:text-gray-300 hover:bg-white/[0.05]"
                    }`}
                  >
                    {suggestion}
                  </button>

                ))}

              </div>

            </div>

          </section>


          {/* Information */}
          <aside className="space-y-6">

            {/* How it works */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">

              <h3 className="font-semibold text-lg">
                How it works
              </h3>

              <div className="mt-6 space-y-6">

                <Step
                  number="01"
                  title="Describe"
                  description="Write the mood, instruments or style you want."
                />

                <Step
                  number="02"
                  title="Generate"
                  description="Our AI transforms your idea into music."
                />

                <Step
                  number="03"
                  title="Listen"
                  description="Preview the generated composition directly in the studio."
                />

                <Step
                  number="04"
                  title="Download"
                  description="Save your generated music as a WAV file."
                />

              </div>

            </div>


            {/* Settings */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">

              <h3 className="font-semibold">
                Composition Settings
              </h3>

              <div className="mt-5 space-y-4">

                <Setting
                  label="Format"
                  value="WAV"
                />

                <Setting
                  label="Generation"
                  value="AI MusicGen"
                />

                <Setting
                  label="Quality"
                  value="High"
                />

              </div>

            </div>

          </aside>

        </div>


        {/* =====================================================
            GENERATED MUSIC
        ===================================================== */}

        {audioUrl && (

          <section
            ref={resultRef}
            className="mt-6 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/[0.10] to-pink-500/[0.05] p-6 md:p-8 shadow-2xl shadow-purple-900/10 transition-all duration-700"
          >

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

              <div>

                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

                  <span className="text-sm text-green-400 font-medium">
                    Composition Ready
                  </span>

                </div>

                <h3 className="text-2xl font-bold mt-2">
                  Your music is ready
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  AI-generated WAV composition
                </p>

              </div>


              {/* Download */}
              <a
                href={audioUrl}
                download="museai-composition.wav"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] transition-all text-sm font-medium"
              >
                ↓ Download WAV
              </a>

            </div>


            {/* Audio Player */}
            <div className="mt-7 p-5 rounded-2xl border border-white/10 bg-black/20">

              <div className="flex items-center gap-4 mb-4">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
                  ♪
                </div>

                <div>

                  <p className="font-medium">
                    AI Generated Composition
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    MuseAI • Ready to play
                  </p>

                </div>

              </div>


              <audio
                controls
                autoFocus
                preload="metadata"
                className="w-full"
              >

                <source
                  src={audioUrl}
                  type="audio/wav"
                />

                Your browser does not support audio playback.

              </audio>

            </div>

          </section>

        )}


        {/* Empty State */}
        {!audioUrl && !loading && (

          <div className="mt-8 text-center py-10">

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-600 text-xl">
              ♪
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Your generated composition will appear here.
            </p>

          </div>

        )}


      </main>


      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">

          <p className="text-xs text-gray-700">
            MuseAI • AI Music Composer
          </p>

          <p className="text-xs text-gray-700">
            Powered by MusicGen
          </p>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   Step Component
========================================================= */

function Step({
  number,
  title,
  description,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-xs text-purple-400 font-semibold">
        {number}
      </div>

      <div>

        <h4 className="text-sm font-medium">
          {title}
        </h4>

        <p className="text-xs text-gray-600 leading-relaxed mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   Setting Component
========================================================= */

function Setting({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">

      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-sm text-gray-300">
        {value}
      </span>

    </div>
  );
}