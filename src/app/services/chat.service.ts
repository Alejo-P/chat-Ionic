import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.firestore.FieldValue | null;
  id?: string;
  from: string;
  msg: string | null;  // Mensaje opcional, puede ser texto o vacío si es ubicación
  fromName: string;
  myMsg: boolean;
  isLocation?: boolean;
  location?: { latitude: number; longitude: number };
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  async signup({ email, password }: { email: string; password: string }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

    const uid = credential.user?.uid;

    return this.afs.doc(`users/${uid}`).set({
      uid,
      email: credential.user?.email,
    });
  }

  signIn({ email, password }: { email: string; password: string }): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  /**
   * Agrega un mensaje al chat, ya sea texto o ubicación.
   * @param message Puede ser un string o un objeto de tipo `Message`.
   */
  addChatMessage(message: string | Partial<Message>) {
    const chatMessage = typeof message === 'string' 
      ? {
          msg: message,
          from: this.currentUser?.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          isLocation: false,
        }
      : {
          ...message,
          from: this.currentUser?.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

    return this.afs.collection('messages').add(chatMessage);
  }

  getChatMessages() {
    let users: User[] = [];
    return this.getUsers().pipe(
      switchMap((res) => {
        users = res;
        return this.afs
          .collection('messages', (ref) => ref.orderBy('createdAt'))
          .valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map((messages) => {
        // Get the real name for each user
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser?.uid === m.from;
        }
        return messages;
      })
    );
  }

  private getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  private getUserForMsg(msgFromId: string, users: User[]): string {
    for (let usr of users) {
      if (usr.uid === msgFromId) {
        return usr.email;
      }
    }
    return 'Deleted';
  }
}
