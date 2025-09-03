import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function SymptomChatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Tell me your symptoms.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await axios.post('/api/symptom-chatbot', { message: input });

      // Defensive in case backend returns different field
      const botReply =
        res.data.reply || res.data.message || 'I didn’t understand that.';

      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Sorry, something went wrong.' }
      ]);
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.from}`}>
            {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Describe your symptoms..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default SymptomChatbot;
