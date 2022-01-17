const getId = (id) => document.getElementById(id);

const getClasses = (classes) => document.getElementsByClassName(classes);

const errorIndexMap = {
  name: 0,
  email: 1,
  gender: 2,
  marital: 3,
  spouse: 4
}

let returnArr = [];

let name = getId("name"),
  email = getId("email"),
  gender = getId("gender"),
  marital = getId("marital"),
  spouse = getId("spouse"),
  details = getId("details"),
  form = getId("form"),
  errorMsg = getClasses("error"),
  successIcon = getClasses("success-icon"),
  failureIcon = getClasses("failure-icon");

function ifFilled(id, serial) {
  errorMsg[serial].innerHTML = "";
  if(id.type === "text") id.style.border = "2px solid green";

  failureIcon[serial].style.opacity = "0";
  successIcon[serial].style.opacity = "1";
  return true;
}

function ifEmpty(id, serial, message) {
  errorMsg[serial].innerHTML = message;
  if(id.type === "text") id.style.border = "2px solid red";

  failureIcon[serial].style.opacity = "1";
  successIcon[serial].style.opacity = "0";
  return false;
}

function isChecked(name) {
  return document.querySelector(`input[value=${name}]`).checked
}

function checkRadio(inputName, serial, message) {
  let checked = false;
  document.querySelectorAll(`input[name=${inputName}]`).forEach((item) => {
    checked = checked || item.checked;
  });
  if (!checked) {
    const a = ifEmpty(inputName, serial, message);
    returnArr.push(a);
  }
  else {
    const a = ifFilled(inputName, serial);
    returnArr.push(a);
  }
};

function checkEmail(id, serial, message) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(id.value)) {
  const a = ifFilled(id, serial);
  returnArr.push(a);
  } else{
    if(id.value === "") {
      const a = ifEmpty(id, serial, message);
      returnArr.push(a);
     } else{
      const a = ifEmpty(id, serial, "Please enter a valid Email");
      returnArr.push(a);
    }
  }
}

function checkText(id, serial, message) {
  if (id.value.trim() === "") {
    const a = ifEmpty(id, serial, message);
    returnArr.push(a);
  } else {
    const a = ifFilled(id, serial);
    returnArr.push(a);
  }
};

function callFunctions() {
  checkText(name, 0, "Username cannot be blank");
  checkEmail(email, 1, "Email cannot be blank");
  checkRadio("gender", 2, "Gender cannot be blank");
  checkRadio("marital", 3, "Marital status cannot be blank");
  if(isChecked("married")){
    checkText(spouse, 4, "Spouse name cannot be blank");
  }
};

function resetForm() {
  form.reset();
  successIcon[0].style.opacity = "0";
  successIcon[1].style.opacity = "0";
  successIcon[2].style.opacity = "0";
  successIcon[3].style.opacity = "0";
  successIcon[4].style.opacity = "0";
  name.style.border = "2px solid #c4c4c4";
  email.style.border = "2px solid #c4c4c4";
  spouse.style.border = "2px solid #c4c4c4";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  returnArr = []
  console.log(e.target.elements)
  callFunctions();
  const fieldsCheck = returnArr.every(item => {return item});
  if(fieldsCheck){
    resetForm();
  }
});

document.querySelectorAll("input").forEach((item) => {
  if (item.id === "email") {
    item.addEventListener("keyup", () => {
      checkEmail(item, errorIndexMap[item.name], `${item.name} can not be blank`);
    });
  }
  else if (item.type === "text") {
    item.addEventListener("keyup", () => {
      checkText(item, errorIndexMap[item.name], `${item.name} can not be blank`);
    });
  } else if (item.type === "radio") {
    item.addEventListener("click", () => {
      checkRadio(item.name, errorIndexMap[item.name], `please select ${item.name}`);
    });
  }
});

document.querySelectorAll("input[name='marital']").forEach(item => {
  item.addEventListener('click', (e) => {
    if(e.target.value === "married"){
      spouse.disabled = false;
    }
    if(e.target.value === "unmarried"){
      spouse.disabled = true;
      errorMsg[errorIndexMap["spouse"]].innerHTML = "";
      failureIcon[errorIndexMap["spouse"]].style.opacity = "0";
      successIcon[errorIndexMap["spouse"]].style.opacity = "0";
      spouse.style.border = "2px solid #c4c4c4";
      spouse.value = "";
    }
  })
})

