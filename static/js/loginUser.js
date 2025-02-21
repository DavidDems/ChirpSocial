// function to show the modal with an error message
function showModal(message) {

    $('#error').text(message);
    $('#modal').css('display', 'block');

    $("#close").on("click", function() {
        $('#modal').css('display', 'none');
    });
}

$('#loginBtn').on('click', function () {
    showModal("Incorrect username or password.");
});