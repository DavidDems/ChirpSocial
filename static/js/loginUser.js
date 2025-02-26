$(document).ready(function() {
    // function to show the modal with an error message
    function showModal(message) {

        $("#error").text(message);
        $("#modal").css("display", "block");

        $("#close").on("click", function() {
            $("#modal").css("display", "none");
        });
    }

    // function to validate the email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return "Invalid email format.";
        }
        return null; 
    }

    // function to validate the password length
    function validatePasswordLength(password) {
        return password.length >= 8; // Password must be at least 8 characters
    }

    // live validation for the email field
    $("#email").on("input", function() {
        const email = $(this).val();
        const $errorMessage = $(this).next("p");

        const error = validateEmail(email);
        if (error) {
            $errorMessage.text(error).css("color", "red");
        } else {
            $errorMessage.text("").css("color", "");
        }
    });

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

    // link to user registration page
    $("#register-link").on("click", function() {
        window.location.href = "../html/register.html";
    })

    // login btn on click
    $("#loginBtn").on("click", function() {
        const email = $("#email").val();
        const password = $("#password").val();
        let isValid = true;

        // validate password length
        if (!validatePasswordLength(password)) {
            showModal("Password must be at least 8 characters long.", false);
            isValid = false;
            return;
        }

        // make an AJAX call to the login route
        $.ajax({
            url: "/api/users/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email, password }),
            success: function(response) {
                if (response.message === "Login succefull") {
                    // store user data in session storage
                    sessionStorage.setItem("currentUser", JSON.stringify(response.user));
                    // store user token in session storage
                    sessionStorage.setItem("token", response.token);
                    // bring to home.html
                    window.location.href = "../html/home.html";
                } else {
                    showModal(response.message || "Incorrect email or password.");
                }
            },
            error: function(xhr, status, error) {
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    showModal(xhr.responseJSON.message);
                } else {
                    showModal("An error occurred. Please try again.");
                }
            }
        });
    });
});