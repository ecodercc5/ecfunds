export const data = <T>(snap: FirebaseFirestore.QuerySnapshot<T>): T[] => {
  return snap.docs.map((doc) => doc.data());
};
