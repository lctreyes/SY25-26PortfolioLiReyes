document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    if (!confirm("Are you sure you want to submit this signup?")) return;

    const signup = {
        club: document.getElementById("club").value,
        id: document.getElementById("studentId").value,
        fullname: document.getElementById("fullName").value,
        grade: document.getElementById("grade").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        status: document.querySelector('input[name="status"]:checked').value
    };

    let signups = JSON.parse(localStorage.getItem("clubSignups")) || [];
    signups.push(signup);

    localStorage.setItem("clubSignups", JSON.stringify(signups));

    alert("💖 Signup saved successfully!");
    document.getElementById("signupForm").reset();
});

function goToView() {
    window.location.href = "viewSignUps.html";
}
