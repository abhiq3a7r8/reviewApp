<?php
// Database connection
$servername = "localhost";
$username = "root";  // Default username for XAMPP
$password = "";      // Default password is empty for XAMPP
$dbname = "reviewAppDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get POST data and sanitize it
    $reviewerName = $conn->real_escape_string($_POST['reviewerName']);
    $reviewText = $conn->real_escape_string($_POST['reviewText']);

    // Simple validation
    if (!empty($reviewerName) && !empty($reviewText)) {
        // Insert the review into the database
        $sql = "INSERT INTO reviews (reviewer_name, review_text) VALUES ('$reviewerName', '$reviewText')";

        if ($conn->query($sql) === TRUE) {
            // Success response
            echo json_encode(["status" => "success", "message" => "Review submitted successfully!"]);
        } else {
            // Error response
            echo json_encode(["status" => "error", "message" => "Error submitting review: " . $conn->error]);
        }
    } else {
        // Error response for empty fields
        echo json_encode(["status" => "error", "message" => "Please fill out all fields."]);
    }
}

$conn->close();
?>
