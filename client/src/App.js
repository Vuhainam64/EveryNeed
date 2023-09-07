import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./container";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setDoc(doc(db, "user", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }
    });

    setInterval(() => {
      setIsLoading(false);
    }, 500);

    //clean up the listener evvvent
    return () => unsubscribe();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start">
          <Routes>
            <Route path="/home/*" element={<Home />} />

            {/* If router not matching */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
