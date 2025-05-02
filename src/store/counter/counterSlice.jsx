import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const listAdapter = createEntityAdapter()

const initialState = listAdapter.getInitialState(
    {
        value: 0,
        status: 'idle'
    },
    // example of entity adapter (normalization)
    [
        { id: 1, name: 'First Item' },
        { id: 2, name: 'Second Item' },
        { id: 3, name: 'Third Item' },
    ]
)

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        incrementWithPrepare: {
            reducer: (state, action) => {
                state.value += action.payload
            },
            prepare: (payload) => {
                return {
                    payload: payload.amount
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value += action.payload
            })
            .addCase(incrementAsync.rejected, state => {
                state.status = 'failed'
            })
    },
    selectors: {
        // use counter state
        selectCounter: (state) => state.value,
        selectStatus: (state) => state.status
    }
})

export const { increment, decrement, incrementByAmount, incrementWithPrepare } = counterSlice.actions
export const { selectCounter, selectStatus } = counterSlice.selectors

export const incrementAsync = createAsyncThunk(
    'counter/incrementAsync',
    async (amount) => {
        // fake async request
        const response = await new Promise((resolve) => setTimeout(() => resolve({data: amount}), 5000))
        return response.data
    },
    {
        // condition examples
        condition: (arg, api) => {            
            const state = api.getState()

            if (state.counter.status !== 'idle') {
                return false
            }

            if (arg > 10) {
                return false
            }
        }
    }
)

// use global state
export const selectGlobalCounter = (state) => state.counter.value
export const selectGlobalStatus = (state) => state.counter.status

// memoized selector example
export const selectCounterPlusAmount = createSelector(
    [selectGlobalCounter],
    (count) => count * 2
)

export default counterSlice.reducer