import Model from "../../application/core/MainModel.js";

export class CustomersModel extends Model {
  constructor(_schema) {
    super(_schema);
    this.schema = {
      name: "customers",
      field: {
        id: new Number(),
        name: new String(),
        age: new String(),
        salary: new Number(),
      },
    };
    this.execute = {
      extends: {
        source: this.schema.name,
      },
    };
  }
}

export class CustomersDetail extends Model {
  constructor(_schema) {
    super(_schema);
    this.schema = {
      name: "customers_detail",
      field: {
        id: new Number(),
        customer_id: new Number(),
        address: new String(),
        hobby_id: new String(),
      },
    };
  }
}

export class CustomersHobby extends Model {
  constructor() {
    super();
    this.schema = {
      name: "customers_hobby",
      field: {
        id: new Number(),
        detail_id: new Number(),
        hobby_name: new String(),
      },
    };
  }
}
