import express from "express";
import {
  prefix as CustomerPrefix,
  prefix,
} from "../../main/customers/customers.prefix.js";
import Controller from "../../main/customers/customers.controller.js";

const Router = express();

Router.use(CustomerPrefix.routes, Controller);

export default Router;
