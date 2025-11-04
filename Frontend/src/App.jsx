import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./MyComponents/Shared/Home"
import Signup from "./MyComponents/Auth/Signup"
import Login from "./MyComponents/Auth/Login"
import Jobs from "./MyComponents/Shared/Jobs"
import Browse from "./MyComponents/Shared/Browse"
import Profile from "./MyComponents/Shared/Profile"
import JobDescription from "./MyComponents/Shared/JobDescription"
import Companies from "./MyComponents/Admin/Companies"
import CreateCompany from "./MyComponents/Admin/CreateCompany"
import CompanySetup from "./MyComponents/Admin/CompanySetup"
import AdminJobs from "./MyComponents/Admin/AdminJobs"
import CreateJob from "./MyComponents/Admin/CreateJob"
import Applicants from "./MyComponents/Admin/Applicants"
import ProtectedRoute from "./MyComponents/Admin/ProtectedRoute"
import SavedForLater from "./MyComponents/Shared/SavedForLater"
import ChatWidget from "./MyComponents/Shared/ChatWidget"
import RootLayout from "./MyComponents/Shared/RootLayout"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "jobs", element: <Jobs /> },
      { path: "job/description/:id", element: <JobDescription /> },
      { path: "browse", element: <Browse /> },
      { path: "profile", element: <Profile /> },
      { path: "savedForLater", element: <SavedForLater /> },
      { path: "admin/companies", element: <ProtectedRoute><Companies /></ProtectedRoute> },
      { path: "admin/companies/create", element: <ProtectedRoute><CreateCompany /></ProtectedRoute> },
      { path: "admin/companies/:id", element: <ProtectedRoute><CompanySetup /></ProtectedRoute> },
      { path: "admin/jobs", element: <ProtectedRoute><AdminJobs /></ProtectedRoute> },
      { path: "admin/job/create", element: <ProtectedRoute><CreateJob /></ProtectedRoute> },
      { path: "admin/jobs/:id/applicants", element: <ProtectedRoute><Applicants /></ProtectedRoute> },
    ]
  }
]);


function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <ChatWidget />
    </div>
  )
}

export default App