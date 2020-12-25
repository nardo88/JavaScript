
// объявили функцию filterByType которая принимает в качестве аргумента тип, все остальные аргументы с помощью оператора
// rest помещаются в массив values. Далее функция возвращает отфильтрованный массив со значениями value тип которых равен
// типу который мы получили первым аргументом
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// объявляем вторую функцию
	hideAllResponseBlocks = () => {
		// эта функция создает массив (не псевдомассив) responseBlocksArray который мы получаем с помощью 
		// метода from класса Array. В качестве аргумента метод from получает псевдомассив элементов DOM
		// блоков DIV c классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// после этого мы перебираем этот массив методом forEach и у всех элементов массива устанавливаем CSS
		// свойство display в значение none, иными словами мы скрываем эти элементы
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// функция showResponseBlock имеет три входных параметра:
	// 1. селектор блока 2. текст сообщения 3. селектор тега span
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// сначала мы запускаем функцию hideAllResponseBlocks, тем самым скрываем все блоки с классом dialog__response-block
		hideAllResponseBlocks();
		// затем обращаемся к элементу селектор которого мы получили в качестве первого аргумента
		// и устанавливаем ему CSS свойство display в значение block т.е. отображаем его
		document.querySelector(blockSelector).style.display = 'block';
		// если нам передали spanSelector (т.е. он существует)
		if (spanSelector) {
			// то мы в этот спан помещаем текст который содержится в переменной msgText которую мы получили вторым аргументом
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// функция showError принимает строку с сообщением, вызывает функию showResponseBlock передавая ей три аргумента
	// применяется к блоку в стилях которого указано цвет фона и цвет текста красный т.е. ошибка
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// функция showResults принимает строку с сообщением, вызывает функию showResponseBlock передавая ей три аргумента
	// применяется к блоку в стилях которого указано цвет фона и цвет текста зеленый т.е. все хорошо
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// функция showNoResults принимает строку с сообщением, вызывает функию showResponseBlock передавая ей три аргумента
	// применяется к дефольтному блоку в котором говорится что результат нет, показывать еще нечего
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// объявляем функцию tryFilterByType, которая принимает два аргументаЖ тип и значения
	tryFilterByType = (type, values) => {
		// начало блока try, т.е. код внутри этого блока будет выполнен и если на этом участке кода будет ошибка, то script
		// не упадет. а просто выполнится участок кода в блоке catch
		try {
			// здесь мы объявляем переменну valuesArray (константу) куда помещаем результат функции eval. Что делает eval? 
			// eval() исполняет содержащееся в строке выражение, т.е. будет вызвана функция filterByType, которой будут переданы 
			// аргументы type и values которые мы получили ан вход функции tryFilterByType. filterByType возвращает массив, и 
			// этот массив мы превращаем в строку с помощью метода join разделяя элементы массива запятой и пробелом
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// здесь мы используем тернарный оператор. если массив valuesArray не пустой то в переменную alertMsg (текст сообщения)
			const alertMsg = (valuesArray.length) ?
				// мы помещаем текст Данные с типом ${type} имею значения ${valuesArray}
				`Данные с типом ${type}: ${valuesArray}` :
				// иначе помещаем текст Отсутствуют данные типа ${type}
				`Отсутствуют данные типа ${type}`;
			// после этого вызываем функцию showResults которая отобразит блок с результатом (т.е. с сообщением alertMsg)
			showResults(alertMsg);
		// блок catch на случай если блок try вернет ошибку	
		} catch (e) {
			// вызываем функцию showError и на вход даем ей строку ошибка и объект события который содержит данные об ошибке
			showError(`Ошибка: ${e}`);
		}
	};
// получаем кнопку
const filterButton = document.querySelector('#filter-btn');
// на кнопку вешаем слушатель события клик
filterButton.addEventListener('click', e => {
	// получаем выпадающий список select "Тип данных"
	const typeInput = document.querySelector('#type');
	// получаем поле ввода "Данные"
	const dataInput = document.querySelector('#data');
	// если поле ввода "Данные" пустое
	if (dataInput.value === '') {
		// Метод setCustomValidity() устанавливает  специальное сообщение для  выбранного элемента. Если элемент не 
		// имеет пользовательской ошибки в параметре укажите пустую строку, мы же передаем строку Поле не должно быть пустым!
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// и вызываем функцию которая отображает дефолтное сообщение о том что результат нет
		showNoResults();
		// иначе, т.е. поле ввода "Данные" НЕ пустое
	} else {
		// убираем специальное сообщение
		dataInput.setCustomValidity('');
		// отключаем стандартное поведение браузера 
		e.preventDefault();
		// и вызываем функцию tryFilterByType. На вход даем значение выпадающего списка select у которого обрезаем пробелы по обеисм сторонам
		// вторым параметром передаем значение поля ввода "Данные" которые так же тримим (удаляем пробелы по обеим сторонам)
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

