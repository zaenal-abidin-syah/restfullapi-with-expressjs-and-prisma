const express = require("express");
const app = express();
const dotenv = require("dotenv");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

dotenv.config();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// midleware json
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.status(200).send(users);
});

app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(404).send({
      message: "user not found!",
    });
  }
  res.status(200).send(user);
});
app.post("/users", async (req, res) => {
  const userData = req.body;
  if (
    !(
      userData.name &&
      userData.username &&
      userData.email &&
      userData.phone_number
    )
  ) {
    return res.status(400).send({
      message: "Some fields are missing!!",
    });
  }
  const user = await prisma.users.create({
    data: {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone_number: userData.phone_number,
    },
  });
  res.status(201).send({
    message: "create User success",
  });
});

app.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const userData = req.body;
  if (
    !(
      userData.name &&
      userData.username &&
      userData.email &&
      userData.phone_number
    )
  ) {
    return res.status(400).send({
      message: "Some fields are missing!!",
    });
  }
  const userById = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!userById) {
    return res.status(404).send({
      message: "user not found!",
    });
  }
  const user = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone_number: userData.phone_number,
    },
  });
  res.status(200).send({
    message: "update user success",
  });
});

app.patch("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const userData = req.body;

  const userById = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!userById) {
    return res.status(404).send({
      message: "user not found!",
    });
  }

  const user = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone_number: userData.phone_number,
    },
  });

  res.status(200).send({
    message: "update user success",
  });
});

app.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const userById = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!userById) {
    return res.status(404).send({
      message: "user not found!",
    });
  }
  const user = await prisma.users.delete({
    where: {
      id: userId,
    },
  });
  res.status(200).send({
    message: "delete user success",
  });
});

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log("Express Js Running on : http://localhost:" + PORT);
});
