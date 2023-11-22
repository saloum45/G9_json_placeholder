import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Attributs
  userEmail: any;
  userPass: any;
  constructor(private user: UserService, private route:Router) {

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
        this.route.navigate(['article',reponse[0].id]);
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

