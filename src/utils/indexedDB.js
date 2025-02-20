// src/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'QuizDatabase';
const STORE_NAME = 'quizAttempts';

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'attemptId',
          autoIncrement: true,
        });
        store.createIndex('userId', 'userId');
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });
  return db;
}

export async function saveQuizAttempt(db, attempt) {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add(attempt);
  await tx.done;
}

export async function getUserQuizHistory(db, userId) {
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const index = store.index('userId');
  const history = await index.getAll(userId);
  await tx.done;
  return history;
}
