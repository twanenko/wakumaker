import "./style.css";

const frameContainer = document.getElementById("framecontainer");
const rowNumContainer = document.getElementById("rowselect");
const colNumContainer = document.getElementById("colselect");
const templateNode = `
<div class="frame">
	<input type="text">
	<div class="frameimage">
    <label>
      <i class="material-icons">add_box</i>
      <input type="file" name="files" accept="image/*" capture="camera" multiple style="display:none">
    </label>
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

frameContainer.addEventListener("click", event => {
  if (event.target.name === "frameimage") {
    event.target.getElementByTagName("input").click();
  }
});
frameContainer.addEventListener("change", event => {
  if (event.target.name === "files") {
    handleFile(event);
  }
});

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

function handleFile(evt) {
  evt.target.parentNode.querySelectorAll("span").forEach(e => {
    e.parentNode.removeChild(e);
  });
  const files = evt.target.files;
  if (files.length) {
    evt.target.parentNode.querySelectorAll("i").forEach(e => {
      e.style.display = "none";
    });
  } else {
    evt.target.parentNode.querySelectorAll("i").forEach(e => {
      e.style.display = "";
    });
  }
  const colNum = Math.ceil(Math.sqrt(files.length));
  evt.target.parentNode.style.setProperty("--frame-col-num", colNum);
  for (let i = 0, f; (f = files[i]); i++) {
    let reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        let span = document.createElement("span");
        span.innerHTML = [
          '<img class="thumb" src="',
          e.target.result,
          '" title="',
          escape(theFile.name),
          '"/>'
        ].join("");
        evt.target.parentNode.appendChild(span);
      };
    })(f);
    reader.readAsDataURL(f);
  }
}

initNumContainer(rowNumContainer, rowNum, rowNumdefault);
initNumContainer(colNumContainer, colNum, colNumdefault);
setFrame();
