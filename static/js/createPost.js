$(document).ready(function() {
    // Function to show the modal with a success or error message
    function showModal(message) {
        $("#success").text(message);
        $("#modal").css("display", "block");

        // Close the modal when the close button is clicked
        $("#close").on("click", function() {
            $("#modal").css("display", "none");
        });
    }

    // Handle the "Post" button click event
    $("#post-btn button").on("click", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the current user from session storage
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.userId) {
            showModal("You must be logged in to create a post.");
            return;
        }

        // Get the post text from the input field
        const postTxt = $("#post-txt").val();

        // Validate the post text
        if (!postTxt) {
            showModal("Post text cannot be empty.");
            return;
        }

        // Prepare the data to send to the server
        const postData = {
            publisherId: currentUser.userId, // Use the logged-in user's ID as the publisherId
            postTxt: postTxt,
            postDate: new Date().toISOString(), // Add the current date and time
        };

        // Make an AJAX POST request to create the post
        $.ajax({
            url: "/api/posts", // Replace with your actual endpoint
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function (response) {
                // On successful post creation, show success message
                showModal("Post created successfully!");

                // Clear the input field
                $("#post-txt").val("");
            },
            error: function (xhr, status, error) {
                // Handle errors (e.g., network issues, server errors)
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    showModal(xhr.responseJSON.message); // Show server error message
                } else {
                    showModal("An error occurred. Please try again."); // Generic error message
                }

                // Clear the input field
                $("#post-txt").val("");
            },
        });
    });
});