let toDoList = {
    toDo: [],
    counter: 0,
    errorMsg: ""
};

// on body load function

const on_Load_Body_Func = () => {
    const json = localStorage.getItem('index');
    document.querySelector("#input-text").value = "";

    if (json) {
        toDoList.toDo = [...JSON.parse(json)];
        console.log("data loaded...");
        load_Content_Of_To_Do_List();
    } else {
        console.log('No data exist...');
    }
};


// onType in input field function

const onTypeText = () => {
    let button_value = document.querySelector("#submit_button");
    button_value.classList.remove('error_msg');
    button_value.disabled = false;
    button_value.innerHTML = "Save Me";

    document.querySelector(".error-box").classList.remove('show_alert');
};

// save value on press save me button

const saveUserInput = () => {
    let getInput = document.querySelector("#input-text").value.trim().toLowerCase();
    if (getInput !== "") {

        if (toDoList.toDo.indexOf(getInput) > -1) {
            return errorMessage("this choice already exist !!!");
        }

        toDoList.toDo.push(getInput);
        document.querySelector("#input-text").value = "";

        Json_setItem_func();
        console.log("New data recorded " + toDoList.toDo.length);
        load_Content_Of_To_Do_List();

    } else {
        errorMessage("please provide Your Choice");
    }
};

// delete all popup visible

const deleteAllRecords = () => {
    document.querySelector(".delete-all-box").style.visibility = "visible";
    document.querySelector(".container").style.opacity = "0.3";
    document.querySelector(".container").style.zIndex = "-1";
};


// delete all document on click delete all button

const updateDeleteAll = () => {
    let json = '';
    localStorage.setItem('index', json);
    toDoList.toDo = [];

    console.log("Removed all records");

    if (toDoList.toDo.length === 0) {
        document.querySelector(".content-status").innerHTML = "<h2 class=\"no-content\">No Content Here</h2>";
        document.querySelector(".all_options").innerHTML = "";
        cancelAction();
    }
};

// what should I do now on your job now button

const yourJobNow = () => {
    document.querySelector(".modal").style.visibility = "visible";
    document.querySelector(".container").style.opacity = "0.3";
    document.querySelector(".container").style.zIndex = "-1";

    const random_number = Math.floor(Math.random() * (toDoList.toDo.length));
    document.querySelector('#current_task_is').innerHTML = toDoList.toDo[random_number];
};

// close modal

const closeModal = () => {
    document.querySelector(".modal").style.visibility = "hidden";
    document.querySelector(".container").style.opacity = "1";
    document.querySelector(".container").style.zIndex = "1";
};

// view list to display function

const load_Content_Of_To_Do_List = () => {
    if (toDoList.toDo.length !== 0) {
        let options = document.querySelector(".all_options");

        document.querySelector(".content-status").innerHTML = (
            "<button class='total-count'>Total : " + toDoList.toDo.length + "</button>" +
            "<button onclick='yourJobNow()' class='current-job'>Your Job Now !!!</button>" +
            "<button onclick='deleteAllRecords()' class='delete-all'>Delete All <i class=\"material-icons delete-all-icon\">delete</i></button>"
        );

        options.innerHTML = toDoList.toDo.map((option, index) => {
            return ('<li id="idIs' + (index) + '">' + (index + 1) + ". " + option + '<span><i onclick="getSingleDataToEdit(' + index + ')" class="material-icons edit-icon">edit</i><i onclick="getSingleDataToDelete(' + index + ')" class="material-icons delete-icon">delete</i></span>' + '</li>');
        }).join(" ");
    } else {
        document.querySelector(".content-status").innerHTML = "<h2 class=\"no-content\">No Content Here</h2>";
    }
};


// show error message function

const errorMessage = (msg) => {
    toDoList.errorMsg = msg;

    document.querySelector('#error_message').innerHTML = toDoList.errorMsg;
    document.querySelector(".error-box").classList.add('show_alert');

    let button_value = document.querySelector("#submit_button");
    button_value.classList.add('error_msg');
    button_value.disabled = true;
    button_value.innerHTML = "Error";
};

// delete single item

const getSingleDataToDelete = (id) => {
    document.querySelector(".delete-box").style.visibility = "visible";
    document.querySelector(".container").style.opacity = "0.3";
    document.querySelector(".container").style.zIndex = "-1";
    document.querySelector(".delete-item").innerHTML = toDoList.toDo[id];
    document.querySelector("#update-delete").setAttribute("data_popup", id);

};

const updateDelete = (itemData) => {
    let id = itemData.getAttribute('data_popup');
    toDoList.toDo.splice(id, 1);
    Json_setItem_func();

    if (toDoList.toDo.length > 0) {
        load_Content_Of_To_Do_List();
        console.log('Deleted single data');
    } else {
        document.querySelector(".content-status").innerHTML = "<h2 class=\"no-content\">No Content Here</h2>";
        document.querySelector(".all_options").innerHTML = "";
        errorMessage("all data deleted !")
    }
    cancelAction();
};

// get single item info

const getSingleDataToEdit = (id) => {
    document.querySelector(".edit-form").style.visibility = "visible";
    document.querySelector(".container").style.opacity = "0.3";
    document.querySelector(".container").style.zIndex = "-1";
    document.querySelector("#edit_input").value = toDoList.toDo[id];
    document.querySelector("#update").setAttribute("data_popup", id);
};

// update in edit mood

const updateAction = (itemData) => {
    let id = itemData.getAttribute('data_popup');
    new_data = document.querySelector(".edit_input").value;
    toDoList.toDo[id] = new_data;

    Json_setItem_func();
    load_Content_Of_To_Do_List();
    console.log('Data edited...');
    cancelAction();
};

// cancel action

const cancelAction = () => {
    document.querySelector(".edit-form").style.visibility = "hidden";
    document.querySelector(".delete-box").style.visibility = "hidden";
    document.querySelector(".delete-all-box").style.visibility = "hidden";
    document.querySelector(".container").style.opacity = "1";
    document.querySelector(".container").style.zIndex = "1";
};

// json set item function

const Json_setItem_func = () => {
    let json = JSON.stringify(toDoList.toDo);
    localStorage.setItem('index', json);
};