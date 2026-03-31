const statusLocalizacao = document.getElementById("status-localizacao");
let map; // variável global para evitar recriar mapa

window.addEventListener('load', () => {
    obterLocalizacaoNoMapa();
});

// --- FUNÇÃO DO MAPA INTERATIVO ---
function obterLocalizacaoNoMapa() {
    if (!navigator.geolocation) {
        statusLocalizacao.innerText = "📍 Geolocalização não suportada.";
        return;
    }

    statusLocalizacao.innerText = "📡 Buscando localização...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            statusLocalizacao.innerHTML = `📍 Localização Ativa (Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)})`;

            if (map) map.remove(); // remove mapa anterior

            map = L.map('map').setView([lat, lon], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            L.marker([lat, lon])
                .addTo(map)
                .bindPopup('Você está aqui maratonando! 🎌')
                .openPopup();
        },
        (error) => {
            console.error(error);
            statusLocalizacao.innerText = "📍 Localização: Permissão negada ou indisponível.";
            document.getElementById('map').style.display = 'none';
        }
    );
}

// --- FUNÇÃO DE DRINK ALEATÓRIO ---
async function buscarDrink() {
    const resposta = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );

    const dados = await resposta.json();
    const div = document.getElementById("resultado");

    const drink = dados.drinks[0];

    div.innerHTML = `
        <div class="card">
            <h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}">
            <p><b>Categoria:</b> ${drink.strCategory}</p>
            <p><b>Instruções:</b> ${drink.strInstructions}</p>
        </div>
    `;
}