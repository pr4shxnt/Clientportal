import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [
    {
      id: 1,
      text: 'This chatbot is powered by Google Gemini Flash 2.0. Your chat is end-to-end encrypted. I did not struggle to store it in the database for client privacy. Avoid refreshing that could clear the chat.',
      sender: 'other',
    },
  ],
  loading: false,
  error: null,
};

// ✅ Thunk to send message with pastMessages
export const sendMessageToServer = createAsyncThunk<
  Message,
  string,  
  { rejectValue: string; state: { chat: ChatState } }
>(
  'chat/sendMessageToServer',
  async (text, { getState, rejectWithValue }) => {
    try {
      const { chat } = getState();

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
        message: text,
        pastMessages: chat.messages,
      });

      return { id: Date.now(), text: res.data.reply, sender: 'other' };
    } catch (error: unknown) {
      return rejectWithValue( (error as unknown as { data?: { message?: string } }).data?.message || 'Failed to fetch response');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageToServer.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessageToServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
