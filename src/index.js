
import './styles/main.scss';


  // Your web app's Firebase configuration
  var firebaseConfig = {
        apiKey: "AIzaSyAEwshf1Hi3UAPk_11CApLwdhoCYI-y7Og",
        authDomain: "mochat-web1a-angelo.firebaseapp.com",
        projectId: "mochat-web1a-angelo",
        storageBucket: "mochat-web1a-angelo.appspot.com",
        messagingSenderId: "872539048229",
        appId: "1:872539048229:web:a4c7c950ca8570dfe932cc"
  };
  // Initialize Firebase


document.addEventListener('DOMContentLoaded',() =>{
    firebase.initializeApp(firebaseConfig);
    

    const db = firebase.firestore();
    const collection = db.collection('chat');
    const ul=document.querySelector('ul');;
    const form=document.querySelector('form');

    collection.orderBy('timestamp').onSnapshot((snapshot) => {
        const json=snapshot.docs.map(doc =>{
            return{id:doc.id, ...doc.data()}
        });
        const elements=json.map(doc=> `<li><b>${doc.user}</b> ${doc.text}</li>`);
        ul.innerHTML=elements.join('');
    });
    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const obj={
            timestamp: new Date().toISOString(),
            user:document.querySelector('#username').value,
            text: event.target.new.value
        }


        collection.doc().set(obj);

        event.target.reset();
    });
});
