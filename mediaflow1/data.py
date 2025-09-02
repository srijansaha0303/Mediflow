# data.py
from db import get_db_connection

def seed_data():
    conn = get_db_connection()
    
    # Clear existing data
    conn.execute("DELETE FROM medications")
    conn.execute("DELETE FROM appointments")
    conn.execute("DELETE FROM medicine_info")
    conn.execute("DELETE FROM patients")
    conn.execute("DELETE FROM doctors")
    conn.commit()
    
    # ----------------- Patients -----------------
    patients = [
        ("Alice Johnson", 30, "Diabetes"),
        ("Bob Smith", 45, "Hypertension"),
        ("Charlie Lee", 28, "Asthma"),
        ("David Kim", 50, "Arthritis"),
        ("Eva Brown", 35, "Migraine"),
        ("Frank White", 40, "Heart Disease"),
        ("Grace Green", 32, "Anemia"),
        ("Hannah Black", 27, "Allergies"),
        ("Ian Clark", 60, "COPD"),
        ("Julia Adams", 22, "Flu")
    ]
    for p in patients:
        conn.execute("INSERT INTO patients (name, age, condition) VALUES (?, ?, ?)", p)
    
    # ----------------- Doctors -----------------
    doctors = [
        ("Dr. Smith", "Cardiology"),
        ("Dr. Johnson", "Neurology"),
        ("Dr. Lee", "Pulmonology"),
        ("Dr. Kim", "Orthopedics"),
        ("Dr. Brown", "General Medicine"),
        ("Dr. White", "Dermatology"),
        ("Dr. Green", "Pediatrics"),
        ("Dr. Black", "ENT"),
        ("Dr. Clark", "Ophthalmology"),
        ("Dr. Adams", "Psychiatry")
    ]
    for d in doctors:
        conn.execute("INSERT INTO doctors (name, specialization) VALUES (?, ?)", d)
    
    # ----------------- Medicine Info -----------------
    medicines = [
        ("Panadol", "Paracetamol", 50, 20),
        ("Amoxil", "Amoxicillin", 120, 80),
        ("Ventolin", "Salbutamol", 150, 100),
        ("Lipitor", "Atorvastatin", 200, 150),
        ("Nexium", "Esomeprazole", 180, 130),
        ("Augmentin", "Amoxicillin-Clavulanate", 220, 170),
        ("Motrin", "Ibuprofen", 70, 30),
        ("Zyrtec", "Cetirizine", 90, 50),
        ("Glucophage", "Metformin", 110, 70),
        ("Lisinopril", "Lisinopril", 130, 90)
    ]
    for m in medicines:
        conn.execute("INSERT INTO medicine_info (brand_name, generic_name, brand_price, generic_price) VALUES (?, ?, ?, ?)", m)
    
    # ----------------- Appointments -----------------
    appointments = [
        (1, 1, "2025-09-01", "Routine checkup"),
        (2, 2, "2025-09-02", "Follow-up"),
        (3, 3, "2025-09-03", "Asthma treatment"),
        (4, 4, "2025-09-04", "Knee pain"),
        (5, 5, "2025-09-05", "Migraine management"),
        (6, 6, "2025-09-06", "Heart evaluation"),
        (7, 7, "2025-09-07", "Anemia treatment"),
        (8, 8, "2025-09-08", "Allergy consultation"),
        (9, 9, "2025-09-09", "COPD check"),
        (10, 10, "2025-09-10", "Flu symptoms")
    ]
    for a in appointments:
        conn.execute("INSERT INTO appointments (patient_id, doctor_id, date, notes) VALUES (?, ?, ?, ?)", a)
    
    # ----------------- Medications -----------------
    medications = [
        (1, 1, "500mg twice a day"),
        (2, 2, "250mg three times a day"),
        (3, 3, "2 puffs as needed"),
        (4, 4, "10mg once a day"),
        (5, 5, "20mg once a day"),
        (6, 6, "500mg once a day"),
        (7, 7, "Iron supplement once a day"),
        (8, 8, "10mg once a day"),
        (9, 9, "500mg twice a day"),
        (10, 10, "10mg once a day")
    ]
    for m in medications:
        conn.execute("INSERT INTO medications (patient_id, medicine_id, dosage) VALUES (?, ?, ?)", m)
    
    conn.commit()
    conn.close()
