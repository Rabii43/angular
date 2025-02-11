import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/Mailing/shared/Service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  errorMessage2 = '';


  profileForm!: FormGroup;
  pwdPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
  mobnumPattern = "^((\\+216-?)|0)?[0-9]{8}$"; 
  constructor(private ser: AuthentificationService,
   
    private router: Router, private route: ActivatedRoute,private toastr: ToastrService ) { 
    } 
  ngOnInit(): void {

    this.profileForm = new FormGroup({
       'Email': new FormControl(null,[Validators.required,Validators.email]),
    
        'password': new FormControl(null,[Validators.required,Validators.required]),
   
    });
  }
  onSubmit()
  {
 
    this.ser.login(this.profileForm.value.Email,this.profileForm.value.password).subscribe(
      
      res =>{
      this.ser.saveToken(res.accessToken);
      this.toastr.success("Welcom");
        
      },err=>   
           { this.errorMessage = err.error.message;
          this.errorMessage2="Please Verifier Password or Email";
          this.toastr.error( this.errorMessage2);

          
          
          
          }
           );
  }
}
