CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
	author_id INT,
    title VARCHAR(255),
    picture_path VARCHAR(255),
    content TEXT,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE blog_posts
ADD CONSTRAINT fk_author
FOREIGN KEY (author_id) REFERENCES users(id)
ON DELETE cASCADE; 
