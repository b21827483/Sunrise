import { useEffect, useState } from "react"
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import App from "./App";
import {createStore, persistor} from "./redux/store";

function AppWrapper() {

    const [store, setStore] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function startStore() {
            const reduxStore = await createStore();
            setStore(reduxStore);
            setIsLoading(false);
        }

        startStore();
    }, [])
    
    return (
        isLoading ? "Loading..." :
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

export default AppWrapper