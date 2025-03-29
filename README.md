# Fastify: Framework Rápido y Eficiente para Node.js

Fastify es un framework web rápido y eficiente para Node.js, diseñado para crear aplicaciones web y APIs RESTful con un enfoque en el rendimiento y bajo consumo de recursos. Es conocido por ser **ligero, altamente extensible, compatible con plugins, y muy rápido en comparación con otros frameworks como Express**.

## Características principales:

- **Rendimiento optimizado**: Diseñado para manejar muchas solicitudes por segundo con baja latencia.
- **JSON Schema Validation**: Permite validar solicitudes y respuestas usando JSON Schema.
- **Extensible**: Sistema de plugins similar a Express y Hapi, lo que facilita la reutilización de código.
- **Ecosistema rico**: Soporte para WebSockets, autenticación JWT, Swagger, y más.
- **Soporte para TypeScript**: Con tipos incorporados y mejor compatibilidad.

---

## Instalación:

Para comenzar con Fastify:

```bash
npm install fastify
```

## Ejemplo básico:

```javascript
// Importar Fastify
const fastify = require("fastify")({ logger: true });

// Definir una ruta básica
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// Iniciar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor escuchando en http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
```

## Validación de datos:

Fastify permite validar datos usando JSON Schema:

```javascript
fastify.post(
  "/user",
  {
    schema: {
      body: {
        type: "object",
        required: ["name", "age"],
        properties: {
          name: { type: "string" },
          age: { type: "integer" },
        },
      },
    },
  },
  async (request, reply) => {
    return { status: "Usuario creado", data: request.body };
  }
);
```

Si los datos no cumplen con el esquema definido, Fastify devolverá automáticamente un error.

## Plugins populares:

- **@fastify/jwt**: Autenticación basada en JSON Web Tokens.
- **@fastify/swagger**: Generación automática de documentación Swagger/OpenAPI.
- **@fastify/cors**: Gestión de CORS (Cross-Origin Resource Sharing).
- **@fastify/multipart**: Soporte para manejar archivos y formularios multipart.

---

## Instalación de un plugin:

```bash
npm install @fastify/jwt
```

## Uso del plugin:

```javascript
fastify.register(require("@fastify/jwt"), { secret: "supersecret" });
```

## Comparación con Express:

| **Característica**         | **Fastify**                   | **Express**                   |
| -------------------------- | ----------------------------- | ----------------------------- |
| **Rendimiento**            | Más rápido (opciones mínimas) | Más lento por su flexibilidad |
| **Validación de esquemas** | JSON Schema integrado         | Necesita middleware externo   |
| **Sistema de plugins**     | Basado en encapsulación       | Basado en middlewares         |
| **TypeScript**             | Soporte mejorado              | Requiere configuración extra  |

# Tutorial.

## Configuración

### Uso de `"type": "module"` en Fastify

Usar "type": "module" permite aprovechar la sintaxis moderna de JavaScript, mejora la compatibilidad con los estándares ECMAScript y optimiza el rendimiento futuro del proyecto.

### Ventajas:

1. **Sintaxis moderna de import/export**:

   - Permite usar:
     ```javascript
     import fastify from "fastify";
     ```
   - En lugar de:
     ```javascript
     const fastify = require("fastify");
     ```

2. **Estándar ECMAScript**:  
   Compatible tanto con el navegador como con Node.js.

3. **Mejor optimización**:  
   ESM permite optimizaciones en Node.js.

4. **Manejo de dependencias asíncronas**:  
   Admite `top-level await` para importar módulos asíncronos.

---

### Cambios al usar `"type": "module"`:

- Los archivos deben tener extensión `.js` (o `.mjs` si no configuras `package.json`).
- No puedes usar `require`, solo `import`.

---

### Ejemplo de configuración:

**Archivo `package.json`:**

```json
{
  "name": "my-fastify-app",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

## Comparación de código: Con y sin `"type": "module"`

### **Con `"type": "module"`**

```javascript
// Importar Fastify
import Fastify from "fastify";

const fastify = Fastify();

// Definir una ruta básica
fastify.get("/", async (req, res) => {
  return { hello: "world" };
});

// Iniciar el servidor
await fastify.listen({ port: 3000 });
console.log("Servidor en http://localhost:3000");
```

### **Sin `"type": "module"`**

```javascript
// Importar Fastify
const Fastify = require("fastify");

const fastify = Fastify();

// Definir una ruta básica
fastify.get("/", async (req, res) => {
  return { hello: "world" };
});

// Iniciar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor en http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

## Diferencias clave entre con y sin `"type": "module"`

### **Sintaxis de importación**:

- **Con `"type": "module"`**: Usamos `import Fastify from 'fastify';`.
- **Sin `"type": "module"`**: Usamos `const Fastify = require('fastify');`.

### **Uso de `await`**:

- **Con `"type": "module"`**: Se puede usar `await` directamente en el nivel superior (fuera de funciones).
- **Sin `"type": "module"`**: `await` debe ser usado dentro de una función asíncrona, por lo que es necesario envolverlo en una función (como en `start()`).

### **Estructura del código**:

- **Con `"type": "module"`**: El código es más directo, sin necesidad de envolver el `await` en una función.
- **Sin `"type": "module"`**: La función `start()` se convierte en una envoltura para el código asíncrono.

### **Conclución**:

- **Con `"type": "module"`**: Se aprovechan las características modernas de ES6, como `import` y `await` a nivel superior.
- **Sin `"type": "module"`**: Se debe usar `require` y envolver el código asíncrono dentro de una función para usar `await`.
