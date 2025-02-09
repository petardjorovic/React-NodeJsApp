import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductServices from "../services/productsServices";
import LoadingComponent from "../components/LoaderComponent";
import { Rating } from "@mui/material";
import { FaCheck, FaHeart } from "react-icons/fa";

function DetailPage() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(counter * product.price);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    ProductServices.getSingleProduct(id)
      .then((res) => {
        setProduct(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setTotal(counter * product.price);
  }, [counter]);

  function handleImageChange(index) {
    setCurrentImage(index);
  }

  function decreaseCounter() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  function increaseCounter() {
    if (counter < product.stock) {
      setCounter(counter + 1);
    }
  }

  function handleLike() {
    setIsLiked(!isLiked);
    console.log(isLiked);
  }

  return (
    <div className="pt-[50px]">
      {isLoaded ? (
        <div className="container flex">
          <div className="w-[50%] flex items-center justify-center flex-col gap-[10px] pt-[50px]">
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="w-[55%] h-[350px] object-cover rounded-md border border-slate-900"
            />
            <div className="flex w-[55%] items-center justify-center gap-[5px]">
              {product.images.map((el, i) => {
                return (
                  <img
                    src={el}
                    key={i}
                    alt={product.title}
                    className={`w-[18%] h-[50%] object-cover border border-slate-900 rounded-md ${
                      currentImage === i ? "selected" : ""
                    }`}
                    onClick={() => handleImageChange(i)}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-[50%]">
            <div className="border-b border-b-slate-400 h-[50%] flex flex-col justify-start gap-[25px]">
              <h4 className="text-3xl font-semibold">{product.title}</h4>
              <p className="text-lg">${product.price}</p>
              <p className="text-[12px] flex items-center gap-[10px]">
                Reviews:
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </p>

              <p className="flex items-center gap-[10px]">
                Availability:
                {product.stock > 0 ? (
                  <span className="text-green-500 flex items-center gap-[10px]">
                    <FaCheck color="green" /> In stock
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center gap-[10px]">
                    <ImCross color="red" /> Out of stock
                  </span>
                )}
              </p>

              {product.stock < 50 && (
                <p>
                  Hurry up! only <b>{product.stock}</b> product left in stock!
                </p>
              )}
            </div>
            <div className="border-b border-b-slate-400 h-[50%] pt-[50px] flex flex-col items-start gap-[25px]">
              <p className="font-bold">
                Total Price: {total ? total.toFixed(2) : product.price}
              </p>
              <div className="flex items-center gap-[15px]">
                <p className="font-bold">Quantity: </p>
                <div>
                  <button
                    className="bg-gray-300 w-[29px] py-1 border border-slate-400 rounded-sm"
                    onClick={decreaseCounter}
                  >
                    -
                  </button>
                  <button className="bg-gray-300 py-1 w-[50px] border border-slate-400 rounded-sm">
                    {counter}
                  </button>
                  <button
                    className="bg-gray-300 w-[29px] py-1 border border-slate-400 rounded-sm"
                    onClick={increaseCounter}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-[30px]">
                <button className="text-white py-[12px] px-[30px] rounded-3xl bg-orange-400">
                  Add to Cart
                </button>
                <div
                  onClick={handleLike}
                  className="p-[10px] rounded-full bg-slate-400 flex items-center justify-center cursor-pointer"
                >
                  <FaHeart size={25} color={isLiked ? "" : "white"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}

export default DetailPage;
