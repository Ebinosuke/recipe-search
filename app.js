
const recipes = [
  {
    name: '天空ちゃんこ',
    chef: '舟周笠ポヤ服',
    price: 8000,
    ingredients: ['キャベツ', '松阪牛', 'コーチン', '黒豚', '烏骨鶏の卵', 'うどん', '秘伝のかくし味']
  },
  {
    name: 'フカヒレの天空煮',
    chef: '周',
    price: 8000,
    ingredients: ['フカヒレ', 'たらばがに', 'アワビ', 'ネギ、しょうが', 'オイスターソース', '秘伝のかくし味']
  },
  {
    name: '天空のブルスケッタ',
    chef: 'ヤ',
    price: 5000,
    ingredients: ['パン', 'フォアグラ', 'トリュフ', 'トマト', 'にんにく', '金箔、愛']
  }
];

const ownedIngredients = new Set();
const ingredientList = document.getElementById('ingredient-list');
const recipeList = document.getElementById('recipe-list');

const allIngredients = [...new Set(recipes.flatMap(r => r.ingredients))];

function renderIngredients() {
  ingredientList.innerHTML = '';
  allIngredients.forEach(ing => {
    const label = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.addEventListener('change', () => {
      cb.checked ? ownedIngredients.add(ing) : ownedIngredients.delete(ing);
      renderRecipes();
    });
    label.append(cb, ing);
    ingredientList.appendChild(label);
  });
}

function renderRecipes() {
  recipeList.innerHTML = '';
  const matched = recipes.filter(r =>
    r.ingredients.every(i => ownedIngredients.has(i))
  );
  if (matched.length === 0) {
    recipeList.textContent = '条件に合うレシピがありません。';
    return;
  }
  matched.forEach(r => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${r.name}</strong><br>シェフ: ${r.chef}<br>価格: ${r.price}G<br>食材: ${r.ingredients.join(', ')}`;
    recipeList.appendChild(div);
  });
}

renderIngredients();
renderRecipes();
