import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';
// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  transactions = uid => this.db.ref(`transactions/${uid}`);
}

export default Firebase;
