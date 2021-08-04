import React, { Component } from 'react';
import { Shell } from '@carbon/ibm-security';
import './menu.scss';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
// import ReactPiwik from 'react-piwik';
// import filteredMenu from './menuFilter';

class Menu extends Component {
  /**
   * TODO: Remove closeMenu and NavLinks from title properties after @carbon/ibm-security refactor Shell component
   * Currently Shell component doesn't support custom elements as links.
   * It couse some problems because we are using NavLink from react-router-dom to navigate on our app.
   * When we used current shell implementation -
   * using href we end it up refreshing the whole page after clicking on a menu item
   * Workaround for that is passing NavLink component to title properties. But there are some problems with that:
   *  - it creates wrong HTML structure <a> tag inside <a> tag
   *  - after clicking on menu item the menu does't close automatically - that is the purpose of closeMenu function
   *  - it breaks style - that is the purpose of complex selectors in menu.scss
   *  - there is no indicator on which tab user is - blue strap
   *  https://pages.github.ibm.com/security/carbon-addons-security/branch/v2/?path=/story/patterns-shell--default
   */

  static closeMenu() {
    document.querySelector('.security--toolbar__button--active.security--button--icon--active').click();
  }

  static getDerivedStateFromProps(props) {
    const { displayDemoBanner, isBannerVisible } = props;
    const securityShell = document.querySelector('.security--shell');
    if (securityShell) {
      if (isBannerVisible || displayDemoBanner) {
        securityShell.classList.add('security--shell--banner-visible');
      } else {
        securityShell.classList.remove('security--shell--banner-visible');
      }
    }
    return null;
  }

  render() {    
    const { customerContactId } = this.props;

    const navigationMenu = [];    

    return (
      <Shell
        header={{
          labels: {
            brand: {
              company: 'IBM',
              product: 'Security Services'
            },
            notifications: {},
            profile: {
              account: 'Account',
              button: 'Toggle profile',
              edit_profile: 'Edit profile',
              sign_out: 'Sign out'
            }
          },
          links: {
            sign_out: '/api/logout',
            edit_profile: `https://portal.sec.ibm.com/mss/user/profile.mss?userId=${customerContactId}`
          }
        }}
        profile={{
          image_url: null,
          name: {
            first_name: 'Test',
            surname: 'User'
          },
          email: 'test@test.com'
        }}
        toolbar={{
          labels: {
            menu: {
              button: 'Toggle menu',
              tooltip: 'Menu'
            },
            settings: {
              button: 'Toggle settings',
              tooltip: 'Settings'
            },
            support: {
              button: 'Toggle support',
              tooltip: 'Support'
            }
          },
          menu: navigationMenu,
          settings: [],
          support: []
        }}
      />
    );
  }
}

Menu.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  customerContactId: PropTypes.string,
  displayDemoBanner: PropTypes.bool,
  isBannerVisible: PropTypes.bool
};

export default Menu;
