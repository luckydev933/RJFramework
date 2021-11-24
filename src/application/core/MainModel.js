export default class Model {
  constructor(_schema) {
    this.schema = _schema;
    this.sql = String();
    this.register = Array();
    this.field = Array();
    return this;
  }

  init = () => {
    console.log(this.schema);
  };

  map = (type) => {
    var keys = Object.keys(this.schema.field);
    var name = this.schema.name;
    return (this.sql += `SELECT ${!type ? "" : type} ${
      this.field
    } FROM ${name}\n`);
  };

  registerKey = (key) => {
    return (this.register = [...key]);
  };

  registerField = (key) => {
    for (var i = 0; i < key.length; i++) {
      for (var a = 0; a < Object.keys(key[i].schema.field).length; a++) {
        this.field = this.field.concat(
          `${key[i].schema.name}.${Object.keys(key[i].schema.field)[a]}`
        );
      }
    }
  };

  insert = () => {
    let keys = [];
    if (this.register.length > 0) {
      keys += Object.keys(this.schema.field).filter((item) =>
        this.register.includes(item)
      );
    } else {
      keys += Object.keys(this.schema.field);
    }
    const name = this.schema.name;
    const allowedValues = Object.keys(this.schema.field)
      .filter((key) => keys.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.schema.field[key];
        return obj;
      }, {});
    const values = Object.values(allowedValues);
    let val = [];
    for (var i = 0; i < values.length; i++) {
      if (typeof values[i] === "string") {
        val.push(`"${values[i]}"`);
      }
      if (typeof values[i] === "number") {
        val.push(`${values[i]}`);
      }
      if (typeof values[i] === "boolean") {
        val.push(`${values[i]}`);
      }
    }

    return (this.sql += `INSERT INTO ${name} (${keys}) VALUES (${val})`);
  };

  update = (condition) => {
    let set = Object.keys(this.schema.field).map((key) => [
      key,
      this.schema.field[key],
    ]);
    let keybinding = [];
    for (var i = 0; i < set.length; i++) {
      if (typeof set[i][1] === "string") {
        keybinding.push(`${set[i][0]}="${set[i][1]}"`);
      }
      if (typeof set[i][1] === "number") {
        keybinding.push(`${set[i][0]}=${set[i][1]}`);
      }
      if (typeof set[i][1] === "boolean") {
        keybinding.push(`${set[i][0]}=${set[i][1]}`);
      }
    }

    return (this.sql += `UPDATE ${this.schema.name} SET ${keybinding} ${
      condition ? `WHERE ${condition}` : ""
    }`);
  };

  join = (modelname, source_name, { key = [] } = {}) => {
    this.left = () => {
      this.sql += `LEFT JOIN ${source_name.schema.name} ON ${source_name.schema.name}.${key[1]} = ${modelname.schema.name}.${key[0]}\n`;
    };
    this.inner = () => {
      this.sql += `INNER JOIN ${source_name.schema.name} ON ${source_name.schema.name}.${key[1]} = ${modelname.schema.name}.${key[0]}\n`;
    };
    this.right = () => {
      this.sql += `RIGHT JOIN ${source_name.schema.name} ON ${source_name.schema.name}.${key[1]} = ${modelname.schema.name}.${key[0]}\n`;
    };
    this.name = "";

    return this;
  };

  order = (key) => {
    this.descending = () => {
      this.sql += `ORDER BY ${key} DESC\n`;
    };
    this.ascending = () => {
      this.sql += `ORDER BY ${key} ASC\n`;
    };
    return this;
  };

  group = () => {
    return (this.sql += `GROUP BY ${this.field} \n`);
  };
  delete = (condition) => {
    return (this.sql += `DELETE FROM ${this.schema.name} ${
      !condition ? "" : `WHERE ${condition}`
    }\n`);
  };
  limit = (offset, fetch) => {
    return (this.sql += `OFFSET ${offset} ROWS ${
      !fetch ? "" : `FETCH NEXT ${fetch} ROWS ONLY`
    }\n`);
  };
}
