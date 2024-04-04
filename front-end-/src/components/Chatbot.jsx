import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const inputRef = useRef(null);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
    
        const newMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: Date.now(),
        };
        setMessages([...messages, newMessage]);
        setInputValue('');
        setIsBotTyping(true);
    
        // Replace 'http://localhost:5000/send_message' with your actual Flask endpoint URL
        fetch('http://localhost:5000/send_message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: inputValue }),
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = {
                id: Date.now(),
                text: data.message,
                sender: 'bot',
                timestamp: Date.now(),
            };
            setMessages(messages => [...messages, botMessage]);
            setIsBotTyping(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsBotTyping(false);
        });
    };
    

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white ">
            <div className="flex-grow overflow-auto p-6 mr-14 ml-14">
                <div className="space-y-2">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl break-words rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                <div className="text-xs text-gray-400">{formatTimestamp(msg.timestamp)}</div>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isBotTyping && (
                        <div className="flex justify-start">
                            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl break-words rounded-lg px-4 py-2 bg-gray-700 animate-pulse">
                                Typing...
                            </div>
                        </div>
                    )}
                    <div ref={endOfMessagesRef} />
                </div>
            </div>
            <form onSubmit={handleSendMessage} className="flex border-t-2 border-gray-700 p-4 mr-14 ml-14">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-gray-800 rounded-full px-4 py-2 mr-2 outline-none"
                    placeholder="Type a message..."
                    autoComplete="off"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 transition-colors duration-300 rounded-full text-white px-6 py-2">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
