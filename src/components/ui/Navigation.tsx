import React, { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { NavRoute } from '../../types/ui';
import { initLogout } from '../../helpers/auth';

export const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, rol, ] = pathname.split('/');
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  }

  const navigateToMainView = () => {
    navigate(`/${rol}/citas`);
  }

  const handleLogout = () => {
    initLogout();
    window.location.reload();
  }

  const generalLinks: NavRoute[] = [
    { text: 'Pacientes', route: `/${rol}/pacientes` },
    { text: 'Citas', route: `/${rol}/citas` },
  ];

  const navLinks: NavRoute[] = rol === 'nutriologo' ? [...generalLinks, { text: 'Historial Clinico', route: `/${rol}/historial-clinico` }]
                              : [...generalLinks, { text: 'Pagos', route: `/${rol}/pagos` }];
 
  return (
    <div>
      <Navbar color="success" dark>
        <div className='navbar'>
          <img src={'/assets/menu.svg'} className='menuIcon' onClick={toggleMenu} alt=''/>
          <NavbarBrand onClick={navigateToMainView} className="brand">Centro Nutricional Lavoisier</NavbarBrand>
        </div>
        <Offcanvas isOpen={collapsed} toggle={toggleMenu} fade={true} backdrop={true} scrollable={false}>
          <OffcanvasHeader toggle={toggleMenu}>
            Centro Nutricional Lavoisier
          </OffcanvasHeader>
          <OffcanvasBody>
            {
              navLinks.map(({ route, text }, index) => (
                <ul key={index}>
                  <NavLink to={route} className={({isActive}) => `link ${isActive && "active"}`}>{text}</NavLink>
                </ul>
              ))
            }
            <Button className='logoutButton' color='danger' onClick={handleLogout}>Salir</Button>
          </OffcanvasBody>
        </Offcanvas>
      </Navbar>
    </div>
  )
}