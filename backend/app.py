from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from audiocraft.models import MusicGen
import tempfile
import torchaudio
import os
import uuid

app = Flask(__name__)
CORS(app)

# ✅ Load model once at startup
print("🎵 Loading MusicGen model from Hugging Face...")
model = MusicGen.get_pretrained('facebook/musicgen-small')
print("✅ Model loaded successfully!")

# Create folder for generated music
OUTPUT_DIR = "generated_music"
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.route('/')
def home():
    return "🎵 AI Music Composer Backend is Running!"

@app.route('/generate', methods=['POST'])
def generate_music():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        print(f"🎶 Generating music for prompt: {prompt}")

        # Generate music (5 seconds)
        model.set_generation_params(duration=5)
        wav = model.generate([prompt])

        # Save generated file
        file_id = str(uuid.uuid4())[:8]
        file_path = os.path.join(OUTPUT_DIR, f"{file_id}.wav")
        torchaudio.save(file_path, wav[0].cpu(), 32000)

        print(f"✅ Music generated and saved at: {file_path}")
        return jsonify({"audio_url": f"generated_music/{file_id}.wav"})

    except Exception as e:
        print("❌ Error generating music:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/generated_music/<path:filename>')
def serve_music(filename):
    return send_from_directory(OUTPUT_DIR, filename)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
