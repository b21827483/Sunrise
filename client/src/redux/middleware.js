import {jwtDecode} from "jwt-decode";
import { refreshTokenAction } from "./Slices/AuthSlice";

export const refreshTokenMiddleware = (store) => next => async (action) => {
        try {
            console.log("refresh token",action)
            if (typeof action === 'function') {
                const accessToken = store.getState().auth?.accessToken;
                if (accessToken) {
                    const decoded = jwtDecode(accessToken);
                    if (decoded.exp - Date.now() < 60) {
                        const refreshToken = getState().auth?.refreshToken;
                        await store.dispatch(refreshTokenAction(refreshToken));
                        const newAccessToken = store.getState().auth?.accessToken;
                        if (!newAccessToken) {
                            throw new Error;
                        }
                    }
                }
            }
        }
        catch (err) {
            store.dispatch(logout())
        }
        return next(action);
    
}