import { Fragment, useEffect, useState } from "react";
import ProductServices from "../services/productsServices";
import { toast } from "react-toastify";
import SingleProductCardComponent from "../components/SingleProductCardComponent";
import LoaderComponent from "../components/LoaderComponent";
function ProductPages() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    ProductServices.getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex items-center justify-center bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200">
      <div className="container mx-auto w-[95%] flex flex-wrap items-center justify-center gap-[20px] py-[50px]">
        {isLoaded ? (
          products.map((el, i) => {
            return <SingleProductCardComponent product={el} key={i} />;
          })
        ) : (
          <LoaderComponent />
        )}
      </div>
    </div>
  );
}

export default ProductPages;
