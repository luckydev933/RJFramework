import express from "express";
import bodyParser from "body-parser";
import { settings } from "./src/application/development/app.settings.js";
import Router from "./src/application/development/app.routes.js";
import fs from "fs";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Router);

const directoryModule = "src/main/customers";

let filenames = fs.readdirSync(directoryModule);

const Controllers = () => {
  const main_dir = fs.readdirSync("./src/main/");
  const main_file = main_dir.map((item) => {
    let files = fs.readdirSync("./src/main/" + item + "/");
    let controller = files.filter(
      (file) => file.split(".")[1] === "controller"
    );
    let prefix = files.filter((file) => file.split(".")[1] === "prefix");
    let model = files.filter((file) => file.split(".")[1] === "model");
    var controller_list = {};

    controller.map((item) => [(controller_list[item.split(".")[0]] = item)]);
    return controller_list;
  });

  let controllers = main_file.reduce((result, current) => {
    return Object.assign(result, current);
  }, {});

  return controllers;
};

var load = Controllers();

console.log(load);

app.listen(settings.app_port, () => {
  console.log(`server started on port ${settings.app_port}`);
});
