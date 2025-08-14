import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import api from '../api/axios';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const SupportPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSupport = async () => {
    if (!name || !email || !amount || parseInt(amount) < 10) {
      alert("Please enter Name, Email, and a valid Amount.");
      return;
    }

    setIsProcessing(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load payment gateway. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await api.post("/create-order", {
        amount: parseInt(amount) * 100,
      });

      const data = response.data;

      const options = {
        key: "rzp_live_mH9lTw03BynC5U",
        amount: data.amount,
        currency: "INR",
        name: "StayNMeal",
        description: "Support Contribution",
        order_id: data.id,
        handler: async function (res: any) {
          const verifyRes = await api.post("/verify-payment", {
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
            name,
            email,
            mobile,
            amount: parseInt(amount),
          });

          if (verifyRes.data.status === "success") {
            setSuccess(true);
            alert("✅ Thank you! Confirmation email sent.");
          } else {
            alert("⚠️ Payment verification failed.");
          }
        },
        prefill: {
          name,
          email,
          contact: mobile,
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-2xl shadow-lg border bg-white">
      {success ? (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-green-600">Thank You!</h2>
          <p className="text-sm text-gray-600">
            Your contribution has been received. We’ve sent you a confirmation email.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold text-center mb-4">Support StaynMeal ❤️</h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Your support helps us build better tools for affordable living.
          </p>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number (Optional)"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            />
            <input
              type="number"
              placeholder="Amount (INR)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
              required
            />
            <button
              onClick={handleSupport}
              disabled={isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg flex justify-center items-center"
            >
              {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : "Support Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SupportPage;
