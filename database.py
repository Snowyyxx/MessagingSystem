import sqlite3

def CreateTableNotExists():
    # Create the "Records" table if it doesn't exist
    db_path = "Confession.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Records (
            ConfessionId INTEGER PRIMARY KEY,
            Message TEXT NOT NULL,
            ReceiverName TEXT NOT NULL,
            ReceiverBranchGroup TEXT NOT NULL,
            Title TEXT
        )
    ''')
    conn.commit()
    conn.close()
