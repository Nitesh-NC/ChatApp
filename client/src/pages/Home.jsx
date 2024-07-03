import { Outlet } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios'


const Home = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
  
    const fetchUserDetails = async () => {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
  
      try {
        const response = await axios.get(URL, {
          withCredentials: true, // Ensure cookies are included in the request
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.data || response.data.logout) {
          // Handle the case where the user needs to log out
          console.log(response.data ? response.data.message : 'Failed to fetch user details');
          // Perform logout operation
          setError(response.data ? response.data.message : 'Failed to fetch user details');
          setUser(null);
        } else {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setError(error.message);
      }
    };
  
    useEffect(() => {
      fetchUserDetails();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!user) {
      return <div>Loading...</div>;
    }

  return (
   <>
    <h1 className="text-3xl font-bold underline">
    Hello
  </h1>
    <section>
        <Outlet/>
    </section>
   </>
  )
}

export default Home

