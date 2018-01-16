import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergemap";
import 'rxjs/add/Observable/forkJoin';
import 'rxjs/add/Operator/first';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { User } from "firebase/app";
import { Profile } from "../models/profile/profile.interface";
import { Drawing } from "../models/drawing/drawing.interface";

@Injectable()
export class DataService {

  constructor(private database: AngularFireDatabase) {
  }

  getUserProfile(uid: string) {
    return this.database.object(`/profiles/${uid}`).valueChanges();
  }

  async saveUserProfile(uid: string, profile: Profile) {
    const itemRef = this.database.object(`/profiles/${uid}`);
    try {
      itemRef.update(profile);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateUserAvatar(uid: string, avatar: string) {
    const itemRef = this.database.object(`/profiles/${uid}`);
    try {
      itemRef.update({ avatar: avatar });
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  getDrawings(startAt?: number) {
    return this.database.list(`/drawings`, ref => ref.limitToFirst(10)).valueChanges();
    
      // .flatMap((drawings: Drawing[]) => {
      //   drawings.map(drawing => {
      //     this.getUserProfile(drawing.author).subscribe((profile: Profile) => {
      //       drawing.authorDetails = profile;
      //     });
      //   });
      //   return drawings;
      // });
    //return this.database.list(`/drawings`, ref => ref.startAt(startAt || 0).limitToFirst(10)).valueChanges();

    // return this.database.list(`/drawings`, ref => ref.limitToFirst(10)).valueChanges()
    //   .mergeMap((drawings: Drawing[]) => {
    //     return Observable.forkJoin(
    //       drawings.map(drawing =>this.getUserProfile(drawing.author)
    //         .first()),
    //       (...vals: Profile[]) => {
    //         return vals;
    //       }
    //     )
    //   });
    // return this.database.list(`/drawings`).valueChanges()
    //   .mergeMap((drawings: Drawing[]) => {
    //     drawings.forEach(drawing => {
    //       this.getUserProfile(drawing.author).subscribe((authorDetails: Profile) => {
    //         drawing.authorDetails = authorDetails;
    //       });
    //     });
    //     return drawings;
    //   });
  }

  async saveDrawing(drawing: Drawing) {
    const listRef = this.database.list(`/drawings`);
    try {
      listRef.push(drawing);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }
}