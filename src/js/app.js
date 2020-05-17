// functions

function taskTemplate({ title, done }) {
    return `
		<li class="todo-lists__item ${done ? 'todo-lists__item_done' : ''}">
			<fieldset class="todo-list__checkbox">
				<label>
					${done ? 'Assign false' : 'Assign done'}
					<input type="checkbox" name="todo-checkbox" ${done ? 'checked' : ''}>
				</label>
			</fieldset>
			<h3 class="todo-lists__title">
				${title}
			</h3>
			<ul class="todo-lists__actions">
				<li class="todo-lists__aciton todo-lists__aciton_edit">
					<button type="button">Edit</button>
				</li>
				<li class="todo-lists__aciton todo-lists__aciton_delete">
					<button type="button">Delete</button>
				</li>
			</ul>
		</li>
	`;
}

function addTasks(tasks) {
    if (!tasks.length) return;

    const container = document.querySelector('.todo-lists__list');
    tasks.forEach((task) => {
        const template = taskTemplate(task);
        container.insertAdjacentHTML('afterbegin', template);
    });
}

function onCheckbox() {
    const checkbox = this;
    const parent = checkbox.closest('li');
    if (checkbox.checked) parent.classList.add('todo-lists__item_done');
    else parent.classList.remove('todo-lists__item_done');
}

function onDelete(btn) {
    const li = btn.closest('.todo-lists__item');
    const parent = li.parentElement;
    parent.removeChild(li);

    // delteInStorage();
}

function onEdit(btn) {
    const edit = prompt('Write something');
    const parent = btn.closest('.todo-lists__item');
    const title = parent.querySelector('h3');

    if (!edit) return;

    title.innerHTML = edit;
    // editInStorage();
}

function addCheckboxsListeners() {
    const checkboxs = document.querySelectorAll('.todo-list__checkbox input');

    if (!checkboxs.length) return;

    checkboxs.forEach((checkbox) => {
        checkbox.addEventListener('change', onCheckbox);
    });
}

function onActionsClick() {
    const isEdit = this.classList.contains('todo-lists__aciton_edit');
    if (isEdit) onEdit(this);
    else onDelete(this);
}

function addActionsListeners() {
    const buttons = document.querySelectorAll('.todo-lists__aciton');

    if (!buttons) return;

    buttons.forEach((btn) => {
        btn.addEventListener('click', onActionsClick);
    });
}

function addListeners() {
    addCheckboxsListeners();
    addActionsListeners();
}

function checkInputLength(elem) {
    const { value } = elem;
    if (!value || value.length > 14) return false;

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    // Elements

    const form = document.forms.todoForm;
    const input = form.querySelector('.todo-form__input');
    const test = [{
            title: 'Do sport',
            done: false,
        },
        {
            title: 'Wake up at 5:00 AM',
            done: true,
        },
    ];

    addTasks(test);
    addListeners();

    // Events

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!checkInputLength(input)) {
            // show input error
            return;
        }
        addTasks([{ title: input.value }]);
        addListeners();
        // addTasksToStorage({ title: input.value });
    });
});