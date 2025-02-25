$(document).ready(function() {
    // fetch all posts from the server
    getAllPosts().then(async function(response) {
        if (response && response.length > 0) {
            $("#posts-list").empty();
            for (const post of response) {
                // initializing variables
                let repliedUser = null;
                let repliedPost = null;
                
                // fetch post-name data
                const user = await getUserById(post.publisherId);
                // fetch replied post data if it's a reply
                if (post.replyId) {
                    repliedPost = await getRepliedPost(post.replyId);
                }
                if (post.replyId) {
                    repliedUser = await getUserById(repliedPost.publisherId);
                }

                // generate HTML using postTypeFormat
                const postHtml = postTypeFormat(post, repliedPost);
                $("#posts-list").append(postHtml);

                $(`#post${post.postId}-name`).html(`<b>${user.username}</b>, ${user.displayname}`);

                if (repliedUser) {
                    $(`#reply${post.postId}-name`).html(`<b>${user.username}</b>, ${user.displayname}`);
                    $(`#replied${post.replyId}-name`).html(`<b>${repliedUser.username}</b>, ${repliedUser.displayname}`);
                }

                // update reply and repost counts for non-reply and non-repost posts
                if (!post.replyId && !post.repostId) {
                    getReplyCount(post.postId).then((response) => {
                        const replyCount = response.count;
                        $(`#post${post.postId}-reply`).html(`<i class="bi bi-chat"></i>${replyCount}`);
                    });

                    getRepostCount(post.postId).then((response) => {
                        const repostCount = response.count;
                        $(`#post${post.postId}-repost`).html(`<i class="bi bi-repeat"></i>${repostCount}`);
                    });
                }
            }
        } else {
            console.log("No posts found.");
        }
    }).fail(function(xhr, status, error) {
        console.error("Error fetching posts:", error);
    });


    // view post on click function
    $(document).on("click", ".posts", function() {
        const postId = $(this).attr("id").replace("post", "");
        sessionStorage.setItem("currentPostId", postId);
        window.location.href = "../html/post.html";
    });
});

