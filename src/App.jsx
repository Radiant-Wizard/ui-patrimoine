import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import Patrimoine from './ChartPatrimoine/Patrimoine';
import PossessionTable from './TablePossession/PossessionTable';
import UpdatePossessionForm from './CRUD/UpdatePossession';
import CreatePossessionForm from './CRUD/createPossession';
const route = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
  },
  {
    path: "/patrimoine",
    element: <Patrimoine/>,
  },
  {
    path: "/possession",
    element: <PossessionTable/>,
  },{
    path: "update-possession",
    element: <UpdatePossessionForm />
  },
  {
    path: "create-possession",
    element: <CreatePossessionForm/>
  }
])

export default route;