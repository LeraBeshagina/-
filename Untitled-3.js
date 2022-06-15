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

    massiv = await GetReceive().then();
    HTML_List();
}

let currentTasks; //задачи на экране
let massiv = [];
let todoElem = [];
let text_elem = [];
let count = 0;
let countTask = 0;
dat = [];

function Task (text, prior, id) {
    this.text = text;
    this.prior = prior;
    this.data = String((new Date).getHours() + ":" + (new Date).getMinutes() + ":"+(new Date).getSeconds()+", " + (new Date).getDate() + "."+ (new Date).getMonth() + "." + (new Date).getFullYear());
    this.completed = false;
    this.id = id;
}


function HTML_List(){
    list.innerHTML = "";
    dat = []
    for (let i = 0; i<massiv.length; i++){
        if (massiv[i].completed) {
            list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
        } else{
            list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
        }
        dat.push(massiv[i].data)    
        }      
    todoElem = document.querySelectorAll(".todo");
    text_elem = document.querySelectorAll(".text");
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
        HTML_List();
        dat.push(task.data);
        input.value = "";
        count ++;
       
    };
};

 async function GetReceive (){
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

    function PutTask(itemId, updatentask) {
        fetch(`http://127.0.0.1:3000/items/${itemId}`, { 
        method: 'PUT',
        headers: {'Content-Type': "application/json; charset=utf-8"},
        body: JSON.stringify(updatentask)
        })
    }

    function DeleteTask(itemId) {
        console.log(itemId)
        fetch(`http://127.0.0.1:3000/items/${itemId}`, { 
        method: 'DELETE',
        })
    }

// функция удаления дела
async function Delete(index) {
    //const item = e.target;
    addEventListener
    await DeleteTask(massiv[index].id);
    getTasks().then();

};
// функция "Сделано"
 async function Done(index) {
    task_new = {
    text: massiv[index].text,
    prior: massiv[index].prior,
    data: massiv[index].data,
    completed: true,
    id: massiv[index].id,
    };
    todoElem[index].classList.add("completed");
    await PutTask(massiv[index].id, task_new);  
    getTasks().then();
};

// Функция изменения
async function Change(index){
  task_new = {
  text: document.querySelector(`.text${index}`).value,
  prior: massiv[index].prior,
  data: massiv[index].data,
  completed: massiv[index].completed,
  id: massiv[index].id,
  };
  await PutTask(massiv[index].id, task_new);
  getTasks().then();

}

function Create_F(text_value,prioritet,date, index){
    return `
    <div class = "todo">
    <div class = "todo2">
    <li class = "item"><input type="text" onchange="Change(${index})" class = "text${index}" style="border: none;color:rgb(36, 95, 18);font-size: 1.5rem;" value = "${text_value}"></li>
    <li class = "data">Приоритет: ${prioritet}</li>
    <li class = "data">Дата: ${date}</li>
    </div>
    <div class = "todo3">
    <button onclick = "Done(${index})" class = "done-button"}>Сделано</button>
    <button  class = "del-button" onclick = "Delete(${index})">Удалить</button>
    </div>
    </div>`

}


function Create_d(text_value,prioritet,date, index){
    return `
    <div class = "todo completed" >
    <div class = "todo2">
    <li class = "item"><input type="text" onchange="Change(${index})" class = "text${index}" style="border: none;color:rgb(36, 95, 18);font-size: 1.5rem;" value = "${text_value}"></li>
    <li class = "data">Приоритет: ${prioritet}</li>
    <li class = "data">Дата: ${date}</li>
    </div>
    <div class = "todo3">
    <button onclick = "Done(${index})" class = "done-button"}>Сделано</button>
    <button  onclick = "Delete(${index})" class = "del-button">Удалить</button>
    </div>
    </div>`
    

}
// сортировка по датам
function Sort(){
    dat_sort_new = [];
    dat_sort_old = [];
    massiv_new = [];
    for (let i=0; i<massiv.length; i++){
        dat_sort_new.push(massiv[i].data);
        dat_sort_old.push(massiv[i].data);
        massiv_new.push(massiv[i]);
    }
       if (select2.value == "Недавние"){
        list.innerHTML= "";
           dat_sort_new.reverse();
           for (let i = 0; i < massiv_new.length; i ++){
            for (let j = 0; j < massiv_new.length; j ++){
                if (dat_sort_new[i] == massiv_new[j].data){
                    if (massiv_new[j].completed) {
                        list.innerHTML += Create_d(massiv_new[j].text, massiv_new[j].prior, massiv_new[j].data, j); 
                    } else{
                        list.innerHTML += Create_F(massiv_new[j].text, massiv_new[j].prior, massiv_new[j].data, j);
                    }
                }
            }
           }
       }  if   (select2.value == "Старые"){
        list.innerHTML= "";
        for (let i = 0; i < massiv_new.length; i ++){
            for (let j = 0; j < massiv_new.length; j ++){
                if (dat_sort_old[i] == massiv_new[j].data){
                    if (massiv_new[j].completed) {
                        list.innerHTML += Create_d(massiv_new[j].text, massiv_new[j].prior, massiv_new[j].data, j); 
                    } else{
                        list.innerHTML += Create_F(massiv_new[j].text, massiv_new[j].prior, massiv_new[j].data, j);
                    }
                }
            }
           }
       }  
}

function Check(a) {
    if (a.checked == true){
        a.checked = false;
    } 
}

function getChecked_Low() {
    let massiv2 = [];
    list.innerHTML = "";
    Check(checkbox1);
    if (checkbox2.checked== false && checkbox3.checked == false && checkbox4.checked == false) {
        checkbox1.checked = true;
        getChecked();};

    if (checkbox2.checked== true && checkbox3.checked == true && checkbox4.checked) {
        checkbox1.checked = true;
        getChecked();
    }
    if (checkbox2.checked== true && checkbox3.checked && checkbox4.checked == false){
        massiv2 = [];
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == "Средний" || massiv[i].prior == "Низкий"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
              massiv2.push(massiv[i].data);
          }
      }
    }
    if (checkbox4.checked== true && checkbox2.checked && checkbox3.checked == false){
         massiv2 = [];
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == "Высокий" || massiv[i].prior == "Низкий"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
              massiv2.push(massiv[i].data);
          }
      }
    }
    if (checkbox2.checked== true && checkbox3.checked == false && checkbox4.checked == false){
        massiv2 = [];
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == "Низкий"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
              massiv2.push(massiv[i].data);
          }
      }
    }
    if (select2.value == "Недавние"){
        list.innerHTML = "";
        massiv2.reverse();
        for (let i = 0; i<count; i++){
            for (let j=0; j< count; j++){
                if (massiv2[i] == massiv[j].data){
                    if (massiv[i].completed) {
                        list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
                    } else{
                        list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
                    }
                };
            };
        };
    }
    if (select2.value == "Cтарые"){
        list.innerHTML = "";
        for (let i = 0; i<count; i++){
            for (let j=0; j< count; j++){
                if (massiv2[i] == massiv[j].data){
                    if (massiv[i].completed) {
                        list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
                    } else{
                        list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
                    }
                };
            };
        };
    }
}

function getChecked_Medium() {

    let massiv2 = [];
    list.innerHTML = "";
  Check(checkbox1);
  if (checkbox2.checked== false && checkbox3.checked == false && checkbox4.checked == false) {
    checkbox1.checked = true;
    getChecked();};

  if (checkbox2.checked== true && checkbox3.checked == true && checkbox4.checked) {
      checkbox1.checked = true;
      getChecked();
  }
  if (checkbox2.checked== true && checkbox3.checked && checkbox4.checked == false){
    massiv2 = [];
    for (let i = 0; i<massiv.length; i++){
        if(massiv[i].prior == "Средний" || massiv[i].prior == "Низкий"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
        }
    }
  }
  if (checkbox3.checked== true && checkbox4.checked && checkbox2.checked == false){
    massiv2 = [];
    for (let i = 0; i<massiv.length; i++){
        if(massiv[i].prior == "Высокий" || massiv[i].prior == "Средний"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
        }
    }
  }
  if (checkbox3.checked== true && checkbox2.checked == false && checkbox4.checked == false){
    massiv2 = [];
    for (let i = 0; i<massiv.length; i++){
        if(massiv[i].prior == "Средний"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data,  i);
            }
        }
    }
  }
  if (select2.value == "Недавние"){
    list.innerHTML = "";
    massiv2.reverse();
    for (let i = 0; i<count; i++){
        for (let j=0; j< count; j++){
            if (massiv2[i] == massiv[j].data){
                if (massiv[i].completed) {
                    list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
                } else{
                    list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
                }
            };
        };
    };
}
if (select2.value == "Cтарые"){
    list.innerHTML = "";
    for (let i = 0; i<count; i++){
        for (let j=0; j< count; j++){
            if (massiv2[i] == massiv[j].data){
                if (massiv[i].completed) {
                    list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
                } else{
                    list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
                }
            };
        };
    };
}
}

function getChecked_High() {
    let massiv2 = [];
    list.innerHTML = "";
    Check(checkbox1);
    if (checkbox2.checked== false && checkbox3.checked == false && checkbox4.checked == false) {
        checkbox1.checked = true;
        getChecked();}; 

    if (checkbox2.checked== true && checkbox3.checked == true && checkbox4.checked) {
        checkbox1.checked = true;
        getChecked();
    }
    if (checkbox4.checked== true && checkbox2.checked && checkbox3.checked == false){
         massiv2 = [];
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == "Высокий" || massiv[i].prior == "Низкий"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data, i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data, i);
            }
          }
      }
    }
    if (checkbox4.checked== true && checkbox3.checked && checkbox2.checked == false){
         massiv2 = [];
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == "Высокий" || massiv[i].prior == "Средний"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data,  i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data,  i);
            }
          }
      }
    }
    if (checkbox4.checked== true && checkbox2.checked == false && checkbox3.checked == false){
         massiv2 = [];
      for (let i = 0; i<massiv.length; i++){
          if(massiv[i].prior == "Высокий"){
            if (massiv[i].completed) {
                list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data,  i); 
            } else{
                list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data,  i);
            }
          }
      }
    }
    if (select2.value == "Недавние"){
        list.innerHTML = "";
        massiv2.reverse();
        for (let i = 0; i<count; i++){
            for (let j=0; j< count; j++){
                if (massiv2[i] == massiv[j].data){
                    if (massiv[i].completed) {
                        list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data,  i); 
                    } else{
                        list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data,  i);
                    }
                };
            };
        };
    }
    if (select2.value == "Cтарые"){
        list.innerHTML = "";
        for (let i = 0; i<count; i++){
            for (let j=0; j< count; j++){
                if (massiv2[i] == massiv[j].data){
                    if (massiv[i].completed) {
                        list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data,  i); 
                    } else{
                        list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data,  i);
                    }
                };
            };
        };
    }
}

function getChecked() {
    Check(checkbox2);
    Check(checkbox3);
    Check(checkbox4);
    list.innerHTML = "";
    for (let i = 0; i<massiv.length; i++){
        if (massiv[i].completed) {
            list.innerHTML += Create_d(massiv[i].text, massiv[i].prior, massiv[i].data,  i); 
        } else{
            list.innerHTML += Create_F(massiv[i].text, massiv[i].prior, massiv[i].data,  i);
        }
        }
    
    }