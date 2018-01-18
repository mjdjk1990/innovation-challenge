import { Directive, Input, ElementRef } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { Subscription } from 'rxjs/Subscription';
import { Profile } from '../../models/profile/profile.interface';

@Directive({
  selector: '[user]' // Attribute selector
})
export class UserDirective {
  @Input('user') user: string;
  subscriber: Subscription;

  constructor(private data: DataService, private el: ElementRef) {
  }

  ngOnInit() {
    let html = this.el.nativeElement;
    this.subscriber = this.data.getUserProfile(this.user).subscribe((profile: Profile) => {
      html.innerHTML = `${profile.firstName} ${profile.lastName}`;
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
