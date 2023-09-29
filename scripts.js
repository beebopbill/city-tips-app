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

const database = firebase.database();

let currentCity = '';

function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('city-section').style.display = 'none';
}

function showCity(city) {
    currentCity = city;
    document.getElementById('city-name').textContent = city;
    document.getElementById('home').style.display = 'none';
    document.getElementById('city-section').style.display = 'block';
    fetchTips();
}

function addTipToFirebase() {
    const tip = document.getElementById('tip-input').value;
    if (tip) {
        const newTipRef = database.ref('tips/' + currentCity).push();
        newTipRef.set({
            tip: tip
        });
        document.getElementById('tip-input').value = '';
        fetchTips();
    }
}

function fetchTips() {
    const tipsRef = database.ref('tips/' + currentCity);
    tipsRef.on('value', function(snapshot) {
        const tips = snapshot.val();
        const tipsList = document.getElementById('tips-list');
        tipsList.innerHTML = '';
        for (let tipId in tips) {
            const tipItem = document.createElement('div');
            tipItem.textContent = tips[tipId].tip;
            tipsList.appendChild(tipItem);
        }
    });
}

showHome();
