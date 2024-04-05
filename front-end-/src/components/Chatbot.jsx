import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
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

        setErrorMessage(''); // Clear any existing error messages
        const newMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: Date.now(),
        };
        setMessages([...messages, newMessage]);
        setInputValue('');
        setIsBotTyping(true);

        // Send the message to the backend
        fetch('http://localhost:5000/send_message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: inputValue }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const botMessage = {
                id: Date.now(),
                text: data.message,
                sender: 'bot',
                timestamp: Date.now(),
            };
            setMessages(messages => [...messages, botMessage]);
        })
        .catch(error => {
            console.error('Error:', error);
            setErrorMessage('Failed to send message. Please try again later.');
        })
        .finally(() => {
            setIsBotTyping(false);
        });
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white px-16">
            <div className="flex-grow overflow-auto p-6">
                {errorMessage && (
                    <div className="bg-red-500 text-center p-3 rounded mb-4">
                        {errorMessage}
                    </div>
                )}
                <div className="space-y-4">
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
            <form onSubmit={handleSendMessage} className="flex border-t-2 border-gray-700 p-4 px-6">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-gray-800 rounded-full px-4 py-2 mr-2 outline-none placeholder-gray-500"
                    placeholder="Type a message..."
                    autoComplete="off"
                />
                <button type="submit" className="bg-green-500 hover:bg-green-600 transition-colors duration-300 rounded-full text-white px-6 py-2 shadow-lg">
                    Send
                </button>
            </form>
        </div>
    );
    

};

export default Chatbot;
