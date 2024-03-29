import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

// Initialize Firestore
const firestore = getFirestore();

// Collection reference
const thesisCollection = collection(firestore, "thesis");

// Add a thesis
const addThesis = async ({
  year,
  term,
  program,
  course_code,
  section,
  course_coordinator,
  group_code,
  topic_title,
  group_members,
  advisers,
  panel_members,
  status = "",
  remarks = "",
  progress = 0,
}) => {
  const createdAt = new Date();
  const updatedAt = new Date();
  try {
    const docRef = await addDoc(thesisCollection, {
      year,
      term,
      program,
      course_code,
      section,
      course_coordinator,
      group_code,
      topic_title,
      group_members,
      advisers,
      panel_members,
      status,
      remarks,
      progress,
      created_at: createdAt,
      updated_at: updatedAt,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Delete a thesis
const deleteThesis = async (id) => {
  const docRef = doc(thesisCollection, id);
  try {
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};

// Edit a thesis
const editThesis = async (id, updatedFields) => {
  const docRef = doc(thesisCollection, id);
  updatedFields.updated_at = new Date();
  try {
    await updateDoc(docRef, updatedFields);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// View a thesis
const viewThesis = async (id) => {
  const docRef = doc(thesisCollection, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

const viewAllThesisRealtime = (callback) => {
  const q = query(collection(firestore, "thesis"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const theses = [];
    querySnapshot.forEach((doc) => {
      theses.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().created_at
          ? new Date(doc.data().created_at.seconds * 1000).toLocaleDateString()
          : "N/A",
      });
    });
    callback(theses);
  });

  return unsubscribe;
};

// Exporting the functions
export { viewAllThesisRealtime, addThesis, deleteThesis, editThesis, viewThesis };
