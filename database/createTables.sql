/* -----------------------------------------------------------------
Script to create the CMS People Finder database
*** Note this will delete all tables and therefore delete all data
-------------------------------------------------------------------*/

-- Assume database has been created and we are logged into the 
--  database as user pf_computer_access

-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS profiles_projects;
DROP TABLE IF EXISTS user_types;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS profiles_skills;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS profiles_interests;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS login;

CREATE TABLE login(
  id SERIAL PRIMARY KEY,
  email CITEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  signup_date TIMESTAMP NOT NULL
);

-- This table has same primary key as previous table - so 1 to 1 relation
-- You could put all of the information in profiles into login
-- I made a choice to separate them - since profiles has no 'confidential'
-- information, whereas login does, such as the email and the hashed password
CREATE TABLE profiles(
  id INTEGER REFERENCES login(id) PRIMARY KEY,
  handle CITEXT NOT NULL UNIQUE,
  tagline TEXT DEFAULT NULL,
  description TEXT DEFAULT NULL,
  image_filename TEXT DEFAULT NULL,
  aboutme TEXT DEFAULT NULL,
  location TEXT DEFAULT NULL
);

CREATE TABLE interests(
  id SERIAL PRIMARY KEY,
  interest CITEXT NOT NULL UNIQUE
);

CREATE TABLE profiles_interests(
  profile_id INTEGER REFERENCES login(id) NOT NULL,
  interest_id INTEGER REFERENCES interests(id) NOT NULL,
  display_order SMALLINT NOT NULL,
  PRIMARY KEY(profile_id, interest_id)
);

CREATE TABLE skills(
  id SERIAL PRIMARY KEY,
  skill CITEXT NOT NULL UNIQUE
);

CREATE TABLE profiles_skills(
  profile_id INTEGER REFERENCES login(id) NOT NULL,
  skill_id INTEGER REFERENCES skills(id) NOT NULL,
  display_order SMALLINT NOT NULL,
  PRIMARY KEY(profile_id, skill_id)
);

CREATE TABLE projects(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE user_types(
  id SERIAL PRIMARY KEY,
  type CITEXT NOT NULL UNIQUE
);

CREATE TABLE profiles_projects(
  profile_id INTEGER REFERENCES login(id) NOT NULL,
  project_id INTEGER REFERENCES projects(id) NOT NULL,
  user_type INTEGER REFERENCES user_types(id) NOT NULL,
  display_order INTEGER NOT NULL,
  PRIMARY KEY(profile_id, project_id)
);

-- Insert values into fields requiring them

INSERT INTO skills(skill) VALUES
  ('Conflict Resolution'),
  ('Communication'),
  ('Brand Management'),
  ('Inventory Control'),
  ('Data Entry'),
  ('Web Design'),
  ('Web Development'),
  ('Database Design'),
  ('Emotional Intelligence'),
  ('Collaboration'),
  ('Artificial Intelligence'),
  ('Deep Learning'),
  ('Supply Chain Management'),
  ('Cloud Computing'),
  ('UX Design'),
  ('Video Production');

INSERT INTO user_types(id, type) VALUES
  (1, 'Lead'),
  (2, 'Collaborator');

-- Create a default user in the profiles table. This is used as defaults for
-- all users before they edit the particular fields
INSERT INTO login(id, email, password_hash, signup_date) VALUES
  (0, 'princetoby@test.com', '$2b$10$nkg3O/LRDSEzVqqzouvvt.vy2vbo9t/ZZOcUngP7EN7UFg/uoFjLe', '2021-06-28 11:35:05.645');

INSERT INTO profiles(id, handle, tagline, description, aboutme, location) VALUES
  (0, 'Toby the Cat', 'TOTALLY AWESOME MANIFESTATION OF INFINITE CONSCIOUSNESS', 
      'As a cat, much of my time is spent either sleeping or manipulating humans into being my servants with my irresitible cuteness. I have found loud whiny noises useful for obtaining food and cuddles. Boxes are useful places to hide in. In the early evening strange lights (reflections from electronic device screens) appear on the ceiling and walls. I have tried communicated with these, but so far have not received a response.',
      'I am a super cute kitty!!!', 'Toronto, Canada');

INSERT INTO projects(id, title, description) VALUES
  (0, 'Mega Cat Castle', 'Induce humans to build the mightest cat castle, complete with boxes and blankets');

INSERT INTO profiles_skills(profile_id, skill_id, display_order) VALUES
  (0, 2, 1), (0, 8, 3), (0, 4, 2);

INSERT INTO profiles_projects(profile_id, project_id, user_type, display_order) VALUES
  (0, 0, 1, 1);