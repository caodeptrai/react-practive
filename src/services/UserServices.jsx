import instance from "./Axios"

const fetchUserData = (page) => {
    return instance.get(`/api/users?page=${page}`)

}



export { fetchUserData }