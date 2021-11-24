import express from "express";
import {
  CustomersModel,
  CustomersDetail,
  CustomersHobby,
} from "./customers.model.js";
const Controller = express.Router();

Controller.get("/test", async (request, response) => {
  const model = new CustomersModel();
  model.registerKey(["name", "salary"]);
  model.schema.field.name = "Volde933";
  model.schema.field.age = "22";
  model.schema.field.salary = 120000;
  model.insert();

  console.log(model.sql);
  response.json({
    message: "hello",
  });
});

Controller.get("/join", async (request, response) => {
  const customers = new CustomersModel();
  const detail = new CustomersDetail();
  const hobby = new CustomersHobby();

  customers.registerField([customers, detail]);
  customers.map();
  customers.join(customers, detail, { key: ["id", "customers_id"] }).left();
  customers.join(detail, hobby, { key: ["hobby_id", "id"] }).left();
  customers.group();
  customers.order("id").descending();
  console.log(customers.sql);

  response.json(customers.sql);
});

export default Controller;
