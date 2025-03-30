// Importar Fastify
import Fastify from "fastify";
import rutas from "./rutas.js";

// Instancia de la clase fastify
const fastify = Fastify({ logger: true });

//POST      - Incerciones       C-REATE
//GET       - Consultas         R-EAD
//PUT,PATCH - Actualizaciones   U-PDATE
//DELETE    - Borrado           D-ELETE

// Definir una ruta básica
fastify.get("/", async (req, res) => {
  return { hello: "world" };
});

rutas.forEach((ruta) => {
  fastify.route(ruta);
});

// Iniciar el servidor
try {
  fastify.listen({ port: 3000 });
} catch (erro) {
  fastify.log.error(erro);
  process.exit(1);
}
