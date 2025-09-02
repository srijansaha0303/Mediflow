from flask import Flask, request, jsonify
from flask_cors import CORS  # Enables cross-origin requests
from db import get_db_connection, create_tables
from data import seed_data
import openai
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow CORS on all /api routes

create_tables()

@app.route("/reset", methods=["POST"])
def reset_db():
    seed_data()
    return {"message": "✅ Database reset with 10 records per table!"}

# ----------------- Patients -----------------
@app.route("/patients", methods=["GET"])
def get_patients():
    conn = get_db_connection()
    patients = conn.execute("SELECT * FROM patients").fetchall()
    conn.close()
    return jsonify([dict(row) for row in patients])

@app.route("/patients", methods=["POST"])
def add_patient():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute("INSERT INTO patients (name, age, condition) VALUES (?, ?, ?)",
                 (data["name"], data["age"], data["condition"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Patient added ✅"})

# ----------------- Doctors -----------------
@app.route("/doctors", methods=["GET"])
def get_doctors():
    conn = get_db_connection()
    doctors = conn.execute("SELECT * FROM doctors").fetchall()
    conn.close()
    return jsonify([dict(row) for row in doctors])

@app.route("/doctors", methods=["POST"])
def add_doctor():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute("INSERT INTO doctors (name, specialization) VALUES (?, ?)",
                 (data["name"], data["specialization"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Doctor added ✅"})

# ----------------- Appointments -----------------
@app.route("/appointments", methods=["GET"])
def get_appointments():
    conn = get_db_connection()
    appts = conn.execute("""
        SELECT appointments.id, patients.name AS patient, doctors.name AS doctor,
               appointments.date, appointments.notes
        FROM appointments
        JOIN patients ON appointments.patient_id = patients.id
        JOIN doctors ON appointments.doctor_id = doctors.id
    """).fetchall()
    conn.close()
    return jsonify([dict(row) for row in appts])

@app.route("/appointments", methods=["POST"])
def add_appointment():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute("INSERT INTO appointments (patient_id, doctor_id, date, notes) VALUES (?, ?, ?, ?)",
                 (data["patient_id"], data["doctor_id"], data["date"], data.get("notes", "")))
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment added ✅"})

# ----------------- Medicine Info -----------------
@app.route("/medicine_info", methods=["GET"])
def get_medicine_info():
    conn = get_db_connection()
    meds = conn.execute("SELECT * FROM medicine_info").fetchall()
    conn.close()
    return jsonify([dict(row) for row in meds])

@app.route("/medicine_info", methods=["POST"])
def add_medicine_info():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute("INSERT INTO medicine_info (brand_name, generic_name, brand_price, generic_price) VALUES (?, ?, ?, ?)",
                 (data["brand_name"], data["generic_name"], data["brand_price"], data["generic_price"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Medicine info added ✅"})

# ----------------- Medications (Prescriptions) -----------------
@app.route("/medications", methods=["GET"])
def get_medications():
    conn = get_db_connection()
    meds = conn.execute("""
        SELECT medications.id, patients.name AS patient, 
               medicine_info.brand_name, medicine_info.generic_name,
               medicine_info.brand_price, medicine_info.generic_price,
               medications.dosage
        FROM medications
        JOIN patients ON medications.patient_id = patients.id
        JOIN medicine_info ON medications.medicine_id = medicine_info.id
    """).fetchall()
    conn.close()
    return jsonify([dict(row) for row in meds])

@app.route("/medications", methods=["POST"])
def add_medication():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute("INSERT INTO medications (patient_id, medicine_id, dosage) VALUES (?, ?, ?)",
                 (data["patient_id"], data["medicine_id"], data["dosage"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Medication added ✅"})

# ----------------- Symptom Checker Chatbot -----------------
openai.api_key = os.getenv("OPENAI_API_KEY")  # Secure key via environment variable

@app.route("/api/symptom-chatbot", methods=["POST"])
def symptom_chatbot():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({'reply': 'Please enter your symptoms.'}), 400
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{'role': 'user', 'content': user_message}]
        )
        bot_reply = response.choices[0].message.content.strip()
        return jsonify({'reply': bot_reply})
    except Exception as e:
        return jsonify({'reply': "Sorry, something went wrong. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True)
