"use client";
import { apiBaseUrl, RAZORPAY_KEY } from '@/karnx/api';
import { useAuth } from "@/app/context/AuthContext";
// export default function RazorpayButton() {

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const handlePayment = async () => {
    const { karnxToken, setLoader } = useAuth();
    setLoader(true);
    const loaded = await loadRazorpay();
    if (!loaded) return alert("Razorpay SDK failed");

    // Step 1: Create Order from Laravel
    const response = await fetch(
        `${apiBaseUrl}/booking-payment/create-order`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Barter': `Bearer ${karnxToken || ""}` },
            body: JSON.stringify({ amount: 500 }) // ₹500
        }
    );

    const order = await response.json();

    // Step 2: Open Razorpay Gateway
    const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "karnX",
        description: "Payment",
        order_id: order.id,
        handler: async function (response) {

            // Step 3: Verify payment with Laravel
            const verify = await fetch(
                `${apiBaseUrl}/booking-payment/verify-payment`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", 'Barter': `Bearer ${karnxToken || ""}` },
                    body: JSON.stringify(response),
                }
            );

            const result = await verify.json();

            if (result.status === "success") {
                alert("Payment Successful ✅");
                setLoader(false);
            } else {
                alert("Payment Failed ❌");
                setLoader(false);
            }
        },
        theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};

// return handlePayment();
// }
