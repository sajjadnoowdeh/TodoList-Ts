// get elemnts
const btnLogin = document.querySelector(".login") as HTMLButtonElement;
const btnAdd= document.querySelector(".add") as HTMLButtonElement;
const textTodo = document.querySelector(".text-todo") as HTMLLinkElement;
const form_data = document.querySelector(".form-data") as HTMLDivElement;
const input = document.querySelector(".input-name") as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement;
const title = document.querySelector(".title") as HTMLParagraphElement;
let cardTodo = document.querySelector(".card-todo") as HTMLElement;
const lable = document.querySelector(".lable") as HTMLLabelElement;
let flag:boolean = true;

// Events listener
btnLogin.addEventListener("click",(e:Event):void=>(flag === true) ? logAout() : logIn())
form.addEventListener("submit",HandleTodo);

let todo:ITodoList = {
    todoList:[],
    counter : 0,
     _id: 0,
    addTodo(newUser){
        this.todoList = [...this.todoList,{id:++this.counter,name:newUser}]
        render();
    },
    doneTodo(btn){
        let row = btn.parentElement?.parentElement as HTMLDivElement;
        let p = row.getElementsByTagName("p")[0] as HTMLParagraphElement;
        p.classList.toggle("text-dec")
    },
    deleteRowTodo(id){
      this.todoList = this.todoList.filter((todo,i)=> todo?.id !== id);
      render();
    },
    editRowTodo(id){
        this._id = id;
       let user = this.todoList.find(todo => todo?.id === id);
       input.value = user?.name as string;
       btnAdd.innerText = "UPDATE";
       lable.classList.add("active")
    },
    UpdateTodo(value){
        if (input.value !== '') {
            this.todoList = this.todoList.map(item => item.id === this._id ? {...item,name:value} : item)
            btnAdd.innerText = "ADD"
            render();
        }
        
    }
}

interface ITodoList{
    todoList:IList[],
    counter:number,
    _id:number,
    addTodo:(newUser:string) =>void,
    doneTodo:(btn:HTMLButtonElement) => void,
    deleteRowTodo:(id:number)=>void,
    editRowTodo:(id:number) =>void,
    UpdateTodo:(value:string) =>void
}

interface IList{
    id?:number,
    name:string
}

function logAout():void{
    btnLogin.innerHTML = "logaout";
    btnLogin.className = "btn btn-danger"
    textTodo.classList.add("d-none");
    form_data.classList.remove("d-none");
    flag = false;
}

function logIn():void{
    btnLogin.innerHTML = "LOGIN";
        btnLogin.className = "btn btn-dark-green"
        textTodo.classList.remove("d-none");
        form_data.classList.add("d-none")
        todo.todoList = [];
         render()
        flag = true;
}



function HandleTodo(e:Event):void{
     (btnAdd.innerText === "ADD" && input.value !== '') ?  todo.addTodo(input.value) :  todo.UpdateTodo(input.value)
        
    form.reset()
    e.preventDefault();

}

function render(){
 let cardTodo = document.querySelector(".card-todo") as HTMLDivElement;
 cardTodo.innerHTML = "";
 cardTodo.innerHTML+= todo.todoList.map((item):string=>{
     return`
     <div class="row">
        <div class="col-md-6 m-auto">
            <div class="d-flex  align-items-center justify-content-between z-depth-1 py-2 px-2 my-2">
                <p class="text-dark m-0 title">${item.name}</p>
                <div class="adjustment">
                    <button type="button" class="btn   btn-sm btn-success" onclick="todo.doneTodo(this)">DONE</button>
                    <button type="button" class="btn  btn-sm btn-info" onclick="todo.editRowTodo(${item?.id})">EDIT</button>
                    <button type="button" class="btn  btn-sm btn-danger" onclick="todo.deleteRowTodo(${item?.id})">DELET</button>
                </div>
            </div>
        </div>
     
     </div>  

     `
 })
}