# music_generator.py
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import torch
import soundfile as sf
import datetime, os

class AIMusicGenerator:
    def __init__(self):
        print("🎵 Loading MusicGen model from Hugging Face...")
        self.model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
        self.processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        print("✅ Model loaded successfully!")

    def generate_music(self, prompt: str, duration: int = 30):
        inputs = self.processor(
            text=[prompt],
            padding=True,
            return_tensors="pt"
        )
        # Generate audio (in seconds)
        audio_values = self.model.generate(**inputs, max_new_tokens=duration * 50)

        # Save as .wav
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"music_{timestamp}.wav"
        output_dir = os.path.join("static", "music")
        os.makedirs(output_dir, exist_ok=True)
        file_path = os.path.join(output_dir, filename)

        sf.write(file_path, audio_values[0, 0].cpu().numpy(), samplerate=32000)
        return file_path
