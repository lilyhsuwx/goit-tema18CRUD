let t=document.querySelector(".list"),e=document.getElementById("get-students-btn"),n=document.getElementById("students-table"),l=document.getElementById("add-student-form"),d=null;function s(){return fetch("http://localhost:3000/students").json()}function a(e){t.innerHTML=e.map(({id:t,name:e,age:n,course:l,skills:d,email:s,isEnrolled:a})=>`<tr id="${t}">
                    <td>${t}</td>
                    <td>${e}</td>
                    <td>${n}</td>
                    <td>${l}</td>
                    <td>${d}</td>
                    <td>${s}</td>
                    <td>${a?"Навчається":"Не навчається"}</td>
                    <td>
                        <button data-action="edit" type="button">Edit</button>
                        <button data-action="delete" type="button">Delete</button>
                    </td>
                </tr>`).join("")}e.addEventListener("click",()=>{a(s()),n.style.display="table"}),l.addEventListener("submit",t=>{t.preventDefault();let e={name:t.currentTarget.elements.name.value,age:t.currentTarget.elements.age.value,course:t.currentTarget.elements.course.value,skills:t.currentTarget.elements.skills.value,email:t.currentTarget.elements.email.value,isEnrolled:t.currentTarget.elements.isEnrolled.checked};if(d){var n;n=d,fetch(`http://localhost:3000/students/${n}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}}).json(),a(s()),l.reset(),d=null;return}fetch("http://localhost:3000/students",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}}).json(),a(s()),l.reset()}),t.addEventListener("click",async t=>{let e=t.target.closest("tr").parentNode,n=e.id;"delete"===t.target.dataset.action&&(fetch(`http://localhost:3000/students/${n}`,{method:"DELETE"}).json(),a(s()));"edit"===t.target.dataset.action&&(d=n,l.elements[0].value=e.children[1].textContent,l.elements[1].value=e.children[2].textContent,l.elements[2].value=e.children[3].textContent,l.elements[3].value=e.children[4].textContent,l.elements[4].value=e.children[5].textContent,l.elements[5].checked="Навчається"===e.children[6].textContent)});
//# sourceMappingURL=goit-tema18CRUD.1c3970b8.js.map
