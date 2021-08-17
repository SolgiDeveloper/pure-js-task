let addPlanBtn = document.getElementById("addPlanBtn");
let InputPlanName = document.getElementById("InputPlanName");
let InputPlanStartTime = document.getElementById("InputPlanStartTime");
let InputPlanEndTime = document.getElementById("InputPlanEndTime");
let PlanLock = document.getElementById("PlanLock");
let alertAddModal = document.getElementById("alert-add-modal");
let addModalCloseBtn = document.getElementById("closeAddModal");
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
          console.log(listOfPlans, id);
          listOfPlans.splice(button.getAttribute("id"), 1);
          console.log(listOfPlans, id);
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
  if (true) {
    if (editMode) {
      listOfPlans[editId].name = InputPlanName.value;
      listOfPlans[editId].startTime = InputPlanStartTime.value;
      listOfPlans[editId].endTime = InputPlanEndTime.value;
      listOfPlans[editId].planIsLock = `${PlanLock.checked}`;
      console.log(listOfPlans);
      $("#addPlanModal").modal("hide");
      clearAddModal();
      createListElement();
      editMode = false;
    } else {
      listOfPlans.push({
        name: `${InputPlanName.value}`,
        startTime: `${InputPlanStartTime.value}`,
        endTime: `${InputPlanEndTime.value}`,
        planIsLock: `${PlanLock.checked}`,
      });
      $("#addPlanModal").modal("hide");
      clearAddModal();
      createListElement();
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
function clearAddModal() {
  InputPlanName.value = "";
  InputPlanStartTime.value = "";
  InputPlanEndTime.value = "";
  PlanLock.checked = false;
  alertAddModal.classList.add("dont-display-alert");
}
addPlanBtn.addEventListener("click", addPlanAfterClick);
addModalCloseBtn.addEventListener("click", clearAddModal);
