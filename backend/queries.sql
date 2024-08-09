CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
	author_id INT,
    title VARCHAR(255),
    title_picture TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE cASCADE
);

ALTER TABLE blog_posts
ADD COLUMN summary TEXT;

CREATE TABLE user_profile (
  id INT, -- Reference the user's ID from users
  email VARCHAR(255) NOT NULL UNIQUE, -- Reference the user's email from users
  name VARCHAR(50) NOT NULL, 
  phone VARCHAR(20),
  gender VARCHAR(7) NOT NULL,
  date_of_birth DATE,
  address TEXT,
  facebook_link TEXT,
  twitter_link TEXT,
  instagram_link TEXT,
  PRIMARY KEY (id, email),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);

ALTER TABLE user_profile
MODIFY COLUMN date_of_birth VARCHAR(10);