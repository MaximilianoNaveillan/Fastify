# Clase tutorial Fastify

Fastify es un framework web rápido y eficiente para Node.js, diseñado para crear aplicaciones web y APIs RESTful con un enfoque en el rendimiento y bajo consumo de recursos. Es conocido por ser **ligero, altamente extensible, compatible con plugins, y muy rápido en comparación con otros frameworks como Express**.

## Características principales:

- **Rendimiento optimizado**: Diseñado para manejar muchas solicitudes por segundo con baja latencia.
- **JSON Schema Validation**: Permite validar solicitudes y respuestas usando JSON Schema.
- **Extensible**: Sistema de plugins similar a Express y Hapi, lo que facilita la reutilización de código.
- **Ecosistema rico**: Soporte para WebSockets, autenticación JWT, Swagger, y más.
- **Soporte para TypeScript**: Con tipos incorporados y mejor compatibilidad.

## Comparación con Express:

| **Característica**         | **Fastify**                   | **Express**                   |
| -------------------------- | ----------------------------- | ----------------------------- |
| **Rendimiento**            | Más rápido (opciones mínimas) | Más lento por su flexibilidad |
| **Validación de esquemas** | JSON Schema integrado         | Necesita middleware externo   |
| **Sistema de plugins**     | Basado en encapsulación       | Basado en middlewares         |
| **TypeScript**             | Soporte mejorado              | Requiere configuración extra  |

# Tutorial : Servidor básico con Fastify

## 1 .- Instalación:

Para comenzar con Fastify:

```bash
npm install fastify
```

## 2 .- Configuración

> [!NOTE]
>
> ### Se recomienda el uso de `"type": "module"` en l configuración del proyecto
>
> Usar "type": "module" permite aprovechar la sintaxis moderna de JavaScript, mejora la compatibilidad con los estándares ECMAScript y optimiza el rendimiento futuro del proyecto.
>
> ### Ventajas:
>
> - **Sintaxis moderna de import/export**:
>   - Permite usar:
>     ```javascript
>     import fastify from "fastify";
>     ```
>   - En lugar de:
>     ```javascript
>     const fastify = require("fastify");
>     ```
> - **Estándar ECMAScript**:  
>   Compatible tanto con el navegador como con Node.js.
> - **Mejor optimización**:  
>   ESM permite optimizaciones en Node.js.
> - **Manejo de dependencias asíncronas**:  
>   Admite `top-level await` para importar módulos asíncronos.
>
> ### Ejemplo de configuración:
>
> **Archivo `package.json`:**
>
> ```json
> {
>   "name": "my-fastify-app",
>   "type": "module",
>   "main": "index.js",
>   "scripts": {
>     "start": "node index.js"
>   }
> }
> ```

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
  fastify.log.error(erro);
  process.exit(1);
}
```

### **Sin `"type": "module"`**

```javascript
// Importar Fastify
const Fastify = require("fastify");

const fastify = Fastify({ logger: true });

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

### **Conclución**:

- **Con `"type": "module"`**: Se aprovechan las características modernas de ES6, como `import` y `await` a nivel superior.
- **Sin `"type": "module"`**: Se debe usar `require` y envolver el código asíncrono dentro de una función para usar `await`.

---

## 2.- Creación del archivo index

Este paso incluye la configuración inicial de un servidor básico con Fastify. El archivo `index.js` dentro de la carpeta SRC., será el punto de entrada principal de la aplicación.

```
fastify-tutorial/
├── src/
│   ├── index.js
├── package.json
└── ...otros archivos (node_modules, etc.)
```

## Código :SRC/index.js

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
  fastify.log.error(erro); // El logging de Fastify guarda el error e de inicio del servidor
  process.exit(1);
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

```
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
```

1.  **Recepción:** Llega la solicitud.
2.  **Enrutamiento:** Se elige la ruta.
3.  **Pre-Procesamiento:**
    - `onRequest` Hook
    - `preParsing` Hook
    - Parsing y validación
    - `preValidation` Hook
    - `preHandler` Hook
4.  **Manejo:** Se ejecuta el `User Handler`.
5.  **Respuesta:**
    - Se construye la `Reply`.
    - `preSerialization` Hook
    - `onSend` Hook
6.  **Envío:** Se envía la respuesta.
7.  **Post-Procesamiento:** `onResponse` Hook.

---

## Manejo de Errores y Respuestas

Durante o antes del **User Handler**, se puede llamar a `reply.hijack()` para evitar que Fastify ejecute pasos posteriores o envíe automáticamente la respuesta.

### Resultados Posibles en el Manejador:

- **Asíncrono:** Devuelve una carga útil o lanza un error.
- **Sincrónico:** Envía una carga útil o lanza una instancia de `Error`.
- Si la respuesta es pirateada, se omiten los pasos restantes.

## Flujo de Manejo de Errores

```
                        ★ schema validation Error
                                    │
                                    └─▶ schemaErrorFormatter
                                               │
                          reply sent ◀── JSON ─┴─ Error instance
                                                      │
                                                      │         ★ throw an Error
                     ★ send or return                 │                 │
                            │                         │                 │
                            │                         ▼                 │
       reply sent ◀── JSON ─┴─ Error instance ──▶ setErrorHandler ◀─────┘
                                                      │
                                 reply sent ◀── JSON ─┴─ Error instance ──▶ onError Hook
                                                                                │
                                                                                └─▶ reply sent
```

### Resultados Posibles en el Manejador:

- **Asíncrono:** Devuelve una carga útil o lanza un error.
- **Sincrónico:** Envía una carga útil o lanza una instancia de `Error`.
- Si la respuesta es pirateada, se omiten los pasos restantes.
