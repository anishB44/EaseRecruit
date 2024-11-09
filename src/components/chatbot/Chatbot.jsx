import React, { useState, useRef, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaRobot, FaUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdRefresh, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import NameLogo from "../ui/NameLogo";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ButtonPrimary from "../ui/ButtonPrimary";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      setIsTyping(true);
      try {
        const response = await generateResponse(input);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      } catch (error) {
        console.error("Error generating response:", error);
        setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request. Please try again.", sender: 'bot' }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const generateResponse = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
    const handleReset = () => {
    setMessages([]); // Clear all messages
    setInput(''); // Clear the input field
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFullscreen(false);
  };

  return (
    <div className={`fixed z-50 ${isFullscreen ? 'inset-0' : 'bottom-5 right-7'}`}>
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-lg flex flex-col overflow-hidden ${isFullscreen ? 'w-full h-full' : 'w-96 h-[500px]'}`}>
          <div className="bg- text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <NameLogo name="EaseRecruit" width={8} text="lg" />
              <h3 className="font-semibold text-lg">EaseRecruit Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={handleReset} className="text-white hover:text-gray-300 transition-colors">
                <MdRefresh size={20} />
              </button>
              <button onClick={toggleFullscreen} className="text-white hover:text-gray-300 transition-colors">
                {isFullscreen ? <MdFullscreenExit size={20} /> : <MdFullscreen size={20} />}
              </button>
              <button onClick={handleClose} className="text-white hover:text-gray-300 transition-colors">
                <IoClose size={24} />
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`rounded-lg p-3 max-w-[80%] ${message.sender === 'user' ? 'bg-fuchsia-900 text-white' : 'bg-white border border-gray-200 text-grayColor'}`}>
                  <div className="flex items-center mb-1">
                    {message.sender === 'bot' ? (
                      <FaRobot className="text-primary mr-2" />
                    ) : (
                      <FaUser className="text-white mr-2" />
                    )}
                    <span className={`font-semibold text-sm ${message.sender === 'user' ? 'text-white' : 'text-primary'}`}>
                      {message.sender === 'bot' ? 'Assistant' : 'You'}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow border rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-grayColor"
                placeholder="Type a message..."
              />
              <ButtonPrimary
                onClickFunc={handleSend}
                display={<IoMdSend size={20} />}
                className="rounded-full p-2 ml-2"
              />
            </div>
          </div>
        </div>
      )}
      {!isOpen && (
  <ButtonPrimary
    onClickFunc={() => setIsOpen(true)}
    display={
      <>
        <FaRobot size={24} />
        <span className="font-semibold ml-2">Chat with us</span>
      </>
    }
    className="rounded-full p-4 shadow-lg flex items-center bg-primary text-white"
  />
)}
    </div>
  );
};

export default Chatbot;
