import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  internet: false
}

export const systemSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.state;
    },
    setInternet: (state, action) => {
      state.internet = action.payload.state;
    },
  },
})

export const { setLoading, setInternet } = systemSlice.actions;