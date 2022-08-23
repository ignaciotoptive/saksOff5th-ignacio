import React from 'react';
import Header from './Header';

function Layout(Component) {
  return (props) => {
    return (
      <div className="webstore-layout">
        <Header />
        <div className="webstore-content container mx-auto">
          <Component {...props} />
        </div>
      </div>
    );
  };
}

export default Layout;
