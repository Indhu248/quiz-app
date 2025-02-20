// db.js
import { openDB } from 'idb';

const DB_NAME = 'quizApp';
const DB_VERSION = 1;
const STORE_NAME = 'quizAttempts';

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('userId', 'userId', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    },
  });
};

async function getDatabase() {
  const db = await openDB('quizApp', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('quizAttempts')) {
        db.createObjectStore('quizAttempts', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
}

export const saveQuizAttempt = async (attempt) => {
  const db = await getDatabase();
  const tx = db.transaction('quizAttempts', 'readwrite');
  const store = tx.objectStore('quizAttempts');
  await store.add(attempt);
  await tx.done;
};

export const getAllQuizAttempts = async () => {
  const db = await initDB();
  return db.transaction(STORE_NAME).objectStore(STORE_NAME).getAll();
};
