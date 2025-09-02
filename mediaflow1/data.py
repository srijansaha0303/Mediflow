# data.py
from db import get_db_connection, create_tables

def clear_tables():
    """Delete all data from all tables in the correct order (respecting foreign keys)."""
    conn = get_db_connection()
    cur = conn.cursor()

    # First clear child tables
    cur.execute("DELETE FROM appointments")
    cur.execute("DELETE FROM medications")

    # Then clear parent tables
    cur.execute("DELETE FROM patients")
    cur.execute("DELETE FROM doctors")
    cur.execute("DELETE FROM medicine_info")

    conn.commit()
    conn.close()

def seed_data():
    """Insert sample data into all tables (10 rows each)."""
    create_tables()   # Ensure tables exist
    clear_tables()    # Reset tables before seeding

    conn = get_db_connection()
    cur = conn.cursor()

    # ---------------- Patients ----------------
    patients = [
        ("Alice Smith", 30, "Flu"),
        ("Bob Johnson", 45, "Diabetes"),
        ("Charlie Lee", 50, "Hypertension"),
        ("David Brown", 65, "Arthritis"),
        ("Eve Davis", 25, "Asthma"),
        ("Frank Wilson", 55, "Heart Disease"),
        ("Grace Martinez", 40, "Migraine"),
        ("Henry Taylor", 35, "Back Pain"),
        ("Ivy Thomas", 28, "Allergy"),
        ("Jack White", 60, "Cancer"),
    ]
    cur.executemany("INSERT INTO patients (name, age, condition) VALUES (?, ?, ?)", patients)

    # ---------------- Doctors ----------------
    doctors = [
        ("Dr. Adams", "Cardiology"),
        ("Dr. Baker", "Neurology"),
        ("Dr. Clark", "General Medicine"),
        ("Dr. Davis", "Orthopedics"),
        ("Dr. Evans", "Dermatology"),
        ("Dr. Foster", "Psychiatry"),
        ("Dr. Green", "Pediatrics"),
        ("Dr. Harris", "Oncology"),
        ("Dr. Johnson", "Endocrinology"),
        ("Dr. King", "Gastroenterology"),
    ]
    cur.executemany("INSERT INTO doctors (name, specialization) VALUES (?, ?)", doctors)

    # ---------------- Medicine Info ----------------
    medicines = [
        ("Crocin", "Paracetamol", 20.0, 5.0),
        ("Augmentin", "Amoxicillin", 150.0, 40.0),
        ("Lipitor", "Atorvastatin", 200.0, 60.0),
        ("Metformin", "Metformin", 100.0, 30.0),
        ("Zyrtec", "Cetirizine", 50.0, 15.0),
        ("Aspirin", "Acetylsalicylic Acid", 80.0, 20.0),
        ("Nexium", "Esomeprazole", 180.0, 50.0),
        ("Prozac", "Fluoxetine", 250.0, 70.0),
        ("Ventolin", "Salbutamol", 120.0, 35.0),
        ("Synthroid", "Levothyroxine", 90.0, 25.0),
    ]
    cur.executemany(
        "INSERT INTO medicine_info (brand_name, generic_name, brand_price, generic_price) VALUES (?, ?, ?, ?)",
        medicines
    )

    # ---------------- Appointments ----------------
    appointments = [
        (1, 1, "2025-09-10 10:00", "Follow-up checkup"),
        (2, 2, "2025-09-11 14:00", "Routine diabetes review"),
        (3, 3, "2025-09-12 09:30", "Blood pressure monitoring"),
        (4, 4, "2025-09-13 11:00", "Knee pain consultation"),
        (5, 5, "2025-09-14 16:00", "Asthma review"),
        (6, 6, "2025-09-15 10:15", "Cardiac evaluation"),
        (7, 7, "2025-09-16 13:00", "Migraine treatment"),
        (8, 8, "2025-09-17 15:30", "Back pain therapy"),
        (9, 9, "2025-09-18 12:00", "Allergy test"),
        (10, 10, "2025-09-19 09:00", "Oncology consultation"),]
