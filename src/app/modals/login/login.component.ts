import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'carbon-components-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  open: boolean = false;
  loginForm:FormGroup;
  constructor(
    private auth:AuthService,
    private fb:FormBuilder) {
      this.loginForm = this.fb.group({
        mail : ['',[Validators.required,Validators.email]],
        pw : ['',[Validators.required]]
      })
     }

  ngOnInit(): void {
  }

  closeModal() {
    this.open = false;
  }

  login(){
    this.auth.login(this.loginForm.value.mail,this.loginForm.value.pw).then((res:any)=>{
      console.log(res)
      localStorage.setItem("Bearer_Token", res.token)
      this.closeModal();
    })
  }
}
