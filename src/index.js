import "./style.css";

const frameContainer = document.getElementById("framecontainer");
const rowNumContainer = document.getElementById("rowselect");
const colNumContainer = document.getElementById("colselect");
const templateNode = `
<div class="frame">
	<input type="text" placeholder="サブタイトル">
	<div class="frameimage">
    <input type="file" name="files" accept="image/*" capture="camera" multiple>
    <output></output>
  </div>
</div>`;
const rowNum = 5; //rowの最大値
const colNum = 5; //colの最大値
const rowNumdefault = 2; //rowの初期値
const colNumdefault = 3; //colの初期値
//横の枠数を変更
colNumContainer.addEventListener("change", changecolnum);
//枠数をセット
colNumContainer.addEventListener("change", setFrame);
rowNumContainer.addEventListener("change", setFrame);

function initNumContainer(container, num, defnum) {
  const options = [];
  for (let i = 0; i < num; i++) {
    options.push(`<option value="${i + 1}">${i + 1}</option>`);
  }
  container.innerHTML = options.join("");
  container.value = String(defnum);
}

function changecolnum() {
  frameContainer.style.setProperty("--col-num", Number(colNumContainer.value));
}

function setFrame() {
  const frameQuery = document.querySelectorAll(".frame");
  const frameNum =
    Number(rowNumContainer.value) * Number(colNumContainer.value);
  const nodeNum = frameQuery.length;
  if (frameNum > nodeNum) {
    addFrame(frameNum - nodeNum, templateNode);
  } else {
    removeFrame(nodeNum - frameNum);
  }
}

function addFrame(num, node) {
  const addNode = [];
  for (let i = 0; i < num; i++) {
    addNode.push(node);
  }
  frameContainer.innerHTML += addNode.join("");
}

function removeFrame(num) {
  for (let i = 0; i < num; i++) {
    frameContainer.removeChild(frameContainer.lastElementChild);
  }
}

initNumContainer(rowNumContainer, rowNum, rowNumdefault);
initNumContainer(colNumContainer, colNum, colNumdefault);
setFrame();
