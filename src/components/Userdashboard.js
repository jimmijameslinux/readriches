import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ProgressContext } from '../App';
import { BASE_URL } from './Godurl';

export default function Userdashboard({ loginStatus, carddata, userid }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { subscriptionstartdate, membershipsubscription, subscriptionenddate,setMembershipsubscription } = useContext(ProgressContext);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedCardsCount, setCompletedCardsCount] = useState(0);
  const [singleusersubscriptions, setsingleusersubscriptions] = useState([]);

  if (location.pathname.startsWith('/userdashboard')) {
    if (!loginStatus.success) {
      navigate('/login');
    }
  }

  useEffect(() => {
    fetch(`${BASE_URL}/createUserDashboards/${userid}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        const userFilteredData = data.filter((data) => data.user === userid);
        setFilteredData(userFilteredData);
        setIsLoading(false); // Set loading state to false after fetching data

        // Calculate completedCardsCount after filtering carddata
        const completedCardsCount = carddata.filter(card => {
          const progressData = userFilteredData.find(data => data.card === card._id);
          const progressValue = progressData ? Number(progressData.progressvalue) : 0;
          return progressValue === 100;
        }).length;

        setCompletedCardsCount(completedCardsCount); // Set the state for completedCardsCount
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false); // Set loading state to false if there's an error
      });
  }, [userid, carddata]);

  // console.log("completedCardsCount", completedCardsCount);
  let roundedNumber = (val) => {
    return val ? val.toFixed(0) : "0";
  };

  // useEffect(() => {
  //   fetch(`${BASE_URL}/createUserDashboards/${userid}`, {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setFilteredData(data.filter((data) => data.user === userid));
  //       setIsLoading(false); // Set loading state to false after fetching data
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setIsLoading(false); // Set loading state to false if there's an error
  //     });
  // }, [userid, carddata]);

  useEffect(() => {
    fetch(`${BASE_URL}/createUserSubscriptions`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        const usersubscription = data.filter((data) => data.user === userid);
        setsingleusersubscriptions(usersubscription);
      })
      .catch(err => {
        console.log(err);
      });

  }, [userid]);

  console.log(membershipsubscription)


  if (isLoading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
      }}>
      <Sidebar />

      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <h1 style={{ marginTop: "5rem" }} >Userdashboard</h1>
        <div className="dashboardcontainer" style={{ marginTop: "2rem" }}>
          {/* No of card left unseen */}
          <div style={{ display: "flex", width: "60vw", justifyContent: "space-between", marginBottom: "3rem" }}>
            <div className="userdetails">
              <h3>Cards Not Seen</h3>
              <h1>{carddata.length - completedCardsCount}</h1>
            </div>
            {/* No. of card seen */}
            <div className="userdetails">
              <h3>Cards Seen</h3>
              <h1>{completedCardsCount}</h1>
            </div>
            {/* Subscription type,startdate and enddate */}
            {
              singleusersubscriptions.map((subscription, index) => {
        setMembershipsubscription(subscription.subscriptiontaken);

                return (
                  <div key={index} className="userdetails" style={{ display: "flex",justifyContent:'space-between',width:"64%" }}>
                    <div>
                      <h3>Subscription Type</h3>
                      <h1>{subscription.subscriptiontype}</h1>
                    </div>
                    <div>
                      <h3>Start Date</h3>
                      <h1>{subscription.subscriptionstartdate}</h1>
                    </div>
                    <div>
                      <h3>End Date</h3>
                      <h1>{subscription.subscriptionenddate}</h1>
                    </div>
                  </div>
                );
              })
            }
          </div>
          {/* Card Progress */}
          <div className="userdetails">
            <h3>Card Progress</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {
                carddata.map((card, index) => {
                  const progressData = filteredData.find(data => data.card === card._id);
                  const progressValue = progressData ? Number(progressData.progressvalue) : 0;
                  return (
                    <div key={index} style={{ display: "flex", marginTop: "2rem", justifyContent: "space-between", width: "60vw" }}>
                      {/* sno */}
                      <h4>{index + 1}</h4>
                      {/* company name */}
                      <h4>{card.company_name}</h4>
                      {/* progress bar */}
                      <div style={{ width: "500px", height: "1.35rem", backgroundColor: "lightgray", borderRadius: "1rem" }}>
                        <div style={{ width: `${progressValue}%`, height: "100%", backgroundColor: "green", borderRadius: "1rem" }}>
                          <div style={{ color: "black", width: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <span style={{ color: `${progressValue > 50 ? "white" : "black"}` }}>{roundedNumber(progressValue)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
