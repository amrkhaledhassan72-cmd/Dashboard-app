import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../api/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import vehicleSlice from "../api/vehicleSlice";
import equipmentSlice from "../api/equipmentSlice";
import authReducer from '../auth/authSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [vehicleSlice.reducerPath]: vehicleSlice.reducer,
        [equipmentSlice.reducerPath]: equipmentSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware,vehicleSlice.middleware,equipmentSlice.middleware),
})

setupListeners(store.dispatch)

export default store;