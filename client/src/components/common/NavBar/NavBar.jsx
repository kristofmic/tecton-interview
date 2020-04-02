import React from 'react';

import { CSSTransition } from 'react-transition-group';

import IconButton from '../IconButton';
import Logo from '../Images/Logo';

import useBodyClassToggle from '../../../hooks/useBodyClassToggle';
import useToggle from '../../../hooks/useToggle';

if (process.env.BROWSER) {
  require('./NavBar.scss');
}

function NavBar() {
  const [isMobileNavVisible, , showMobileNav, hideMobileNav] = useToggle(false);
  const [hideBodyOverflow, showBodyOverflow] = useBodyClassToggle('overflow-hidden');
  const dismissMobileNav = React.useCallback(() => {
    showBodyOverflow();
    hideMobileNav();
  }, [hideMobileNav, showBodyOverflow]);
  const displayMobileNav = React.useCallback(() => {
    hideBodyOverflow();
    showMobileNav();
  }, [showMobileNav, hideBodyOverflow]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="#">
        <Logo />
      </a>

      <IconButton
        className="navbar-toggler border-0"
        icon="icon-menu-left-right"
        onClick={displayMobileNav}
        tooltipDisabled
      />

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">{/* NavLink */}</li>
        </ul>
      </div>

      <CSSTransition classNames="mobile-nav" in={isMobileNavVisible} timeout={200}>
        <div className="navbar-nav mobile-nav">
          <IconButton
            className="navbar-toggler border-0"
            icon="icon-clear"
            onClick={dismissMobileNav}
            tooltipDisabled
          />
          <ul className="list-unstyled">
            <li className="nav-item mb-4">{/* NavLink */}</li>
          </ul>

          <a className="navbar-brand" href="#" onClick={dismissMobileNav}>
            <Logo className="text-muted small" />
          </a>
        </div>
      </CSSTransition>
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
