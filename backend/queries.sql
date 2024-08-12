CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SIGN IN page change
CREATE TABLE user_profile (
  id INT PRIMARY KEY, -- Reference the user's ID from users
  email VARCHAR(255) NOT NULL UNIQUE, -- Reference the user's email from users
  username VARCHAR(50) DEFAULT '' NOT NULL UNIQUE,
  phone VARCHAR(20) DEFAULT '',
  gender VARCHAR (7) DEFAULT '',
  date_of_birth VARCHAR(10) DEFAULT '',
  address TEXT DEFAULT '',;
  facebook_link TEXT DEFAULT '',
  twitter_link TEXT DEFAULT '',
  instagram_link TEXT DEFAULT '',
  pic TEXT,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
	author_name VARCHAR(255),
    title VARCHAR(255),
    title_picture TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (author_name) REFERENCES user_profile(username) ON DELETE cASCADE
);

ALTER TABLE blog_posts
ADD COLUMN summary TEXT;