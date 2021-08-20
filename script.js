let addPlanBtn = document.getElementById("addPlanBtn");
let InputPlanName = document.getElementById("InputPlanName");
let InputPlanStartTime = document.getElementById("InputPlanStartTime");
let InputPlanEndTime = document.getElementById("InputPlanEndTime");
let PlanLock = document.getElementById("PlanLock");
let alertAddModal = document.getElementById("alert-add-modal");
let alertAddTimeToModal = document.getElementById("alert-add-time-to-modal");
let alertHourlyInterferenceModal = document.getElementById("alert-hourly-interference-modal");
let addModalCloseBtn = document.getElementById("closeAddModal");
let addPlanModalLabel = document.getElementById("addPlanModalLabel");
let addPlanModal = document.getElementById("addPlanModal");
let tbody = document.querySelector("tbody");
let listOfPlans = [];
let editMode = false;
let editId = 0;

function createListElement() {
  tbody.innerHTML = "";
  let items = listOfPlans.length;
  for (let item = 0; item < items; item++) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    th.appendChild(document.createTextNode(item + 1));
    tr.appendChild(th);
    appendNameToList(item, tr);
    appendTimeToList(item, tr);
    createTheBtn(item, tr, td, "fa-lock");
    createTheBtn(item, tr, td, "fa-pen");
    createTheBtn(item, tr, td, "fa-trash");
    tbody.appendChild(tr);
  }
  function appendNameToList(item, tr) {
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(listOfPlans[item].name));
    tr.appendChild(td);
  }
  function appendTimeToList(item, tr) {
    let td = document.createElement("td");
    td.appendChild(
      document.createTextNode(
        `${listOfPlans[item].startTime}-${listOfPlans[item].endTime}`
      )
    );
    tr.appendChild(td);
  }
  function createTheBtn(id, tr, td, className) {
    if (className === "fa-lock") {
      let i = document.createElement("i");
      i.classList.add("fa", `${className}`, "cursor", "m-1");
      if (listOfPlans[id].planIsLock === "true") {
        i.classList.add("red-color");
      }
      td.appendChild(i);
      tr.appendChild(td);
    } else {
      let button = document.createElement("button");
      let i = document.createElement("i");
      button.classList.add("btn", "btn-light", "m-1");
      i.classList.add("fa", `${className}`);
      button.appendChild(i);
      button.setAttribute("id", `${id}`);
      if (className === "fa-pen") {
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#addPlanModal");
        button.addEventListener("click", function () {
          editMode = true;
          editId = id;
          setModalHeader();
          InputPlanName.value = listOfPlans[id].name;
          InputPlanStartTime.value = listOfPlans[id].startTime;
          InputPlanEndTime.value = listOfPlans[id].endTime;
          listOfPlans[id].planIsLock === "true"
            ? (PlanLock.checked = true)
            : (PlanLock.checked = false);
        });
      }
      td.appendChild(button);
      tr.appendChild(td);
      if (className === "fa-trash") {
        button.addEventListener("click", function () {
          // button.parentNode.parentNode.remove();
          listOfPlans.splice(button.getAttribute("id"), 1);
          createListElement();
        });
      }
    }
  }
}
function deleteItemFromList() {
  console.log(this.id);
}
function addPlanAfterClick(event) {
  event.preventDefault();
  if (addModalInputChecker()) {
    if (editMode && !timeInputChecker()) {
      listOfPlans[editId].name = InputPlanName.value;
      listOfPlans[editId].startTime = InputPlanStartTime.value;
      listOfPlans[editId].endTime = InputPlanEndTime.value;
      listOfPlans[editId].planIsLock = `${PlanLock.checked}`;
      $("#addPlanModal").modal("hide");
      clearAddModal();
      listOfPlans.sort(compareElements);
      createListElement();
      editMode = false;
    } else if (!editMode && !timeInputChecker()) {
      listOfPlans.push({
        name: `${InputPlanName.value}`,
        startTime: `${InputPlanStartTime.value}`,
        endTime: `${InputPlanEndTime.value}`,
        planIsLock: `${PlanLock.checked}`,
      });
      $("#addPlanModal").modal("hide");
      clearAddModal();
      listOfPlans.sort(compareElements);
      createListElement();
    } else if (timeInputChecker()) {
      alertAddTimeToModal.classList.remove("dont-display-alert");
    }
  } else {
    alertAddModal.classList.remove("dont-display-alert");
  }
}
function addModalInputChecker() {
  return (
    InputPlanName.value.length > 0 &&
    InputPlanStartTime.value.length > 0 &&
    InputPlanEndTime.value.length > 0
  );
}
function timeInputChecker() {
  if (InputPlanEndTime.value <= InputPlanStartTime.value) {
    return true;
  } else {
    return false;
  }
}
function compareElements(a, b) {
  if (a.startTime < b.startTime) {
    return -1;
  }
  if (a.startTime > b.startTime) {
    return 1;
  }
  return 0;
}
function clearAddModal() {
  InputPlanName.value = "";
  InputPlanStartTime.value = "";
  InputPlanEndTime.value = "";
  PlanLock.checked = false;
  editMode = false;
  alertAddModal.classList.add("dont-display-alert");
  alertAddTimeToModal.classList.add("dont-display-alert");
}
function setModalHeader(){
  if(editMode){
    addPlanModalLabel.textContent = `(${listOfPlans[editId].name}) ویرایش برنامه`
  } else {
    addPlanModalLabel.textContent = "ایجاد برنامه"
  }
}
addPlanBtn.addEventListener("click", addPlanAfterClick);
addModalCloseBtn.addEventListener("click", clearAddModal);
addPlanModal.addEventListener("click", setModalHeader);
