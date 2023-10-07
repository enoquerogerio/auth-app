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

const edit = async (userData) => {
    
    const userStored = JSON.parse(localStorage.getItem('user'))
    axios.defaults.headers.Authorization = `Bearer ${userStored.token}`
    await axios.put('/users/', userData)

    //get user
    const response = await user(userStored.user.id, userStored.token);

    //merge objects
    for(const key in response){
        userStored.user[key] = response[key]
    }
    localStorage.setItem('user', JSON.stringify(userStored))

    return userStored
}

const user = async(id, token) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
    const response = await axios.get(`/users/${id}`)

    return response.data
}

const authService = {
    register,
    login,
    logout,
    edit, 
    user
}

export default authService