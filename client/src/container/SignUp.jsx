import { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithGithub, signInWithGoogle } from "../untils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMessage("Invalid Id : User not found");
          } else if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMessage("Password is incorrect");
          } else {
            setAlert(true);
            setAlertMessage("Temporarity disabled due to many failed login");
          }

          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };
  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        alt="Logo"
        className="object-contain w-32 opacity—50 h-autoobject-contain w—32 opacity—50 h-auto"
      />

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join With Us!</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            lable="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          {/* password */}
          <UserAuthInput
            lable="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {/* aleart section  */}
          <AnimatePresence>
            {alert && (
              <motion.p
                key={"Alert Message"}
                {...fadeInOut}
                className="text-red-500"
              >
                {alertMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {/* login button  */}
          {!isLogin ? (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          )}

          {/* account text section  */}

          {isLogin ? (
            <p className="text-primaryText flex items-center justify-center gap-3">
              Already Have an account !
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-primaryText flex items-center justify-center gap-3">
              Doesn't Have an account !
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          {/* or section  */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(2566,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(2566,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(2566,256,256,0.2)] rounded-md w-24"></div>
          </div>

          {/* sign in with google  */}
          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(2566,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(2566,256,256,0.4)] cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign In With Google</p>
          </motion.div>

          {/* sign in with github */}
          <motion.div
            onClick={signInWithGithub}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(2566,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(2566,256,256,0.4)] cursor-pointer"
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign In With Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
