import React, { useContext, useEffect } from 'react';
import '../components/css/Billing.css';
import axios from "axios";
import finallogo from '../components/img/finallogo.png';
import memtick from '../components/img/memtick.svg';
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
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
        } catch (err) {
            alert(err);
        }
        // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        // if (!res) {
        //     alert("Razorpay SDK failed to load. Are you online?");
        //     return;
        // }
        let result = null;
        try {
            result = await axios.post("http://localhost:3001/orders", {
                amount: billvalue,
            });

            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
        } catch (err) {
            alert(err);
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
        try {
            const paymentObject = new window.Razorpay(options);

            paymentObject.open();
        }
        catch (err) {
            alert(err);
        }
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
        <div className="bcontainer">
            <main>
                <div style={{ width: "473px" }}>
                    <h1>Best plan for business</h1>
                    <p>cost effective,full security,High security</p>
                </div>
            </main>
            <div className="plans__header">
                <div className="plans"
                    id='plans1'
                // onClick={() => { handlePlanSelection(billvalue1); displayRazorpay(billvalue1); }}
                >
                    {/* <div className="plans__content"> */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        backgroundColor: "#E6E6E6",
                        width: "100%"
                    }}>
                        <span className='exp'>EXPERTISE</span>
                    </div>
                    <div className='pricerelated'>
                        <span>PRO</span>
                        <p>
                            <span>
                                ${billvalue1}
                            </span>
                            <span>
                                PER MONTH
                            </span>
                        </p>
                    </div>
                    <div className='subfeature'>
                        <p>
                            <ul className='ulfeature'>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>

                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                            </ul>
                        </p>
                    </div>
                    <div style={{
                        marginInline: "20px",
                        paddingBlock: "10px",
                        marginBottom: "20px"
                    }}>
                        <a href="/howtopay" className="lbtn">Choose Plan</a>
                    </div>
                    {/* </div> */}
                </div>
                <div className="plans"
                    id='plans2'
                // onClick={() => { handlePlanSelection(billvalue2); displayRazorpay(billvalue2); }}
                >
                    {/* <div className="plans__content"> */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        backgroundColor: "#1D666D",
                        width: "100%"
                    }}>
                        <span className='exp' style={{color:"#ffffff"}}>MOST POPULAR</span>
                    </div>
                    <div className='pricerelated'>
                        <span>PRO</span>
                        <p>
                            <span>
                                ${billvalue2}
                            </span>
                            <span>
                                PER MONTH
                            </span>
                        </p>
                    </div>
                    <div className='subfeature'>
                        <p>
                            <ul className='ulfeature'>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>

                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                            </ul>
                        </p>
                    </div>
                    <div style={{
                        marginInline: "20px",
                        paddingBlock: "10px",
                        marginBottom: "20px"
                    }}>
                        <a href="/howtopay" className="lbtn" style={{backgroundColor:"#1D666D"}}>Choose Plan</a>
                    </div>
                    {/* </div> */}
                </div>
                <div className="plans"
                    id='plans3'

                // onClick={() => { handlePlanSelection(billvalue3); displayRazorpay(billvalue3); }}
                >
                    {/* <div className="plans__content"> */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        backgroundColor: "#E6E6E6",
                        width: "100%"
                    }}>
                        <span className='exp'>EXPERTISE</span>
                    </div>
                    <div className='pricerelated'>
                        <span>PRO</span>
                        <p>
                            <span>
                                ${billvalue3}
                            </span>
                            <span>
                                PER MONTH
                            </span>
                        </p>
                    </div>
                    <div className='subfeature'>
                        <p>
                            <ul className='ulfeature'>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>

                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                                <li>
                                    <img src={memtick} alt="tick" />
                                    <span>lorem ipsum dolor sit</span>
                                </li>
                            </ul>
                        </p>
                    </div>
                    <div style={{
                        marginInline: "20px",
                        paddingBlock: "10px",
                        marginBottom: "20px"
                    }}>
                        <a href="/howtopay" className="lbtn">Choose Plan</a>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Billing;