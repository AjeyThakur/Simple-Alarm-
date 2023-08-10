console.log("hello");
let time = document.querySelector(".time");
const hourInput = document.querySelector("#hours");
const minuteInput = document.querySelector("#minutes");
const setAlarm = document.querySelector("#set");
const activeAlarms = document.querySelector(".activealarm")

let alarmsArray = [];
let alarmsound = new Audio("./alarm.mp3");
let initialHour = 0,
    initialMinute = 0,
    alarmIndex = 0;

const appendZero = (value) => (value < 10 ? "0" + value : value);

function displayTime() {
    let date = new Date();
    let [hours, minutes, seconds] = [
        appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds())
    ];

    time.innerHTML = `${hours}:${minutes}:${seconds}`;
    alarmsArray.forEach((alarm, index) => {
        if (alarm.isActive) {
            if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
                alarmsound.play();
                alarmsound.loop = true;
            }
        }

    });
}

const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue < 10) {
        inputValue = appendZero(inputValue);
    }
    return inputValue;
};
hourInput.addEventListener("input", () => {
    hourInput.value = inputCheck(hourInput.value);

});
minuteInput.addEventListener("input", () => {
    minuteInput.value = inputCheck(minuteInput.value);

});

const createAlarm = (alarmObj) => {
    console.log(alarmObj.id);
    const { id, alarmHour, alarmMinute } = alarmObj;
    console.log(alarmObj.id);
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}`;

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox")
    checkBox.addEventListener("click", (e) => {
        if (e.target.checked) {
            startAlarm(e);
        } else {
            stopAlarm(e);
        }
    });
    alarmDiv.appendChild(checkBox);
    let deleteButton = document.createElement("buton");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);

};

setAlarm.addEventListener("click", () => {
    alarmIndex += 1

    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;
    console.log(alarmObj);
    alarmsArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);


});

const searchObject = (parameter, value) => {
    let alarmObject, objIndex,
        exist = false;
    alarmsArray.forEach((alarm, index) => {
        if (alarm[parameter] == value) {
            exist = true;
            alarmObject = alarm;
            objIndex = index;
            return false;
        }
    });
    return [exist, alarmObject, objIndex];


}

const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exist, obj, index] = searchObject("id", searchId);
    if (exist) {
        alarmsArray[index].isActive = true;
    }

};

const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exist, obj, index] = searchObject("id", searchId);
    if (exist) {
        alarmsArray[index].isActive = false;
        alarmsound.pause();

    }
}

const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exist, obj, index] = searchObject("id", searchId);
    if (exist) {
        alarmsArray[index].isActive = false;
        alarmsound.pause();
        e.target.parentElement.parentElement.remove();
        alarmsArray.splice[index, 1];
    }

};

window.onload = () => {
    setInterval(displayTime, 1000);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};