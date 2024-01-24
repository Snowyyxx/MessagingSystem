import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function DisplayMessages({ flag }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (flag) {
            axios.get('http://127.0.0.1:5000/get-messages')
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [flag]); // Dependency on shouldFetch
    return (
        <div className="App">
            {flag && <h1>Messages</h1>}
            <ul>
                {messages.map(message => (
                    <li key={`${message.ConfessionId}`}>
                        <strong>Title:</strong> {message.Title}<br />
                        <strong>Message:</strong> {message.Message}<br />
                        <strong>Receiver:</strong> {message.ReceiverName}<br />
                        <strong>Branch/Group:</strong> {message.ReceiverBranchGroup}<br />
                        <br/>
                    </li>
                ))}
            </ul>   
        </div>
    );
}

function InsertMessage() {
    const [messageData, setMessageData] = useState({
        title: '',
        message: '',
        receiverName: '',
        receiverBranchGroup: ''
    });

    const handleChange = (event) => {
        setMessageData({ ...messageData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/insert-messages', messageData)
            .then(response => {
                console.log('Message inserted:', response);
                // You can add more logic here, for example, clearing the form or showing a success message
            })
            .catch(error => {
                console.error('Error inserting message:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    value={messageData.title} 
                    onChange={handleChange} 
                    placeholder="Title" 
                />
                <textarea 
                    name="message" 
                    value={messageData.message} 
                    onChange={handleChange} 
                    placeholder="Message" 
                />
                <input 
                    type="text" 
                    name="receiverName" 
                    value={messageData.receiverName} 
                    onChange={handleChange} 
                    placeholder="Receiver's Name" 
                />
                <input 
                    type="text" 
                    name="receiverBranchGroup" 
                    value={messageData.receiverBranchGroup} 
                    onChange={handleChange} 
                    placeholder="Branch/Group" 
                />
                <button type="submit">Insert Confession</button>
            </form>
        </div>
    );
}


function ViewButton({ setFlag }) {
    return (
        <button onClick={() => setFlag(true)}>Display Messages</button>
    );
}

function App() {
    const [flag, setFlag] = useState(false);

    return (
        <div>
            <ViewButton setFlag={setFlag} />
            <InsertMessage />
            <DisplayMessages flag={flag} />
        </div>
    );
}

export default App;
