// function to show the modal with an error message
function showModal(message) {

    $('#error').text(message);
    $('#modal').css('display', 'block');

    $("#close").on("click", function() {
        $('#modal').css('display', 'none');
    });
}

// function to validate the password length
function validatePasswordLength(password) {
    return password.length >= 8; // Password must be at least 8 characters
}

// live validation for the password field
$('#password').on('input', function() {

    const password = $(this).val();
    const $errorMessage = $(this).next('p');

    if (!validatePasswordLength(password)) {
        $errorMessage.text('Minimum 8 characters.').css('color', 'red');
    } else {
        $errorMessage.text('').css('color', '');
    }
});

$('#loginBtn').on('click', function () {
    const password = $('#password').val();
    let isValid = true; // assume validation is successful initially

    // validate password length
    if (!validatePasswordLength(password)) {
        showModal('Password must be at least 8 characters long.', false);
        isValid = false;
        return;
    }

    showModal("Incorrect username or password.");
});