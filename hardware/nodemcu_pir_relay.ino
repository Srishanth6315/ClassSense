import RPi.GPIO as GPIO
import time

RELAY = 23

GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY, GPIO.OUT)

print("Relay test starting...")

try:
    while True:
        print("ON")
        GPIO.output(RELAY, 0)   # Relay ON (Active LOW)
        time.sleep(3)

        print("OFF")
        GPIO.output(RELAY, 1)   # Relay OFF
        time.sleep(3)

except KeyboardInterrupt:
    GPIO.cleanup()
    print("Exit")
