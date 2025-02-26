$(document).ready(function() {
    // fetch all posts from the server
    getAllPosts().then(async function(response) {
        if (response && response.length > 0) {
            $("#posts-list").empty();
            for (const post of response) {
                // initializing variables
                let repliedUser = null;
                let repostedUser = null;
                let repliedPost = null;
                let repostedPost = null;
                
                // fetch post-name data
                const user = await getUserById(post.publisherId);

                // fetch replied post data if it's a reply
                if (post.replyId) {
                    repliedPost = await getRepliedPost(post.replyId);
                    repliedUser = await getUserById(repliedPost.publisherId);
                }
                // fetch reposted post data if it's a repost
                if (post.repostId) {
                    repostedPost = await getRepostedPost(post.repostId);
                    repostedUser = await getUserById(repostedPost.publisherId);
                }

                // generate HTML using postTypeFormat
                const postHtml = postTypeFormat(post, repliedPost, repostedPost);
                $("#posts-list").append(postHtml);

                // update name of post publisher
                $(`.post${post.postId}-name`).html(`<b>${user.username}</b>, ${user.displayname}`);

                // update the name of the reply-post
                if (post.replyId) {
                    $(`.reply${post.postId}-name`).html(`<b>${user.username}</b>, ${user.displayname}`);
                }

                // update the name of the repost-post
                if (post.repostId) {
                    $(`.repost${post.postId}-name`).html(`<b>${user.username}</b>, ${user.displayname}`);
                }

                // update name of reply post publisher
                if (repliedUser) {
                    $(`.replied${post.replyId}-name`).html(`<b>${repliedUser.username}</b>, ${repliedUser.displayname}`);
                }
                // update name repost post publisher
                if (repostedUser) {
                    $(`.reposted${post.replyId}-name`).html(`<b>${repostedUser.username}</b>, ${repostedUser.displayname}`);
                }

                // update reply count for the main post
                if (!post.replyId && !post.repostId) {
                    getReplyCount(post.postId).then((response) => {
                        const replyCount = response.count;
                        $(`.post${post.postId}-reply`).html(`<i class="bi bi-chat"></i>${replyCount}`);
                    });
                }

                // update repost count for the main post
                if (!post.replyId && !post.repostId) {
                    getRepostCount(post.postId).then((response) => {
                        const repostCount = response.count;
                        $(`.post${post.postId}-repost`).html(`<i class="bi bi-repeat"></i>${repostCount}`);
                    });
                }

                // update reply count for the replied-post
                if (repliedPost) {
                    getReplyCount(repliedPost.postId).then((response) => {
                        const replyCount = response.count;
                        $(`.replied${repliedPost.postId}-reply`).html(`<i class="bi bi-chat"></i>${replyCount}`);
                    });

                    getRepostCount(repliedPost.postId).then((response) => {
                        const repostCount = response.count;
                        $(`.replied${repliedPost.postId}-repost`).html(`<i class="bi bi-repeat"></i>${repostCount}`);
                    });
                }

                // update reply and repost counts for the reposted-post
                if (repostedPost) {
                    getReplyCount(repostedPost.postId).then((response) => {
                        const replyCount = response.count;
                        $(`.reposted${repostedPost.postId}-reply`).html(`<i class="bi bi-chat"></i>${replyCount}`);
                    });

                    getRepostCount(repostedPost.postId).then((response) => {
                        const repostCount = response.count;
                        $(`.reposted${repostedPost.postId}-repost`).html(`<i class="bi bi-repeat"></i>${repostCount}`);
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
        const postId = $(this).attr("class").match(/post(\d+)/)[1];
        sessionStorage.setItem("currentPostId", postId);
        window.location.href = "../html/post.html";
    });
});