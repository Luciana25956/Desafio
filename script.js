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