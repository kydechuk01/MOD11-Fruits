## Домашнее задание: 10.11.1. Базовый JS. Циклы и массивы. Для курса PHP-Pro (Skillfactory)
Автор: Александр Климок / [kydechuk01](https://github.com/kydechuk01/)
<br>Дата: 18.03.2024



## Проект: Склад фруктов с панелью управления

### В работе использованы:
- HTML5, CSS, JS, Markdown, Git via [github.com](https://github.com)
- Редактор VSCode
### Запуск проекта

* Открыть файл [index.html](./index.html) любым браузером.
* [Страница задания](https://kydechuk01.github.io/MOD11-Fruits/) на github pages.
  
### Список решенных задач по условиям задания

1. Задача №1. При загрузке страницы динамически формируется список карточек на основе исходных данных в JSON-формате. Реализовать функцию display, которая получает на вход массив элементов и отображает их на странице. Есть кнопка «Перемешать», которая перемешивает карточки в хаотичном порядке. При неудаче выводится предупреждение через alert.

2. При нажатии на кнопку «Фильтровать» происходит фильтрация элементов массива по полю Вес.
При нажатии на кнопку «Сортировать» происходит сортировка элементов по полю Цвет, вычисляется время работы алгоритма и записывается в поле «Время сортировки».

3. При нажатии на кнопку «Сменить алгоритм сортировки» происходит смена алгоритма сортировки между сортировкой пузырьком (bubbleSort) и быстрой сортировкой (quickSort), текущий алгоритм записывается в поле «Алгоритм сортировки».

4. При нажатии на кнопку «Добавить фрукт» в конец списка добавляется новый элемент. При неудаче (одно из полей пустое, или попытка ввести дубликат) выводится предупреждение через alert.

### Также реализованы дополнительные функции:
- функция ПЕРЕМЕШИВАНИЯ карточек реализована более оптимальным способом, без дробления массива на части
- к блоку фильтров на панель управления добавлен вывод количества карточек: показано/всего
- добавлены текстовые кнопки "Сбросить фильтр" и "Очистить склад"
- применение фильтра к карточкам не очищает исходные данные и к ним всегда можно вернуться, в том числе, с включенным фильтром можно: добавлять новые карточки, сортировать, пермешивать карточки без ограничений.
- добавление новой карточки реализовано не простыми текстовыми инпутами, а **селекторами сорта и цвета**, в которые при загрузке страницы динамически подгружается актуальный список цветов и сортов объектов (фруктов)
- также, при отрисовке карточек цвет карточки выбирается не через вручную прописанные CSS-стили классов, а динамически заполняется в DOM в соответствии с цветом фрукта на карточке 
- реализована функция добавления нескольких случайных карточек от 1 до 100, с проверкой на уникальность по цвету и сорту. можно сразу добавить несколько сотен карточек, чтобы сравнить время работы различных сортировок
- цвет фона карточек с фруктами изменен на полупрозрачный для лучшей идентификации
- базовое стилевое оформление проекта заменено на более эстетичное
- сделана возможность вертикальной прокрутки бокового меню (.panel__devtools) в случаях, когда пользователь увеличил масштаб страницы и оно не влезает в вертикальный размер экрана