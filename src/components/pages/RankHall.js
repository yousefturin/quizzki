import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../Footer";
import "../App.css";

export default function RankHall() {
  const [userData, setUserData] = useState([]);
  // Storing the data in array before the render and sorting  them based on the score
  const sortedUserData = userData.sort((a, b) => b.score - a.score);

  useEffect(() => {
    // Fetch all user data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('https://quizzkiapi-quizzki.onrender.com/v0/api/Quizzki/getAllUserData');
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="display-container">
      <div className="gradient-background">
                <div className="gradient"></div>
            </div>
        <h1 className="info-display-exception">Rank Hall</h1>
        <div className='user-table-wrapper'>
      <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedUserData.map((user) => (
                <tr key={user.id}>
                  <td>{user.displayName}</td>
                  <td>{user.time}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
      </div>
      <Footer />
    </>
  );
}
