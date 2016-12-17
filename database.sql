CREATE TABLE toDo (
	id SERIAL PRIMARY KEY NOT NULL,
	task VARCHAR(200),
	completed BOOLEAN,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);


INSERT INTO toDo (task, completed) VALUES('laundry', false);
