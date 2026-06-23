const BASE_URL = "https://YOUR-RENDER-URL.onrender.com";

export function fetchStudents() {
  return fetch(`${BASE_URL}/students`)
    .then(res => res.json());
}