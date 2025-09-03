import sqlite3

# 1. Connect to your existing hospital.db
conn = sqlite3.connect("hospital.db")

# 2. Make sure rows are easy to read as dictionaries
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# 3. List all tables
print("📋 Tables in hospital.db:")
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cur.fetchall()
for t in tables:
    print("-", t[0])

# 4. Check contents of medicine_info
print("\n💊 Medicine Info Table:")
cur.execute("SELECT * FROM medicine_info;")
rows = cur.fetchall()
if not rows:
    print("⚠️ No data found in medicine_info!")
else:
    for row in rows:
        print(dict(row))  # print as a dictionary for readability

conn.close()
