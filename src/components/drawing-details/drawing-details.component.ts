import { Component, Input } from '@angular/core';
import { Drawing } from '../../models/drawing/drawing.interface';
import { Utilities } from '../../shared/utilities';
import { GuessStatus } from '../../models/guess/guess-status.interface';
import { DataService } from '../../providers/data.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'drawing-details',
  templateUrl: 'drawing-details.component.html'
})
export class DrawingDetailsComponent {
  @Input('drawing') drawing: Drawing;

  guessStatus: GuessStatus;
  subscriber;

  constructor(private data: DataService, private auth: AuthService) {
  }

  fromNow(date: string) {
    return Utilities.fromNow(date);
  }

  ngOnInit() {
    this.data.getGuessStatus(this.drawing, this.auth.uid).subscribe((status: GuessStatus) => {
      this.guessStatus = status;
    });
  }

  ngOnDestroy() {
    //this.subscriber.unsubscribe();
  }

}
