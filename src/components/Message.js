// components/MessageDisplay.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../redux/features/message/messageSlice';

const MessageDisplay = () => {
  const dispatch = useDispatch();

  const { messages, Loading, error } = useSelector((state) => state.messages);

  // const messages = useSelector((state) => state.message.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div>
      <div>
        {Loading && <h2>Loading...</h2>}
        {error && <p>{error}</p>}
        {messages && <h2>{messages.greeting}</h2>}
      </div>
    </div>
  );
};

export default MessageDisplay;
