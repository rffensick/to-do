function createElement(tagName, props, ...children) {
	const element = document.createElement(tagName);

	Object.keys(props).forEach(key => element[key] = props[key]);

	if (children.length > 0) {
		children.forEach(child => {
			if (typeof child === 'string') {
				child = document.createTextNode(child);
			}
			element.appendChild(child);
		});
	}

	return element;
}

function createTdItem(nameTitle, rankTitle, scoreTitle) {
	var inputName = createElement('input', {type: 'text', className: 'form-control'});
	var tdName = createElement('td', {}, nameTitle, inputName);

	var inputRank = createElement('input', { type: 'text', className: 'form-control' });
	var tdRank = createElement('td', {}, rankTitle, inputRank);

	var inputScore = createElement('input', { type: 'text', className: 'form-control' });
	var tdScore = createElement('td', {}, scoreTitle, inputScore);

	var deleteButton = createElement('a', { className: 'btn btn-danger delete'}, 'Delete');
	var editButton = createElement('a', { className: 'btn btn-warning edit'}, 'Edit');
	var btnGroup = createElement('div', { className: 'btn-group' }, deleteButton, editButton);
	var tdButtons = createElement('td', {}, btnGroup);

	var trItem = createElement('tr', { className: 'tr-item' }, tdName, tdRank, tdScore, tdButtons);

	bindEvents(trItem);

	return trItem;
}

function bindEvents(trItem) {
	const deleteButton = trItem.querySelector('.delete');
	const editButton = trItem.querySelector('.edit');

	deleteButton.addEventListener('click', deleteItem);
	editButton.addEventListener('click', editItem);
}

function deleteItem() {
	var self = this;

	var trItem = self.parentNode.parentNode.parentNode;
	trItem.remove();
}

function editItem() {
	var self = this;

	var trItem = self.parentNode.parentNode.parentNode;
	var editButton = trItem.querySelector('.edit');
	var allInputsInItem = trItem.querySelectorAll('input[type="text"]');

	trItem.classList.toggle('editing');

	for (var i = 0; i < allInputsInItem.length; i++) {
		var eachTd = allInputsInItem[i].parentNode;
		var eachTdTextContent = eachTd.textContent || eachTd.innerText;
		console.log(eachTdTextContent);
		if (trItem.classList.contains('editing')) {
			allInputsInItem[i].value = eachTdTextContent;
			editButton.innerText = 'Save';
			editButton.classList.remove('btn-warning');
			editButton.classList.add('btn-success');
		} else {
			eachTd.innerText = allInputsInItem[i].value;
			var input = createElement('input', {type: 'text', className: 'form-control'});
			eachTd.appendChild(input);
			editButton.innerText = 'Edit';
			editButton.classList.remove('btn-success');
			editButton.classList.add('btn-warning');
		}

	}
}

function sb(event) {
	event.preventDefault();

	if (!inputName.value) {
		alert('Enver please value');
	}

	var addItem = createTdItem(inputName.value, inputRank.value, inputScore.value);
	tbody.appendChild(addItem);
}


const form = document.querySelector('form');

const tbody = document.querySelector('table tbody');
const inputName = document.querySelector('input[name="addname"]');
const inputRank = document.querySelector('input[name="addrank"]');
const inputScore = document.querySelector('input[name="addscore"]');
const table = document.querySelector('table');
const allTrItems = document.querySelectorAll('.tr-item');
console.log(allTrItems);
console.log(table);
console.log(form);
console.log(inputName);
console.log(inputRank);
console.log(inputScore);
console.log(tbody);

form.addEventListener('submit', sb);
function main() {
	allTrItems.forEach(item => bindEvents(item));
}

main();
