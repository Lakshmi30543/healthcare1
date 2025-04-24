import { BrowserRouter } from "react-router-dom";
import NavBar from "./HomePages/Navbar";
import AdminNavBar from "./AdminPages/AdminNavbar";
import PatientNavBar from "./PatientPages/PatientNavBar";
import DoctorNavBar from "./DoctorPages/DoctorNavbar";
import { AuthProvider, useAuth } from "./context/AuthContext";


function AppContent() {
  const { isAdminLoggedIn, isPatientLoggedIn, isDoctorLoggedIn } = useAuth();

  return (
    <div>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isPatientLoggedIn ? (
          <PatientNavBar />
        ) : isDoctorLoggedIn ? (
          <DoctorNavBar />
        ) : (
          <NavBar/>
        )}
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
