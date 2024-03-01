// require("dotenv").config(); // You may uncomment this if you're using dotenv for environment variables
const db = require('./db/index.js');
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000; // Using port 3000

// Middleware to parse JSON bodies
app.use(cors())
app.use(express.json());

// Route to get all information with pagination and search
app.get("/api/v1/all", async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = 20;
        const offset = (page - 1) * limit;

        // Sorting
        const sortBy = req.query.sortBy || "created_at"; // Default to sorting by created_at if not specified
        const sortOrder = req.query.sortOrder || "ASC"; // Default to ascending order if not specified

        // Search
        const searchTerm = req.query.searchTerm || "";

        // SQL query with pagination, sorting, and search
        const queryString = `
            SELECT sno, customer_name, age, phone, location, 
                   TO_CHAR(created_at, 'YYYY-MM-DD') AS date,
                   TO_CHAR(created_at, 'HH24:MI:SS') AS time
            FROM customers
            WHERE customer_name ILIKE $1 OR location ILIKE $1
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $2 OFFSET $3
        `;

        // SQL query to get total count without pagination, sorting, or search
        const queryStringCount = `
            SELECT COUNT(*) AS total FROM customers
            WHERE customer_name ILIKE $1 OR location ILIKE $1
        `;

        // Execute the query with parameters to get total count
        const countResult = await db.query(queryStringCount, [`%${searchTerm}%`]);
        const totalCount = countResult.rows[0].total;

        // Calculate the total pages
        const totalPages = Math.ceil(totalCount / limit);

        // Execute the query with parameters for the current page
        const results = await db.query(queryString, [`%${searchTerm}%`, limit, offset]);

        res.status(200).json({
            status: "success",
            data: {
                page,
                totalRecords: results.rows.length,
                totalPages,
                records: results.rows
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

// Route to get a specific info
app.get("/api/v1/all/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const results = await db.query("SELECT * FROM customers WHERE sno = $1", [id]);

        if (results.rows.length === 0) {
            res.status(404).json({
                status: "error",
                message: "Record not found"
            });
        } else {
            res.status(200).json({
                status: "success",
                data: results.rows[0]
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
