import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home, NewProject } from "./container";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase.config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import { SET_PROJECT } from "./context/actions/projectActions";

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

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );

    const unsubscribe = onSnapshot(projectQuery, (querySnaps) => {
      const projectsList = querySnaps.docs.map((doc) => doc.data());
      dispatch(SET_PROJECT(projectsList));

      return unsubscribe;
    });
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
            <Route path="/newProject" element={<NewProject />} />

            {/* If router not matching */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
