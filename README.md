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

# Tutorial : Servidor básico con Fastify

## 1 .- Configuración

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

### Cambios al usar `"type": "module"`:

- Los archivos deben tener extensión `.js` (o `.mjs` si no configuras `package.json`).
- No puedes usar `require`, solo `import`.

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

// Instancia de la clase fastify
const fastify = Fastify({ logger: true });

// Definir una ruta básica
fastify.get("/", async (req, res) => {
  return { hello: "world" };
});

// Iniciar el servidor
try {
  fastify.listen({ port: 3000 });
} catch (erro) {
  console.log(erro);
}
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

---

## 2.- Creación del archivo index

Este paso incluye la configuración inicial de un servidor básico con Fastify. El archivo `index.js` será el punto de entrada principal de la aplicación.

## Código

```javascript
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
  console.log(erro);
}
```

## Explicación del código

### Importación de Fastify

- Usamos `import Fastify from "fastify";` para importar la librería Fastify.
- Esta sintaxis ES6 es posible gracias a la configuración de `"type": "module"` en el archivo `package.json`.

### Definición de una ruta básica

- La ruta raíz `/` devuelve un objeto JSON `{ hello: "world" }` cuando un cliente hace una solicitud GET.

### Inicialización del servidor

- `await fastify.listen({ port: 3000 });` inicia el servidor en el puerto 3000.
- Usamos `await` directamente a nivel superior, lo que simplifica el código y evita funciones adicionales como `start()`.

### Consola

- El mensaje `Servidor en http://localhost:3000` confirma que el servidor está corriendo en el puerto 3000.

## Resultado esperado

Al abrir el navegador e ir a `http://localhost:3000`, deberías ver el siguiente mensaje JSON:

```json
{
  "hello": "world"
}
```

Este archivo index.js es el corazón inicial de tu servidor Fastify. A medida que avanzas, podrás añadir más rutas, lógica, y funcionalidades.

---

## 3.- Creación del archivo `rutas.js`

### Introducción

El archivo `rutas.js` se encargará de gestionar las rutas del servidor Fastify. En este archivo definiremos rutas adicionales que pueden manejar distintas solicitudes HTTP y realizar operaciones CRUD.

En la raíz del proyecto, crea un archivo llamado `rutas.js`.

```bash
touch rutas.js
```

En este archivo `rutas.js`, definimos las rutas básicas que siguen las operaciones CRUD utilizando Fastify. A continuación, se agregan las rutas para los métodos GET, PUT y DELETE, además de la ya existente ruta POST.

## Código Completo: rutas.js

```javascript
// Definir las rutas
const rutas = [
  {
    method: "POST",
    url: "/usuarios",
    handler: async (req, res) => {
      res.status(200).send({ status: "OK - POST" });
    },
  },
  {
    method: "GET",
    url: "/usuarios",
    handler: async (req, res) => {
      res.status(200).send({ status: "OK - GET", usuarios: [] });
    },
  },
  {
    method: "PUT",
    url: "/usuarios/:id",
    handler: async (req, res) => {
      const { id } = req.params;
      res.status(200).send({ status: `Usuario con ID ${id} actualizado` });
    },
  },
  {
    method: "DELETE",
    url: "/usuarios/:id",
    handler: async (req, res) => {
      const { id } = req.params;
      res.status(200).send({ status: `Usuario con ID ${id} eliminado` });
    },
  },
];

export default rutas;
```

Resultado Esperado
Con estas rutas definidas, el servidor podrá manejar las siguientes solicitudes:

## CRUD y Métodos HTTP

1. **POST /usuarios**:

   - **Descripción**: Crea un nuevo usuario.
   - **Ejemplo de solicitud**: `POST http://localhost:3000/usuarios`

2. **GET /usuarios**:

   - **Descripción**: Obtiene la lista de usuarios.
   - **Ejemplo de solicitud**: `GET http://localhost:3000/usuarios`

3. **PUT /usuarios/:id**:

   - **Descripción**: Actualiza un usuario específico.
   - **Ejemplo de solicitud**: `PUT http://localhost:3000/usuarios/1` (requiere `id` y datos JSON en el cuerpo).

4. **DELETE /usuarios/:id**:
   - **Descripción**: Elimina un usuario por su `id`.
   - **Ejemplo de solicitud**: `DELETE http://localhost:3000/usuarios/1`

---

# <div align="center">Ciclo de Vida Interno de Fastify</div>

## consulta la [documentación oficial de Fastify](https://fastify.dev/docs/latest/Reference/Lifecycle/#lifecycle).

Este esquema describe el ciclo de vida de una solicitud en Fastify, desde la solicitud entrante hasta la respuesta saliente, y muestra cómo se manejan los errores en cada fase.

## Fases del Ciclo de Vida

<pre style="overflow: scroll;">
<div style="width:800px;">
Incoming Request
  │
  └─▶ Routing
        │
        └─▶ Instance Logger
             │
   4**/5** ◀─┴─▶ onRequest Hook
                  │
        4**/5** ◀─┴─▶ preParsing Hook
                        │
              4**/5** ◀─┴─▶ Parsing
                             │
                   4**/5** ◀─┴─▶ preValidation Hook
                                  │
                            400 ◀─┴─▶ Validation
                                        │
                              4**/5** ◀─┴─▶ preHandler Hook
                                              │
                                    4**/5** ◀─┴─▶ User Handler
                                                    │
                                                    └─▶ Reply
                                                          │
                                                4**/5** ◀─┴─▶ preSerialization Hook
                                                                │
                                                                └─▶ onSend Hook
                                                                      │
                                                            4**/5** ◀─┴─▶ Outgoing Response
                                                                            │
                                                                            └─▶ onResponse Hook
                                                                            </div>
</pre>

---

## Manejo de Errores y Respuestas

Durante o antes del **User Handler**, se puede llamar a `reply.hijack()` para evitar que Fastify ejecute pasos posteriores o envíe automáticamente la respuesta.

### Resultados Posibles en el Manejador:

- **Asíncrono:** Devuelve una carga útil o lanza un error.
- **Sincrónico:** Envía una carga útil o lanza una instancia de `Error`.
- Si la respuesta es pirateada, se omiten los pasos restantes.

---

## Flujo de Manejo de Errores

1. **Validación del Esquema:**

   - Si hay un error, pasa a `schemaErrorFormatter` para procesarlo.

2. **Gestión de Errores:**

   - La carga útil o instancia de error sigue el flujo hacia `setErrorHandler` y el **onError Hook**.

3. **Serialización de la Respuesta:**  
   La respuesta JSON será serializada por:
   - Un serializador personalizado, si está configurado.
   - El compilador del serializador, si hay un esquema JSON.
   - `JSON.stringify`, si no hay otra configuración.
