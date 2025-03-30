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
