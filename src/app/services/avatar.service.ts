import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private auth:Auth, private firestorage: Firestore, private storage: Storage) { }

  getUserProfile(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestorage, `users/${user!.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  async uploadImage(photo: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/MarceloPinzon_KevinCola/${user!.uid}/avatar.webp`;
    console.log(path);
    const storageRef = ref(this.storage, path);
  
    try {
      // Agrega el prefijo 'data:image/webp;base64,' si no está presente
      const base64Data = photo.base64String!.startsWith('data:')
        ? photo.base64String!
        : `data:image/webp;base64,${photo.base64String!}`;
  
      await uploadString(storageRef, base64Data, 'data_url');
      const url = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestorage, `users/${user!.uid}`);
      await setDoc(userDocRef, { avatar: url }, { merge: true });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
}
