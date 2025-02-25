function postTypeFormat (post, repliedPost) {
    let postHtml = '';

    if (post.replyId) {
        if (!repliedPost) {
            console.error("Replied post data is missing for replyId:", post.replyId);
            return '';
        }

        postHtml = `
            <div id="reply${post.postId}" class="reply-post">
                <div class="reply">
                    <div class="post-profile">
                        <img class="picture" src="../../medias/defaultUser.webp">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p id="reply${post.postId}-name" class="post-name">@${post.publisherId}</p>
                            <p id="reply${post.postId}-date" class="post-date">${formatDate(post.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <p>${post.postTxt}</p>
                        </div>
                        <div class="post-interact">
                            <a id="reply${post.postId}-reply" class="reply-icon"><i class="bi bi-chat"></i>0</a>
                            <a id="reply${post.postId}-repost" class="repost-icon"><i class="bi bi-repeat"></i>0</a>
                            <a id="reply${post.postId}-like" class="like-icon"><i class="bi bi-heart"></i>${post.likes || 0}</a>
                        </div>
                    </div>
                </div>
                <div id="replied${post.replyId}" class="replied-post">
                    <div class="post-profile">
                        <img class="picture" src="../../medias/defaultUser.webp">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p id="replied${post.replyId}-name" class="post-name">@${repliedPost.publisherId}</p>
                            <p id="replied${post.replyId}-date" class="post-date">${formatDate(repliedPost.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <p>${repliedPost.postTxt}</p>
                        </div>
                        <div class="post-interact">
                            <a id="replied${post.replyId}-reply" class="reply-icon"><i class="bi bi-chat"></i>0</a>
                            <a id="replied${post.replyId}-repost" class="repost-icon"><i class="bi bi-repeat"></i>0</a>
                            <a id="replied${post.replyId}-like" class="like-icon"><i class="bi bi-heart"></i>${repliedPost.likes || 0}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (post.repostId) {
        postHtml = `
            <div id="repost${post.postId}" class="repost-post">
                <div class="repost">
                    <div class="content">
                        <div class="post-data">
                            <p id="repost${post.postId}-name" class="post-name">@${post.publisherId}</p>
                            <p id="repost${post.postId}-date" class="post-date">${formatDate(post.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <i class="bi bi-repeat"></i><p>Reposted</p>
                        </div>
                    </div>
                </div>
                <div id="reposted${post.repostId}" class="reposted-post">
                    <div class="post-profile">
                        <img class="picture" src="../../medias/defaultUser.webp">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p id="reposted${post.repostId}-name" class="post-name">@${post.publisherId}</p>
                            <p id="reposted${post.repostId}-date" class="post-date">${formatDate(post.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <p>${post.postTxt}</p>
                        </div>
                        <div class="post-interact">
                            <a id="reposted${post.repostId}-reply" class="reply-icon"><i class="bi bi-chat"></i>0</a>
                            <a id="reposted${post.repostId}-repost" class="repost-icon"><i class="bi bi-repeat"></i>0</a>
                            <a id="reposted${post.repostId}-like" class="like-icon"><i class="bi bi-heart"></i>${post.likes || 0}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        postHtml = `
            <div id="post${post.postId}" class="posts">
                <div class="post-profile">
                    <img class="picture" src="../../medias/defaultUser.webp">
                </div>
                <div class="content">
                    <div class="post-data">
                        <p id="post${post.postId}-name" class="post-name">@${post.publisherId}</p>
                        <p id="post${post.postId}-date" class="post-date">${formatDate(post.postDate)}</p>
                    </div>
                    <div class="post-content">
                        <p>${post.postTxt}</p>
                    </div>
                    <div class="post-interact">
                        <a id="post${post.postId}-reply" class="reply-icon"><i class="bi bi-chat"></i>0</a>
                        <a id="post${post.postId}-repost" class="repost-icon"><i class="bi bi-repeat"></i>0</a>
                        <a id="post${post.postId}-like" class="like-icon"><i class="bi bi-heart"></i>${post.likes || 0}</a>
                    </div>
                </div>
            </div>
        `;
    }

    return postHtml;
}

// Helper function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}