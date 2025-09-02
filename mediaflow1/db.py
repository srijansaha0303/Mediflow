# db.py
import sqlite3

def get_db_connection():
    conn = sqlite3.connect("hospital.db")
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")  # ✅ Ensure constraints work
    return conn

def create_tables():
    conn = get_db_connection()
    cur = conn.cursor()

    # Patients Table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            condition TEXT NOT NULL
        )
    """)

    # Doctors Table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS doctors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            specialization TEXT NOT NULL
        )
    """)

    # Medicine Info Table (must exist before medications)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS medicine_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand_name TEXT NOT NULL,
            generic_name TEXT NOT NULL,
            brand_price REAL NOT NULL,
            generic_price REAL NOT NULL
        )
    """)

    # Medications Table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS medications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            medicine_id INTEGER NOT NULL,
            dosage TEXT NOT NULL,
            FOREIGN KEY (patient_id) REFERENCES patients (id),
            FOREIGN KEY (medicine_id) REFERENCES medicine_info (id)
        )
    """)

    # Appointments Table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            doctor_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            notes TEXT,
            FOREIGN KEY (patient_id) REFERENCES patients (id),
            FOREIGN KEY (doctor_id) REFERENCES doctors (id)
        )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_tables()
    print("✅ Tables created successfully (patients, doctors, medicine_info, medications, appointments)")
