// function to show the modal with an error message
function showModal(message) {

    $("#error").text(message);
    $("#modal").css("display", "block");

    $("#close").on("click", function() {
        $("#modal").css("display", "none");
    });
}

// function to validate the password length
function validatePasswordLength(password) {
    return password.length >= 8; // Password must be at least 8 characters
}

// live validation for the password field
$("#password").on("input", function() {

    const password = $(this).val();
    const $errorMessage = $(this).next("p");

    if (!validatePasswordLength(password)) {
        $errorMessage.text("Minimum 8 characters.").css("color", "red");
    } else {
        $errorMessage.text("").css("color", "");
    }
});

$("#register-link").on("click", function () {
    window.location.href = "../html/register.html";
})

$("#loginBtn").on("click", function () {
    const email = $("#email").val();
    const password = $("#password").val();
    let isValid = true; // assume validation is successful initially

    // validate password length
    if (!validatePasswordLength(password)) {
        showModal("Password must be at least 8 characters long.", false);
        isValid = false;
        return;
    }

    // make an AJAX call to the login endpoint
    $.ajax({
        url: "/api/users/login", // Replace with your actual login endpoint
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email, password }),
        success: function(response) {
            // On successful login, store user data in session storage
            if (response.message === "Login successful") {
                // Store user data in session storage
                sessionStorage.setItem("currentUser", JSON.stringify(response.user));

                // Redirect to home.html
                window.location.href = "../html/home.html";
            } else {
                showModal(response.message || "Incorrect email or password."); // Show error message
            }
        },
        error: function(xhr, status, error) {
            // Handle errors (e.g., network issues, server errors)
            if (xhr.responseJSON && xhr.responseJSON.message) {
                showModal(xhr.responseJSON.message); // Show server error message
            } else {
                showModal("An error occurred. Please try again."); // Generic error message
            }
        }
    });
});