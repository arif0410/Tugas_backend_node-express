const express = require('express');
const app = express();
const conn = require('./config/db');

app.use(express.json());

app.get('/get-mahasiswa', function (req, res) {
  const queryStr = 'SELECT * FROM mahasiswa';
  conn.query(queryStr, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        "success": false,
        "message": "Gagal menampilkan data",
        "error": err.sqlMessage
      });
    } else {
      res.status(200).json({
        "success": true,
        "message": "Sukses menampilkan data",
        "data": results
      });
    }
  });
});

app.get('/get-mahasiswa-by-id', function (req, res) {
  const id = req.query.id;
  const queryStr = 'SELECT * FROM mahasiswa WHERE id = ?';
  conn.query(queryStr, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        "success": false,
        "message": "Gagal menampilkan data",
        "error": err.sqlMessage
      });
    } else {
      res.status(200).json({
        "success": true,
        "message": "Sukses menampilkan data",
        "data": results
      });
    }
  });
});

app.post('/store-mahasiswa', function (req, res) {
  const { name, jurusan } = req.body;
  const queryStr = 'INSERT INTO mahasiswa (name, jurusan) VALUES (?, ?)';
  conn.query(queryStr, [name, jurusan], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        "success": false,
        "message": "Gagal menyimpan data",
        "error": err.sqlMessage
      });
    } else {
      res.status(200).json({
        "success": true,
        "message": "Sukses menyimpan data"
      });
    }
  });
});

app.post('/update-mahasiswa', function (req, res) {
  const { id, name, jurusan } = req.body;
  const queryStr = 'UPDATE mahasiswa SET name = ?, jurusan = ? WHERE id = ?';
  conn.query(queryStr, [name, jurusan, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        "success": false,
        "message": "Gagal mengubah data",
        "error": err.sqlMessage
      });
    } else {
      res.status(200).json({
        "success": true,
        "message": "Sukses mengubah data"
      });
    }
  });
});

app.post('/delete-mahasiswa', function (req, res) {
  const { id } = req.body;
  const queryStr = 'DELETE FROM mahasiswa WHERE id = ?';
  conn.query(queryStr, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        "success": false,
        "message": "Gagal menghapus data",
        "error": err.sqlMessage
      });
    } else {
      res.status(200).json({
        "success": true,
        "message": "Sukses menghapus data"
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
