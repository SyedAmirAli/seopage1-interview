<?php
require_once 'data.php';
require_once 'db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');



$pdo->exec("CREATE TABLE IF NOT EXISTS attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cardId INTEGER NOT NULL,
    taskId INTEGER NOT NULL,
    images TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL
)");

switch($_SERVER['REQUEST_METHOD']) {    
    case 'GET':
        echo json_encode($cards);
        break;
    case 'POST':
        // Validate required fields
        if (!isset($_POST['taskId']) || !isset($_POST['cardId']) || !isset($_FILES['images'])) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Missing required fields: taskId, cardId and images'
            ]);
            exit;
        }

        // Validate file uploads
        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp', 'image/gif'];
        $files = $_FILES['images'];
        // echo json_encode($files);
        // echo is_array($files);
        // exit;

        // Check if files array is empty
        if (empty($files['name'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'No images uploaded']);
            exit;
        }

        // If single file uploaded, convert to array format
        if (!is_array($files['name'])) {
            $files = array(
                'name' => [$files['name']],
                'type' => [$files['type']],
                'tmp_name' => [$files['tmp_name']],
                'error' => [$files['error']],
                'size' => [$files['size']]
            );
        }

        // Create images directory if it doesn't exist
        $uploadDir = 'images/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $uploadedFiles = [];

        // Validate and store each uploaded file
        foreach ($files['type'] as $index => $type) {
            if (!in_array($type, $allowedTypes)) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Invalid file type. Allowed types: jpg, jpeg, png, svg, webp, gif',
                    'file' => $files['name'][$index],
                    'type' => $type
                ]);
                exit;
            }

            if ($files['error'][$index] !== UPLOAD_ERR_OK) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'File upload failed',
                    'file' => $files['name'][$index]
                ]);
                exit;
            }

            // Generate unique filename
            $fileExtension = pathinfo($files['name'][$index], PATHINFO_EXTENSION);
            $newFilename = uniqid() . '_' . bin2hex(random_bytes(8)) . '.' . $fileExtension;
            $targetPath = $uploadDir . $newFilename;

            // Move uploaded file
            if (move_uploaded_file($files['tmp_name'][$index], $targetPath)) {
                $uploadedFiles[] = $newFilename;
            } else {
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Failed to move uploaded file',
                    'file' => $files['name'][$index]
                ]);
                exit;
            }
        } 

        // Store file paths in database
        try {
            $stmt = $pdo->prepare("INSERT INTO attachments (cardId, taskId, images, name) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $_POST['cardId'],
                $_POST['taskId'], 
                json_encode($uploadedFiles),
                $_POST['name'] ?? ''
            ]);

            // Get the newly created record
            $newId = $pdo->lastInsertId();
            $stmt = $pdo->prepare("SELECT * FROM attachments WHERE id = ?");
            $stmt->execute([$newId]);
            $newRecord = $stmt->fetch(PDO::FETCH_ASSOC);

            // Return the newly created record
            http_response_code(201);
            echo json_encode([
                'status' => 'success',
                'message' => 'Files uploaded successfully',
                'data' => $newRecord
            ]);
            exit;
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Database error: ' . $e->getMessage()
            ]);
            exit;
        } 
    case 'PUT':
        break;
    case 'DELETE':
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
}



?>