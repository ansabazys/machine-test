import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Machine Test API",
      version: "1.0.0",
      description:
        "Authentication & approval workflow API",
    },

   
  },

  apis: ["src/modules/**/*.ts"],
};

export const swaggerSpec =
  swaggerJsdoc(options);