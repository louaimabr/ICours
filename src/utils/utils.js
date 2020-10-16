import { firestore } from "../firebase";

//Prendre les info depuis la bd et set le state dans app pour synchroniser les duex
export const setMatiereDB = async (user, setState) => {
  return await firestore
    .collection("users")
    .doc(user.uid)
    .collection("matieres")
    .get()
    .then((snap) => {
      const matieresLecon = [];
      snap.docs.map((s) => {
        const data = s.data();
        matieresLecon.push(data);
        return null;
      });
      return matieresLecon;
    })
    .then((matieresLecon) => setState(matieresLecon));
};

//Ajouter une nouvelle leçon (utiliser dans form.tsx)
export const addLeçon = async (newCourse, matiereState, user) => {
  const matiereToAdd = matiereState.find(
    (m) => m.matiere === newCourse.matiere
  );
  firestore
    .collection("users")
    .doc(user.uid)
    .collection("matieres")
    .doc(newCourse.matiere)
    .set(matiereToAdd);
};
export const setLeçon = async (matiereToSet, user) => {
  await firestore
    .collection("users")
    .doc(user.uid)
    .collection("matieres")
    .doc(matiereToSet.matiere)
    .set(matiereToSet);
};
export const deleLeçon = async (matiereDelTitle,matiereLecon, user) =>{
  let index = matiereLecon.leçon.findIndex(l=> l.titre === matiereDelTitle)
  matiereLecon.leçon.splice(index, 1)
  await firestore
    .collection("users")
    .doc(user.uid)
    .collection("matieres")
    .doc(matiereLecon.matiere)
    .set(matiereLecon)
}
