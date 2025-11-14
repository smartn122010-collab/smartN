
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage, MessageAuthor } from './types';
import ChatMessageComponent from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Icon from './components/Icon';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeChat = () => {
      try {
        if (!process.env.API_KEY) {
            setError("API_KEY environment variable not set. Please follow the setup instructions.");
            return;
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatSession = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are a helpful and friendly AI assistant. Keep your responses concise and informative.',
          },
        });
        setChat(chatSession);
        setMessages([
            {
                author: MessageAuthor.AI,
                text: "Hello! I'm Gemini. How can I assist you today?"
            }
        ]);
      } catch (e) {
         setError(e instanceof Error ? e.message : 'An unknown error occurred during initialization.');
      }
    };
    initializeChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!chat || isLoading) return;

    setIsLoading(true);
    setError(null);
    const newUserMessage: ChatMessage = { author: MessageAuthor.USER, text: userMessage };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    try {
      const response = await chat.sendMessage({ message: userMessage });
      const aiResponseText = response.text;
      const newAiMessage: ChatMessage = { author: MessageAuthor.AI, text: aiResponseText };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get response from AI: ${errorMessage}`);
      // Add a message to the chat indicating the error
      const errorAiMessage: ChatMessage = { author: MessageAuthor.AI, text: "I'm sorry, I encountered an error. Please try again." };
      setMessages(prevMessages => [...prevMessages, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="p-4 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 shadow-lg flex items-center space-x-3">
        <div className="w-8 h-8 text-blue-400">
            <Icon iconName="bot" />
        </div>
        <h1 className="text-xl font-bold text-gray-200">AI Chatbot</h1>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <ChatMessageComponent key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start items-center gap-3 my-4">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Icon iconName="bot" className="w-5 h-5 text-gray-400" />
               </div>
               <div className="bg-gray-700 text-gray-200 rounded-xl rounded-bl-none p-4 flex items-center space-x-2">
                 <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-0"></span>
                 <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                 <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
               </div>
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
                {error}
            </div>
           )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <footer className="max-w-4xl mx-auto w-full">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;
