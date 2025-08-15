import React, { useState } from 'react';
import './App.css';
import com1logo from './assest/com1logo.png'; // Import the com1logo image
import plusIcon from './assest/plus.png'; // Import the plus icon
import threeDotsIcon from './assest/three-dots.png'; // Import the three dots icon
// Navbar is rendered globally; avoid local Navbar to prevent duplicates

function Communication1() {
  const [selectedChat, setSelectedChat] = useState('General Chat');
  const [message, setMessage] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupMembers, setNewGroupMembers] = useState(['Ankush']);
  const [newGroupChatType, setNewGroupChatType] = useState('Public');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [chats, setChats] = useState({
    'General Chat': [
      { sender: 'AK', message: 'hi', time: '9:46 am' },
      { sender: 'MN', message: 'hi', time: '9:47 am' },
    ],
    'Group Chat #1': [
      { sender: 'AK', message: 'Hello Group!', time: '9:35 am' },
      { sender: 'MN', message: 'Hi everyone!', time: '9:36 am' },
    ],
    'Ankush (it\'s you)': [
      { sender: 'AK', message: 'Hey Ankush!', time: 'Tue' },
      { sender: 'MN', message: 'Hello!', time: 'Tue' },
    ],
    'Mani': [
      { sender: 'AK', message: 'Hi Mani!', time: 'Mon' },
      { sender: 'MN', message: 'Hey!', time: 'Mon' },
    ],
  });

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { sender: 'You', message, time: 'Now' };
      setChats({
        ...chats,
        [selectedChat]: [...chats[selectedChat], newMessage],
      });
      setMessage('');
    }
  };

  return (
  <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Container */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4 border-gray-300 border-2">
          <div className="flex items-center mb-4">
            <img src={com1logo} alt="Zidio Logo" className="h-8 mr-2 rounded-3xl" />
            <input
              type="text"
              placeholder="Chat or search"
              className="flex-grow p-2 bg-white border border-gray-300 rounded-3xl"
            />
            <button className="ml-2 p-2 rounded bg-blue-300 text-white">
              <img src={plusIcon} alt="Plus Icon" className="h-6 w-6 " />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {Object.keys(chats).map(chat => (
              <div
                key={chat}
                className={`p-2 flex items-center border-gray-100 border-2 rounded-xl ${selectedChat === chat ? 'bg-blue-100' : 'bg-white'}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex-grow">{chat}</div>
                <div className="text-sm text-gray-500">{chats[chat][0]?.time}</div>
                <button className="ml-2 p-2 rounded bg-transparent">
                  <img src={threeDotsIcon} alt="Three Dots Icon" className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="w-3/4 flex flex-col">
          <div className="flex items-center justify-between bg-blue-100 p-4 border-gray-100 border-2 rounded-xl">
            <div>{selectedChat}</div>
          </div>
          <div className="flex-grow p-4 bg-white">
            {chats[selectedChat].map((chat, index) => (
              <div key={index} className={`flex items-end mb-4 ${chat.sender === 'MN' ? 'justify-end' : ''}`}>
                {chat.sender !== 'MN' && <div className="bg-blue-100 p-2 rounded-lg">{chat.message}</div>}
                <div className="ml-2 text-sm text-gray-500">{chat.sender}</div>
                {chat.sender === 'MN' && <div className="bg-gray-300 p-2 rounded-lg">{chat.message}</div>}
              </div>
            ))}
          </div>
          <div className="flex items-center p-4 bg-gray-200">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border rounded-lg"
            />
            <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communication1;
