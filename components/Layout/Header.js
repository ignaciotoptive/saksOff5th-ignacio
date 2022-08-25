import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser } from '@/store/authSlice';
import CartIcon from '@/components/CartIcon';
import { ROLE } from '@/utils/types';
import authService from '@/services/auth.service';

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    // Initialize user data from browser cookies
    const token = getCookie('access_token');
    if (!user && !!token) {
      authService().verify(token, (err, user) => {
        dispatch(setUser(user));
      });
    }
  }, []);

  const onLogout = () => {
    axios.get('/api/auth/logout').then(() => {
      dispatch(setUser(null));
      Router.push('/login');
    });
  };

  return (
    <div className="bg-base-300 webstore-header navbar sticky top-0 z-50">
      <div className="flex-1 mx-10">
        <Link href="/">
          <a className="text-2xl font-bold text-accent">Webstore</a>
        </Link>
      </div>
      {!!user && (
        <div className="flex-none space-x-5">
          {user.role === ROLE.CUSTOMER && <CartIcon />}
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
