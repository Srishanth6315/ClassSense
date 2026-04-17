from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()

print("Place your RFID card...")

try:
    while True:
        id, text = reader.read()
        print("ID:", id)
        print("Text:", text)
finally:
    print("Done")
