import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import { startAuth } from './AuthSlice';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { refreshTokenMiddleware } from './middleware';

const persistConfig = {
    key: 'root',
    storage,
}

const AuthPersistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        auth: AuthPersistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [PERSIST], }, }, refreshTokenMiddleware ), 
});

export async function createStore() {
    //await store.dispatch(startAuth());
    return store;
}

export const persistor = persistStore(store);
