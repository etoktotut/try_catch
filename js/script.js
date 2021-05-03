const filterByType = (type, ...values) => values.filter(value => typeof value === type), //задаем функцию которая фильтрует получнный массив оставляя только значения полученного типа 

	hideAllResponseBlocks = () => { // задаем функцию скрытия информационных блоков со страницы
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создаем массив из коллекции полученных элементов со страницы ( элементы Div с классом dialog__response-block )
		responseBlocksArray.forEach(block => block.style.display = 'none'); //перебираем массив элементов, делая каждый элемент невидимым
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //задаем универсальную функцию вывода информационного блока на экран с опциональным сообщением в спане
		hideAllResponseBlocks(); //делаем все блоки невидимыми
		document.querySelector(blockSelector).style.display = 'block'; // показываем один конкретный блок в соответствии с полученным селектором
		if (spanSelector) { // если был передан конкретный span
			document.querySelector(spanSelector).textContent = msgText; //то прописываем в спан переданный текст
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //задаем функцию вывода сообщения об ошибке в блоке сообщений об ошибке

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //задаем функцию вывода сообщения в информационном блоке

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //задаем функцию вывода сообщения в блоке об отсутствии результатов

	tryFilterByType = (type, values) => { //задаем главную функцию программы фильтрации введенного значения и выбранного типа данных
		try { // проверяем на отсутствие ошибок в выполняемом коде
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //фильтруем переданный массив в массив с результатами
			const alertMsg = (valuesArray.length) ? //проверяем наличие результатов фильтрации (длина результирующего массива больше 0),
				`Данные с типом ${type}: ${valuesArray}` : //если результаты есть то формируем информационную строку с полученными результатами
				`Отсутствуют данные типа ${type}`; // если результатов нет, то формируем информационную строку об отсутствии результатов
			showResults(alertMsg); // вызываем функцию вывода сообщения в информационном блоке
		} catch (e) { // если в предыдущем коде была обнаружена ошибка
			showError(`Ошибка: ${e}`); //то вызываем функцию вывода сообщения об ошибке в блоке сообщений об ошибке и передаем в качестве параметра необходимое сообщение c текстом самой ошибки

		}
	};

const filterButton = document.querySelector('#filter-btn'); //задаем переменную связанную с кнопкой фильтрации в верстке

filterButton.addEventListener('click', e => { //вешаем слушатель событий на кнопке на клик 
	const typeInput = document.querySelector('#type'); //задаем переменную связанную с селектором типов данных
	const dataInput = document.querySelector('#data'); //задаем переменную связанную с полем ввода данных

	if (dataInput.value === '') { //проверяем поле ввода на отсутствие введенных данных
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //если поле пустое, то формируем сообщение для функции вывода подсказки внутренней браузерной валидации
		showNoResults(); // активируем функцию вывода сообщения в блоке об отсутствии результатов
	} else {
		dataInput.setCustomValidity(''); //если поле ввода не пустое, то очищаем сообщение для функции вывода подсказки внутренней браузерной валидации
		e.preventDefault(); // отключаем поведение кнопки по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запускаем основную функцию фильтрации введенного значения и выбранного типа данных
	}
});