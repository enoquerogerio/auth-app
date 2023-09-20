import axios from "../../services/axios";



const register = async (userData) =>{
    return await axios.post('/users/', userData)
}

const authService = {
    register
}

export default authService