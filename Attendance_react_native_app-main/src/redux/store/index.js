import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';
import {AuthenReducer} from '../reducers/authenReducer'
import {FaceReducer} from '../reducers/FaceReducer'
import {locationReducer} from '../reducers/locationReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers(
  {
    AuthenReducer:AuthenReducer,
    FaceReducer:FaceReducer,
    locationReducer:locationReducer
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configstore=() =>createStore(
  persistedReducer,applyMiddleware(createLogger())
);
export const store = configstore({
  reducer: persistedReducer
})
export const persistor = persistStore(store);
