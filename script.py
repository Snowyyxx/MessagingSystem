from flask import Flask, jsonify, request
from flask_cors import CORS
from database import*
from models import *

app = Flask(__name__)
CORS(app)
# Your existing Flask routes

@app.route('/get-messages')
def get_messages():
    db_path = "Confession.db"
    conn=sqlite3.connect(db_path);
    conn.row_factory = sqlite3.Row  # This will enable column access by name
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM records")
    messages = [dict(row) for row in cursor.fetchall()]
    return jsonify(messages)

@app.route('/insert-messages', methods=['POST'])
def insert_confession():
    db_path = "Confession.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    data = request.json
    message = data['message']
    receiver_name = data['receiverName']
    receiver_branch_subgroup = data['receiverBranchGroup']
    title = data['title']

    sql = '''INSERT INTO records (Message, ReceiverName, ReceiverBranchGroup, Title)
                VALUES (?, ?, ?, ?)'''
    cursor.execute(sql, (message, receiver_name, receiver_branch_subgroup, title))
    conn.commit()
    return jsonify({'message': 'Confession inserted successfully'}), 200

if __name__ == '__main__':
    CreateTableNotExists()  # Create the table if it doesn't exist
    app.run(debug=True)
