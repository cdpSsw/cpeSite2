import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'

// users
// ..homepages
import Homepages from './users/Homepages';
import Activities from './users/pages/pActivities';
import Contact from './users/pages/Contact';

// admin
import AMain from './admin/AMain';

const router = createHashRouter([
  { path: '/', element: <Homepages /> },
  // { path: '/', element: <AMain /> },
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
