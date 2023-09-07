import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithRedirect
} from "firebase/auth";
import {
    auth
} from "../config/firebase.config";

const googleProider = new GoogleAuthProvider()
const githubProider = new GithubAuthProvider()

export const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProider).then(useCred => {
        window.location.reload()
    })
}

export const signInWithGithub = async () => {
    await signInWithRedirect(auth, githubProider).then(useCred => {
        window.location.reload()
    })
}