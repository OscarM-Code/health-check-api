const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/routes")
const cron = require("./tools/cron")
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
let app = express();
const port = process.env.PORT || 5000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Health Check API",
            description: "An api to check health of link request based on database mongodb",
            version: "1.0.0",
            contact: {
                name: "Millot Oscar",
                email: "o.millot@kiwilab.fr"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["./docs/docs.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://health:${process.env.PSWD}@cluster0.xcibb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true,  autoIndex: true});

let db = mongoose.connection;

!db ? console.log("Error connecting db") : console.log("Db connected successfully");

app.get('/', (req, res) => res.send('Health Check API'));

app.use('/api', apiRoutes);

app.listen(port, () => console.log(`App listen on port : ${port}`))

cron.start();