"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var btnLogin = document.querySelector(".login");
var btnAdd = document.querySelector(".add");
var textTodo = document.querySelector(".text-todo");
var form_data = document.querySelector(".form-data");
var input = document.querySelector(".input-name");
var form = document.querySelector("form");
var title = document.querySelector(".title");
var cardTodo = document.querySelector(".card-todo");
var lable = document.querySelector(".lable");
var flag = true;
btnLogin.addEventListener("click", function (e) { return (flag === true) ? logAout() : logIn(); });
form.addEventListener("submit", HandleTodo);
var todo = {
    todoList: [],
    counter: 0,
    _id: 0,
    addTodo: function (newUser) {
        this.todoList = __spreadArray(__spreadArray([], __read(this.todoList)), [{ id: ++this.counter, name: newUser }]);
        render();
    },
    doneTodo: function (btn) {
        var _a;
        var row = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        var p = row.getElementsByTagName("p")[0];
        p.classList.toggle("text-dec");
    },
    deleteRowTodo: function (id) {
        this.todoList = this.todoList.filter(function (todo, i) { return (todo === null || todo === void 0 ? void 0 : todo.id) !== id; });
        render();
    },
    editRowTodo: function (id) {
        this._id = id;
        var user = this.todoList.find(function (todo) { return (todo === null || todo === void 0 ? void 0 : todo.id) === id; });
        input.value = user === null || user === void 0 ? void 0 : user.name;
        btnAdd.innerText = "UPDATE";
        lable.classList.add("active");
    },
    UpdateTodo: function (value) {
        var _this = this;
        if (input.value !== '') {
            this.todoList = this.todoList.map(function (item) { return item.id === _this._id ? __assign(__assign({}, item), { name: value }) : item; });
            btnAdd.innerText = "ADD";
            render();
        }
    }
};
function logAout() {
    btnLogin.innerHTML = "logaout";
    btnLogin.className = "btn btn-danger";
    textTodo.classList.add("d-none");
    form_data.classList.remove("d-none");
    flag = false;
}
function logIn() {
    btnLogin.innerHTML = "LOGIN";
    btnLogin.className = "btn btn-dark-green";
    textTodo.classList.remove("d-none");
    form_data.classList.add("d-none");
    todo.todoList = [];
    render();
    flag = true;
}
function HandleTodo(e) {
    (btnAdd.innerText === "ADD" && input.value !== '') ? todo.addTodo(input.value) : todo.UpdateTodo(input.value);
    form.reset();
    e.preventDefault();
}
function render() {
    var cardTodo = document.querySelector(".card-todo");
    cardTodo.innerHTML = "";
    cardTodo.innerHTML += todo.todoList.map(function (item) {
        return "\n     <div class=\"row\">\n        <div class=\"col-md-6 m-auto\">\n            <div class=\"d-flex  align-items-center justify-content-between z-depth-1 py-2 px-2 my-2\">\n                <p class=\"text-dark m-0 title\">" + item.name + "</p>\n                <div class=\"adjustment\">\n                    <button type=\"button\" class=\"btn   btn-sm btn-success\" onclick=\"todo.doneTodo(this)\">DONE</button>\n                    <button type=\"button\" class=\"btn  btn-sm btn-info\" onclick=\"todo.editRowTodo(" + (item === null || item === void 0 ? void 0 : item.id) + ")\">EDIT</button>\n                    <button type=\"button\" class=\"btn  btn-sm btn-danger\" onclick=\"todo.deleteRowTodo(" + (item === null || item === void 0 ? void 0 : item.id) + ")\">DELET</button>\n                </div>\n            </div>\n        </div>\n     \n     </div>  \n\n     ";
    });
}
//# sourceMappingURL=app.js.map