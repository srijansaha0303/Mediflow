import sqlite3

def add_medicine(medicine):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # Insert medicine
    c.execute('''
        INSERT INTO medicines (brand_name, generic_name, brand_price, generic_price)
        VALUES (?, ?, ?, ?)
    ''', (medicine['brand_name'], medicine['generic_name'], medicine['brand_price'], medicine['generic_price']))

    medicine_id = c.lastrowid

    # Insert stores
    for store in medicine['stores']:
        c.execute('''
            INSERT INTO stores (medicine_id, name, contact, delivery)
            VALUES (?, ?, ?, ?)
        ''', (medicine_id, store['name'], store['contact'], int(store['delivery'])))

    conn.commit()
    conn.close()

def get_medicine_data(name):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # Find medicine by brand or generic name (simple search)
    c.execute('''
        SELECT id, brand_name, generic_name, brand_price, generic_price
        FROM medicines
        WHERE brand_name LIKE ? OR generic_name LIKE ?
    ''', (f'%{name}%', f'%{name}%'))

    medicines_rows = c.fetchall()
    results = []

    for row in medicines_rows:
        medicine_id = row[0]
        c.execute('SELECT name, contact, delivery FROM stores WHERE medicine_id=?', (medicine_id,))
        stores_rows = c.fetchall()

        stores = [{
            'name': s[0],
            'contact': s[1],
            'delivery': bool(s[2])
        } for s in stores_rows]

        results.append({
            'brand_name': row[1],
            'generic_name': row[2],
            'brand_price': row[3],
            'generic_price': row[4],
            'stores': stores
        })

    conn.close()
    return results