// function to show the modal with a success or error message
function showModal(message, isValid) {
    
    $('#success').text(message);
    $('#modal').css('display', 'block');

    // if the validation is successful and the modal is closed, redirect to login.html
    if (isValid) {
        $('#close').on('click', function() {
            window.location.href = '../html/login.html';
        });
    } else {
        // if validation fails, just close the modal
        $('#close').on('click', function() {
            $('#modal').css('display', 'none');
        });
    }
}

// function to validate the password length
function validatePasswordLength(password) {
    return password.length >= 8; // Password must be at least 8 characters
}

// function to validate if passwords match
function validatePasswordMatch(password, rePassword) {
    return password === rePassword; // Passwords must match
}

// live validation for the password field
$('#password').on('input', function() {

    const password = $(this).val();
    const $errorMessage = $(this).next('p');

    if (!validatePasswordLength(password)) {
        $errorMessage.text('Password must be at least 8 characters long.').css('color', 'red');
    } else {
        $errorMessage.text('').css('color', '');
    }
});

// live validation for the re-password field
$('#re-password').on('input', function() {

    const password = $('#password').val();
    const rePassword = $(this).val();
    const $errorMessage = $(this).next('p');

    if (!validatePasswordMatch(password, rePassword)) {
        $errorMessage.text('Passwords do not match.').css('color', 'red');
    } else {
        $errorMessage.text('').css('color', '');
    }
});

// handle the register button click event
$('#registerBtn').on('click', function() {

    const password = $('#password').val();
    const rePassword = $('#re-password').val();
    let isValid = true; // assume validation is successful initially

    // validate password length
    if (!validatePasswordLength(password)) {
        showModal('Password must be at least 8 characters long.', false);
        isValid = false;
        return;
    }

    // validate password match
    if (!validatePasswordMatch(password, rePassword)) {
        showModal('Passwords do not match. Please try again.', false);
        isValid = false;
        return;
    }

    // if all validations pass, show success message and set isValid to true
    showModal('Account created successfully!', isValid);
});