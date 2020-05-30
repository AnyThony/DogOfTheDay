const express = require('express');

const app = express();

app.use("/api", require("./routes/api.js"))

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);