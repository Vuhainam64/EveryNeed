import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./container";
import { useEffect } from "react";
import { auth } from "./config/firebase.config";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
      } else {
        navigate("/home/auth", { replace: true });
      }
    });
  });
  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <Routes>
        <Route path="/home/*" element={<Home />} />

        {/* If router not matching */}
        <Route path="*" element={<Navigate to={"/home"} />} />
      </Routes>
    </div>
  );
}

export default App;
