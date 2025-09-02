import requests

# Add a patient
resp = requests.post("http://127.0.0.1:5000/patients", json={
    "name": "Alice",
    "age": 25,
    "condition": "Fever"
})
print("Added patient:", resp.json())

# Add a doctor
resp = requests.post("http://127.0.0.1:5000/doctors", json={
    "name": "Dr. Smith",
    "specialization": "Cardiology"
})
print("Added doctor:", resp.json())

# Add medicine info
resp = requests.post("http://127.0.0.1:5000/medicine_info", json={
    "brand_name": "Crocin",
    "generic_name": "Paracetamol",
    "brand_price": 50,
    "generic_price": 10
})
print("Added medicine:", resp.json())

# Add medication (link patient to medicine)
resp = requests.post("http://127.0.0.1:5000/medications", json={
    "patient_id": 1,
    "medicine_id": 1,
    "dosage": "500mg twice daily"
})
print("Added medication:", resp.json())
