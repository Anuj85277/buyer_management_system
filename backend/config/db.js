const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to Railway MySQL successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Railway DB Connection Failed");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
  }
})();

module.exports = pool;
