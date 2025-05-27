import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { useState, useEffect } from 'react';
import { db } from '../firebase/connection';
 
export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    const auth = getAuth()
 
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }
    //método para criar o usuário
    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);
 
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth, data.displayEmail, data.displayPassword
            )
 
            await updateProfile(user, {
                displayName: data.displayName
            })
            return user
        }
        catch (error) {
            let systemErrorMessage;
            if (error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            }
            else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado";
            }
            else {
                systemErrorMessage = "Ocorreu um erro - Tente Novamente";
            }
            setError(systemErrorMessage);
        } finally{}
        setLoading(false);
    }
 
    useEffect (() => {
        return()  => setCancelled(true);
      },[]);
 
      return {
        auth,
        createUser,
        error,
        loading,
      }
}
 