// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASUiM8JcuQTcaEfsou2FMEYszHj9QZvAE",
    authDomain: "city-web-app-587d9.firebaseapp.com",
    databaseURL: "https://city-web-app-587d9-default-rtdb.firebaseio.com",
    projectId: "city-web-app-587d9",
    storageBucket: "city-web-app-587d9.appspot.com",
    messagingSenderId: "1043876965787",
    appId: "1:1043876965787:web:a9a7036a0ab8300511053e"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  const cityTipForm = document.getElementById('cityTipForm');
  const cityTipsList = document.getElementById('cityTipsList');
  
  // Handle form submission
  cityTipForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const city = document.getElementById('citySelect').value;
      const tip = document.getElementById('cityTip').value;
  
      // Save to Firebase
      db.ref('cityTips').push({
          city,
          tip
      });
  
      // Clear the form
      cityTipForm.reset();
  });
  
  // Listen for changes in the database and populate the list
  db.ref('cityTips').on('value', (snapshot) => {
      cityTipsList.innerHTML = ''; // Clear the list
  
      snapshot.forEach(childSnapshot => {
          const data = childSnapshot.val();
          const li = document.createElement('li');
          li.textContent = `${data.city}: ${data.tip}`;
          cityTipsList.appendChild(li);
      });
  });
  