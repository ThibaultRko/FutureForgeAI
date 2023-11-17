import React, { useState } from 'react';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'message': input
            })
        });
        const data = await response.json();
        setMessages([...messages, { text: input, sender: 'user' }, { text: data.response, sender: 'bot' }]);
        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index} className={message.sender}>
                        {message.text}
                    </div>
                ))}
            </div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatBox;
