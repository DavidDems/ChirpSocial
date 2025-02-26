// shortcuts for api posts calls
function getAllPosts() {
    return $.ajax({
        url: "/api/posts",
        method: "GET",
    });
}

function getRepliedPost(replyId) {
    return $.ajax({
        url: `/api/posts/${replyId}`,
        method: "GET",
    });
}

function getRepostedPost(repostId) {
    return $.ajax({
        url: `/api/posts/${repostId}`,
        method: "GET",
    });
}

function getReplyCount(postId) {
    return $.ajax({
        url: `/api/posts/replyCount/${postId}`,
        method: "GET",
    });
}

function getRepostCount(postId) {
    return $.ajax({
        url: `/api/posts/repostCount/${postId}`,
        method: "GET",
    });
}


// shortcut to fetch user data by ID
function getUserById(userId) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        console.error("No token found. User is not authenticated.");
        return Promise.reject("User is not authenticated.");
    }

    return $.ajax({
        url: `/api/users/${userId}`,
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}