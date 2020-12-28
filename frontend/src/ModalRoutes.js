import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ModalProduct from './screens/ModalProduct';

import MuiModal from './components/MuiModal';

import { ModalSwitch, ModalRoute } from "react-router-modal-gallery";

const routes = [
  
  {
    defaultParentPath: '/',
    modal: true,
    path: '/product/:id/:pid',
    component: ModalProduct
  },
  
  // {
  //   path: '*',
  //   // eslint-disable-next-line
  //   render: () => <Redirect to="/product/:id" />
  // }
];

const modalRoutes = routes
  .filter(route => route.modal)
  .map(route => <ModalRoute key={route.path} {...route} />);

const Routes = () => (
  <ModalSwitch
    renderModal={({ open, redirectToBack }) => (
      <MuiModal open={open} scroll="body" onExited={redirectToBack}>
        {modalRoutes}
      </MuiModal>
    )}
  >
    {routes.map(route =>
      route.modal ? (
        <ModalRoute key={route.path} {...route} />
      ) : (
        <Route key={route.path} {...route} />
      )
    )}
  </ModalSwitch>
);

export default Routes;
