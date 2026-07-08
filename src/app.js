import {fetchStudents} from "./appi/getStudents.js";
import {apiAddStudents} from "./appi/addStudents.js";
import {apiUpdateStudents} from "./appi/updateStudents.js";
import {apiDeleteStudents} from "./appi/deleteStudents.js";

const tbody = document.querySelector(".list");
const getStudentsBtn = document.getElementById("get-students-btn");
const studentsTable = document.getElementById("students-table");
const addStudentForm = document.getElementById("add-student-form");

let currentId = null;

// Функція для отримання всіх студентів

function getStudents() {
    fetchStudents().then(res => renderStudents(res))

}



// Функція для відображення студентів у таблиці

function renderStudents(students) {

    const item = students.map(({id, name, age, course, skills, email, isEnrolled}) => {
        return `<tr id="${id}">
                    <td class="student-id">${id}</td>
                    <td class="student-name">${name}</td>
                    <td class="student-age">${age}</td>
                    <td class="student-course">${course}</td>
                    <td class="student-skills">${skills}</td>
                    <td class="student-email">${email}</td>
                    <td class="student-status">${isEnrolled ? "Навчається" : "Не навчається"}</td>
                    <td>
                        <button class="edit" type="button">Edit</button>
                        <button class="delete" type="button">Delete</button>
                    </td>
                </tr>`
    }).join("")
    tbody.innerHTML = item
}

getStudentsBtn.addEventListener("click", () => {
    getStudents();
    studentsTable.style.display = "table";
});



// Функція для додавання нового студента

addStudentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = {
        name: addStudentForm.elements.name.value,
        age: addStudentForm.elements.age.value,
        course: addStudentForm.elements.course.value,
        skills: addStudentForm.elements.skills.value,
        email: addStudentForm.elements.email.value,
        isEnrolled: addStudentForm.elements.isEnrolled.checked
    };

    if (currentId) {
        apiUpdateStudents(currentId, student)
            .then(() => {
                getStudents();
                addStudentForm.reset();
                currentId = null;
            });
    }

    else {
        apiAddStudents(student)
            .then(() => {
                getStudents();
                addStudentForm.reset();
            });
    }
});




// Функція для оновлення студента

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {

        const tr = e.target.closest("tr");

        currentId = tr.id;

        // addStudentForm.elements.id.value = tr.querySelector(".student-id").textContent;
        addStudentForm.elements.name.value = tr.querySelector(".student-name").textContent;
        addStudentForm.elements.age.value = tr.querySelector(".student-age").textContent;
        addStudentForm.elements.course.value = tr.querySelector(".student-course").textContent;
        addStudentForm.elements.skills.value = tr.querySelector(".student-skills").textContent;
        addStudentForm.elements.email.value = tr.querySelector(".student-email").textContent;

        addStudentForm.elements.isEnrolled.checked =
            tr.querySelector(".student-status").textContent === "Навчається";

            return;
    }

        if (e.target.classList.contains("delete")) {
            const id = e.target.closest("tr").id;

            apiDeleteStudents(id).then(() => {
                getStudents();
            });
            return;
        }
    
});


