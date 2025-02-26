function postTypeFormat(post, repliedPost, repostedPost) {
    let postHtml = '';

    if (post.replyId) {
        if (!repliedPost) {
            console.error("Replied post data is missing for replyId:", post.replyId);
            return '';
        }

        postHtml = `
            <div class="reply${post.postId} reply-post">
                <div class="reply">
                    <div class="post-profile">
                        <img class="picture" src="../../medias/defaultUser.webp">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p class="reply${post.postId}-name post-name">@${post.publisherId}</p>
                            <p class="reply${post.postId}-date post-date">${formatDate(post.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <p>${post.postTxt}</p>
                        </div>
                    </div>
                </div>
                <div class="replied${post.replyId} replied-post">
                    <div class="post-profile">
                        <img class="picture" src="../../medias/defaultUser.webp">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p class="replied${post.replyId}-name post-name">@${repliedPost.publisherId}</p>
                            <p class="replied${post.replyId}-date post-date">${formatDate(repliedPost.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <p>${repliedPost.postTxt}</p>
                        </div>
                        <div class="post-interact">
                            <a class="replied${post.replyId}-reply reply-icon"><i class="bi bi-chat"></i>0</a>
                            <a class="replied${post.replyId}-repost repost-icon"><i class="bi bi-repeat"></i>0</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (post.repostId) {
        if (!repostedPost) {
            console.error("Reposted post data is missing for repostId:", post.repostId);
            return '';
        }

        postHtml = `
            <div class="repost${post.postId} repost-post">
                <div class="repost">
                    <div class="post-profile">
                        <img class="picture" src="../../medias/defaultUser.webp">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p class="repost${post.postId}-name post-name">@${post.publisherId}</p>
                            <p class="repost${post.postId}-date post-date">${formatDate(post.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <i class="bi bi-repeat"></i><p>Reposted</p>
                        </div>
                    </div>
                </div>
                <div class="reposted${post.repostId} reposted-post">
                    <div class="post-profile">
                        <img class="picture" src="../../medias/defaultUser.webp">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p class="reposted${post.repostId}-name post-name">@${repostedPost.publisherId}</p>
                            <p class="reposted${post.repostId}-date post-date">${formatDate(repostedPost.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <p>${repostedPost.postTxt}</p>
                        </div>
                        <div class="post-interact">
                            <a class="reposted${post.repostId}-reply reply-icon"><i class="bi bi-chat"></i>0</a>
                            <a class="reposted${post.repostId}-repost repost-icon"><i class="bi bi-repeat"></i>0</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        postHtml = `
            <div class="post${post.postId} posts">
                <div class="post-profile">
                    <img class="picture" src="../../medias/defaultUser.webp">
                </div>
                <div class="content">
                    <div class="post-data">
                        <p class="post${post.postId}-name post-name">@${post.publisherId}</p>
                        <p class="post${post.postId}-date post-date">${formatDate(post.postDate)}</p>
                    </div>
                    <div class="post-content">
                        <p>${post.postTxt}</p>
                    </div>
                    <div class="post-interact">
                        <a class="post${post.postId}-reply reply-icon"><i class="bi bi-chat"></i>0</a>
                        <a class="post${post.postId}-repost repost-icon"><i class="bi bi-repeat"></i>0</a>
                    </div>
                </div>
            </div>
        `;
    }

    return postHtml;
}

// function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}