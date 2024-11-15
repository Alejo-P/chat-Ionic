import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User | null = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = { uid: user.uid, email: user.email! };
      } else {
        this.currentUser = null;
      }
    });
  }

  async signup({ email, password }: { email: string; password: string }): Promise<void> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = credential.user;
    const uid = user?.uid;

    if (uid && user) {
      await this.afs.doc(`users/${uid}`).set({
        uid,
        email: user.email,
      });
    }
  }

  signIn({ email, password }: { email: string; password: string }): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  addChatMessage(msg: string): Promise<void> {
    if (!this.currentUser) {
      throw new Error('No current user available to send a message.');
    }

    return this.afs.collection('messages').add({
      msg: msg,
      from: this.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {});
  }

  getChatMessages(): Observable<Message[]> {
    let users: User[] = [];

    return this.getUsers().pipe(
      switchMap((res) => {
        users = res;
        return this.afs.collection<Message>('messages', (ref) =>
          ref.orderBy('createdAt')
        ).valueChanges({ idField: 'id' });
      }),
      map((messages) => {
        return messages.map((m) => ({
          ...m,
          fromName: this.getUserForMsg(m.from, users),
          myMsg: this.currentUser?.uid === m.from,
        }));
      })
    );
  }

  private getUsers(): Observable<User[]> {
    return this.afs.collection<User>('users').valueChanges({ idField: 'uid' });
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