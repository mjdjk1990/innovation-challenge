import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Drawing } from '../../models/drawing/drawing.interface';
import { DataService } from '../../providers/data.service';
import { Utilities } from '../../shared/utilities';
import { AuthService } from '../../providers/auth.service';
import { GuessStatus } from '../../models/guess/guess-status.interface';

// changeDetection: ChangeDetectionStrategy.OnPush,

@Component({
  selector: 'drawings-list',
  templateUrl: 'drawings-list.component.html'
})
export class DrawingsListComponent {

  @Input('drawings') drawings: Drawing[];
  @Output('drawingSelected') drawingSelected: EventEmitter<Drawing> = new EventEmitter<Drawing>();

  sortedDrawings: Drawing[];

  constructor(private data: DataService, private auth: AuthService) {
  }

  // to handle undefined or null values in the date and not crash
  getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  // sorted by newest first
  sortByDate(): void {
    this.drawings.sort((a: Drawing, b: Drawing) => {
      return this.getTime(new Date(b.dateCreated)) - this.getTime(new Date(a.dateCreated));
    });
  }

  onClick(drawing: Drawing) {
    this.drawingSelected.emit(drawing);
  }

  ngOnChanges() {
    if (this.drawings) { this.sortByDate(); }
  }

}
