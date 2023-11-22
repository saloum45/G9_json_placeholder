import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Attributs
  userEmail: any;
  userPass: any;
  constructor(private user: UserService) {

  }
  ngOnInit(): void {
    // this.user.getUser(user)
  }

  login() {
    this.user.getUser(this.userEmail, (reponse: any[]) => {
      if (reponse.length != 0) {
        // alert('okay');
        this.sweetMessage('success','Bienvenue','Connexion faite avec succès');
        localStorage.setItem('userOnline',JSON.stringify(reponse));
      } else {
        // alert('pas okay');
        this.sweetMessage('error','Désolé','le mail ou pass incorrect');
      }
      console.log(reponse)
    })
  }
  
  sweetMessage(icon:any,title:any,text:any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

}

