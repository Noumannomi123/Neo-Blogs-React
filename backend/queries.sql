CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
	author_name VARCHAR(50),
    title VARCHAR(255),
    title_picture TEXT,
    content TEXT,
    summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (author_name) REFERENCES user_profile(username) ON DELETE cASCADE
);

-- table for Likes
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- table for Comments
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- table for Replies
CREATE TABLE replies (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- -- table for Followers
-- CREATE TABLE followers (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     follower_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Messages
-- CREATE TABLE messages (
--     id SERIAL PRIMARY KEY,
--     sender_id INT NOT NULL,
--     receiver_id INT NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Notifications
-- CREATE TABLE notifications (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Bookmarks
-- CREATE TABLE bookmarks (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     post_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
-- );

-- -- table for Hashtags
-- CREATE TABLE hashtags (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) UNIQUE NOT NULL
-- );

-- -- table for Post_Hashtags
-- CREATE TABLE post_hashtags (
--     id SERIAL PRIMARY KEY,
--     post_id INT NOT NULL,
--     hashtag_id INT NOT NULL,
--     FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
--     FOREIGN KEY (hashtag_id) REFERENCES hashtags(id) ON DELETE CASCADE
-- );

-- -- table for Saved_Posts
-- CREATE TABLE saved_posts (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     post_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
-- );

-- -- table for Blocked_Users
-- CREATE TABLE blocked_users (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     blocked_user_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (blocked_user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Muted_Users
-- CREATE TABLE muted_users (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     muted_user_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (muted_user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Reports
-- CREATE TABLE reports (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     post_id INT NOT NULL,
--     reason TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
-- );

-- -- table for Admins
-- CREATE TABLE admins (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Moderators
-- CREATE TABLE moderators (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Admin_Notifications
-- CREATE TABLE admin_notifications (
--     id SERIAL PRIMARY KEY,
--     admin_id INT NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
-- );

-- -- table for Moderator_Notifications
-- CREATE TABLE moderator_notifications (
--     id SERIAL PRIMARY KEY,
--     moderator_id INT NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (moderator_id) REFERENCES moderators(id) ON DELETE CASCADE
-- );

-- -- table for Admin_Messages
-- CREATE TABLE admin_messages (
--     id SERIAL PRIMARY KEY,
--     admin_id INT NOT NULL,
--     user_id INT NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- table for Moderator_Messages
-- CREATE TABLE moderator_messages (
--     id SERIAL PRIMARY KEY,
--     moderator_id INT NOT NULL,
--     user_id INT NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (moderator_id) REFERENCES moderators(id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

