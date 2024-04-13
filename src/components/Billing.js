import React, { useContext, useEffect } from 'react';
import '../components/css/Billing.css';
import axios from "axios";
import finallogo from '../components/img/finallogo.png';
import { ProgressContext } from '../App';

const Billing = ({ userid }) => {
    const [billvalue1, setBillValue1] = React.useState(99);
    const [billvalue2, setBillValue2] = React.useState(199);
    const [billvalue3, setBillValue3] = React.useState(299);
    const { setMembershipsubscription, setSubscriptionstartdate, membershipsubscription, subscriptionstartdate, subscriptionenddate, setSubscriptionenddate, subscriptiontype, setSubscriptiontype } = useContext(ProgressContext);

    const createMemberShip = () => {
        const data = {
            user: userid,
            subscriptiontype: subscriptiontype,
            subscriptiontaken: membershipsubscription,
            subscriptionstartdate: subscriptionstartdate,
            subscriptionenddate: subscriptionenddate
        }

        fetch(`http://localhost:3001/createUserSubscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay(billvalue) {
        setMembershipsubscription(true);
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:3001/orders", {
            amount: billvalue,
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: process.env.REACT_APP_RAZORPAY,
            amount: amount.toString(),
            currency: currency,
            name: "ReadRiches",
            description: "Test Transaction",
            image: { finallogo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:3001/success", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (membershipsubscription && subscriptionstartdate && subscriptionenddate && subscriptiontype) {
            createMemberShip();
        }
    }, [membershipsubscription, subscriptionstartdate, subscriptionenddate, subscriptiontype]);

    const handlePlanSelection = (billvalue) => {
        setMembershipsubscription(true);
        setSubscriptionstartdate(formatDate(Date.now()));

        if (billvalue === billvalue1) {
            setSubscriptionenddate(formatDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)));
            setSubscriptiontype("basic");
        } else if (billvalue === billvalue2) {
            setSubscriptionenddate(formatDate(new Date(Date.now() + 730 * 24 * 60 * 60 * 1000)));
            setSubscriptiontype("pro");
        } else if (billvalue === billvalue3) {
            setSubscriptionenddate(formatDate(new Date(Date.now() + 1095 * 24 * 60 * 60 * 1000)));
            setSubscriptiontype("premium");
        }
    };

    return (
        <div className="container">
            <div className="plans" onClick={() => { handlePlanSelection(billvalue1); displayRazorpay(billvalue1); }}>
                <div className="plans__content">
                    <h1>Rs.{billvalue1}</h1>
                    <span>title</span>
                    <p>✔lorem ipsum dolor sit</p>
                    <p>✔lorem ipsum dolor sit</p>
                    <p>✔lorem ipsum dolor sit</p>
                </div>
            </div>
            <div className="plans" id="plan2" onClick={() =>{ handlePlanSelection(billvalue2); displayRazorpay(billvalue2); }}>
                <div className="plans__content">
                    <h1>Rs.{billvalue2}</h1>
                    <span>title</span>
                    <p>✔lorem ipsum dolor sit</p>
                    <p>✔lorem ipsum dolor sit</p>
                    <p>✔lorem ipsum dolor sit</p>
                </div>
            </div>
            <div className="plans" id="plan3" onClick={() => { handlePlanSelection(billvalue3); displayRazorpay(billvalue3); }}>
                <div className="plans__content">
                    <h1>Rs.{billvalue3}</h1>
                    <span>title</span>
                    <p>✔lorem ipsum dolor sit</p>
                    <p>✔lorem ipsum dolor sit</p>
                    <p>✔lorem ipsum dolor sit</p>
                </div>
            </div>
        </div>
    );
};

export default Billing;
