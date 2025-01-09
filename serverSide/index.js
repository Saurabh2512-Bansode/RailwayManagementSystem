const express = require('express');
const config = require('config');
const adminRoutes = require('./routes/admin');
const trainRoutes = require('./routes/train');
const routeRoutes = require('./routes/route');
const statusRoutes = require('./routes/status');
const userRoutes = require('./routes/user');
const app = express();
app.use(express.json());

// Mount routes
app.use("/admin", adminRoutes);
app.use("/train", trainRoutes);
app.use("/route", routeRoutes);
app.use("/status", statusRoutes);
app.use("/user",userRoutes);
// Start the server
const httpPort = config.get("httpport");
app.listen(httpPort, () => {
    console.log(`Server is running on http://localhost:${httpPort}`);
});
