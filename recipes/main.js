import recipes from './recipes.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipes');

    if (!recipesContainer) {
        console.error('Recipes container not found');
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        const tags = recipe.tags.map(tag => `<span>${tag}</span>`).join('');

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div>
                <div class="tags">${tags}</div>
                <h2>${recipe.name}</h2>
                <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                    ${'⭐'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}
                </span>
                <p>${recipe.description}</p>
            </div>
        `;

        recipesContainer.appendChild(recipeCard);
    });
});