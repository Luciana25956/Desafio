async function buscar drink() {
    const resposta = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink);
    const dados = await resposta.json();
    console.log(dados);
}
const resposta = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink);
const
dados = await resposta.json();
const div = document.getElementById("resultado")

div.innerHTML = `
<div class="card">
<h2>${drink.strDrink}</h2>
<img src="${drink.strDrinkThumb}">
<p><b>Categoria:</b> ${drink.strCategory}</p>
<p><b>Instruções:</b> ${drink.strInstructions}</p>
</div>
}