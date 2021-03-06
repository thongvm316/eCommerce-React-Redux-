import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserProfileContext } from '../../lib/UserProfileContext';
import { resetCart } from '../../lib/actions';
import '../../styles/Confirm.css';

export const Confirm = () => {
  const useProfile = useContext(UserProfileContext);
  const dispatch = useDispatch();

  return (
    <div className='jumbotron text-center'>
      <h1 className='display-3'>Thank You!</h1>
      <hr />

      <p className='lead'>
        <strong>Your order is on its way to your home</strong>
        <br /> <br />
        <Link
          className='btn btn-primary btn-sm'
          to='/'
          onClick={() => dispatch(resetCart())}
        >
          Continue to homepage
        </Link>
      </p>
      <br />

      {useProfile.email && ( 
        <ul className='address'>
          <li>
            {useProfile.lastName.toUpperCase()}, {useProfile.firstName}
          </li>
          <li>{useProfile.address}</li>
          <li>
            {useProfile.zipCode}, {useProfile.city}
          </li>
        </ul>
      )}
    </div>
  );
};
