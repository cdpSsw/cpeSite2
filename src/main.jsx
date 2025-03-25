import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'

// users

import User_Main from './users/User_Main';

// ..homepages
import Homepages from './users/Homepages';
import SignInUp from './users/pages/SignInUp';
import Activities from './users/pages/pActivities';
import Contact from './users/pages/Contact';

// admin
import AMain from './admin/AMain';

const router = createHashRouter([
  // { path: '/', element: <Homepages /> },
  { path: '/', element: <User_Main /> },
  // { path: '/', element: <AMain /> },
  { path: '/SignInUp', element:   <SignInUp /> },
  { path: '/Activities', element: <Activities /> },
  { path: '/Contact', element: <Contact /> },
]);

const App = () => {
  return(
    <RouterProvider router={router}></RouterProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
