import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterReducer'
import { listenerMiddleware } from './listenerMiddleware'


const store = configureStore({
    reducer: {
        counter: counterReducer
    },
    middleware: getDefaultMiddleware => (
        getDefaultMiddleware().prepend(listenerMiddleware.middleware)
    )
})

export default store