import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 drop-shadow-lg">
        🎵 AI Music Composer
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-10 opacity-90">
        Create stunning, mood-based melodies with the power of Artificial
        Intelligence. Compose, play, and download your own AI-generated music
        instantly.
      </p>
      <Link
        to="/login"
        className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-purple-100 transition-all duration-300"
      >
        Get Started →
      </Link>
    </div>
  );
}
