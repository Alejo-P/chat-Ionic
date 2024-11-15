import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

  ngOnInit() {
  }

}
