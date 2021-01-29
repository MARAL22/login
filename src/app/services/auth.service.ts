import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user';
import firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLogged: any = false;
    constructor(public afAuth: AngularFireAuth,
                private afsAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => (this.isLogged = user));
    }

    // Register

    async onRegister(user: User){
        try {
            return await this.afAuth.createUserWithEmailAndPassword(
                user.email,
                user.password
            );
        } catch (error) {
            console.log('error on register', error);
        }
    }

    // Login

    async onLogin(user: User){
        try {
            return await this.afAuth.signInWithEmailAndPassword(
                user.email,
                user.password
            );
        } catch (error){
            console.log('error on login', error);
        }
    }

    loginGitUser(){
        return this.afsAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
    loginGoogleUser(){
        return this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    loginFaceebookUser(){
        return this.afsAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    loginTwitterUser(){
        return this.afsAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
}
