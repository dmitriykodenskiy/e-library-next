import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AllBooksResponse } from '@/types/book.types'

export const initializeBooksData = createAsyncThunk<AllBooksResponse, AllBooksResponse>(
  'booksData/initialize',
  async (data) => data
)

const booksDataSlice = createSlice({
    name: 'booksData',
    initialState: {} as AllBooksResponse,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(initializeBooksData.fulfilled, (_, action) => action.payload)
    }
})

export default booksDataSlice.reducer