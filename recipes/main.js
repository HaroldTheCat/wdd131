import recipes from './recipes.mjs';

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<span>${tag}</span>`).join('');
}

function ratingTemplate(rating) {
    return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
                ${'⭐'.repeat(rating)}${'☆'.repeat(5 - rating)}
            </span>`;
}

function recipeTemplate(recipe) {
    return `<div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">
                <div>
                    <div class="tags">${tagsTemplate(recipe.tags)}</div>
                    <h2>${recipe.name}</h2>
                    ${ratingTemplate(recipe.rating)}
                    <p>${recipe.description}</p>
                </div>
            </div>`;
}

function renderRecipes(recipeList) {
    const recipesContainer = document.getElementById('recipes');
    if (!recipesContainer) {
        console.error('Recipes container not found');
        return;
    }
    recipesContainer.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

function filterRecipes(query) {
    const lowerCaseQuery = query.toLowerCase();
    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(lowerCaseQuery) ||
        recipe.description.toLowerCase().includes(lowerCaseQuery) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    ).sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
    e.preventDefault();
    const searchInput = document.querySelector('#search input');
    const query = searchInput.value.trim().toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

document.addEventListener('DOMContentLoaded', init);
document.querySelector('#search button').addEventListener('click', searchHandler);