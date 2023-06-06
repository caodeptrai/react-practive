import instance from "./Axios"

const fetchUserData = (page) => {
    return instance.get(`/api/users?page=${page}`)

}

const postCreateUser = (name, job) => {
    return instance.post("/api/users", { name, job })
}

const putUpdateUser = (name, job) => {
    return instance.put("/api/users/2", { name, job })
}

const deleteUser = (id) => {
    return instance.delete(`/api/users/${id}`)
}



export { fetchUserData, postCreateUser, putUpdateUser, deleteUser }