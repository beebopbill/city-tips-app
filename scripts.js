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
    const memoryForm = document.getElementById('memoryForm');
    const memoriesList = document.getElementById('memoriesList');

    memoryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById('memoryCategory').value;
        const memory = document.getElementById('memoryText').value;

        // Store the memory in Firebase
        const newMemoryRef = db.ref('memories').push();
        newMemoryRef.set({
            category: category,
            memory: memory,
            upvotes: 0,
            downvotes: 0
        });

        // Clear the form
        memoryForm.reset();
    });

    db.ref('memories').on('value', (snapshot) => {
        const data = snapshot.val();
        memoriesList.innerHTML = ''; // Clear the list

        for (let key in data) {
            const memory = data[key];
            const li = document.createElement('li');
            li.setAttribute('data-id', key);
            li.setAttribute('data-votes', memory.upvotes - memory.downvotes);
            li.innerHTML = `
                <strong>${memory.category}:</strong> ${memory.memory}
                <span class="vote-count">${memory.upvotes - memory.downvotes}</span>
                <span class="emoji-actions">
                    <span class="emoji upvote" title="Upvote">👍</span>
                    <span class="emoji downvote" title="Downvote">👎</span>
                    <span class="emoji flag" title="Flag">🚩</span>
                </span>
            `;
            memoriesList.appendChild(li);
            addVoteListeners(li, key);
            addFlagListener(li);
        }
    });

    function addVoteListeners(li, key) {
        const upvoteBtn = li.querySelector('.upvote');
        const downvoteBtn = li.querySelector('.downvote');
        const voteCountEl = li.querySelector('.vote-count');

        upvoteBtn.addEventListener('click', function() {
            const memoryRef = db.ref('memories/' + key);
            memoryRef.transaction(memory => {
                if (memory) {
                    memory.upvotes = (memory.upvotes || 0) + 1;
                }
                return memory;
            });
        });

        downvoteBtn.addEventListener('click', function() {
            const memoryRef = db.ref('memories/' + key);
            memoryRef.transaction(memory => {
                if (memory) {
                    memory.downvotes = (memory.downvotes || 0) + 1;
                }
                return memory;
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

const modal = document.getElementById('customModal');
const closeModal = document.getElementById('closeModal');

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

function showAlert() {
    modal.style.display = 'block';
}

// When the flag emoji is clicked, show the custom modal
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('flag-emoji')) {
        showAlert();
    }
});
