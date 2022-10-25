import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { loadEnvironmentVariables } from "../env";
import { logInfo } from "../logger";
import { ServerEnvironment } from "./types";

/**
 * Function to initialize swagger
 * @param {Application} app Express Application
 */
export const initSwagger = async (app: Application) => {
  const { SERVER_PORT } = await loadEnvironmentVariables<ServerEnvironment>();
  const options: swaggerJSDoc.Options = {
    verbose: true,
    definition: {
      openapi: "3.0.3",
      info: {
        title: "NA3S API",
        version: "0.0.1",
        description: "NA3S API is a REST API for the NA3S project.",
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
        contact: {
          name: "NA3S",
          url: "https://github.com/MultiTheFranky/na3s",
          email: "me@multithefranky.com",
        },
      },
      host: `localhost:${SERVER_PORT}`,
      servers: [{ url: "/api", description: "Development server" }],
    },
    apis: ["./**/*.yaml"],
  };
  const swaggerSpec = swaggerJSDoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  logInfo("🛠 Swagger initialized 🛠");
  logInfo(
    `📄 Swagger documentation available at http://localhost:${SERVER_PORT}/api-docs 📄`
  );
};
