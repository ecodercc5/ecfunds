import { admin, firestore } from "../modules/firebase";

export interface ModelArgs {
  id?: string;
}

export abstract class Model {
  id: string;

  constructor(id?: string | undefined) {
    this.id = id ? id : this.generateId();
  }

  private generateId() {
    return firestore.collection("asdf").doc().id;
  }
}

type Constructor<T> = new (...args: any[]) => T;

export const createCollection = <T extends Model>(
  collectionName: string,
  model: Constructor<T>
) => {
  const converter = {
    toFirestore: (data: T) => {
      const { id, ...rest } = data;

      return { ...rest };
    },

    fromFirestore: (snapshot: admin.firestore.QueryDocumentSnapshot) => {
      const data = snapshot.data();

      return new model({ ...data, id: snapshot.id });
    },
  };

  return firestore.collection(collectionName).withConverter(converter);
};
