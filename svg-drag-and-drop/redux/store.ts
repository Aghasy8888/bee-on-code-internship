import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./features/generalSlice";

import logger from 'redux-logger';

export const makeStore = () => {
    return configureStore({
        reducer: {
            generalSlice,
        },
        middleware: (getDefaultMiddleware) => 
        process.env.NODE_ENV === "development" 
        ? getDefaultMiddleware().concat(logger) 
        : getDefaultMiddleware(),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']