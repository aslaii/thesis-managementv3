import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "src/utils/firebase"; // Adjust the path as necessary
import { firestore } from "src/utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false, // Add isLoading state
  initialAuthCheckDone: false,

  register: async (email, password, name) => {
    set({ isLoading: true }); // Set loading to true at the start
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const createdAt = new Date();

      // Create a user document in Firestore
      const userDocRef = doc(firestore, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        email: email,
        name: name,
        createdAt: createdAt,
        // add other user details you might need
      });

      const user = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        name: name,
      };
      set({ user, isAuthenticated: true, isLoading: false }); // Set loading to false after operation
    } catch (error) {
      set({ isLoading: false }); // Ensure loading is set to false on error
      throw error;
    }
  },

  login: async (email, password) => {
    console.log("Attempting to log in with email:", email); // Add this
    set({ isLoading: true }); // Set loading to true at the start
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User credential:", userCredential); // Add this

      const userDocRef = doc(firestore, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const user = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        name: userData.name,
        email: userData.email,
      };
      console.log("User data:", user); // Add this
      set({ user, isAuthenticated: true, isLoading: false }); // Set loading to false after operation
    } catch (error) {
      console.log("Error logging in:", error); // Add this
      set({ isLoading: false }); // Ensure loading is set to false on error
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true }); // Set loading to true at the start
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false, isLoading: false }); // Set loading to false after operation
    } catch (error) {
      set({ isLoading: false }); // Ensure loading is set to false on error
      throw error;
    }
  },
  initializeAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        set({ isAuthenticated: true, user });
      } else {
        // User is signed out
        set({ isAuthenticated: false, user: null });
      }
      set({ initialAuthCheckDone: true });
    });
  },
}));

export default useAuthStore;
