$(document).ready(function() {
    $('#search-bar').on('input', function() {
        const query = $(this).val();

        if (query.length > 0) {
            searchPosts(query);
            searchUsers(query);
        } else {
            $('#posts-list').html('');
            $('#users-list').html('');
        }
    });

    function searchPosts(query) {
        $.ajax({
            url: `http://localhost:8080/api/posts/search?query=${query}`,
            method: 'GET',
            success: function(data) {
                console.log("Post Search Results:", data);
                displayPosts(data);
            },
            error: function(xhr) {
                console.log("AJAX Error:", xhr.responseText);
                $('#posts-list').html('<p>No posts found.</p>');
            }
        });
    }

    function searchUsers(query) {
        const searchQuery = query.trim();

        if (searchQuery.length === 0) {
            $("#users-list").empty();
            return;
        }
        
        $.ajax({
            url: `http://localhost:8080/api/users/search?username=${searchQuery}&displayname=${searchQuery}`,
            method: 'GET',
            success: function(users) {
                console.log("User Search Results:", users);
                displayUsers(users);
            },
            error: function(xhr) {
                console.log("AJAX Error:", xhr.responseText);
                $('#users-list').html('<p>No users found.</p>');
            }
        });
    }

    function displayPosts(posts) {
        $("#posts-list").empty();
        if (!posts.length) {
            $("#posts-list").html('<p>No posts found.</p>');
            return;
        }

        posts.forEach(post => {
            const postHtml = `
                <div class="posts">
                    <div class="post-profile">
                        <img class="picture" src="${post.profilePicture || '../../medias/defaultUser.webp'}">
                    </div>
                    <div class="content">
                        <div class="post-data">
                            <p class="post-name"><b>${post.publisherUsername}</b> ${post.publisherDisplayname}</p>
                            <p class="post-date">${formatDate(post.postDate)}</p>
                        </div>
                        <div class="post-content">
                            <p>${post.postTxt}</p>
                        </div>
                        <div class="post-interact">
                            <a class="reply-icon"><i class="bi bi-chat"></i> ${post.replyCount || 0}</a>
                            <a class="repost-icon"><i class="bi bi-repeat"></i> ${post.repostCount || 0}</a>
                            <a class="like-icon"><i class="bi bi-heart"></i> ${post.likes || 0}</a>
                        </div>
                    </div>
                </div>
            `;
            $("#posts-list").append(postHtml);
        });
    }

    function displayUsers(users) {
        $("#users-list").empty();
        if (!users.length) {
            $("#users-list").html('<p>No users found.</p>');
            return;
        }

        users.forEach(user => {
            const userHtml = `
                <div class="user-card">
                    <img class="user-profile-pic" src="${user.profilePicture || '../../medias/defaultUser.webp'}">
                    <div class="user-info">
                        <p class="user-name"><b>${user.username}</b> (${user.displayname})</p>
                    </div>
                </div>
            `;
            $("#users-list").append(userHtml);
        });
    }

    function formatDate(dateString) {
        if (!dateString) return "Unknown Date";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
});
