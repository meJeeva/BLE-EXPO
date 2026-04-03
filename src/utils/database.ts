import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('vitalz.db');
    
    // Create tables for offline cache
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS bootstrap_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS vitals_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id TEXT NOT NULL,
        data TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS upload_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endpoint TEXT NOT NULL,
        payload TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        retry_count INTEGER DEFAULT 0
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const cacheBootstrapData = async (data: any) => {
  if (!db) return;
  try {
    await db.runAsync(
      'INSERT INTO bootstrap_cache (data, timestamp) VALUES (?, ?)',
      [JSON.stringify(data), Date.now()]
    );
  } catch (error) {
    console.error('Error caching bootstrap data:', error);
  }
};

export const getCachedBootstrapData = async () => {
  if (!db) return null;
  try {
    const result = await db.getFirstAsync(
      'SELECT data FROM bootstrap_cache ORDER BY timestamp DESC LIMIT 1'
    );
    return result ? JSON.parse((result as any).data) : null;
  } catch (error) {
    console.error('Error getting cached bootstrap data:', error);
    return null;
  }
};

export const cacheVitalsData = async (patientId: string, data: any) => {
  if (!db) return;
  try {
    await db.runAsync(
      'INSERT INTO vitals_cache (patient_id, data, timestamp) VALUES (?, ?, ?)',
      [patientId, JSON.stringify(data), Date.now()]
    );
  } catch (error) {
    console.error('Error caching vitals data:', error);
  }
};

export const getCachedVitalsData = async (patientId: string) => {
  if (!db) return null;
  try {
    const result = await db.getFirstAsync(
      'SELECT data FROM vitals_cache WHERE patient_id = ? ORDER BY timestamp DESC LIMIT 1',
      [patientId]
    );
    return result ? JSON.parse((result as any).data) : null;
  } catch (error) {
    console.error('Error getting cached vitals data:', error);
    return null;
  }
};

export const addToUploadQueue = async (endpoint: string, payload: any) => {
  if (!db) return;
  try {
    await db.runAsync(
      'INSERT INTO upload_queue (endpoint, payload, created_at) VALUES (?, ?, ?)',
      [endpoint, JSON.stringify(payload), Date.now()]
    );
  } catch (error) {
    console.error('Error adding to upload queue:', error);
  }
};

export const getUploadQueue = async () => {
  if (!db) return [];
  try {
    const results = await db.getAllAsync('SELECT * FROM upload_queue ORDER BY created_at ASC');
    return results;
  } catch (error) {
    console.error('Error getting upload queue:', error);
    return [];
  }
};

export const clearUploadQueueItem = async (id: number) => {
  if (!db) return;
  try {
    await db.runAsync('DELETE FROM upload_queue WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error clearing upload queue item:', error);
  }
};

export const clearCache = async () => {
  if (!db) return;
  try {
    await db.execAsync(`
      DELETE FROM bootstrap_cache;
      DELETE FROM vitals_cache;
      DELETE FROM upload_queue;
    `);
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
