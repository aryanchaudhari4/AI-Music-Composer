from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import torch
import soundfile as sf
import os
import uuid
import numpy as np

# =========================================================
# Flask App
# =========================================================

app = Flask(__name__)
CORS(app)


# =========================================================
# Device
# =========================================================

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

print("\n" + "=" * 60)
print("🎵 AI MUSIC COMPOSER")
print("=" * 60)

print(f"🖥️ Device: {DEVICE}")

if DEVICE == "cuda":
    print(f"🚀 GPU: {torch.cuda.get_device_name(0)}")
    print(f"🔥 CUDA: {torch.version.cuda}")
else:
    print("⚠️ CUDA not detected. Using CPU.")

print("=" * 60)


# =========================================================
# Load MusicGen
# =========================================================

print("\n🎵 Loading MusicGen model...")

processor = AutoProcessor.from_pretrained(
    "facebook/musicgen-small"
)

if DEVICE == "cuda":

    model = MusicgenForConditionalGeneration.from_pretrained(
        "facebook/musicgen-small",
        torch_dtype=torch.float16
    )

else:

    model = MusicgenForConditionalGeneration.from_pretrained(
        "facebook/musicgen-small"
    )

model = model.to(DEVICE)
model.eval()

print("✅ MusicGen model loaded!")


# =========================================================
# Output directory
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

OUTPUT_DIR = os.path.join(
    BASE_DIR,
    "generated_music"
)

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)


# =========================================================
# Generate Music
# =========================================================

@app.route("/generate", methods=["POST"])
def generate_music():

    try:

        data = request.get_json() or {}

        prompt = data.get(
            "prompt",
            ""
        ).strip()

        if not prompt:

            return jsonify({
                "success": False,
                "error": "Please provide a music prompt."
            }), 400


        print("\n" + "=" * 60)
        print("🎶 GENERATING MUSIC")
        print("=" * 60)

        print(f"📝 Prompt: {prompt}")


        # =================================================
        # Music Prompt Enhancement
        # =================================================

        enhanced_prompt = (
            "A beautiful, melodic and emotionally expressive "
            "musical composition. "
            "Clear memorable melody, pleasant harmony, "
            "smooth transitions, balanced instrumentation, "
            "natural musical phrasing and polished production. "
            "Make it pleasant and musical to listen to. "
            + prompt
        )


        # =================================================
        # Process Prompt
        # =================================================

        inputs = processor(
            text=[enhanced_prompt],
            padding=True,
            return_tensors="pt"
        )

        inputs = {
            key: value.to(DEVICE)
            if hasattr(value, "to")
            else value
            for key, value in inputs.items()
        }


        # =================================================
        # Generate
        # =================================================

        print("🎼 Generating...")

        with torch.no_grad():

            audio_values = model.generate(
                **inputs,

                # Generate enough audio,
                # then precisely trim to 20 sec.
                max_new_tokens=1000,

                do_sample=True,

                guidance_scale=3.5,

                temperature=0.95,

                top_k=250,

                top_p=0.95
            )


        # =================================================
        # Get actual MusicGen sample rate
        # =================================================

        SAMPLE_RATE = int(
            model.config.audio_encoder.sampling_rate
        )

        print(
            f"🎚️ Sample rate: {SAMPLE_RATE} Hz"
        )


        # =================================================
        # Convert audio to NumPy
        # =================================================

        audio = (
            audio_values[0, 0]
            .float()
            .cpu()
            .numpy()
        )


        original_duration = (
            len(audio) / SAMPLE_RATE
        )

        print(
            f"📏 Generated duration: "
            f"{original_duration:.3f} seconds"
        )


        # =================================================
        # EXACT 20 SECOND TARGET
        # =================================================

        TARGET_DURATION = 20.0

        TARGET_SAMPLES = int(
            TARGET_DURATION * SAMPLE_RATE
        )


        # -------------------------------------------------
        # Trim if longer
        # -------------------------------------------------

        if len(audio) > TARGET_SAMPLES:

            print(
                "✂️ Trimming audio to exactly 20 seconds..."
            )

            audio = audio[:TARGET_SAMPLES]


        # -------------------------------------------------
        # Pad if shorter
        # -------------------------------------------------

        elif len(audio) < TARGET_SAMPLES:

            print(
                "➕ Generated audio is shorter than 20 sec."
            )

            missing = (
                TARGET_SAMPLES - len(audio)
            )

            audio = np.pad(
                audio,
                (0, missing),
                mode="constant"
            )


        # =================================================
        # Normalize Audio
        # =================================================

        max_value = np.max(
            np.abs(audio)
        )

        if max_value > 0:

            audio = (
                audio / max_value
            ) * 0.95


        # =================================================
        # FINAL SAFETY CHECK
        # =================================================

        # Force exact number of samples again
        audio = audio[:TARGET_SAMPLES]

        if len(audio) < TARGET_SAMPLES:

            audio = np.pad(
                audio,
                (0, TARGET_SAMPLES - len(audio)),
                mode="constant"
            )


        # =================================================
        # Create filename
        # =================================================

        file_id = str(
            uuid.uuid4()
        )[:8]

        filename = f"{file_id}.wav"

        file_path = os.path.join(
            OUTPUT_DIR,
            filename
        )


        # =================================================
        # Save WAV
        # =================================================

        sf.write(
            file_path,
            audio,
            SAMPLE_RATE,
            subtype="PCM_16"
        )


        # =================================================
        # Verify saved WAV
        # =================================================

        info = sf.info(file_path)

        final_duration = (
            info.frames / info.samplerate
        )


        print(
            f"✅ Final WAV duration: "
            f"{final_duration:.6f} seconds"
        )

        print(
            f"📁 Saved: {filename}"
        )

        print("=" * 60)


        # =================================================
        # Response
        # =================================================

        return jsonify({

            "success": True,

            "audio_url":
                f"generated_music/{filename}",

            "duration":
                round(final_duration, 6),

            "sample_rate":
                SAMPLE_RATE,

            "device":
                DEVICE

        })


    except Exception as e:

        print("\n❌ ERROR")
        print(str(e))

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# =========================================================
# Serve Generated Audio
# =========================================================

@app.route(
    "/generated_music/<path:filename>"
)
def serve_music(filename):

    return send_from_directory(
        OUTPUT_DIR,
        filename
    )


# =========================================================
# Home
# =========================================================

@app.route("/")
def home():

    return "🎵 AI Music Composer Backend is Running!"


# =========================================================
# Start Server
# =========================================================

if __name__ == "__main__":

    print("\n🚀 Starting backend...")
    print("🌐 http://127.0.0.1:5000")
    print("🎵 Ready!\n")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )