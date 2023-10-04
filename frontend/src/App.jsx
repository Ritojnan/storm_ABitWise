import "./App.css"
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'


// pages
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Faq from './pages/help/Faq.jsx'
import Contact, { contactAction } from './pages/help/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import Careers, { careersLoader } from './pages/careers/Careers'
import CareerDetails, { careerDetailsLoader } from "./pages/careers/CareerDetails"
import CareersError from './pages/careers/CareersError'

// layouts
import RootLayout from './layouts/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import CareersLayout from './layouts/CareersLayout.jsx'
import Signup from "./components/Signup"
import Finder from "./components/Finder"
// import Dashboard from "./components/Dashboard"

// layouts and pages
import Dashboard from './pages/Dashboard'
import Reviews from './pages/Reviews'
import Profile from './pages/Profile'
import Calendar from './pages/Calendar'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      

      <Route index element={<Dashboard />} />
      <Route path="reviews" element={<Reviews/>} />
      <Route path="profile" element={<Profile />} />
      
      <Route path="calendar" element={<Calendar />} />
      
      <Route path="about" element={<About />} />
      <Route path="authenticate" element={<Signup/>} />
      <Route path="doctors" element={<Finder/>} />
      <Route path="reports" element={<Dashboard/>} />
      <Route path="bookappointment" element={<About />} />
      <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact/>} action={contactAction} />
      </Route>
      <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
        <Route 
          index 
          element={<Careers />} 
          loader={careersLoader}
          // errorElement={<CareersError />}
        />
        <Route 
          path=":id" 
          element={<CareerDetails />}
          loader={careerDetailsLoader}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App