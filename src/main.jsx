import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'

// users

import User_Main from './users/User_Main';

// ..homepages
import Homepages from './users/Homepages';
import Activities from './users/pages/pActivities';
import Contact from './users/pages/Contact';

// admin
import A_Main from './admin/A_Main';


// student
import Stu_Main from './student/Stu_Main';

const router = createHashRouter([
  // { path: '/', element: <Homepages /> },
  { path: '/', element: <User_Main /> },
  { path: '/Admin_Dashboard', element: <A_Main /> },
  { path: '/Activities', element: <Activities /> },
  { path: '/Contact', element: <Contact /> },
  { path: '/Stu_Dashboard', element: <Stu_Main /> },
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
