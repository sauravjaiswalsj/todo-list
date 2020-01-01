const input= document.querySelector(".form-control");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector(".list-group");
const ul =  document.querySelector(".list-group");
const clearAll = document.querySelector(".clearAll");
const clearDone = document.querySelector(".clearDone")
const localStorageArray=[];
const addTask=(text,isFromLocalStorage)=>{
    if(text!="" || isFromLocalStorage){
        const li =  document.createElement("li");
        li.classList.add("list-group-item");
          if(ul.children.length==0){
            clearAll.style.display="block";
            clearDone.style.display="block";
        }
    li.innerHTML = `<span class="bg-danger text-white" id="remove">x</span><input type="checkbox" id="checkbox" class="ml-2 mr-3"/><span>${text}</span>`;
    ul.appendChild(li);
    if(input.value!=""){
    localStorageArray.push(input.value);
    localStorage.setItem("todoList",JSON.stringify(localStorageArray));
    input.value="";
    input.focus();
    }
    }
};
const fetchAllToDos=()=>{
    const todoListArray = JSON.parse(localStorage.getItem("todoList"));
    todoListArray.forEach(todoItem =>{
        addTask(todoItem);
    });
}; 
const callListClick = e =>{
    if(e.target.id ==="checkbox"){
        if(e.target.checked){
            e.target.nextSibling.style.textDecoration="line-through";
            e.target.nextSibling.classList.remove("text-primary");
            e.target.nextSibling.classList.add("text-danger");
        }else{
            e.target.nextSibling.style.textDecoration = "none";
            e.target.nextSibling.classList.remove("text-danger");
            e.target.nextSibling.classList.add("text-primary");
        }
    }else if(e.target.id==="remove"){
        const toBeRemoved =  e.target.parentNode;
        const removedFrom = toBeRemoved.parentNode;
        removedFrom.removeChild(toBeRemoved);
        const temp = JSON.parse(localStorage.getItem("todoList"));
        temp.forEach(index,item=>{
            if(item == e.target.nextSibling.nextSibling.textContent){
                temp.splice(index,1);   
            }
        })
        if(removedFrom.children.length==0){
            clearAll.style.display="none";
        }
    }
};
const clearDoneFunc=(e)=>{
    if(e.target.id === "checkbox"){
        if(e.target.checked){
            const checkRemoved = e.target.parentNode;
            const removeChecked= checkRemoved.parentNode.removeChild(checkRemoved);
            clearDone.style.display="none";
        }else{
            clearDone.style.display="block";
        }
    }
}

const clearAllFunc=()=>{
    ul.innerHTML="";
    clearAll.style.display="none";
    clearDone.style.display="none";
    localStorage.removeItem("todoList");
}
addButton.addEventListener("click",()=>addTask(input.value));
clearAll.addEventListener("click",clearAllFunc);
clearDone.addEventListener("click",clearDoneFunc);
ul.addEventListener("click",callListClick);