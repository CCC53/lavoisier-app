import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { NavRoute } from '../../types/ui';

export const Navigation = () => {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const toggleNav = () => {
    setCollapsed(!collapsed);
  }

  const navigateToMainView = () => {
    navigate('/');
  }

  const navLinks: NavRoute[] = [
    { text: 'Pacientes', route: '/pacientes' },
    { text: 'Citas', route: '/citas' }
  ];

  return (
    <div>
      <Navbar color="success" dark>
        <NavbarBrand onClick={navigateToMainView} className="brand">Centro Nutricional Lavoisier</NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse navbar isOpen={!collapsed}>
          <Nav navbar>
            {
              navLinks.map(({ route, text }, index) => (
                <NavItem key={index}>
                  <NavLink to={route} className={({isActive}) => `link ${isActive && "active"}`}>{text}</NavLink>
                </NavItem>
              ))
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}