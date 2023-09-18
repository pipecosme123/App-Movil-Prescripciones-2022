import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import userSlice from './reducer/userSlice';
import { systemSlice } from './reducer/systemSlice';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['userState']
};

const rootReducer = combineReducers({
  userState: userSlice.reducer
});

const persistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    system: systemSlice.reducer,
    user: persistReducer,
    productos: null
  },
  middleware: [thunk]
})