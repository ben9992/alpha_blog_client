
import { axios, updateToken } from './Axios';
const IsAdminLoggedIn = async () => {
    const userId = localStorage.getItem('userId');
    updateToken(localStorage.getItem('token'))
    const user = await axios.get(`/users/${userId}`).then(user => user).catch(err => {
        return false
    })

    if(!user.data)
        return false

    return user.data.role === "admin";
}

const IsUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    
    return token ? true : false;
}

export { IsAdminLoggedIn, IsUserLoggedIn };