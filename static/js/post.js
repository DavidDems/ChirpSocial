$(document).ready(function() {
    const currentPostId = sessionStorage.getItem("currentPostId");

    if (currentPostId) {
        $.ajax({
            url: `/api/posts/${currentPostId}`,
            method: "GET",
            success: function (response) {
                if (response) {
                    $("#posts-list").empty();
                    const postHtml = `
                        <div id="post${response.postId}" class="posts">
                            <div class="post-profile">
                                <img class="picture" src="../../medias/defaultUser.webp">
                            </div>
                            <div class="content">
                                <div class="post-data">
                                    <p id="post${response.postId}-name" class="post-name">@${response.publisherId}</p>
                                    <p id="post${response.postId}-date" class="post-date">${formatDate(response.postDate)}</p>
                                </div>
                                <div class="post-content">
                                    <p>${response.postTxt}</p>
                                </div>
                                <div class="post-interact">
                                    <a id="post${response.postId}-reply" class="reply-icon"><i class="bi bi-chat"></i>${response.replyId || 0}</a>
                                    <a id="post${response.postId}-repost" class="repost-icon"><i class="bi bi-repeat"></i>${response.repostId || 0}</a>
                                    <a id="post${response.postId}-like" class="like-icon"><i class="bi bi-heart"></i>${response.likes || 0}</a>
                                </div>
                            </div>
                        </div>
                        <div id="create-reply" class="posts">
                            <div class="post-profile">
                                <img class="picture" src="../../medias/defaultUser.webp">
                            </div>
                            <div id="reply-input" class="content">
                                <input id="reply-txt" type="text" placeholder="Post your reply">
                                <div id="reply-btn">
                                    <button>Reply</button>
                                </div>
                            </div>
                        </div>
                    `;
                    $("#posts-list").append(postHtml);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching post:", error);
            },
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    $(document).on("click", "#reply-btn button", function (event) {
        event.preventDefault();
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        const replyTxt = $("#reply-txt").val().trim();

        if (!currentUser || !currentUser.userId) {
            alert("You must be logged in to reply.");
            return;
        }

        if (!replyTxt) {
            alert("Reply text cannot be empty.");
            return;
        }

        const postData = {
            publisherId: currentUser.userId,
            postTxt: replyTxt,
            replyId: currentPostId,
            postDate: new Date().toISOString(),
        };

        $.ajax({
            url: "/api/posts",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function (response) {
                alert("Reply posted successfully!");
                $("#reply-txt").val("");
                window.location.reload();
            },
            error: function (xhr, status, error) {
                alert("An error occurred. Please try again.");
            },
        });
    });

    $(".post-profile").on("click", function() {
        window.location.href = "../html/profile.html";
    });

    $(".post-name").on("click", function() {
        window.location.href = "../html/profile.html";
    });

    $(".reply-icon").on("click", function() {
        window.location.href = "../html/post.html";
    });

    $(".repost-icon").on("click", function() {
        window.location.href = "../html/createPost.html";
    });
});