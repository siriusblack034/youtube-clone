
import firebase from 'firebase'
import 'firebase/firestore'
const config = {
  apiKey: "AIzaSyCJ3_6nN47HrV-yBSpo5XMBP02S8Jgt4uk",
  authDomain: "clone-acd6f.firebaseapp.com",
  databaseURL: "https://clone-acd6f-default-rtdb.firebaseio.com",
  projectId: "clone-acd6f",
  storageBucket: "clone-acd6f.appspot.com",
  messagingSenderId: "60168562578",
  appId: "1:60168562578:web:ab73ced24e2fe61677834b",
  measurementId: "G-R71Y1LTMP1"
}
const firebaseApp = firebase.initializeApp(config)
export default firebaseApp.firestore()