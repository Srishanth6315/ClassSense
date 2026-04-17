from flask import Flask, request
from datetime import datetime
import base64
import os

app = Flask(__name__)

# Create images folder
if not os.path.exists("images"):
    os.makedirs("images")

@app.route('/attendance', methods=['POST'])
def attendance():
    data = request.json

    card_id = str(data.get("id"))
    image_data = data.get("image")

    now = datetime.now()
    date = now.strftime("%d-%m-%Y")
    time_now = now.strftime("%H:%M:%S")

    # Save Image
    if image_data:
        img_bytes = base64.b64decode(image_data)
        filename = f"images/{card_id}_{time_now.replace(':','-')}.jpg"
        with open(filename, "wb") as f:
            f.write(img_bytes)

    # Save CSV
    with open("attendance.csv", "a") as f:
        f.write(f"{card_id},{date},{time_now}\n")

    print(f"✅ Attendance saved: {card_id} at {time_now}")

    return {"status": "success"}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
