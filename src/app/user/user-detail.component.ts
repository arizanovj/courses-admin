import { Component, OnInit } from '@angular/core';
import { UserService } from '../model/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private sub: any;
  private user : User;
  private id: number;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.setUser(params.id);
      }
    });


  }

  private setUser(id:number){
    let c = this.userService.getUser(id).subscribe(
      result => {
        this.user = result;
      },
      error => {
        console.log(error);
      }

    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
