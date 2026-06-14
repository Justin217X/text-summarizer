from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)
CORS(app)

MODEL_NAME = "facebook/bart-large-cnn"

print("Loading BART-CNN tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

print("Loading BART-CNN model...")
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
model.eval()

print("Model loaded.")

def get_summary_settings(style):
    if style == "detailed":
        return {"max_new_tokens": 220, "min_length": 90}
    if style == "bullet":
        return {"max_new_tokens": 160, "min_length": 60}
    return {"max_new_tokens": 90, "min_length": 30}

def summarize_text(text, style):
    settings = get_summary_settings(style)

    inputs = tokenizer(
        text,
        max_length=1024,
        truncation=True,
        return_tensors="pt"
    )

    with torch.no_grad():
        summary_ids = model.generate(
            inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_new_tokens=settings["max_new_tokens"],
            min_length=settings["min_length"],
            num_beams=4,
            early_stopping=True,
            no_repeat_ngram_size=3
        )

    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    if style == "bullet":
        sentences = [s.strip() for s in summary.split(".") if s.strip()]
        summary = "\n".join(f"- {sentence}." for sentence in sentences)

    return summary

@app.route("/")
def home():
    return {"message": "Smart Notes Backend Running"}

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json() or {}

    text = data.get("text", "")
    style = data.get("style", "brief")

    if not text.strip():
        return jsonify({"error": "Text is required"}), 400

    summary = summarize_text(text, style)

    return jsonify({
        "summary": summary,
        "style": style
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)