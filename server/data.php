<?php
require_once 'db.php';
function getTasks(int $cardId):array { 
    return [
        [
            'id' => 1,
            'list' => 5,
            'progressList' => 3,
            'title' => "Implement new user authentication system with biometric verification and two-factor authentication while ensuring compliance with security protocols and user privacy guidelines...",
            'clients' => [
                ['id' => 1, 'name' => "John Doe", 'image' => "/man-1.jpg"],
                ['id' => 2, 'name' => "Jane Smith", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 4,
                'recentContributors' => [
                    ['id' => 1, 'name' => "John Doe", 'image' => "/man-2.jpg"],
                    ['id' => 2, 'name' => "Jane Smith", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 15,
            'attachments' => getAttachments($cardId, 1),
            'createdAt' => "01-01-2024",
        ],
        [
            'id' => 2,
            'list' => 8,
            'progressList' => 5,
            'title' => "Develop automated testing suite including unit tests, integration tests, and end-to-end tests with comprehensive coverage reports and continuous integration pipeline...",
            'clients' => [
                ['id' => 3, 'name' => "Bob Smith", 'image' => "/man-1.jpg"],
                ['id' => 4, 'name' => "Alice Jones", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 6,
                'recentContributors' => [
                    ['id' => 3, 'name' => "Bob Smith", 'image' => "/man-2.jpg"],
                    ['id' => 4, 'name' => "Alice Jones", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 12,
            'attachments' => getAttachments($cardId, 2),
            'createdAt' => "15-01-2024",
        ],
        [
            'id' => 3,
            'list' => 10,
            'progressList' => 6,
            'title' => "Implement secure file upload system with virus scanning, format validation, and cloud storage integration while maintaining scalability and performance requirements...",
            'clients' => [
                ['id' => 5, 'name' => "Sarah Wilson", 'image' => "/man-1.jpg"],
                ['id' => 6, 'name' => "Mike Brown", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 3,
                'recentContributors' => [
                    ['id' => 5, 'name' => "Sarah Wilson", 'image' => "/man-2.jpg"],
                    ['id' => 6, 'name' => "Mike Brown", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 8,
            'attachments' => getAttachments($cardId, 3),
            'createdAt' => "22-02-2024",
        ],
        [
            'id' => 4,
            'list' => 12,
            'progressList' => 7,
            'title' => "Design and implement real-time collaboration features with WebSocket integration, conflict resolution, and synchronized state management across multiple users...",
            'clients' => [
                ['id' => 7, 'name' => "Emily Davis", 'image' => "/man-1.jpg"],
                ['id' => 8, 'name' => "Tom Taylor", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 5,
                'recentContributors' => [
                    ['id' => 7, 'name' => "Emily Davis", 'image' => "/man-2.jpg"],
                    ['id' => 8, 'name' => "Tom Taylor", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 10,
            'attachments' => getAttachments($cardId, 4),
            'createdAt' => "10-03-2024",
        ],
        [
            'id' => 5,
            'list' => 15,
            'progressList' => 8,
            'title' => "Optimize database performance through query optimization, indexing strategies, and caching mechanisms while maintaining data consistency...",
            'clients' => [
                ['id' => 9, 'name' => "Chris Martin", 'image' => "/man-1.jpg"],
                ['id' => 10, 'name' => "James Wilson", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 4,
                'recentContributors' => [
                    ['id' => 9, 'name' => "Chris Martin", 'image' => "/man-2.jpg"],
                    ['id' => 10, 'name' => "James Wilson", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 14,
            'attachments' => getAttachments($cardId, 5),
            'createdAt' => "05-04-2024",
        ],
        [
            'id' => 6,
            'list' => 18,
            'progressList' => 9,
            'title' => "Implement advanced authentication system with multi-factor authentication, OAuth integration, and role-based access control...",
            'clients' => [
                ['id' => 11, 'name' => "Amy Johnson", 'image' => "/man-1.jpg"],
                ['id' => 12, 'name' => "David Lee", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 6,
                'recentContributors' => [
                    ['id' => 11, 'name' => "Amy Johnson", 'image' => "/man-2.jpg"],
                    ['id' => 12, 'name' => "David Lee", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 17,
            'attachments' => getAttachments($cardId, 6),
            'createdAt' => "20-04-2024",
        ],
        [
            'id' => 7,
            'list' => 20,
            'progressList' => 10,
            'title' => "Develop mobile-responsive UI components with cross-browser compatibility and progressive enhancement for optimal user experience...",
            'clients' => [
                ['id' => 13, 'name' => "Lisa Chen", 'image' => "/man-1.jpg"],
                ['id' => 14, 'name' => "Mark Thompson", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 3,
                'recentContributors' => [
                    ['id' => 13, 'name' => "Lisa Chen", 'image' => "/man-2.jpg"],
                    ['id' => 14, 'name' => "Mark Thompson", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 9,
            'attachments' => getAttachments($cardId, 7),
            'createdAt' => "01-05-2024",
        ],
        [
            'id' => 8,
            'list' => 22,
            'progressList' => 11,
            'title' => "Implement data visualization dashboard with interactive charts, real-time updates, and customizable reporting features...",
            'clients' => [
                ['id' => 15, 'name' => "Rachel Green", 'image' => "/man-1.jpg"],
                ['id' => 16, 'name' => "Kevin White", 'image' => "/man-2.jpg"],
            ],
            'contributor' => [
                'count' => 5,
                'recentContributors' => [
                    ['id' => 15, 'name' => "Rachel Green", 'image' => "/man-2.jpg"],
                    ['id' => 16, 'name' => "Kevin White", 'image' => "/man-1.jpg"],
                ],
            ],
            'commentCount' => 13,
            'attachments' => getAttachments($cardId, 8),
            'createdAt' => "15-05-2024",
        ],
    ];
}

function getAttachments(int $cardId, int $taskId):array {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM attachments WHERE cardId = :cardId AND taskId = :taskId ORDER BY id DESC");
    $stmt->execute(['cardId' => $cardId, 'taskId' => $taskId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

$cards = [
    ['id' => 1, 'title' => 'Incomplete', 'color' => 'red', 'count' => 0, 'tasks' => getTasks(1)],
    ['id' => 2, 'title' => 'To Do', 'color' => 'cyan', 'count' => 0, 'tasks' => getTasks(2)],
    ['id' => 3, 'title' => 'Doing', 'color' => 'yellow', 'count' => 0, 'tasks' => getTasks(3)],
    ['id' => 4, 'title' => 'Under Review', 'color' => '', 'count' => 0, 'tasks' => getTasks(4)],
    ['id' => 5, 'title' => 'Completed', 'color' => '', 'count' => 0, 'tasks' => getTasks(5)],
    ['id' => 6, 'title' => 'Over Completed', 'color' => '', 'count' => 0, 'tasks' => getTasks(6)]
];