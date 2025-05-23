
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

  root.appendChild(section('2. 最初に取得した食材', buildFirstIngredientSelect()));
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

function buildFirstIngredientSelect() {
  const select = document.createElement('select');
  select.innerHTML = '<option value="">-- 食材を選択 --</option>' + `<option value="0">0</option>
<option value="あげ玉">あげ玉</option>
<option value="いかすみ">いかすみ</option>
<option value="うどん">うどん</option>
<option value="かに">かに</option>
<option value="かまぼこ">かまぼこ</option>
<option value="しいたけ">しいたけ</option>
<option value="しそ">しそ</option>
<option value="しょうが">しょうが</option>
<option value="じゃがいも">じゃがいも</option>
<option value="そば">そば</option>
<option value="たけのこ">たけのこ</option>
<option value="たまご">たまご</option>
<option value="たまねぎ">たまねぎ</option>
<option value="たらばがに">たらばがに</option>
<option value="だいこん">だいこん</option>
<option value="とうふ">とうふ</option>
<option value="にんじん">にんじん</option>
<option value="にんにく">にんにく</option>
<option value="のり">のり</option>
<option value="ぱん粉">ぱん粉</option>
<option value="ひき肉">ひき肉</option>
<option value="ほうれん草">ほうれん草</option>
<option value="まつたけ">まつたけ</option>
<option value="アサリ">アサリ</option>
<option value="アワビ">アワビ</option>
<option value="イカ">イカ</option>
<option value="イナゴ">イナゴ</option>
<option value="イワシ">イワシ</option>
<option value="ウニ">ウニ</option>
<option value="エスカルゴ">エスカルゴ</option>
<option value="エビ">エビ</option>
<option value="オイスターソース">オイスターソース</option>
<option value="カエル">カエル</option>
<option value="カキ">カキ</option>
<option value="カレー粉">カレー粉</option>
<option value="キクラゲ">キクラゲ</option>
<option value="キャビア">キャビア</option>
<option value="キャベツ">キャベツ</option>
<option value="ケチャップ">ケチャップ</option>
<option value="コイ">コイ</option>
<option value="コーチン">コーチン</option>
<option value="シャケ">シャケ</option>
<option value="スッポン">スッポン</option>
<option value="タイ">タイ</option>
<option value="タコ">タコ</option>
<option value="タラ">タラ</option>
<option value="ダック">ダック</option>
<option value="チーズ">チーズ</option>
<option value="トマト">トマト</option>
<option value="トラフグ">トラフグ</option>
<option value="トリュフ">トリュフ</option>
<option value="ドジョウ">ドジョウ</option>
<option value="ナス">ナス</option>
<option value="ニラ">ニラ</option>
<option value="ネギ">ネギ</option>
<option value="ハム">ハム</option>
<option value="バター">バター</option>
<option value="パスタ">パスタ</option>
<option value="パン">パン</option>
<option value="ピザ生地">ピザ生地</option>
<option value="ピーマン">ピーマン</option>
<option value="フォアグラ">フォアグラ</option>
<option value="フカヒレ">フカヒレ</option>
<option value="フクロタケ">フクロタケ</option>
<option value="ベーコン">ベーコン</option>
<option value="ホタテ貝">ホタテ貝</option>
<option value="マグロ">マグロ</option>
<option value="マッシュルーム">マッシュルーム</option>
<option value="レタス">レタス</option>
<option value="レモン">レモン</option>
<option value="ワイン">ワイン</option>
<option value="ワカメ">ワカメ</option>
<option value="中華めん">中華めん</option>
<option value="伊勢海老">伊勢海老</option>
<option value="包丁の舞い">包丁の舞い</option>
<option value="味噌">味噌</option>
<option value="唐辛子">唐辛子</option>
<option value="大トロ">大トロ</option>
<option value="愛">愛</option>
<option value="折詰の折">折詰の折</option>
<option value="春菊">春菊</option>
<option value="松阪牛">松阪牛</option>
<option value="油揚げ">油揚げ</option>
<option value="点心の皮">点心の皮</option>
<option value="烏骨鶏の卵">烏骨鶏の卵</option>
<option value="牛乳">牛乳</option>
<option value="牛肉">牛肉</option>
<option value="白菜">白菜</option>
<option value="秘伝のかくし味">秘伝のかくし味</option>
<option value="米">米</option>
<option value="紋甲いか">紋甲いか</option>
<option value="計">計</option>
<option value="豚肉">豚肉</option>
<option value="酢">酢</option>
<option value="金箔">金箔</option>
<option value="餅">餅</option>
<option value="鶏肉">鶏肉</option>
<option value="黒豚">黒豚</option>`;
  select.value = firstIngredient;
  select.onchange = e => { firstIngredient = e.target.value; render(); };
  return select;
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
