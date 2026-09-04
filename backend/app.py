from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import torch
import soundfile as sf
import os
import uuid

app = Flask(__name__)
CORS(app)

print("🎵 Loading MusicGen model...")
processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
print("✅ MusicGen model loaded!")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "generated_music")
os.makedirs(OUTPUT_DIR, exist_ok=True)


@app.route("/")
def home():
    return "🎵 AI Music Composer Backend is Running!"


@app.route("/generate", methods=["POST"])
def generate_music():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "").strip()

        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        print(f"🎶 Generating music for: {prompt}")

        inputs = processor(
            text=[prompt],
            padding=True,
            return_tensors="pt"
        )

        with torch.no_grad():
            audio_values = model.generate(
                **inputs,
                max_new_tokens=1500
            )

        file_id = str(uuid.uuid4())[:8]
        file_path = os.path.join(
            OUTPUT_DIR,
            f"{file_id}.wav"
        )

        audio = audio_values[0, 0].cpu().numpy()

        sf.write(
            file_path,
            audio,
            samplerate=32000
        )

        print(f"✅ Saved: {file_path}")

        return jsonify({
            "audio_url": f"generated_music/{file_id}.wav"
        })

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500


@app.route("/generated_music/<path:filename>")
def serve_music(filename):
    return send_from_directory(OUTPUT_DIR, filename)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )