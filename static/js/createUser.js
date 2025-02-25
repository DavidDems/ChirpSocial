// function to show the modal with a success or error message
function showModal(message, isValid) {
    $("#success").text(message);
    $("#modal").css("display", "block");

    // if the validation is successful and the modal is closed, redirect to profile.html
    if (isValid) {
        $("#close").on("click", function() {
            window.location.href = "../html/profile.html";
        });
    } else {
        // if validation fails, just close the modal
        $("#close").on("click", function() {
            $("#modal").css("display", "none");
        });
    }
}

// function to validate the username
function validateUsername(username) {
    const regex = /^[a-zA-Z0-9_]+$/;
    if (username.length < 3) {
        return "Username must be at least 3 characters long.";
    }
    if (!regex.test(username)) {
        return "Username can only contain letters, numbers, and underscores.";
    }
    return null; 
}

// function to validate the display name
function validateDisplayName(displayname) {
    if (displayname.trim() === "") {
        return "Display name cannot be empty.";
    }
    return null; 
}

// function to validate the email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return "Invalid email format.";
    }
    return null; 
}

// function to validate the date of birth
function validateDateOfBirth(dob) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // ISO8601 format (YYYY-MM-DD)
    if (!regex.test(dob)) {
        return "Invalid date format. Please use YYYY-MM-DD.";
    }
    return null;
}

// function to validate the password
function validatePassword(password) {
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!/\d/.test(password)) {
        return "Password must contain at least one number.";
    }
    if (!/[@$!%*?&]/.test(password)) {
        return "Password must contain at least one special character (@$!%*?&).";
    }
    return null; 
}

// function to validate the repeat password
function validateRePassword (password, rePassword) {
    if (password !== rePassword) {
        return "Passwords do not match.";
    }
    return null;
}

// live validation for the username field
$("#username").on("input", function() {
    const username = $(this).val();
    const $errorMessage = $(this).next("p");

    const error = validateUsername(username);
    if (error) {
        $errorMessage.text(error).css("color", "red");
    } else {
        $errorMessage.text("").css("color", "");
    }
});

// live validation for the displayname field
$("#displayname").on("input", function() {
    const displayname = $(this).val();
    const $errorMessage = $(this).next("p");

    const error = validateDisplayName(displayname);
    if (error) {
        $errorMessage.text(error).css("color", "red");
    } else {
        $errorMessage.text("").css("color", "");
    }
});

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

// live validation for the date of birth field
$("#dob").on("input", function() {
    const dob = $(this).val();
    const $errorMessage = $(this).next("p");

    const error = validateDateOfBirth(dob);
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

    const error = validatePassword(password);
    if (error) {
        $errorMessage.text(error).css("color", "red");
    } else {
        $errorMessage.text("").css("color", "");
    }
});

// live validation for the re-password field
$("#re-password").on("input", function() {
    const password = $("#password").val();
    const rePassword = $(this).val();
    const $errorMessage = $(this).next("p");

    const error = validateRePassword(password, rePassword);
    if (error) {
        $errorMessage.text(error).css("color", "red");
    } else {
        $errorMessage.text("").css("color", "");
    }
});

// handle the register button click event
$("#registerBtn").on("click", function() {

    const username = $("#username").val();
    const displayname = $("#displayname").val();
    const email = $("#email").val();
    const dateOfBirth = $("#dob").val();
    const password = $("#password").val();
    const rePassword = $("#re-password").val();

    // Validate all fields
    const usernameError = validateUsername(username);
    const displayNameError = validateDisplayName(displayname);
    const emailError = validateEmail(email);
    const dobError = validateDateOfBirth(dateOfBirth);
    const passwordError = validatePassword(password);
    const passwordMatchError = validateRePassword(password, rePassword);

    // If any validation fails, stop further execution
    if (usernameError || emailError || passwordError || displayNameError || dobError || passwordMatchError) {
        showModal("Please fix the errors in the form.", false);
        return;
    }

    // Prepare the data to send to the server
    const userData = {
        username,
        email,
        password,
        displayname,
        dateOfBirth,
    };

    // Make an AJAX call to the register endpoint
    $.ajax({
        url: "/api/users/register", // Replace with your actual register endpoint
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(response) {
            // On successful registration, show success message
            if (response.message === "User registered successfully") {
                showModal("Account created successfully!", true);
            } else {
                showModal(response.message || "Registration failed. Please try again.", false);
            }
        },
        error: function(xhr, status, error) {
            // Handle errors (e.g., network issues, server errors)
            showModal("An error occurred. Please try again.", false);
        }
    });
});