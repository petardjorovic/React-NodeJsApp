import axios from "axios";

class ProductServices {
  static getAllProducts = () => axios.get("/products");
  static getSingleProduct = (id) => axios.get("/products/" + id);
}

export default ProductServices;
