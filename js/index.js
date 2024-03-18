// элементы в DOM можно получить при помощи функции querySelector
const minWeightInput = document.querySelector('.minweight__input'); // поле ввода фильтра веса
const maxWeightInput = document.querySelector('.maxweight__input'); // поле ввода фильтра веса
const btnWeightFilter = document.querySelector('.filter__btn'); // кнопка применения фильтра
const btnWeightFilterReset = document.querySelector('.filter_reset'); // кнопка сброса фильтра
const filterInfoShown = document.querySelector('.fruitsShown');
const filterInfoTotal = document.querySelector('.fruitsTotal');

const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const fruitKindSelect = document.querySelector('.kind__select');
const fruitColorSelect = document.querySelector('.color__select'); // заполняемый селектор цветов по классу color_select
const fruitWeightInput = document.querySelector('.weight__input'); // поле с весом
const addFruitButton = document.querySelector('.add__action__btn'); // кнопка добавления
const addRandomFruitButton = document.querySelector('.addrandom__action__btn'); // кнопка добавления N фруктов
const randomCountInput = document.querySelector('.randomCount__input'); // инпут числа рандомов
const btnEraseFruits = document.querySelector('.erase__btn'); // кнопка очистки склада

// JSON-массив фруктов
const fruitKindJSON = `{ "kind" : ["Яблоко", "Груша", "Банан", "Апельсин", "Лимон", "Грейпфрут", "Манго", "Киви", "Гранат", "Вишня", "Черешня", "Слива", "Персик", "Нектарин", "Абрикос", "Дыня", "Арбуз", "Ананас", "Гуава", "Папайя", "Маракуйя", "Личи", "Мандарин", "Лайм", "Авокадо", "Инжир", "Финик", "Хурма", "Клюква", "Клубника"]
}`;

// JSON-массив объектов с цветом и hex-значением
const colorsJSON = `[
  {"colorName" : "Белый", "colorHEX" : "#FFFFFF"},
  {"colorName" : "Бежевый", "colorHEX" : "#F5F5DC"},
  {"colorName" : "Розовый", "colorHEX" : "#FFC0CB"},
  {"colorName" : "Желтый", "colorHEX" : "#FFFF00"},
  {"colorName" : "Оранжевый", "colorHEX" : "#FFA500"},
  {"colorName" : "Светло-оранжевый", "colorHEX" : "#FFA500"},
  {"colorName" : "Светло-красный", "colorHEX" : "#FF6347"},
  {"colorName" : "Светло-коричневый", "colorHEX" : "#D2691E"},
  {"colorName" : "Красный", "colorHEX" : "#FF0000"},  
  {"colorName" : "Коричневый", "colorHEX" : "#A52A2A"},
  {"colorName" : "Пурпурный", "colorHEX" : "#FF00FF"},
  {"colorName" : "Темно-фиолетовый", "colorHEX" : "#990099"},
  {"colorName" : "Темно-красный", "colorHEX" : "#800000"},
  {"colorName" : "Темно-коричневый", "colorHEX" : "#654321"},
  {"colorName" : "Темно-зеленый", "colorHEX" : "#006400"},
  {"colorName" : "Зеленый", "colorHEX" : "#008000"},
  {"colorName" : "Светло-зеленый", "colorHEX" : "#90EE90"},
  {"colorName" : "Бирюзовый", "colorHEX" : "#00FFFF"},
  {"colorName" : "Голубой", "colorHEX" : "#00BFFF"},
  {"colorName" : "Темно-синий", "colorHEX" : "#00008B"},
  {"colorName" : "Серый", "colorHEX" : "#808080"},
  {"colorName" : "Черный", "colorHEX" : "#000000"}
]`;


// пустой список фруктов в JSON формате
// let fruitsJSON = `[]`;

// Начальный список фруктов:
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "Пурпурный", "weight": 13},
  {"kind": "Дуриан", "color": "Зеленый", "weight": 35},
  {"kind": "Личи", "color": "Розовый", "weight": 17},
  {"kind": "Карамбола", "color": "Желтый", "weight": 28},
  {"kind": "Личи", "color": "Не определен", "weight": 17},
  {"kind": "Карамбола", "color": "Желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "Светло-коричневый", "weight": 22}
]`;


function eraseFruits() {
  fruits = [];
  filterMinWeight = '';
  filterMaxWeight = '';
  minWeightInput.value = '';
  maxWeightInput.value = '';
  filterInfoShown.innerText = '0';
  filterInfoTotal.innerText = '0';
  fruitsIsFiltered = false;
}

// let fruits;
let filterMinWeight;
let filterMaxWeight;
let fruitsIsFiltered;

// Включено: преобразование тестового набора фруктов из JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

// Отключено: очистка экрана при первом запуске
// eraseFruits();

/*** отрисовка карточек ***/

const display = () => {
  // DONE: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';
  if (!fruits) {return}

  filterInfoTotal.innerText = fruits.length; // общее количество фруктов
  
  if (fruits.length === 0) return;

  // создадим карту уникальных цветов в colorsMap:
  // ключ - название цвета, значение - HEX-код цвета
  var colorsList = JSON.parse(colorsJSON);
  var colorsMap = new Map();
  for (let color of colorsList) colorsMap.set(color.colorName, color.colorHEX);
  
  /* Формат карточки с фруктом:
        <li class="fruit__item">
          <div class="fruit__info">
            <div># 0</div>
            <div>сорт: Мангустин</div>
            <div>цвет: фиолетовый</div>
            <div>вес (кг): 13</div>
          </div>
        </li>
  Цвет карточки будем задавать не через класс, а динамически управляя ее полем css для LI
  */
  let displayFruits = []; // массив для отрисовки карточек

  filterInfoTotal.innerText = fruits.length; // отобразим общее число карточек
  
  // применяем фильтр по весу, если он включен
  if (fruitsIsFiltered) {
    displayFruits = fruits.filter((item) => {
        if (item.weight >= filterMinWeight && item.weight <= filterMaxWeight) return item
      })
    } else displayFruits = fruits

  for (let i = 0; i < displayFruits.length; i++) {
    // DONE: формируем новые элементы <li> при помощи document.createElement,
    // и добавляем их в конец списка fruitsList при помощи document.appendChild
    let fruitItem = document.createElement('li');
    
    // задаем цвет карточки
    fruitItem.style.backgroundColor = 'lightgray';  // цвет по-умолчанию
    let fruitItemcolor = colorsMap.get(displayFruits[i].color);
    if (fruitItemcolor) fruitItem.style.backgroundColor = fruitItemcolor;

    fruitItem.classList.add('fruit__item');
    fruitItem.innerHTML = `
    <div class="fruit__info">
      <div>#${i}</div>
      <div>сорт: ${displayFruits[i].kind}</div>
      <div>цвет: ${displayFruits[i].color}</div>
      <div>вес (кг): ${displayFruits[i].weight}</div>
    </div>
    `
    fruitsList.appendChild(fruitItem);
  }
  filterInfoShown.innerText = displayFruits.length; // отобразим число отрисованных карточек
};

/* динамически формируем выпадающие списки "выберите сорт" и "выберите цвет":
 для этого на базе списков цветов и сортов формируем каждый новый элемент <option> при помощи document.createElement и добавляем их конец списка color-selector при помощи document.appendChild */

function fillSelectors() {

  var colorsList = JSON.parse(colorsJSON);

  colorsList.forEach(color => {
    var option = document.createElement("option");
    option.textContent = color.colorName;
    option.value = color.colorName;
    fruitColorSelect.appendChild(option);
  });

  var fruitsArray = Array.from(JSON.parse(fruitKindJSON).kind);
  fruitsArray.sort();

  fruitsArray.forEach(fruit => {
    var option = document.createElement("option");
    option.textContent = fruit;
    option.value = fruit;
    fruitKindSelect.appendChild(option);
  });

}


fillSelectors(); // заполняем выпадающие списки в HTML данными из набора
display(); // первая отрисовка карточек

// нажата кнопка "очистить склад"
btnEraseFruits.addEventListener('click', () => {
  eraseFruits();
  display();
});

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*** ПЕРЕМЕШИВАНИЕ ***/

function shuffleFruits () {
  // DONE: допишите функцию перемешивания массива
  if (fruits.length <= 1) { return }

  // разворачиваем массив в рабочую копию
  let mixedFruits = [...fruits];
  
  // проходим рабочий массив 1 раз, меняя текущий элемент со случайно выбранным
  for (let i = 0; i < mixedFruits.length; i++) {
    let j = getRandomInt(0, mixedFruits.length - 1);
    [mixedFruits[i], mixedFruits[j]] = [mixedFruits[j], mixedFruits[i]];
  }
  
  // проверяем замешанный массив на равенство с исходным
  // простое сравнение массивов как объектов всегда выдает false,
  // поэтому проверка усложняется
  let equal = true;
  for (let i = 0; i < fruits.length; i++) {
      if (JSON.stringify(fruits[i]) !== JSON.stringify(mixedFruits[i])) {
        equal = false;        
        break;           
      }
    };
  equal ? alert('Перемешивание не помогло, попробуйте еще раз.') : fruits = mixedFruits;
  return;
  
    // ОТКЛЮЧЕНО: данный вариант не был реализован, т.к. кажется менее эффективным
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
};

// нажата кнопка "перемешать"
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// Нажата кнопка "Сброс фильтров"
btnWeightFilterReset.addEventListener('click', () => {
  filterMinWeight = '';
  filterMaxWeight = '';
  minWeightInput.value = '';
  maxWeightInput.value = '';
  fruitsIsFiltered = false;
  display();
});

/* Установка параметров фильтрации массива */

const filterFruits = () => {
  // DONE: допишите функцию
  filterMinWeight = Number(minWeightInput.value);
  filterMaxWeight = Number(maxWeightInput.value);

  if (isNaN(filterMinWeight) || isNaN(filterMaxWeight)
      || filterMinWeight <= 0 || filterMaxWeight <= 0
      || filterMinWeight > filterMaxWeight) {
     alert('Некорректное значение фильтров!');
     minWeightInput.value = '';
     maxWeightInput.value = '';
     fruitsIsFiltered = false;
     return;  
   }
  fruitsIsFiltered = true;
};

// Нажата кнопка "Отфильтровать"
btnWeightFilter.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'quickSort'; // инициализация состояния вида сортировки
let sortTime = ''; // инициализация состояния времени сортировки

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

const comparationColor = (a, b) => {
  // DONE: допишите функцию сравнения двух элементов по цвету
  // создаем на базе JSON линейный массив названий цветов
  var colorsList = JSON.parse(colorsJSON).map(color => color.colorName);
  return colorsList.indexOf(a) > colorsList.indexOf(b);
};

const sortAPI = {
   // DONE: допишите функцию сортировки пузырьком
  bubbleSort(arr, comparation) {
    if (arr.length <= 1) return arr; // массив пустой или из 1 элемента
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (comparation(arr[j].color, arr[j + 1].color)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }    
    }
    return arr;
  },
  quickSort(arr, comparation) {
    // DONE: допишите функцию быстрой сортировки
    if (arr.length <= 1) return arr; // массив пустой или из 1 элемента
    const pivot = arr[arr.length - 1];
    let leftArr = [];
    let rightArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        (comparation(arr[i].color, pivot.color)) ? 
        // сравниваем с опорником и раскидываем по левому и правому подмассиву
          rightArr.push(arr[i]) : leftArr.push(arr[i]) 
      }
    // объединяем левый и правый подмассивы вокруг опорника
    let result = sortAPI.quickSort(leftArr,comparationColor)
                  .concat(pivot,sortAPI.quickSort(rightArr,comparationColor));
    return result;
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    if (arr.length <= 1) return arr; // массив пустой или из 1 элемента
    const start = new Date().getTime();
    arr = sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    return arr;
  },
};

// нажата кнопка "Изменить сортировку"
sortChangeButton.addEventListener('click', () => {
  // DONE: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = (sortKind === 'bubbleSort') ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

// нажата кнопка "Сортировать"
sortActionButton.addEventListener('click', () => {
  // DONE: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  fruits = sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // DONE: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

// Нажата кнопка добавить 1 фрукт //
addFruitButton.addEventListener('click', () => {
  // DONE: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из селекторов

  var newKind = fruitKindSelect.value;
  var newColor = fruitColorSelect.value;
  var newWeight = fruitWeightInput.value;

  // проверяем, все ли поля заполнены
  if (newKind !== 'no input' && newColor !== 'no input' && (newWeight > 0)) {

    let newFruit = {
      kind: newKind,
      color: newColor,
      weight: newWeight,
    };

    // проверим, наличие фрукта с таким сортом и цветом в массиве
    let uniqFruit = true;

    fruits.forEach((item) => {
      if (uniqFruit && item.kind === newFruit.kind && item.color === newFruit.color) {
        uniqFruit = false;
      };
    });

    // добавляем только уникальные фрукты или выводим алерт
    uniqFruit ? fruits.push(newFruit) : alert('Такой фрукт уже есть!');
  }
  else alert('Неполный или некорректный ввод данных')
  display();
});


/*** Нажата кнопка Добавить N рандомных ФРУКТОВ ***/

addRandomFruitButton.addEventListener('click', () => {
  // DONE: создание и добавление сразу нескольких случайных фруктов в массив fruits
  // необходимые значения берем из данных для селекторов

  randomCount = Number(randomCountInput.value);

  if (!randomCount || randomCount <= 0 || randomCount > 100) {
      alert('Некорректное число');
      randomCountInput.value = '';
      return;
    }

  var colorsList = JSON.parse(colorsJSON);
  var kindsList = JSON.parse(fruitKindJSON);
  
  let i = 0;
  while (i < randomCount) {
    let random, randomColor, randomKind, randomWeight;
    let newFruit = {};

    random = Math.floor(Math.random() * colorsList.length);
    randomColor = colorsList[random].colorName;

    random = Math.floor(Math.random() * kindsList.kind.length);
    randomKind = kindsList.kind[random];

    randomWeight = Math.floor(Math.random() * 100 + 1);    

    // проверка рандомного фрукта на уникальность по цвету+сорту
    let uniqFruit = true;
    fruits.forEach((item) => {
      if (uniqFruit && item.kind === randomKind && item.color === randomColor) {
        uniqFruit = false;
      };
    });

    if (uniqFruit) { // добавляем новый уникальный фрукт в массив
        newFruit = {
          kind: randomKind,
          color: randomColor,
          weight: randomWeight,
        };        
        fruits.push(newFruit);
        i++;
      }
  };

  display();
});
