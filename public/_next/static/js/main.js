//Stake eternal menu & button
let button = document.querySelector("#headlessui-popover-button-1"),
  panel = document.querySelector("#headlessui-popover-panel-2"),
  body = document.querySelector("body");

function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  } else {
    return isChildOf(child.parentNode, parent);
  }
}

button.addEventListener("click", () => {
  button.classList.toggle("text-opacity-90");
  panel.classList.toggle("hidden");
});

body.addEventListener("click", function (e) {
  if (e.target !== button && !isChildOf(e.target, button))
    panel.classList.add("hidden");
});

//Contract section
let sectionContract = document.querySelector("#contractSection"),
  btnContract = document.querySelector("#contractButton");

btnContract.addEventListener("click", () => {
  sectionContract.innerHTML =
    '<div class="grid grid-flow-row gap-4"><div class="bg-gray-800 text-white p-4"><h1>Welcome <span class="font-bold"></span></h1></div><div class="bg-gray-800 text-white p-4"><h1 class="text-xl">📃 Contract Status</h1><p class="text-gray-400 text-sm mt-2">Below you can find all the contracts CryptoMines DAPP needs to interact with. If you are experiencing any issues, please enable the ones you did not enabled yet.</p><div class="grid grid-flow-row grid-col-3 grid-row-2 gap-2 mt-4"></div></div></div>';
});

//Hamburguer menu
let btnMenu = document.querySelector(".p-2"),
  menu = document.querySelector("#menu-hbrg");

btnMenu.addEventListener("click", () => {
  menu.classList.add("absolute");
  menu.classList.toggle("hidden");
});
