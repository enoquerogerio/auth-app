import axios from "../../services/axios";



const register = async (userData) =>{
    return await axios.post('/users/', userData)
}

const login = async(userData) => {
    const response = await axios.post('/tokens/', userData)
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService