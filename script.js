const statusLocalizacao = document.getElementById("status-localizacao");

// Inicialização ao carregar a página
window.addEventListener('load', () => {
    obterLocalizacaoNoMapa();
    registrarServiceWorker();
});

// --- FUNÇÃO DO MAPA INTERATIVO ---
function obterLocalizacaoNoMapa() {
    if (!navigator.geolocation) {
        statusLocalizacao.innerText = "📍 Geolocalização não suportada.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            statusLocalizacao.innerHTML = `📍 Localização Ativa (Lat ${lat.toFixed(2)})`;

            // Criar o mapa usando Leaflet
            // [lat, lon] são as coordenadas, 13 é o zoom
            const map = L.map('map').setView([lat, lon], 13);

            // Adicionar as "telhas" do mapa (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Adicionar um marcador no local do usuário
            L.marker([lat, lon]).addTo(map)
                .bindPopup('Você está aqui maratonando! 🎌')
                .openPopup();
        },
        (error) => {
            console.error(error);
            statusLocalizacao.innerText = "📍 Localização: Permissão negada ou indisponível.";
            document.getElementById('map').style.display = 'none'; // Esconde o mapa se der erro
        }
    );
}


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