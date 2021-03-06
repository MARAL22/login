import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: User = new User();

    constructor(private router: Router,
                private authSvc: AuthService,
                private alertCtrl: AlertController,
                private authService: AuthService) {
    }

    ngOnInit() {
    }

    // Logueo nornmal
    async onLogin() {
        const user = await this.authSvc.onLogin(this.user);
        if (user) {
            console.log('successfully logged user');
            await this.router.navigateByUrl('/tabs/tab1');
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Datos incorrectos',
                message: 'Los datos son incorrectos',
                buttons: [{
                    text: 'salir'
                }]
            });
            await alert.present();
        }
    }

    // Con Google

    onLoginGoogle(): void {
        this.authService.loginGoogleUser().then((res) => {
            this.onLoginRedirect();
        }).catch(err => console.log('err', err.message));
    }

    // Con GIT

    onLoginGit(): void {
        this.authService.loginGitUser().then((res) => {
            this.onLoginRedirect();
        }).catch(err => console.log('err', err.message));
    }

    onLoginFb(): void {
        this.authService.loginFaceebookUser().then((res) => {
            this.onLoginRedirect();
        }).catch(err => console.log('err', err.message));
    }

    onLoginTw(): void {
        this.authService.loginTwitterUser().then((res) => {
            this.onLoginRedirect();
        }).catch(err => console.log('err', err.message));
    }



    onLoginRedirect(): void{
        this.router.navigate(['/tabs/tab1']);
    }
}
