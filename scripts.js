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

document.addEventListener('DOMContentLoaded', function() {
    const cityTipForm = document.getElementById('cityTipForm');
    const cityTipsList = document.getElementById('cityTipsList');

    cityTipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const city = document.getElementById('citySelect').value;
        const tip = document.getElementById('cityTip').value;

        // Store the hack in Firebase
        const newHackRef = db.ref('hacks').push();
        newHackRef.set({
            city: city,
            tip: tip,
            upvotes: 0,
            downvotes: 0
        });

        // Clear the form
        cityTipForm.reset();
    });

    db.ref('hacks').on('value', (snapshot) => {
        const data = snapshot.val();
        cityTipsList.innerHTML = ''; // Clear the list

        for (let key in data) {
            const hack = data[key];
            const li = document.createElement('li');
            li.setAttribute('data-id', key);
            li.setAttribute('data-votes', hack.upvotes - hack.downvotes);
            li.innerHTML = `
                <strong>${hack.city}:</strong> ${hack.tip}
                <span class="vote-count">${hack.upvotes - hack.downvotes}</span>
                <span class="emoji-actions">
                    <span class="emoji upvote" title="Upvote">👍</span>
                    <span class="emoji downvote" title="Downvote">👎</span>
                    <span class="emoji flag" title="Flag">🚩</span>
                </span>
            `;
            cityTipsList.appendChild(li);
            addVoteListeners(li, key);
            addFlagListener(li);
        }
    });

    function addVoteListeners(li, key) {
        const upvoteBtn = li.querySelector('.upvote');
        const downvoteBtn = li.querySelector('.downvote');
        const voteCountEl = li.querySelector('.vote-count');

        upvoteBtn.addEventListener('click', function() {
            const hackRef = db.ref('hacks/' + key);
            hackRef.transaction(hack => {
                if (hack) {
                    hack.upvotes = (hack.upvotes || 0) + 1;
                }
                return hack;
            });
        });

        downvoteBtn.addEventListener('click', function() {
            const hackRef = db.ref('hacks/' + key);
            hackRef.transaction(hack => {
                if (hack) {
                    hack.downvotes = (hack.downvotes || 0) + 1;
                }
                return hack;
            });
        });
    }

    function addFlagListener(li) {
        const flagBtn = li.querySelector('.flag');
        flagBtn.addEventListener('click', function() {
            alert("AHOY! There be a problem here? We'll send minions to invade its space, and discern with sound mind how best to move fo-ward. Kindly!");
        });
    }
});
