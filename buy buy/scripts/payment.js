var options = {
  key: "rzp_test_jFaf13SBQLS2HA",
  amount: "0", 
  currency: "INR",
  name: "buy buy", 
  description: "Buy Products Online",
  image: "/images/images.png",
  handler: function (response) {
    alert("Payment Done...");
    alert("Payment Id: " + response.razorpay_payment_id);
  },
  prefill: {
    name: "Customer Name",
    email: "CustomerEmail@example.com",
    contact: "CustomerPhoneNo",
  },
  notes: {
    address: "Razorpay Corporate Office",
  },
  theme: {
    color: "#3399cc",
  },
};
