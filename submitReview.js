$(document).ready(function() {
    // Submit form using $.ajax()
    $('#reviewFormAjax').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        var formData = {
            reviewerName: $('#reviewerNameAjax').val(),
            reviewText: $('#reviewTextAjax').val()
        };

        $.ajax({
            url: 'submitReview.php', // Server URL
            type: 'POST', // HTTP Method
            data: formData, // Form data
            dataType: 'json', // Data type expected
            success: function(response) {
                if(response.status == 'success') {
                    $('#statusMessage').html('<p style="color:green;">' + response.message + '</p>');
                } else {
                    $('#statusMessage').html('<p style="color:red;">' + response.message + '</p>');
                }
                $('#reviewFormAjax')[0].reset(); // Reset form
            },
            error: function(xhr, status, error) {
                $('#statusMessage').html('<p style="color:red;">An error occurred. Please try again.</p>');
            }
        });
    });

    // Submit form using $.post()
    $('#reviewFormPost').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        var formData = {
            reviewerName: $('#reviewerNamePost').val(),
            reviewText: $('#reviewTextPost').val()
        };

        $.post('submitReview.php', formData, function(response) {
            if (response.status === 'success') {
                $('#statusMessage').html('<p style="color:green;">' + response.message + '</p>');
            } else {
                $('#statusMessage').html('<p style="color:red;">' + response.message + '</p>');
            }
            $('#reviewFormPost')[0].reset(); // Reset form
        }, 'json');
    });

    // Fetch reviews using $.get()
    $('#fetchReviewsButton').on('click', function() {
        $.get('getReviews.php', function(response) {
            $('#statusMessage').html('<p>' + response + '</p>'); // Display reviews
        });
    });

    // Fetch reviews using $.getJSON()
    $('#fetchReviewsJsonButton').on('click', function() {
        $.getJSON('getReviews.php', function(response) {
            if (response.status == 'success') {
                var reviews = response.reviews;
                var html = '<h3>Reviews:</h3>';
                $.each(reviews, function(index, review) {
                    html += '<p><strong>' + review.reviewerName + ':</strong> ' + review.reviewText + '</p>';
                });
                $('#statusMessage').html(html);
            } else {
                $('#statusMessage').html('<p style="color:red;">Failed to fetch reviews.</p>');
            }
        });
    });
});
