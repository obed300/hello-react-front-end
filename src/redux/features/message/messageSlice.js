import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  messages: [], // Corrected property name
  error: ''
};

const url = 'http://localhost:3000/messages';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  try {
    const response = await axios.get(url);
    return response.data.map(message => message.text);
  } catch (error) {
    throw new Error('Failed to fetch messages.');
  }
});

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getRandomMessage: state => {
      const randomIndex = Math.floor(Math.random() * state.messages.length);
      state.randomMessage = state.messages[randomIndex];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload; // Corrected property name
        state.error = '';
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.messages = [];
        state.error = action.error.message;
      });
  }
});

export const { getRandomMessage } = messageSlice.actions;
export default messageSlice.reducer;
