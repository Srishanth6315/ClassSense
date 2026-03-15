from flask import Flask, jsonify

app = Flask(__name__)

# Mock data for dashboard
dashboard_data = {
    "students_present": 18,
    "attendance_rate": "90%",
    "energy_usage": "2.3 kWh",
    "alerts": 1
}

attendance_data = [
    {"name": "Rahul", "status": "Present", "time": "09:05 AM"},
    {"name": "Ananya", "status": "Present", "time": "09:06 AM"},
    {"name": "Arjun", "status": "Absent", "time": "--"}
]

energy_data = {
    "fan_status": "ON",
    "light_status": "OFF",
    "pir_sensor": "Motion Detected",
    "energy_today": "2.3 kWh"
}

alerts_data = [
    {"time": "10:20 AM", "classroom": "204", "message": "Fan ON while room empty"}
]

ai_insights = [
    "Energy wastage detected yesterday.",
    "Reduce fan idle time to 3 minutes.",
    "Attendance trend decreasing on Fridays."
]


@app.route("/")
def home():
    return {"message": "ClassSense Backend Running"}


@app.route("/api/dashboard")
def dashboard():
    return jsonify(dashboard_data)


@app.route("/api/attendance")
def attendance():
    return jsonify(attendance_data)


@app.route("/api/energy")
def energy():
    return jsonify(energy_data)


@app.route("/api/alerts")
def alerts():
    return jsonify(alerts_data)


@app.route("/api/ai")
def ai():
    return jsonify(ai_insights)


if __name__ == "__main__":
    app.run(debug=True)