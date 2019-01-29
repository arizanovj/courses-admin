import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { UserService } from '../model/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../model/config.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private userForm: FormGroup;
  private user: User;
  private id: number;
  private sub: any;
  private context = 'create';
  private showPasswordFields = true;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private router: Router
  ) {
    
   }

  ngOnInit() {
    this.initUser();
   
    this.sub = this.route.params.subscribe(params => {
      this.context =  this.route.snapshot.data['context'];
      if (this.context == 'update') {
        this.setUser(+params.id);
        this.id = +params.id;
        this.showPasswordFields = false;
      }
    });

    this.createForm();
    
    
  }

  private initUser() {
    this.user = new User();
    this.user.first_name = "";
    this.user.last_name = "";
    this.user.email = "";
    this.user.is_admin = false;
  }
  private setUser(id: number) {
    let c = this.userService.getUser(id).subscribe(
      result => {
        this.user = result;
      },
      error => {
       
      }

    );
  }

  private createForm() {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password:  this.context == 'create' ? ['',[Validators.required, Validators.minLength(6)]] :[],
      password_repeat:  this.context == 'create' ?  ['',[Validators.required,this.passConfirmValidation]] :[],
      is_admin: this.context == 'create' ? [false, Validators.required] : '',
    });
  }

  private passConfirmValidation(c: AbstractControl): any {
    if(!c.parent || !c) return;
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('password_repeat');

    if(!pwd || !cpwd) return ;
    if (pwd.value !== cpwd.value) {
        return { invalid: true };
    }
}

  private createUser() {
    if (this.userForm.valid) {
    
      this.userService.createUser(this.user).subscribe(
        result => {
          this.router.navigate(['/users/', result.data]);
        },
        error => {
          console.log(error);
        }
      );;
    }
  }

  private updateUser(id: number) {
    if (this.userForm.valid) {
      console.log(this.user);
      this.userService.updateUser(this.user).subscribe(
        result => {
         // this.router.navigate(['/users/', this.user.id]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  private updatePassword(){
    this.showPasswordFields = !this.showPasswordFields;
    if(this.showPasswordFields === true){
      this.password.setValidators([Validators.required, Validators.minLength(6)]);
      this.passwordRepeat.setValidators([Validators.required,this.passConfirmValidation]);
    }else{
      this.password.clearValidators();
      this.passwordRepeat.clearValidators();
    }
    this.password.updateValueAndValidity();
    this.passwordRepeat.updateValueAndValidity();
  }

  get firstName() { return this.userForm.get("first_name")}
  get lastName() { return this.userForm.get("last_name")}
  get email() { return this.userForm.get("email")}
  get password() { return this.userForm.get('password'); } 
  get passwordRepeat() { return this.userForm.get('password_repeat'); } 

  private setIsAdmin(value){
    this.user.is_admin = value;
  }


}
