/* -----------------------------------------------------------------
Script to create the CMS People Finder database
*** Note this will delete all tables and therefore delete all data
-------------------------------------------------------------------*/

-- Assume database has been created and we are logged into the 
--  database as user pf_computer_access

-- Drop tables in reverse order of creation
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
  description TEXT DEFAULT NULL
);

-- Create a default user in the profiles table. This is used as defaults for
-- all users before they edit the particular fields
INSERT INTO login(id, email, password_hash, signup_date) VALUES
  (0, 'princetoby@test.com', '$2b$10$nkg3O/LRDSEzVqqzouvvt.vy2vbo9t/ZZOcUngP7EN7UFg/uoFjLe', '2021-06-28 11:35:05.645');

INSERT INTO profiles(id, handle, tagline, description) VALUES
  (0, 'Toby the Cat', 'TOTALLY AWESOME MANIFESTATION OF INFINITE CONSCIOUSNESS', 
      'As a cat, much of my time is spent either sleeping or manipulating humans into being my servants with my irresitible cuteness. I have found loud whiny noises useful for obtaining food and cuddles. Boxes are useful places to hide in. In the early evening strange lights (reflections from electronic device screens) appear on the ceiling and walls. I have tried communicated with these, but so far have not received a response.');
