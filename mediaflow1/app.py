from flask import Flask, request, jsonify
from db import get_connection, init_db

app = Flask(__name__)

# Initialize DB (runs once at start)
init_db()

@app.route("/patients", methods=["POST"])
def add_patient():
    data = request.json
    name = data.get("name")
    age = data.get("age")
    condition = data.get("condition")

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO patients (name, age, condition) VALUES (?, ?, ?)",
                (name, age, condition))
    conn.commit()
    conn.close()

    return jsonify({"message": "Patient added successfully ✅"}), 201


@app.route("/patients", methods=["GET"])
def get_patients():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM patients")
    rows = cur.fetchall()
    conn.close()

    # Convert rows to list of dicts
    patients = [dict(row) for row in rows]
    return jsonify(patients)


if __name__ == "__main__":
    app.run(debug=True)
