// app.js
let map;
let userMarker;

document.getElementById('startButton').addEventListener('click', function() {
    // Почати навігацію (можна додати конкретні маршрути)
    document.getElementById('message').textContent = 'Навігація почалась!';
    // Можна додати додаткові функції для навігації
});

document.getElementById('locationButton').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateMap(latitude, longitude);
            document.getElementById('message').textContent = `Ваше місцезнаходження: ${latitude}, ${longitude}`;
        }, function(error) {
            document.getElementById('message').textContent = "Не вдалося визначити місцезнаходження.";
        });
    } else {
        document.getElementById('message').textContent = "Геолокація не підтримується вашим пристроєм.";
    }
});

function updateMap(latitude, longitude) {
    if (!map) {
        // Ініціалізація карти
        map = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        // Оновлюємо місцезнаходження користувача
        map.setView([latitude, longitude], 13);
    }

    if (userMarker) {
        userMarker.setLatLng([latitude, longitude]);
    } else {
        userMarker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup("Ви тут")
            .openPopup();
    }
}
