const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// สร้าง API Endpoint ยิงมาที่ /api/time
app.get("/api/time", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as time");
    res.json({
      success: true,
      message: "Node.js เชื่อมต่อ PostgreSQL สำเร็จ!",
      dbTime: result.rows[0].time,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend API running on port ${port}`);
});
