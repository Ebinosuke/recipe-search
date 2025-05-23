
const root = document.getElementById('root');

const chefs = ['舟', '周', '笠', 'ポ', 'ヤ', '服'];

const recipes = [
  {
    name: 'ムカデ盛り',
    chef: ['舟', '笠', '服'],
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

  root.appendChild(section('1. シェフの選択', buildChefSelect()));
  if (!selectedChef) return;

  root.appendChild(section('2. 最初に取得した食材', buildFirstIngredientInput()));
  if (!firstIngredient) return;

  root.appendChild(section('3. ゲーム上で提示されたレシピの選択', buildRecipeSelect()));
  if (!confirmedRecipe) return;

  root.appendChild(section('4. 所持食材の入力（2つ目以降）', buildIngredientInput()));
  root.appendChild(section('5. レシピ比較（提示レシピ vs 他レシピ）', buildRecipeComparison()));
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

function buildChefSelect() {
  const select = document.createElement('select');
  select.innerHTML = '<option value="">-- 選択してください --</option>' + 
    chefs.map(c => `<option value="${c}" ${c === selectedChef ? 'selected' : ''}>${c}</option>`).join('');
  select.onchange = e => { selectedChef = e.target.value; render(); };
  return select;
}

function buildFirstIngredientInput() {
  const input = document.createElement('input');
  input.placeholder = '例：たけのこ';
  input.value = firstIngredient;
  input.oninput = e => { firstIngredient = e.target.value.trim(); render(); };
  return input;
}

function buildRecipeSelect() {
  const candidates = recipes.filter(r =>
    r.chef.includes(selectedChef) && r.conditions.flat().includes(firstIngredient)
  );

  const select = document.createElement('select');
  select.innerHTML = '<option value="">-- レシピを選択 --</option>' + 
    candidates.map(r => `<option value="${r.name}" ${r.name === confirmedRecipe ? 'selected' : ''}>${r.name}</option>`).join('');
  select.onchange = e => { confirmedRecipe = e.target.value; render(); };
  return select;
}

function buildIngredientInput() {
  const wrapper = document.createElement('div');
  const input = document.createElement('input');
  input.placeholder = '食材名を入力して Enter';
  input.onkeydown = e => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      ownedIngredients.push(e.target.value.trim());
      e.target.value = '';
      render();
    }
  };
  const display = document.createElement('div');
  display.className = 'highlight';
  display.textContent = '現在の所持食材：' + ownedIngredients.join(', ');
  wrapper.appendChild(input);
  wrapper.appendChild(display);
  return wrapper;
}

function buildRecipeComparison() {
  const container = document.createElement('div');

  const confirmed = recipes.find(r => r.name === confirmedRecipe);
  if (confirmed) {
    const div = document.createElement('div');
    div.className = 'recipe-card';
    div.innerHTML = '<strong>提示レシピ：</strong><br>' +
      `<div>${confirmed.name}</div>` +
      confirmed.conditions.map((g, i) => `<div>${i + 1}つ以上：${g.join(', ')}</div>`).join('');
    container.appendChild(div);
  }

  const others = recipes.filter(r =>
    r.name !== confirmedRecipe &&
    r.chef.includes(selectedChef) &&
    r.conditions.flat().includes(firstIngredient) &&
    ownedIngredients.every(i => r.conditions.flat().includes(i))
  );

  if (others.length) {
    const title = document.createElement('div');
    title.innerHTML = '<strong>他に作れるレシピ：</strong>';
    container.appendChild(title);

    others.forEach(r => {
      const div = document.createElement('div');
      div.className = 'recipe-card';
      div.innerHTML = `<div>${r.name}</div>` +
        r.conditions.map((g, i) => `<div>${i + 1}つ以上：${g.join(', ')}</div>`).join('');
      container.appendChild(div);
    });
  }

  return container;
}

render();
