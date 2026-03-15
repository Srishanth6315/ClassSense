def generate_ai_insight(data):
    if data["fan_status"] == "ON":
        return "Energy wastage possible if classroom empty."
    return "System running normally."