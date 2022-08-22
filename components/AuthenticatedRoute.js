import React from 'react';
import Router from 'next/router';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@/store/authSlice';

//source: https://cheatcode.co/tutorials/how-to-handle-authenticated-routes-with-next-js
const authenticatedRoute = (Component = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      if (this.props.isLoggedIn || this.props.user) {
        this.setState({ loading: false });
      } else {
        Router.push(options.pathAfterFailure || '/login');
      }
    }

    render() {
      const { loading } = this.state;

      if (loading) {
        return <div />;
      }

      return <Component {...this.props} />;
    }
  }

  return connect((state) => ({
    isLoggedIn: state?.auth.authState,
  }))(AuthenticatedRoute);
};

export default authenticatedRoute;
