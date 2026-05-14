import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, isValidConfig } from "./firebase";

export const fetchMenuItems = async () => {
  if (!isValidConfig) return null; // Return null so UI can fallback to mock data
  try {
    const querySnapshot = await getDocs(collection(db, "menu_items"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return null;
  }
};

export const fetchSettings = async () => {
  if (!isValidConfig) return null;
  try {
    const docRef = doc(db, "config", "settings");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};
