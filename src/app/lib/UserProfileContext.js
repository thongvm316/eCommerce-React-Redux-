import React from 'react';
import { createContext, useState } from 'react';

export const UserProfileContext = createContext();

const UserProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    zipCode: '',
    city: '',
    setUserProfileContext: (info) => {
      setUserProfile((prevState) => {
        return {
          ...prevState,
          [Object.keys(info)]: Object.values(info)[0], // update
        };
      });
    }
  });
  return (
    <UserProfileContext.Provider value={userProfile}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContextProvider;
