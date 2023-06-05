import instance from "./Axios"

const fetchUserData = (page) => {
    return instance.get(`/api/users?page=${page}`)

}

const postCreateUser = (name, job) => {
    return instance.post("/api/users", { name, job })
}



export { fetchUserData, postCreateUser }