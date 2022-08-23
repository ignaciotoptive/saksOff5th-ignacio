import React from 'react';
import Header from './Header';

function Layout(Component) {
  return (props) => {
    return (
      <div className="webstore-layout">
        <Header />
        <div className="webstore-content container mx-auto p-5 shadow-md rounded-xl">
          <Component {...props} />
        </div>
      </div>
    );
  };
}

export default Layout;
