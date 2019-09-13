DROP TABLE IF EXISTS actions CASCADE;
CREATE TABLE actions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  comment VARCHAR(255) NOT NULL,
  rate SMALLINT NOT NULL DEFAULT 0,
  date DATE NOT NULL,
  likes VARCHAR(255) NOT NULL DEFAULT 0
);