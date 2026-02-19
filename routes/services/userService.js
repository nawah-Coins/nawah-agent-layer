<<<<<<< HEAD
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// قاعدة البيانات
const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

// إنشاء جدول المستخدمين إذا لم يكن موجوداً
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`);
});

// الدوال
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { name, email } = userData;
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, name, email });
    });
  });
=======
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../../data/users.json');

// Load users from JSON file or initialize empty array
function loadUsers() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
  const raw = fs.readFileSync(dataFile);
  return JSON.parse(raw);
}

// Save users to JSON file
function saveUsers(users) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

exports.getAllUsers = () => {
  return loadUsers();
};

exports.registerUser = (userData) => {
  const users = loadUsers();
  const newUser = { id: Date.now(), ...userData };
  users.push(newUser);
  saveUsers(users);
  return newUser;
>>>>>>> 6b29a51 (Clean repo and apply .gitignore properly)
};
