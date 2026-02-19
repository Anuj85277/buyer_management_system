const pool = require("../config/db");
const xlsx = require("xlsx");
const fs = require("fs");

exports.uploadBuyers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data || data.length === 0) {
      return res.status(400).json({ message: "Uploaded file is empty" });
    }

    const values = [];

    for (let row of data) {
      values.push([
        req.user.id,                                     // user_id (required)
        row.Name ?? null,
        row.Email ?? null,
        row.Mobile ?? null,
        row.Address ?? null,
        row["Total Invoice Amount"]
          ? parseFloat(row["Total Invoice Amount"])
          : 0,
        row["Total Amount Paid"]
          ? parseFloat(row["Total Amount Paid"])
          : 0,
        row["Total Amount Due"]
          ? parseFloat(row["Total Amount Due"])
          : 0,
      ]);
    }

    // Bulk Insert (Much faster than loop)
    await pool.query(
      `INSERT INTO buyers 
      (user_id, name, email, mobile, address, total_invoice_amount, total_amount_paid, total_amount_due)
      VALUES ?`,
      [values]
    );

    // Delete file after processing
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "File uploaded successfully" });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.getBuyers = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const offset = (page - 1) * limit;
    const searchTerm = `%${search}%`;

    const query = `
      SELECT * FROM buyers
      WHERE user_id = ?
      AND (name LIKE ? OR email LIKE ? OR mobile LIKE ?)
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await pool.execute(query, [
      req.user.id,
      searchTerm,
      searchTerm,
      searchTerm,
    ]);

    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM buyers
       WHERE user_id = ?
       AND (name LIKE ? OR email LIKE ? OR mobile LIKE ?)`,
      [req.user.id, searchTerm, searchTerm, searchTerm]
    );

    res.json({
      data: rows,
      totalRecords: countResult[0].total,
      currentPage: page,
      totalPages: Math.ceil(countResult[0].total / limit),
    });

  } catch (error) {
    console.error("Get Buyers Error:", error);
    res.status(500).json({ message: error.message });
  }
};
