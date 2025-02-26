$(document).ready(function() {
    const currentPostId = sessionStorage.getItem("currentPostId");

    function showModal(message) {
        $("#error").text(message);
        $("#modal").css("display", "block");

        $("#close").on("click", function() {
            $("#modal").css("display", "none");
            window.location.reload();
        });
    }

    if (currentPostId) {
        $.ajax({
            url: `/api/posts/${currentPostId}`,
            method: "GET",
            success: async function (response) {
                if (response) {
                    $("#posts-list").empty();

                    const user = await getUserById(response.publisherId);

                    const replyCountResponse = await getReplyCount(response.postId);
                    const repostCountResponse = await getRepostCount(response.postId);

                    const postHtml = `
                        <div id="post${response.postId}" class="posts">
                            <div class="post-profile">
                                <img class="picture" src="../../medias/defaultUser.webp">
                            </div>
                            <div class="content">
                                <div class="post-data">
                                    <p id="post${response.postId}-name" class="post-name"><b>${user.username}</b> ${user.displayname}</p>
                                    <p id="post${response.postId}-date" class="post-date">${formatDate(response.postDate)}</p>
                                </div>
                                <div class="post-content">
                                    <p>${response.postTxt}</p>
                                </div>
                                <div class="post-interact">
                                    <a id="post${response.postId}-reply" class="reply-icon"><i class="bi bi-chat"></i>${replyCountResponse.count || 0}</a>
                                    <a id="post${response.postId}-repost" class="repost-icon"><i class="bi bi-repeat"></i>${repostCountResponse.count || 0}</a>
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

                    fetchReplies(currentPostId);
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

    function fetchReplies(postId) {
        $.ajax({
            url: `/api/posts?replyId=${postId}`,
            method: "GET",
            success: function (replies) {
                if (replies && replies.length > 0) {
                    replies.forEach(async (reply) => {
                        const user = await getUserById(reply.publisherId);
                        const replyHtml = `
                            <div id="post${reply.postId}" class="posts">
                                <div class="post-profile">
                                    <img class="picture" src="../../medias/defaultUser.webp">
                                </div>
                                <div class="content">
                                    <div class="post-data">
                                        <p id="post${reply.postId}-name" class="post-name"><b>${user.username}</b> ${user.displayname}</p>
                                        <p id="post${reply.postId}-date" class="post-date">${formatDate(reply.postDate)}</p>
                                    </div>
                                    <div class="post-content">
                                        <p>${reply.postTxt}</p>
                                    </div>
                                    <div class="post-interact">
                                        <a id="post${reply.postId}-reply" class="reply-icon"><i class="bi bi-chat"></i>0</a>
                                        <a id="post${reply.postId}-repost" class="repost-icon"><i class="bi bi-repeat"></i>0</a>
                                        <a id="post${reply.postId}-like" class="like-icon"><i class="bi bi-heart"></i>${reply.likes || 0}</a>
                                    </div>
                                </div>
                            </div>
                        `;
                        $("#create-reply").after(replyHtml);
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching replies:", error);
            },
        });
    }

    $(document).on("click", "#reply-btn button", function (event) {
        event.preventDefault();

        const replyTxt = $("#reply-txt").val().trim();

        if (!replyTxt) {
            showModal("Reply text cannot be empty.");
            return;
        }

        const postData = {
            postTxt: replyTxt,
            replyId: currentPostId,
            postDate: new Date().toISOString(),
        };

        $.ajax({
            url: "/api/posts",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function (response) {
                showModal("Reply posted successfully!");
                $("#reply-txt").val("");
            },
            error: function (xhr, status, error) {
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    showModal(xhr.responseJSON.message);
                } else {
                    showModal("An error occurred. Please try again.");
                }
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