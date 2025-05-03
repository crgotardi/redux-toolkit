import { createListenerMiddleware } from "@reduxjs/toolkit";
import { incrementAsyncListener } from "./reducers/counterReducer";

export const listenerMiddleware = createListenerMiddleware()

incrementAsyncListener(listenerMiddleware.startListening)