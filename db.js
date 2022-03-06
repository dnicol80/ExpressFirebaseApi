import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getDoc,
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCnt-aumsDga8GlxwsUyY5UCC0jpOK5apc",
  authDomain: "listacompras-f5632.firebaseapp.com",
  projectId: "listacompras-f5632",
});

const db = getFirestore();

export async function saveProductos(rec_id, desc, show) {
  try {
    await setDoc(doc(db, "productos", "" + rec_id), {
      descripcion: desc,
      mostrar: show,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export async function getProductos(id) {
  const docRef = doc(db, "productos", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
}

export async function getAllProducts() {
  var results = [];
  const querySnapshot = await getDocs(collection(db, "productos"));

  querySnapshot.forEach((doc) => {
    var result = {};
    result.id = doc.id;
    result.descripcion = doc.data().descripcion;
    result.mostrar = doc.data().mostrar;
    results.push(result);
  });
  return results;
}

export async function updateProduct(id, descripcion, mostrar) {
  const productRef = doc(db, "productos", "" + id);

  try {
    await updateDoc(productRef, {
      descripcion: descripcion,
      mostrar: mostrar,
    });
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
}

export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, "productos", "" + id));
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
}
