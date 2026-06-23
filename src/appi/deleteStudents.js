export function apiDeleteStudents(id) {
     const options = {
        method: "DELETE",
    }
    return fetch(`http://localhost:3000/students/${id}`, options)
}