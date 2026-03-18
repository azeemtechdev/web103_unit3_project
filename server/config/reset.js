import { pool } from './database.js'
import 'dotenv/config'
import locationData from '../data/locationData.js'
import eventData from '../data/eventData.js'

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      image_url VARCHAR(255)
    );
  `
  try {
    await pool.query(createTableQuery)
    console.log('🎉 locations table created successfully')
  } catch (err) {
    console.error('⚠️ error creating locations table', err)
  }
}

const createEventsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      location_id INTEGER NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      image_url VARCHAR(255),
      FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
    );
  `
  try {
    await pool.query(createTableQuery)
    console.log('🎉 events table created successfully')
  } catch (err) {
    console.error('⚠️ error creating events table', err)
  }
}

const seedTables = async () => {
  await createLocationsTable()
  await createEventsTable()

  try {
    // Seed locations
    for (const location of locationData) {
      const insertQuery = `
        INSERT INTO locations (id, name, description, image_url)
        VALUES ($1, $2, $3, $4)
      `
      const values = [location.id, location.name, location.description, location.image_url]
      await pool.query(insertQuery, values)
    }

    // Seed events
    for (const event of eventData) {
      const insertQuery = `
        INSERT INTO events (title, description, location_id, date, time, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
      `
      const values = [event.title, event.description, event.location_id, event.date, event.time, event.image_url]
      await pool.query(insertQuery, values)
    }

    console.log('🎉 tables seeded successfully')
    pool.end()
  } catch (err) {
    console.error('⚠️ error seeding tables', err)
  }
}

seedTables()