export const FILL_DATA = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS stocks;

CREATE TABLE IF NOT EXISTS products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text NOT NULL,
	description text,
    image text,
	price integer
);

CREATE TABLE IF NOT EXISTS stocks (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id uuid,
	count integer,
    foreign key ("product_id") references "products" ("id")
);

INSERT INTO products (id, title, description, image, price)
    VALUES  
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f9', 'ISLAND OF PATROKLOS', 'Greece Europe', 'https://www.privateislandsonline.com/uploads/resize/_885_5880dcf91ffc0.jpg-1074-822.jpg', 48.9),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f8', 'RANGYAI ISLAND', 'Asia Thailand', 'https://www.privateislandsonline.com/uploads/resize/_597_image_fe02c338d8.jpg-1074-822.jpg', 89.2),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f7', 'PUMPKIN KEY', 'United States Florida', 'https://www.privateislandsonline.com/uploads/resize/_1682_60f97f2079fda.jpg-1074-822.jpg',  66.8),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f6', 'LONG CAYE PRIVATE ISLAND', 'Central America Belize', 'https://www.privateislandsonline.com/uploads/resize/_1712_image_18edc564d6.jpg-1074-822.jpg', 116.8),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f5','CAVE CAY', 'Caribbean Bahamas The Exumas', 'https://www.privateislandsonline.com/uploads/resize/_1747_image_691ba69c7d.jpg-1074-822.jpg', 554.5),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f4', 'SPECTABILIS ISLAND', 'Caribbean Bahamas The Exumas', 'https://www.privateislandsonline.com/uploads/resize/_2020_587fc33606fc4.jpg-1074-822.jpg', 55.4),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f3', 'TOJO UNA UNA ISLAND', 'Asia Indonesia', 'https://www.privateislandsonline.com/uploads/resize/_1566_image_50a10dc865.jpg-1074-822.jpg', 776.3);

INSERT INTO stocks (product_id, count)
    VALUES 
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f9', 1),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f8', 2),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f7', 1),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f6', 2),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f5', 2),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f4', 2),
    ('f530f1b3-6433-4fc3-9857-b760c1e6f6f3', 3);
`;