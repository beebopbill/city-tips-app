let currentCity = '';

function goHome() {
    document.querySelector('.tip-form').classList.add('hidden');
    document.querySelector('.city-list').classList.remove('hidden');
    document.querySelector('.home-btn').classList.add('hidden');
    document.querySelector('.tips-container').innerHTML = '';
}

function showForm(city) {
    currentCity = city;
    document.getElementById('city-name').textContent = city;
    document.querySelector('.tip-form').classList.remove('hidden');
    document.querySelector('.city-list').classList.add('hidden');
    document.querySelector('.home-btn').classList.remove('hidden');

    // Add a historical tip for each city
    const historicalTips = {
        'Philadelphia': '1776: The Declaration of Independence was signed here.',
        'Boston': '1773: The Boston Tea Party protested British taxation.',
        'New York City': '1886: The Statue of Liberty was dedicated.'
    };

    const tipItem = document.createElement('div');
    tipItem.classList.add('tip-item');
    tipItem.innerHTML = `
        <strong>Historical Secret:</strong>
        <p>${historicalTips[city]}</p>
        <span class="year">${city === 'Philadelphia' ? '1776' : city === 'Boston' ? '1773' : '1886'}</span>
    `;
    document.querySelector('.tips-container').appendChild(tipItem);
}

function submitTip() {
    const tipValue = document.getElementById('tip').value;
    if (!tipValue) return;

    const tipItem = document.createElement('div');
    tipItem.classList.add('tip-item');
    tipItem.innerHTML = `
        <strong>${currentCity} Secret:</strong>
        <p>${tipValue}</p>
    `;
    document.querySelector('.tips-container').appendChild(tipItem);
    document.getElementById('tip').value = '';
}
