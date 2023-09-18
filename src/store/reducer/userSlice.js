import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  token: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload.data;
      state.token = action.payload.token;
    }
  },
})

export const { setUser } = userSlice.actions