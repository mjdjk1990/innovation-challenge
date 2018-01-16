import { Injectable } from '@angular/core';
import { User } from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { AuthService } from './auth.service';

/**
 * STORAGE RULES:
 * service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
 */

@Injectable()

export class StorageService {
  constructor(private fb: FirebaseApp, private auth: AuthService) { }

  async uploadBase64Image(image: string, location: string, filename: string) {
    try {
      let uid = this.auth.uid;
      if(uid) {
      let storageRef = this.fb.storage().ref();
      const imageRef = storageRef.child(`images/${uid}/${location}/${filename}`);
      // const imageRef = storageRef.child(`images/${path}/${filename}.jpg`);

      const snapshot = await imageRef.putString(image, 'data_url');

      return snapshot;
      } 
      else { return false; }
    }
    catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  async deleteImage(path: string) {
    try {
      let storageRef = this.fb.storage().ref();
      let imageRef = storageRef.child(path);

      await imageRef.delete();
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }
}