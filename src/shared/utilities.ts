import * as moment from 'moment';

export class Utilities {
  static fromNow(date: string) {
    return moment(date).fromNow();
  }

  static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.random() * (i + 1) << 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}