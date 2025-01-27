const API_URL = "https://vvri.pythonanywhere.com/api";
//Kurzusokat listáz ki
async function listCourses() {
    const response = await fetch(`${API_URL}/courses`);
    const courses = await response.json();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Courses</h2>
        <button onclick="createCourse()">Add Course</button>
        <ul>
            ${courses.map(course => `
                <li>
                    ${course.name}
                    <button onclick="editCourse(${course.id})">Edit</button>
                    <button onclick="deleteCourse(${course.id})">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;
}

async function listStudents() {
    const response = await fetch(`${API_URL}/students`);
    const students = await response.json();
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Students</h2>
        <button onclick="createStudent()">Add Student</button>
        <ul>
            ${students.map(student => `
                <li>
                    ${student.name}
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;
}

function createCourse() {
    const name = prompt("Enter course name:");
    fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    }).then(listCourses);
}

function editCourse(id) {
    const name = prompt("Enter new course name:");
    fetch(`${API_URL}/courses/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    }).then(listCourses);
}

function deleteCourse(id) {
    fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE'
    }).then(listCourses);
}

function createStudent() {
    const name = prompt("Enter student name:");
    const course_id = prompt("Enter student's course id:");
    fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, course_id})
    }).then(listStudents);
}

function editStudent(id) {
    const name = prompt("Enter new student name:");
    const course_id = prompt("Enter new course id:");
    fetch(`${API_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, course_id })
    }).then(listStudents);
}

function deleteStudent(id) {
    fetch(`${API_URL}/students/${id}`, {
        method: 'DELETE'
    }).then(listStudents);
}
function escape() {
    window.location.href = "https://index.html";
}