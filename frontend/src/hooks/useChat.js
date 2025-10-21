import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const useChat = (carId, userId) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    // Connect to Socket.io server
    socketRef.current = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      socketRef.current.emit('join-chat', carId);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Load existing messages
    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/chat/car/${carId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();

    return () => {
      socketRef.current.disconnect();
    };
  }, [carId]);

  const sendMessage = (content) => {
    if (!content.trim() || !isConnected) return;

    const message = {
      carId,
      userId,
      content,
      timestamp: new Date().toISOString()
    };

    socketRef.current.emit('send-message', message);
  };

  return {
    messages,
    isConnected,
    sendMessage
  };
};