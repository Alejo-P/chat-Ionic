import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  messages!: Observable<Message[]>;
  newMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService
  ) { }
  
  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
    this.messages.subscribe(() => {
      setTimeout(() => {
        this.content.scrollToBottom(200);
      });
    });
  }

  async sendMessage() {
    await this.chatService.addChatMessage(this.newMsg);
    this.newMsg = '';
  }

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}
}
