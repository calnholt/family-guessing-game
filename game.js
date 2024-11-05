let _correct = 0;
let _incorrect = 0;
let _current = null;
let _name = null;
let _availablePeople;
let _rounds = 0;
let _allNames;
let _NAMES;
let _isStart = true;

function startGame(difficulty, NAMES) {
  if (_isStart) {
    _rounds = Object.keys(NAMES).length;
    _allNames = new Set(Object.keys(NAMES));
    _NAMES = NAMES;
    _isStart = false;
    _availablePeople = { ...NAMES };
    _correct = 0;
    _incorrect = 0;
  }
  const menu = document.getElementById('menu');
  menu.style.visibility = 'hidden';
  menu.style.display = 'none';
  // set current person to guess
  const numberLeft = Object.keys(_availablePeople).length;
  const randomIndex = Math.floor(Math.random() * numberLeft);
  const name = Object.keys(_availablePeople)[randomIndex];
  _name = name;
  _current = _availablePeople[name];
  const isMale = _current.isMale;
  let randomNamesToSelect = [..._allNames.values()]
      .filter(name => _NAMES[name].isMale === isMale && name !== _name)
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  randomNamesToSelect.push(name);
  randomNamesToSelect = randomNamesToSelect.slice().sort(() => 0.5 - Math.random());
  const parent = document.getElementById('game');
  parent.style.height = '100%';
  const container = document.createElement('div');
  container.className = 'game-container';
  const imgContainer = document.createElement('div');
  const btnContainer = document.createElement('div');
  btnContainer.className = 'buttons';
  const img = document.createElement('img');
  img.src = 'images/' + name.toLowerCase().replace(/ /g, "_") + '.png';
  img.style.height = '80vw';  
  // img.style.height = '80vw';  
  imgContainer.append(img);
  container.append(imgContainer);
  randomNamesToSelect.forEach(name => {
    const button = document.createElement('button');
    button.classList.add('name-button');
    button.textContent = name;
    button.onclick = (el) => {
      const isCorrect = el.currentTarget.textContent === _name;
      isCorrect ? _correct++ : _incorrect++;
      button.style.backgroundColor = isCorrect ? 'green' : 'red';
      // find correct button
      if (!isCorrect) {
        const nodes = document.querySelectorAll('.name-button');
        for (let node of nodes) {
          if (node.textContent === _name) {
            node.style.backgroundColor = 'green';
            break;
          }
        }
      }
      setTimeout(() => {
        container.remove();
        // game over
        if (_correct + _incorrect === _rounds) {
        // if (_correct + _incorrect === 3) {
          const prevHighScore = localStorage.getItem(difficulty);
          if (!prevHighScore) {
            localStorage.setItem(difficulty, `${_correct}/${_rounds}`);
          }
          else {
            const num = +prevHighScore.split('/')[0];
            if (_correct > num) {
              localStorage.setItem(difficulty, `${_correct}/${_rounds}`);
            }
          }
          menu.style.visibility = '';
          menu.style.display = '';
          _isStart = true;
          loadMenu();
        }
        else {
          startGame(difficulty);
        }
      }, 1000);
    };
    btnContainer.append(button);
  });
  container.append(btnContainer);
  const scoreContainer = document.createElement('h2');
  scoreContainer.className = 'score-container';
  scoreContainer.textContent = `${_correct}/${_rounds}`;
  container.append(scoreContainer);
  parent.append(container);
  delete _availablePeople[name]; 
}

function getGuessingTime(difficulty) {
  switch(difficulty) {
    case 'EASY':
      return -1;
    case 'NORMAL':
      return 5;
    case 'HARD':
      return 5;
  };
}