import React, { useEffect, useState } from "react";
import Body from "../components/Body/Body";
import Header from "../components/Header/Header";
import Axios from ".././axios/axios";

function UserDetails({ user, authUrl, UserDetailsUrl }) {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    Axios.get(UserDetailsUrl).then(({ data }) => {
      setUserDetails(data);
    });
  }, [UserDetailsUrl]);

  return (
    <>

        <Header user={user} userDetails={true} />
        <Body user={user} userDetails={userDetails} />

    </>
  );
}

export default UserDetails;
