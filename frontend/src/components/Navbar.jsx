import { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import { LanguageContext } from '@src/App';
import { useWindowsWidth, translation } from '@utils/Helpers';
import { availableLanguages } from '@utils/Constants';
import '@styles/navbar.css'

import plFlag from '@assets/flags/pl.svg';
import deFlag from '@assets/flags/de.svg';
import gbFlag from '@assets/flags/gb.svg';
import usFlag from '@assets/flags/us.svg';

function NavBar(props) {
  const urlRelative = window.location.pathname;
  const flagList = { 'en-GB': gbFlag, 'de-DE': deFlag, 'en-US': usFlag, 'pl-PL': plFlag }
  
  const toggle = () => setIsOpen(!isOpen);
  const [ isOpen, setIsOpen ] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);


  function switchLanguage(languageCode) {
    setLanguage(languageCode);
    Cookie.set('language', languageCode, { expires: 365 })
  };

  function renderLanguageDropdownMenuContent(flagIndex) {
    const availableLanguage = availableLanguages[language][flagIndex];
    return (
      <>
        <img src={flagList[availableLanguage]} className='flag' alt='' />
        <span className='flag-span-collapse'>
          {translation(language, `transl.navbar.language.${availableLanguage}`)}
        </span>
      </>
    );
  }

  return (
    <div>
      <Navbar {...props} className='navbar-container'>
        <NavbarBrand tag={Link} to='/'>Taxidermy Poland</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='me-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/'>{translation(language, 'transl.navbar.home')}</NavLink>
            </NavItem>
            {
              urlRelative !== '/' && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {translation(language, 'transl.navbar.products')}
                </DropdownToggle>
                <DropdownMenu end className='navbar-dropdown-menu'>
                  <DropdownItem tag={Link} to='/products/roe-deer' className='navbar-dropdown-item-text'>{translation(language, 'transl.navbar.products.roe.deer')}</DropdownItem>
                  <DropdownItem tag={Link} to='/products/wild-boar' className='navbar-dropdown-item-text'>{translation(language, 'transl.navbar.products.wild.boar')}</DropdownItem>
                  <DropdownItem tag={Link} to='/products/predators' className='navbar-dropdown-item-text'>{translation(language, 'transl.navbar.products.predators')}</DropdownItem>
                  <DropdownItem tag={Link} to='/products/red-deer' className='navbar-dropdown-item-text'>{translation(language, 'transl.navbar.products.red.deer')}</DropdownItem>
                  <DropdownItem tag={Link} to='/products/skins' className='navbar-dropdown-item-text'>{translation(language, 'transl.navbar.products.skins')}</DropdownItem>
                  <DropdownItem tag={Link} to='/products/others' className='navbar-dropdown-item-text'>{translation(language, 'transl.navbar.products.others')}</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              )
            }
            <NavItem>
              <NavLink tag={Link} to='/about-me'>
              {translation(language, 'transl.navbar.about.me')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/purchase-payment'>
              {translation(language, 'transl.navbar.purchase.payment')}
              </NavLink>
            </NavItem>
						<NavItem>
              <NavLink tag={Link} to='/shipping'>
              {translation(language, 'transl.navbar.shipping')}
              </NavLink>
            </NavItem>
						<NavItem>
              <NavLink tag={Link} to='/contact'>
              {translation(language, 'transl.navbar.contact')}
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className={useWindowsWidth() >= 992 ? 'active-flag' : ''}>
              <DropdownToggle nav caret className={useWindowsWidth() >= 992 ? 'active-flag' : ''}>
                <img src={flagList[language]} className='flag' alt='' />
              </DropdownToggle>
              <DropdownMenu end className='navbar-dropdown-menu'>
                <DropdownItem className='navbar-dropdown-item-text' onClick={() => switchLanguage(availableLanguages[language][0])}>
                  {renderLanguageDropdownMenuContent(0)}
								</DropdownItem>
                <DropdownItem className='navbar-dropdown-item-text' onClick={() => switchLanguage(availableLanguages[language][1])}>
                  {renderLanguageDropdownMenuContent(1)}
								</DropdownItem>
                <DropdownItem className='navbar-dropdown-item-text' onClick={() => switchLanguage(availableLanguages[language][2])}>
                  {renderLanguageDropdownMenuContent(2)}
								</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;