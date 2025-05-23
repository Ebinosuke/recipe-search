const root = document.getElementById('root');

const chefs = ['舟', '周', '笠', 'ポ', 'ヤ', '服'];

const recipes = [
  {
    name: 'ムカデ盛り',
    chef: ['舟', '笠', '服'],
    price: 7000,
    conditions: [
      ['エビ'],
      ['タコ'],
      ['イカ'],
      ['しそ', 'だいこん']
    ]
  },
  {
    name: 'タラの甘酢あんかけ',
    chef: ['周', '笠'],
    price: 6000,
    conditions: [
      ['タラ', '酢'],
      ['ネギ', 'しいたけ', 'たけのこ', 'にんじん', 'キクラゲ']
    ]
  }
];

let selectedChef = '';
let firstIngredient = '';
let confirmedRecipe = '';
let ownedIngredients = [];

function render() {
  root.innerHTML = '';

  const chefSelect = document.createElement('select');
  chefSelect.innerHTML = '<option value="">シェフを選択</option>' + chefs.map(c => 
    `<option value="${c}" ${c === selectedChef ? 'selected' : ''}>${c}</option>`).join('');
  chefSelect.onchange = e => { selectedChef = e.target.value; render(); };
  root.appendChild(section('1. シェフの選択', chefSelect));

  if (!selectedChef) return;

  const firstInput = document.createElement('input');
  firstInput.placeholder = '最初の取得食材を入力';
  firstInput.value = firstIngredient;
  firstInput.oninput = e => { firstIngredient = e.target.value; render(); };
  root.appendChild(section('2. 最初に取得した食材', firstInput));

  if (!firstIngredient) return;

  const candidates = recipes.filter(r =>
    r.chef.includes(selectedChef) &&
    r.conditions.flat().includes(firstIngredient)
  );
  const recipeSelect = document.createElement('select');
  recipeSelect.innerHTML = '<option value="">提示されたレシピを選択</option>' +
    candidates.map(r => `<option value="${r.name}" ${r.name === confirmedRecipe ? 'selected' : ''}>${r.name}</option>`).join('');
  recipeSelect.onchange = e => { confirmedRecipe = e.target.value; render(); };
  root.appendChild(section('3. 提示されたレシピ', recipeSelect));

  if (!confirmedRecipe) return;

  const ingInput = document.createElement('input');
  ingInput.placeholder = '食材を入力してEnter';
  ingInput.onkeydown = e => {
    if (e.key === 'Enter' && e.target.value) {
      ownedIngredients.push(e.target.value);
      e.target.value = '';
      render();
    }
  };
  const ingList = document.createElement('div');
  ingList.textContent = '所持食材: ' + ownedIngredients.join(', ');
  const ingWrap = document.createElement('div');
  ingWrap.appendChild(ingInput);
  ingWrap.appendChild(ingList);
  root.appendChild(section('4. 食材を追加', ingWrap));

  const matchRecipes = recipes.filter(r =>
    r.chef.includes(selectedChef) &&
    ownedIngredients.every(i => r.conditions.flat().includes(i))
  ).filter(r => r.name !== confirmedRecipe);

  const others = document.createElement('div');
  matchRecipes.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `<strong>${r.name}</strong><br>必要食材:<br>` +
      r.conditions.map((g, i) => `${i + 1}つ以上: ${g.join(', ')}`).join('<br>');
    others.appendChild(card);
  });
  root.appendChild(section('5. 他に作れるレシピ', others));
}

function section(title, content) {
  const div = document.createElement('div');
  div.className = 'section';
  const h2 = document.createElement('h2');
  h2.textContent = title;
  div.appendChild(h2);
  div.appendChild(content);
  return div;
}

render();
