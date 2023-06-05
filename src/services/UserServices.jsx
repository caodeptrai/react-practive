import instance from "./Axios"

const fetchUserData = () => {
    return instance.get("/api/users?page=1")

}



export { fetchUserData }