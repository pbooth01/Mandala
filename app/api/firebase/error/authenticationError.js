export class FirebaseAuthenticationError{
  constructor(firebaseError){
    this.source = 'FIREBASE';
    this.error = firebaseError;
  }
}

export class FacebookAuthenticationError{
  constructor(facebookError){
    this.source = 'FACEBOOK';
    this.error = facebookError;
  }
}
