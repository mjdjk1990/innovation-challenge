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
      await itemRef.update(profile);
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
      await itemRef.update({ avatar: avatar });
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  getDrawings(startAt?: number) {
    // return this.database.list(`/drawings`, ref => ref.limitToFirst(10)).valueChanges();
    return this.database.list(`/drawings`, ref => ref.limitToFirst(10)).snapshotChanges().map(changes => {
      return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
    });
  }

  async saveDrawing(drawing: Drawing) {
    const listRef = this.database.list(`/drawings`);
    try {
      await listRef.push(drawing);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  async incrementDrawingGuessCount(drawing: Drawing) {
    if (!drawing.totalGuesses) {
      drawing.totalGuesses = 0;
    }
    const itemRef = this.database.object(`/drawings/${drawing.$key}`);
    try {
      await itemRef.update({ totalGuesses: drawing.totalGuesses + 1 });
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }
}