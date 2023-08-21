// features/message/messageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  messages: [],
  error: '',
};

const url = 'http://127.0.0.1:3000/messages';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch messages.');
  }
});

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = '';
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.messages = [];
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
