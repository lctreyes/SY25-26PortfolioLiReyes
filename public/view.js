const tableBody = document.getElementById("tableBody");
const filterClub = document.getElementById("filterClub");
const totalText = document.getElementById("total");
const message = document.getElementById("message");

let signups = JSON.parse(localStorage.getItem("clubSignups")) || [];

function renderTable(filter = "ALL") {
    tableBody.innerHTML = "";
    message.textContent = "";

    if (signups.length === 0) {
        message.textContent = "No sign-ups saved yet.";
        totalText.textContent = "Total Signup: 0";
        return;
    }

    let filtered = filter === "ALL"
        ? signups
        : signups.filter(s => s.club === filter);

    totalText.textContent = "Total Signup: " + filtered.length;

    if (filtered.length === 0) {
        message.textContent = "No Sign Ups for the club.";
        return;
    }

    filtered.forEach(s => {
        tableBody.innerHTML += `
            <tr>
                <td>${s.club}</td>
                <td>${s.id}</td>
                <td>${s.fullname}</td>
                <td>${s.grade}</td>
                <td>${s.email}</td>
                <td>${s.mobile}</td>
                <td>${s.status}</td>
            </tr>
        `;
    });
}

renderTable();

filterClub.addEventListener("change", function () {
    renderTable(this.value);
});
