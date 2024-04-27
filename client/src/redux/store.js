import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from './reducers/rootReducer';
import authReducer from './AuthSlice';

export default configureStore({
    reducer: {
        auth: authReducer
    }
});
