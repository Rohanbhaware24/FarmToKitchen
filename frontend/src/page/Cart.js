import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
// import PayPalButton from "../component/PayPalButton";
// import CheckoutPage from "./CheckoutPage";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(productCartItem)
      });
      
      if (res.status !== 200) return;  // Check for successful response

      const data = await res.json();
      toast("Redirecting to payment gateway...");
      stripePromise.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      toast("Please log in to proceed.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const handleOrder = async () => {
    // You can also trigger SMS sending on this order submission
    if (user.mail&& user.phone) {
      const orderDetails = {
        user: user.email,
        products: productCartItem,
        totalPrice: totalPrice,
        totalQty: totalQty,
        phone: user.phone
      };

      // Send order data to backend and trigger SMS notification
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/place-order`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(orderDetails)
      });

      if (res.status === 200) {
        toast("Order placed successfully!");
        // Trigger the backend function to send SMS
        await sendSmsNotification(orderDetails);
      } else {
        toast("Something went wrong. Please try again.");
      }
    } else {
      toast("Please log in and provide your phone number.");
    }
  };

  const sendSmsNotification = async (orderDetails) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/send-sms-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: orderDetails.phone,
        message: `Your order has been placed successfully! Total: ₹${orderDetails.totalPrice}`
      })
    });

    if (response.status === 200) {
      toast("SMS notification sent!");
    } else {
      toast("Failed to send SMS notification.");
    }
  };

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      {productCartItem[0] ? (
        <div className="my-4 flex gap-3">
          {/* Display cart items */}
          <div className="w-full max-w-3xl">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* Total cart item summary */}
          <div className="w-full max-w-md ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>
            <button className="bg-green-500 w-full text-lg font-bold py-2 text-white mt-3" onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center flex-col">
          <img src={emptyCartImage} className="w-full max-w-sm" />
          <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
