import librosa
import numpy as np


def analyze_audio(file_path):
    try:
        y, sr = librosa.load(file_path, sr=None)

        duration = len(y) / sr

        rms = librosa.feature.rms(y=y)
        energy_variation = float(np.std(rms) * 100)

        pitch, _ = librosa.piptrack(y=y, sr=sr)

        non_zero_pitch = pitch[pitch > 0]

        if len(non_zero_pitch) > 0:
            pitch_mean = float(np.mean(non_zero_pitch))
            pitch_variation = float(np.std(non_zero_pitch))
        else:
            pitch_mean = 0
            pitch_variation = 0

        zcr = librosa.feature.zero_crossing_rate(y)
        zcr_mean = float(np.mean(zcr))

        # Temporary heuristic scores for MVP.
        # These will later be replaced with real model outputs.
        prosody_risk = min(
            100,
            round(pitch_variation / 2 + energy_variation * 5)
        )

        deepfake_risk = min(
            100,
            round(abs(zcr_mean - 0.1) * 300)
        )

        return {
            "status": "success",
            "duration_seconds": round(duration, 2),
            "sample_rate": sr,
            "pitch_mean": round(pitch_mean, 2),
            "pitch_variation": round(pitch_variation, 2),
            "deepfake_risk": deepfake_risk,
            "prosody_risk": prosody_risk,
            "speaker_mismatch_risk": 0
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }