import { Fragment } from 'react';

import MainNavigation from './main-navigation';

function Layout(props: any) {
  return (
    <Fragment>
      <MainNavigation />
      {props.children}
    </Fragment>
  );
}

export default Layout;