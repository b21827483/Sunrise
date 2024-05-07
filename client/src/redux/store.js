import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import PostReducer from "./Slices/PostSlice";
import SubReducer from './Slices/SubSlice';
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
        auth: AuthPersistedReducer,
        post: PostReducer,
        sub: SubReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [PERSIST], }, }, refreshTokenMiddleware ), 
});

export async function createStore() {
    //await store.dispatch(startAuth());
    return store;
}

export const persistor = persistStore(store);
