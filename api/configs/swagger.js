import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Shop API",
      version: "1.0.0",
      description: "Smart Shop API dökümantasyonu",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routers/*.js"],  // Swagger dökümantasyonu için yorumlar eklediğimiz dosyalar
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
