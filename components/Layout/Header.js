import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser } from '@/store/authSlice';
import CartIcon from '@/components/CartIcon';

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onLogout = () => {
    dispatch(setUser(null));
    axios.get('/api/auth/logout').then(() => {
      Router.push('/login');
    });
  };

  return (
    <div className="bg-base-300 webstore-header navbar">
      <div className="flex-1 mx-10">
        <Link href="/">
          <a className="text-2xl font-bold text-accent">Webstore</a>
        </Link>
      </div>
      <div className="flex-none">
        {!!user && (
          <>
            <CartIcon />
            <button className="btn" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
