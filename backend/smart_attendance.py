import RPi.GPIO as GPIO
import time
import cv2
import requests
import base64
from mfrc522 import SimpleMFRC522

# -------- SETTINGS --------
PIR_PIN = 18
SERVER_URL = "http://10.251.78.55:5000/attendance"

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(PIR_PIN, GPIO.IN)

reader = SimpleMFRC522()

print("🚀 System Starting...")
print("⏳ Calibrating PIR...")
time.sleep(3)
print("✅ Ready!")

def capture_image():
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite("capture.jpg", frame)
    cap.release()
    return ret

try:
    while True:
        if GPIO.input(PIR_PIN):
            print("🔥 Motion Detected!")

            # 📸 Capture Image
            if capture_image():
                print("📸 Image Captured")

                # 🪪 Read RFID
                print("👉 Scan RFID card...")
                try:
                    id, text = reader.read()
                    card_id = str(id)
                    print("✅ Card:", card_id)

                    # 📦 Encode image
                    with open("capture.jpg", "rb") as img:
                        encoded = base64.b64encode(img.read()).decode()

                    # 🌐 Send to server
                    try:
                        requests.post(SERVER_URL, json={
                            "id": card_id,
                            "image": encoded
                        })
                        print("📤 Sent to Server ✅")
                    except:
                        print("❌ Server error")

                except:
                    print("❌ RFID read error")

            time.sleep(5)

        else:
            print("No Motion")
            time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()
    print("Exit")
