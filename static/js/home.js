$(".posts").on("click", function () {
    window.location.href = "../html/post.html";
});

const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

console.log("Logged-in user:", currentUser);