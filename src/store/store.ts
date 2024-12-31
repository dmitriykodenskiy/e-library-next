import { configureStore } from '@reduxjs/toolkit'
import booksDataReducer from './reducers/booksDataReducer'
import authorsDataReducer from './reducers/authorsDataReducer'
import { RootState } from '@/types/store.types'

const store = configureStore<RootState>({
    reducer: {
      booksData: booksDataReducer,
      authorsData: authorsDataReducer,
    }
})

export type AppDispatch = typeof store.dispatch

export default store