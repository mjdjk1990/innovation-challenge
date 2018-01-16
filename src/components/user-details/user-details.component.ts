import { Component, Input } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-details',
  templateUrl: 'user-details.component.html'
})
export class UserDetailsComponent {

  @Input('uid') uid: string
  profile: Observable<any>;

  constructor(
    private data: DataService
  ) { 
  }

  ngOnInit() {
    this.profile = this.data.getUserProfile(this.uid);
  }

}
