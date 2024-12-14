document.addEventListener('DOMContentLoaded', function () {
    const $taskInput = document.getElementById('new-task');
    const $addButton = document.querySelector('.todo__add-button');
    const $incompleteTasksHolder = document.querySelector('.todo__list--incomplete');
    const $completedTasksHolder = document.querySelector('.todo__list--completed');
  
    const createTaskElement = (taskString) => {
      const $listItem = document.createElement('li');
      $listItem.classList.add('todo__item');
  
      const $checkBox = document.createElement('input');
      $checkBox.type = 'checkbox';
      $checkBox.classList.add('todo__item-checkbox');
  
      const $label = document.createElement('label');
      $label.classList.add('todo__item-label');
      $label.innerText = taskString;
  
      const $editInput = document.createElement('input');
      $editInput.type = 'text';
      $editInput.classList.add('todo__item-text');
  
      const $editButton = document.createElement('button');
      $editButton.classList.add('todo__button', 'todo__button--edit');
      $editButton.innerText = 'Edit';
  
      const $deleteButton = document.createElement('button');
      $deleteButton.classList.add('todo__button', 'todo__button--delete');
      const $deleteImg = document.createElement('img');
      $deleteImg.src = './remove.svg';
      $deleteImg.classList.add('todo__button-img');
      $deleteButton.appendChild($deleteImg);
  
      $listItem.appendChild($checkBox);
      $listItem.appendChild($label);
      $listItem.appendChild($editInput);
      $listItem.appendChild($editButton);
      $listItem.appendChild($deleteButton);
  
      return $listItem;
    };
  
    const bindTaskEvents = ($taskListItem) => {
      const $checkBox = $taskListItem.querySelector('.todo__item-checkbox');
      const $editButton = $taskListItem.querySelector('.todo__button--edit');
      const $deleteButton = $taskListItem.querySelector('.todo__button--delete');
  
      $checkBox.addEventListener('change', toggleTaskState);
      $editButton.addEventListener('click', editTask);
      $deleteButton.addEventListener('click', deleteTask);
    };
  
    const addTask = () => {
      if (!$taskInput.value) return;
  
      const $listItem = createTaskElement($taskInput.value);
      $incompleteTasksHolder.appendChild($listItem);
      bindTaskEvents($listItem);
  
      $taskInput.value = '';
    };
  
    const editTask = (event) => {
      const $taskListItem = event.target.closest('.todo__item');
      const $editInput = $taskListItem.querySelector('.todo__item-text');
      const $label = $taskListItem.querySelector('.todo__item-label');
  
      if ($taskListItem.classList.contains('todo__item--edit-mode')) {
        $label.innerText = $editInput.value;
        event.target.innerText = 'Edit';
      } else {
        $editInput.value = $label.innerText;
        event.target.innerText = 'Save';
      }
  
      $taskListItem.classList.toggle('todo__item--edit-mode');
    };
  
    const deleteTask = (event) => {
      const $taskListItem = event.target.closest('.todo__item');
      $taskListItem.remove();
    };
  
    const toggleTaskState = (event) => {
      const $taskListItem = event.target.closest('.todo__item');
      if (event.target.checked) {
        $completedTasksHolder.appendChild($taskListItem);
      } else {
        $incompleteTasksHolder.appendChild($taskListItem);
      }
      bindTaskEvents($taskListItem);
    };
  
    $addButton.addEventListener('click', addTask);
  
    const initializeTasks = () => {
      Array.from($incompleteTasksHolder.children).forEach(($item) => {
        bindTaskEvents($item);
      });
      Array.from($completedTasksHolder.children).forEach(($item) => {
        bindTaskEvents($item);
      });
    };
  
    initializeTasks();
  });
  