
import React from 'react';
import { ChatMessage, MessageAuthor } from '../types';
import Icon from './Icon';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  const wrapperClasses = isUser ? 'flex justify-end' : 'flex justify-start';
  const messageClasses = isUser
    ? 'bg-blue-600 text-white rounded-br-none'
    : 'bg-gray-700 text-gray-200 rounded-bl-none';
  const iconClasses = isUser ? 'text-blue-400' : 'text-gray-400';

  return (
    <div className={`w-full flex items-start gap-3 my-4 ${wrapperClasses}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <Icon iconName="bot" className={`w-5 h-5 ${iconClasses}`} />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-2xl p-4 rounded-xl shadow-md whitespace-pre-wrap ${messageClasses}`}
      >
        {message.text}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <Icon iconName="user" className={`w-5 h-5 ${iconClasses}`} />
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;
