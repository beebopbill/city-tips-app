let currentCity = '';

function showForm(city) {
    currentCity = city;
    document.getElementById('city-name').textContent = city;
    document.querySelector('.tip-form').classList.remove('hidden');
}

function submitTip() {
    const tipValue = document.getElementById('tip').value;
    if (tipValue.trim() === '') return;

    const tipItem = document.createElement('div');
    tipItem.classList.add('tip-item');
    tipItem.innerHTML = `
        <strong>Secret for ${currentCity}:</strong>
        <p>${tipValue}</p>
    `;

    document.querySelector('.tips-container').appendChild(tipItem);
    document.getElementById('tip').value = '';
}
