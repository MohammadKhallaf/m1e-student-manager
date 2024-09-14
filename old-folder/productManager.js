const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dataFilePath = path.join(__dirname, "products.json");

class ProductManager {
  constructor() {
    this.products = [];
  }

  //  --------------- file system access
  async saveProducts() {
    try {
      // save from app to file
      const productsJSON = JSON.stringify(this.products);
      await fs.writeFile(dataFilePath, productsJSON);
    } catch (error) {
      console.warn(error);
    }
  }

  // read
  async loadProducts() {
    // from file --> to app
    try {
      const list = await fs.readFile(dataFilePath, "utf-8");
      this.products = JSON.parse(list);
    } catch (error) {
      this.products = [];
    } finally {
      console.log("The operation is done!");
    }
  }

  //  --------------- interaction with app ----------

  // create
  async createProduct(product) {
    await this.loadProducts();

    // from app to app
    this.products.push({
      ...product,
      id: uuidv4(),
    });

    await this.saveProducts();
  }

  async getAllProducts() {
    await this.loadProducts();
    return this.products;
  }

  async getProductById(id) {
    await this.loadProducts();
    const productObj = this.products.find(
      (product) => product.id.toString() === id.toString()
    );
    return productObj;
  }

  async getProductsByPriceFilter(min, max) {
    await this.loadProducts();
    const filteredProducts = this.products.filter((item) => {
      return item.price >= min && item.price <= max;
    });

    return filteredProducts;
  }

  async deleteOneProduct(id) {
    await this.loadProducts();
    const idx = this.products.findIndex((item) => {
      return item.id.toString() === id.toString();
    });

    if (idx > -1) {
      this.products.splice(idx, 1);
      await this.saveProducts();
    }
  }

  async deleteAllProducts() {
    await this.loadProducts();
    this.products = [];
    await this.saveProducts();
  }

  async updateProduct(id, updatedObj) {
    await this.loadProducts();

    const idx = this.products.findIndex((item) => {
      return item.id.toString() === id.toString();
    });
    const oldData = this.products[idx];

    const updatedProduct = {
      ...oldData, // SPREAD
      ...updatedObj, // spread
    };
    this.products[idx] = updatedProduct;

    await this.saveProducts();

    return this.products[idx];
  }

  async updateProductNewData(id, updatedObj) {
    await this.loadProducts();

    const idx = this.products.findIndex((item) => {
      return item.id === id;
    });

    this.products[idx] = { ...updatedObj, id };
    // . Save
    await this.saveProducts();
    return this.products[idx];
  }

  // ----------- //
}

module.exports = ProductManager;
