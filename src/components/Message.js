// components/MessageDisplay.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../redux/features/message/messageSlice';

const MessageDisplay = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.messages); // Access messages from the store

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div>
      <h1>Messages</h1>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default MessageDisplay;
