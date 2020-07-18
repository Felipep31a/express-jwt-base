// import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import pagesRoutes from "./public/routes";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as expressLayouts from "express-ejs-layouts";
import { erroHandlerMiddleware } from "./api/middlewares/err";

//Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //Set all routes from routes folder

    // Set all pages
    app.set("views", path.join(__dirname, "public/views"));
    app.set("view engine", "ejs");
    app.use(expressLayouts);
    app.use(bodyParser.urlencoded());

    // Set all routes pages
    app.use("/", pagesRoutes);

    app.use("/api", routes);

    // error handler midd
    app.use((error, req, res, next) => {
      erroHandlerMiddleware(error, res);
    });
    // END error handler midd

    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server started on port ${process.env.PORT || 3001}!`);
    });
  })
  .catch((error) => console.log(error));
