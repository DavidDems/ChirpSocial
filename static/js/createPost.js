$(document).ready(function() {
    // function to show the modal with a success or error message
    function showModal(message) {
        $("#success").text(message);
        $("#modal").css("display", "block");

        $("#close").on("click", function() {
            $("#modal").css("display", "none");
        });
    }

    // create post button onclick event
    $("#post-btn button").on("click", function (event) {
        event.preventDefault();

        // get the post text from the input field
        const postTxt = $("#post-txt").val();

        if (!postTxt) {
            showModal("Post text cannot be empty.");
            return;
        }

        const postData = {
            postTxt: postTxt,
            postDate: new Date().toISOString(),
        };

        // ajax POST request to create the post
        $.ajax({
            url: "/api/posts",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function (response) {
                showModal("Post created successfully!");
                $("#post-txt").val("");
            },
            error: function (xhr, status, error) {
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    showModal(xhr.responseJSON.message);
                } else {
                    showModal("An error occurred. Please try again.");
                }
                $("#post-txt").val("");
            },
        });
    });
});