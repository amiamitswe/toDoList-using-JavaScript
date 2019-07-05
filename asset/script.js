let toDoList = {
    toDo: [],
    counter: 0,
    errorMsg: ""
};


const onTypeText = () => {
    let button_value = document.querySelector("#submit_button");
    button_value.classList.remove('error_msg');
    button_value.disabled = false;
    button_value.innerHTML = "Save Me";

    document.querySelector(".error-box").classList.remove('show_alert');
};



const saveUserInput = () => {
    let getInput = document.querySelector("#input-text").value;

    if (getInput !== "") {
        toDoList.toDo.push(getInput);
        document.querySelector("#input-text").value = "";
        console.log(toDoList.toDo);
    }

    else {
        toDoList.errorMsg = "Please type something";

        document.querySelector('#error_message').innerHTML = toDoList.errorMsg;

        document.querySelector(".error-box").classList.add('show_alert');

        let button_value = document.querySelector("#submit_button");
        button_value.classList.add('error_msg');
        button_value.disabled = true;
        button_value.innerHTML = "Error";
    }
};