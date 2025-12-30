from flask import Flask, request, jsonify
from waste_prediction import predict

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict_waste():
    data = request.json

    attendance = data["attendance"]
    menu_type = data["menu_type"]

    waste_level = predict(attendance, menu_type)

    waste_map = {
        "low": (2, 5),
        "medium": (6, 15),
        "high": (16, 30)
    }

    min_w, max_w = waste_map[waste_level]

    return jsonify({
        "waste_level": waste_level,
        "waste_kg": f"{(attendance * 0.3) * (max_w / 100):.2f}",
        "waste_percentage": max_w,
        "suggestion": f"Predicted {waste_level} waste. Adjust food preparation accordingly."
    })

if __name__ == "__main__":
    app.run(debug=True)
