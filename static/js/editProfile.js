$(document).ready(function () {
  $('#profilePicInput').change(function (e) {
    let file = e.target.files[0];

    if (!file) return;

    let data = new FormData();
    data.append('profilePicture', file);

    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    let userId = currentUser?.userId;
    let token = sessionStorage.getItem('token');

    if (!userId || !token) {
      alert('You are not logged in');
      return;
    }

    $.ajax({
      url: `http://localhost:8080/api/users/${userId}/uploadProfilePicture`,
      type: 'POST',
      data: data,
      contentType: false,
      processData: false,
      headers: { Authorization: `Bearer ${token}` },
      beforeSend: function () {
        console.log('Uploading profile picture...');
      },

      success: function (res) {
        console.log('Full API Response:', res);
        console.log('Profile Picture URL:', res.profilePicture);
        if (!res.profilePicture) {
          console.error(' No profile picture URL received!');
          return;
        }

        let newImageUrl = res.profilePicture + '?t=' + new Date().getTime();

        $('#icon').attr('src', newImageUrl);
        $('.picture').attr('src', newImageUrl);

        alert('Profile picture updated successfully!');
      },

      error: function (xhr, status, error) {
        console.error('Upload Error:', xhr.responseText);
        alert('Error updating profile picture. Try again.');
      },
    });
  });
});
