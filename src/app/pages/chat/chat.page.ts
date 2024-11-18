import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app'; 
import { Message } from '../../services/chat.service';// Importa firebase correctamente

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  messages!: Observable<any[]>;
  newMsg = '';

  constructor(
    private chatService: ChatService,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }

  sendMessage() {
    if (this.newMsg.trim() === '') return;

    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  async sendLocation() {
    try {
      const location = await this.locationService.getCurrentLocation();
      if (location) {
        const locationMessage: Partial<Message> = {
          msg: null,
          isLocation: true,
          location,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Asegúrate de usar firebase correctamente
          fromName: 'Usuario',
        };

        await this.chatService.addChatMessage(locationMessage);
        this.content.scrollToBottom();
        console.log('Ubicación enviada:', locationMessage);
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}
