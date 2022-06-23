const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
const select1 = document.querySelector(".filter");
const select2 = document.querySelector(".filter2");
const checkbox1 = document.getElementById("Choice1");
const checkbox2 = document.getElementById("Choice2");
const checkbox3 = document.getElementById("Choice3");
const checkbox4 = document.getElementById("Choice4");

button.addEventListener("click", addTodo);

getTasks().then();

async function getTasks() {

    massiv = await getReceive().then();
    htmlList();
}

let currentTasks; //задачи на экране
let massiv = [];
let todoElem = [];
let textElem = [];
let count = 0;
let countTask = 0;

function Task (text, prior, id) {
    this.text = text;
    this.prior = prior;
    this.data = String((new Date).getHours() + ":" + (new Date).getMinutes() + ":"+(new Date).getSeconds()+", " + (new Date).getDate() + "."+ (new Date).getMonth() + "." + (new Date).getFullYear());
    this.completed = false;
    this.id = id;
}


function htmlList(){
    list.innerHTML = "";
    for (let i = 0; i<massiv.length; i++){
        if (massiv[i].completed) {
            list.innerHTML += createD(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
        } else{
            list.innerHTML += createF(massiv[i].text, massiv[i].prior, massiv[i].data, i);
        } 
        }      
    todoElem = document.querySelectorAll(".todo");
    textElem = document.querySelectorAll(".text");
    checkbox1.checked = true;
    checkbox2.checked = false;
    checkbox3.checked = false;
    checkbox4.checked = false;
    todoElem.push;
}

// функция добавления дела
function addTodo(event){

    event.preventDefault();
    for (let i = 0; i<massiv.length; i++){
        countTask = massiv[i].id;
    }
    countTask ++;
    if (input.value == "") {

        alert("Ошибка! Строка не может быть пустой!")
    } else {
        task = new Task(input.value, select1.value, countTask);
        sendTask(task);
        massiv.push(task);
        htmlList();
        input.value = "";
        count ++;
       
    };
};

 async function getReceive (){
   return await fetch("http://127.0.0.1:3000/items", {
    method: 'GET',
    headers: {'Content-Type': "application/json; charset=utf-8"}
    }).then((data) => data.json());
    }

    function sendTask(task) {
        fetch('http://127.0.0.1:3000/items', { 
        method: 'POST',
        headers: {'Content-Type': "application/json; charset=utf-8"},
        body: JSON.stringify(task)
        })
    }

    function putTask(itemId, updatentask) {
        fetch(`http://127.0.0.1:3000/items/${itemId}`, { 
        method: 'PUT',
        headers: {'Content-Type': "application/json; charset=utf-8"},
        body: JSON.stringify(updatentask)
        })
    }

    function deleteTask(itemId) {
        fetch(`http://127.0.0.1:3000/items/${itemId}`, { 
        method: 'DELETE',
        })
    }

// функция удаления дела
async function Delete(index) {
    //const item = e.target;
    addEventListener
    await deleteTask(massiv[index].id);
    getTasks().then();

};
// функция "Сделано"
 async function done(index) {
    taskNew = {
    text: massiv[index].text,
    prior: massiv[index].prior,
    data: massiv[index].data,
    completed: true,
    id: massiv[index].id,
    };
    todoElem[index].classList.add("completed");
    
    await putTask(massiv[index].id, taskNew);  
    getTasks().then();
};

// Функция изменения
async function change(index){
  taskNew = {
  text: document.querySelector(`.text${index}`).value,
  prior: massiv[index].prior,
  data: massiv[index].data,
  completed: massiv[index].completed,
  id: massiv[index].id,
  };
  await putTask(massiv[index].id, taskNew);
  getTasks().then();

}

function createF(textValue,priority,date, index){
    return `
    <div class = "todo">
    <div class = "todo2">
    <li class = "item"><input type="text" onchange="change(${index})" class = "text${index}" style="border: none;color:rgb(36, 95, 18);font-size: 1.5rem;" value = "${textValue}"></li>
    <li class = "data">Приоритет: ${priority}</li>
    <li class = "data">Дата: ${date}</li>
    </div>
    <div class = "todo3">
    <button onclick = "done(${index})" class = "done-button"}>Сделано</button>
    <button  class = "del-button" onclick = "Delete(${index})">Удалить</button>
    </div>
    </div>`

}


function createD(textValue,priority,date, index){
    return `
    <div class = "todo completed" >
    <div class = "todo2">
    <li class = "item"><input type="text" onchange="change(${index})" class = "text${index}" style="border: none;color:rgb(36, 95, 18);font-size: 1.5rem;" value = "${textValue}"></li>
    <li class = "data">Приоритет: ${priority}</li>
    <li class = "data">Дата: ${date}</li>
    </div>
    <div class = "todo3">
    <button onclick = "done(${index})" class = "done-button"}>Сделано</button>
    <button  onclick = "Delete(${index})" class = "del-button">Удалить</button>
    </div>
    </div>`
    

}
// сортировка по датам
function sort(){
    datSortNew = [];
    datSortOld = [];
    massivNew = [];
    for (let i=0; i<massiv.length; i++){
        datSortNew.push(massiv[i].data);
        datSortOld.push(massiv[i].data);
        massivNew.push(massiv[i]);
    }
       if (select2.value == "Недавние"){
        list.innerHTML= "";
           datSortNew.reverse();
           for (let i = 0; i < massivNew.length; i ++){
            for (let j = 0; j < massivNew.length; j ++){
                if (datSortNew[i] == massivNew[j].data){
                    if (massivNew[j].completed) {
                        list.innerHTML += createD(massivNew[j].text, massivNew[j].prior, massivNew[j].data, j); 
                    } else{
                        list.innerHTML += createF(massivNew[j].text, massivNew[j].prior, massivNew[j].data, j);
                    }
                }
            }
           }
       }  if   (select2.value == "Старые"){
        list.innerHTML= "";
        for (let i = 0; i < massivNew.length; i ++){
            for (let j = 0; j < massivNew.length; j ++){
                if (datSortOld[i] == massivNew[j].data){
                    if (massivNew[j].completed) {
                        list.innerHTML += createD(massivNew[j].text, massivNew[j].prior, massivNew[j].data, j); 
                    } else{
                        list.innerHTML += createF(massivNew[j].text, massivNew[j].prior, massivNew[j].data, j);
                    }
                }
            }
           }
       }  
}

function check(a) {
    if (a.checked == true){
        a.checked = false;
    } 
}

function sorting (sort1, sort2, sort3) {
    list.innerHTML = "";
    check(checkbox1);
    if (!sort1.checked && !sort2.checked && !sort3.checked) {
        checkbox1.checked = true;
        getChecked();};

    if (sort1.checked && sort2.checked && sort3.checked) {
        checkbox1.checked = true;
        getChecked();
    }
    if (sort1.checked && sort2.checked && !sort3.checked){
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == sort1.value || massiv[i].prior == sort2.value){
            if (massiv[i].completed) {
                list.innerHTML += createD(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += createF(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
          }
      }
    }
    if (sort1.checked && !sort2.checked && sort3.checked){
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == sort1.value || massiv[i].prior == sort3.value){
            if (massiv[i].completed) {
                list.innerHTML += createD(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += createF(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
          }
      }
    }
    if (sort1.checked && !sort2.checked && !sort3.checked){
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == sort1.value){
            if (massiv[i].completed) {
                list.innerHTML += createD(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += createF(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
          }
      }
    }
    
}

function getCheckedLow() {
    sorting(checkbox2,checkbox3,checkbox4);
}

function getCheckedMedium() {
    sorting(checkbox3,checkbox2,checkbox4);
}

function getCheckedHigh() {
    sorting(checkbox4,checkbox3,checkbox2);
}

function getChecked() {
    check(checkbox2);
    check(checkbox3);
    check(checkbox4);
    list.innerHTML = "";
    for (let i = 0; i<massiv.length; i++){
        if (massiv[i].completed) {
            list.innerHTML += createD(massiv[i].text, massiv[i].prior, massiv[i].data,  i); 
        } else{
            list.innerHTML += createF(massiv[i].text, massiv[i].prior, massiv[i].data,  i);
        }
        }
    
    }
