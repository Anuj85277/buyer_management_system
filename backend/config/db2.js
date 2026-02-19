const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL);

(async () => {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("✅ Connected to Railway MySQL successfully");

    // Disable foreign key checks temporarily
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");

    // Drop tables
    await connection.query("DROP TABLE IF EXISTS buyers");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("🗑 Old tables dropped");

    // Create users table
    await connection.query(`
      CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        mobile VARCHAR(15) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
    `);

    console.log("✅ Users table created");

    // Create buyers table
    await connection.query(`
      CREATE TABLE buyers (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        name VARCHAR(100),
        email VARCHAR(100),
        mobile VARCHAR(15),
        address TEXT,
        total_invoice_amount DECIMAL(10,2),
        total_amount_paid DECIMAL(10,2),
        total_amount_due DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log("✅ Buyers table created");

    // Re-enable foreign key checks
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("🎉 Database initialized successfully");

  } catch (error) {
    console.error("❌ DB Init Error:", error.code);
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
})();
