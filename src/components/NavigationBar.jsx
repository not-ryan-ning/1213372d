import React from 'react';
import { NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/">Activity Feed</NavLink>
        <NavLink className="nav-item nav-link" to="/archived">Archived</NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;