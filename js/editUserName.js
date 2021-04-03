const editUserNameBox = document.querySelector(".current-username-edit"),
  inputUserName = editUserNameBox.querySelector("input"),
  saveUserName = editUserNameBox.querySelector(".current-username-edit__save"),
  cancelUserName = editUserNameBox.querySelector(".current-username-edit__cancel");

function saveValue(e){
  e.stopPropagation();
  if(inputUserName.value !== null){
    const text = inputUserName.value;
    localStorage.setItem("userName", text);
    editUserNameBox.style.display = "none";
    currentUserName.innerText = `${text} 님!`;
  } else{
    editUserNameBox.style.display = "none";
  }
}
  
function closeEditPopup(e){
  e.stopPropagation();
  editUserNameBox.style.display = "none";
}

function printEditPopup(e){
  e.stopPropagation(); // 이벤트 버블링 방지
  editUserNameBox.style.display = "flex";

  printCurrentName();
  cancelUserName.addEventListener("click", closeEditPopup); // 취소 버튼
  saveUserName.addEventListener("click", saveValue);
}

function printCurrentName(){
  inputUserName.placeholder = USER_LS;
}
  
function init(){
  if(USER_LS !== null){
    currentUserName.addEventListener("click", printEditPopup);
  }
}

init();