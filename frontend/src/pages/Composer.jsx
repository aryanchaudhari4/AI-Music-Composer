import { useState } from "react";

export default function Composer() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt!");
    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.audio_url) {
        setAudioUrl(`http://127.0.0.1:5000/${data.audio_url}`);
      } else {
        alert("Failed to generate music. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Make sure Flask backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        🎧 AI Music Composer
      </h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your music (e.g. calm piano melody)"
        className="w-full max-w-lg p-3 rounded-lg bg-gray-800 border border-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
      >
        {loading ? "🎶 Generating..." : "Generate Music"}
      </button>

      {audioUrl && (
        <div className="mt-6 flex flex-col items-center">
          <audio controls className="w-80">
            <source src={audioUrl} type="audio/wav" />
          </audio>
          <a
            href={audioUrl}
            download="ai_music.wav"
            className="mt-4 text-purple-300 hover:text-purple-100 underline"
          >
            ⬇️ Download Music
          </a>
        </div>
      )}
    </div>
  );
}
