class TodoApp {

  constructor() {
    this.taskInput = document.getElementById('task');
    this.addTaskButton = document.getElementById('addTaskButton');
    this.taskList = document.getElementById('taskList');
    this.addTaskForm = document.getElementById('addTaskForm');
    this.registerEvents();
  }

  registerEvents() {
    this.addTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addTask(this.taskInput.value);
      this.addTaskForm.reset();
    });
  }

  addTask(task) {
    if (task.length === 0) {
      return;
    }
    const item = document.createElement('li');
    item.textContent = task;
    TweenMax.from(this.taskList.appendChild(item), 0.5, {x:300, opacity:0, scale:0.5});
    

    const deleteTaskButton = this.createElem('button', 'class', 'delete-task', 'Delete');
    const editTaskButton = this.createElem('button', 'class', 'edit-task', 'Edit');
    const doneTaskButton = this.createElem('button', 'class', 'done-task', 'Done');

    taskList.appendChild(deleteTaskButton);
    taskList.appendChild(editTaskButton);
    taskList.appendChild(doneTaskButton);

    deleteTaskButton.addEventListener('click', () => {
      TweenMax.to(item, 3, { ease:Elastic.easeOut, delay:0.3, autoAlpha:0.4});
      setTimeout(function(){ item.remove(); }, 2000);
      deleteTaskButton.remove();
      editTaskButton.remove();
      doneTaskButton.remove();
    });

    editTaskButton.addEventListener('click', () => {
      let input = prompt('Измените текст задачи', item.textContent);
      if (input === null) {
        return;
      }
      item.textContent = input;
      TweenMax.to(item, 0.1, {delay:0.5 , x:"+=5", yoyo:true, repeat:11});
      TweenMax.to(item, 0.1, {delay:0.5 , x:"-=5", yoyo:true, repeat:11});
    });

    doneTaskButton.addEventListener('click', () => {
      deleteTaskButton.remove();
      editTaskButton.remove();
      doneTaskButton.remove();
      item.style.textDecoration = 'line-through';
      item.style.color = '#00cc00';
      item.style.boxShadow = '0 0 7px 2px #00cc00';
    });
  }

  //the method create any element with one attribute and return html code: <tagName attrName = "attrValue" >content(optional)</tagName>
  createElem(tagName, attrName, attrValue, content = '') {
    let elem = document.createElement(tagName);
    let attr = document.createAttribute(attrName);
    attr.value = attrValue;
    elem.setAttributeNode(attr);
    elem.textContent = content;
    return elem;
  }
}

new TodoApp();