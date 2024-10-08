import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Login from "../../pages/Login";


//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        await authService.register(user)
    } catch (error) {
        const message = (error.data.message && error.data) || error.toString() || error.message
        return thunkAPI.rejectWithValue(message)
    }
})

// login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.data.message && error.data) || error.toString() || error.message
        return thunkAPI.rejectWithValue(message)
    }
})

//logout
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

//edit 
export const edit = createAsyncThunk('auth/edit', async(user, thunkAPI) => {
    try {
        return await authService.edit(user)
    } catch (error) {
        const message = (error.data.message && error.data) || error.toString() || error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(edit.pending, (state) => {
                state.isLoading = true
            })
            .addCase(edit.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(edit.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
