const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const pool = require("./db");
const authMiddleware = require("../middleware/authMiddleware");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { gmail, username, password } = req.body;

    const checkUser = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username],
    );

    if (checkUser.rows.length > 0) {
      return res.json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(gmail,username,password) VALUES($1,$2,$3)",
      [gmail, username, hashedPassword],
    );

    res.json({ message: "Register berhasil" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ada" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, "secret123", {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Login berhasil" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ================= GET MAHASISWA =================
app.get("/mahasiswa", authMiddleware, async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM mhs_tb");
    res.json(data.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ================= TAMBAH MAHASISWA =================
app.post("/mahasiswa", authMiddleware, async (req, res) => {
  try {
    const { name, nim, jurusan, ipk, isActive } = req.body;

    await pool.query(
      "INSERT INTO mhs_tb(name,nim,jurusan,ipk,isActive) VALUES($1,$2,$3,$4,$5)",
      [name, nim, jurusan, ipk, isActive],
    );

    res.json({ message: "Data ditambahkan" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ================= UPDATE =================
app.put("/mahasiswa/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nim, jurusan, ipk, isActive } = req.body;

    await pool.query(
      "UPDATE mhs_tb SET name=$1,nim=$2,jurusan=$3,ipk=$4,isActive=$5 WHERE id=$6",
      [name, nim, jurusan, ipk, isActive, id],
    );

    res.json({ message: "Data berhasil diupdate" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ================= DELETE =================
app.delete("/mahasiswa/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM mhs_tb WHERE id=$1", [id]);

    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
