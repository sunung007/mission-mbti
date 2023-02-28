// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSjk3gBQ79dSAZDFwJhipmsprWXh_JItU",
  authDomain: "mission-mbti.firebaseapp.com",
  projectId: "mission-mbti",
  storageBucket: "mission-mbti.appspot.com",
  messagingSenderId: "337035542333",
  appId: "1:337035542333:web:0ac6c7541054c7082ccf54",
  measurementId: "G-7PGW2ZF57V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const loadAllQuestions = async () => {
  let questions = [];
  const snapshot = await getDocs(collection(getFirestore(app), "questions"));
  snapshot.forEach((doc) => {
    questions.push(doc.data());
  });
  return questions;
};

export const saveAllQuestions = async (questions, deletedId) => {
  const db = getFirestore(app);
  const parsedQuestions = questions?.filter((e) => e?.q?.length > 0) || [];

  const getMaxId = async () => {
    const q = query(
      collection(getFirestore(app), "questions"),
      orderBy("id", "desc"),
      limit(1)
    );

    let maxId = -1;
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      maxId = doc.data().id || doc.id;
    });

    return maxId;
  };

  let maxId = await getMaxId();

  const promises = parsedQuestions.map(async (e) => {
    if (e?.id > -1) {
      // 기존 수정
      await setDoc(doc(db, "questions", String(e.id)), e);
    } else {
      // 신규 등록
      maxId += 1;
      await setDoc(doc(db, "questions", String(maxId)), {
        ...e,
        id: maxId,
      });
    }
  });

  await Promise.all(promises);

  if (typeof deletedId === "object" && deletedId?.size > 0) {
    for (let id of deletedId) {
      await deleteDoc(doc(db, "questions", String(id)));
    }
  }
};
