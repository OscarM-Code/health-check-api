const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/routes")
const cron = require("./tools/cron")
let app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://health:(leJOdu25)etcie@cluster0.xcibb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true,  autoIndex: true});

let db = mongoose.connection;

!db ? console.log("Error connecting db") : console.log("Db connected successfully");

app.get('/', (req, res) => res.send('Health Check API'));

app.use('/api', apiRoutes);

app.listen(port, () => console.log(`App listen on port : ${port}`))

cron.start();