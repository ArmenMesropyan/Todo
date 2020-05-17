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
    const deleteConfirm = confirm('Do you really want to delete this task?');
    if (!deleteConfirm) return;

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

function setTheme(theme, themes) {
    document.body.className = theme;
    const selectedTheme = themes[theme];
    Object.entries(selectedTheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
}

function onThemeSelect({ target }, themes) {
    const theme = target.value;
    setTheme(theme, themes);
}

document.addEventListener('DOMContentLoaded', () => {
    // Elements

    const form = document.forms.todoForm;
    const input = form.elements.task;
    const themeSelect = document.querySelector('.theme__select');
    const test = [{
            title: 'Do sport',
            done: false,
        },
        {
            title: 'Wake up at 5:00 AM',
            done: true,
        },
    ];
    const themes = {
        default: {
            '--header-background': '#27cfd4',
            '--header-color': '#fff',
            '--border-color': '#fff',
            '--border-hover': 'rgba(255, 255, 255, 0.554)',
            '--btn-border': '#64b5f6',
            '--todo-background': 'rgb(92, 200, 191)',
            '--todo-color': '#fff',
            '--todo-border': 'rgb(92, 200, 191)',
        },
        black: {
            '--header-background': '#000',
            '--header-color': '#fff',
            '--border-color': '#fff',
            '--border-hover': 'rgba(255, 255, 255, 0.554)',
            '--btn-border': '#000',
            '--todo-background': '#000',
            '--todo-color': '#fff',
            '--todo-border': '#fff',
        },
        white: {
            '--header-background': '#fff',
            '--header-color': '#000',
            '--border-color': '#000',
            '--border-hover': '#fff',
            '--btn-border': '#000',
            '--todo-background': '#fff',
            '--todo-color': '#000',
            '--todo-border': '#000',
        },
    };

    addTasks(test);
    addListeners();

    // Events

    themeSelect.addEventListener('change', (e) => {
        onThemeSelect(e, themes);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!checkInputLength(input)) {
            alert('Please write your task!');
            return;
        }
        addTasks([{ title: input.value }]);
        form.reset();
        addListeners();
        // addTasksToStorage({ title: input.value });
    });
});