import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import { setDataProduct } from "../redux/productSlide"; // Adjust import based on your actual file structure
//import 
const Home = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  // Fetch products on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const data = await response.json();
      dispatch(setDataProduct(data)); // Dispatch action to store fetched products
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            {/* <p className="text-sm font-medium text-slate-900">Bike Delivery</p> */}
            {/* <img
              src="#"
              className="h-7"
              alt="Delivery Icon"
            /> */}
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            Get Nutritios Product At {" "}
            <span className="text-red-600">Your Doorstep</span>
          </h2>
          <p className="py-3 text-base">
           .
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              ))
            : [1, 2, 3, 4].map((index) => (
                <HomeCard key={index} loading={"Loading..."} />
              ))}
        </div>
      </div>

      <div>
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">Fresh Vegetables</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              ))
            : [1, 2, 3, 4].map((index) => (
                <CardFeature loading="Loading..." key={index} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Product"} />
    </div>
  );
};

export default Home;
