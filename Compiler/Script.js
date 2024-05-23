let regex1 = "(aba+bab) (a+b)* (bab) (a+b)* (a+b+ab+ba) (a+b+aa)*";
let regex2 = 
  "((101+111+101)+(0+1+11)) (1+0+01)* (111+000+101) (1+0)*";
var currentRegex = 1;
function switchRegex() {
  clearInput();
  let regexLabel = document.getElementById("regexLabel");
  let regexDiagram1 = document.getElementById("regexDiagram1");
  let regexDiagram2 = document.getElementById("regexDiagram2");
  let pdaDiagram1 = document.getElementById("pdaDiagram1");
  let pdaDiagram2 = document.getElementById("pdaDiagram2");
  let cfg1 = document.getElementById("cfg1");
  let cfg2 = document.getElementById("cfg2");

  if (currentRegex == 2) {
    regexLabel.textContent = regex1;
    currentRegex = 1;
    regexDiagram1.classList.remove("d-none");
    regexDiagram2.classList.add("d-none");
    pdaDiagram1.classList.remove("d-none");
    pdaDiagram2.classList.add("d-none");
    cfg1.classList.remove("d-none");
    cfg2.classList.add("d-none");
  } else {
    regexLabel.textContent = regex2;

    currentRegex = 2;
    regexDiagram1.classList.add("d-none");
    regexDiagram2.classList.remove("d-none");
    pdaDiagram1.classList.add("d-none");
    pdaDiagram2.classList.remove("d-none");
    cfg1.classList.add("d-none");
    cfg2.classList.remove("d-none");
  }
}

var nodes = {
  1: {
    q0: {
      a: "q1",
      b: "q2",
    },
    q1: {
      a: "q3",
      b: "q4",
    },
    q2: {
      a: "q5",
      b: "q3",
    },
    q3: {
      a: "q3",
      b: "q3",
    },
    q4: {
      a: "q6",
      b: "q3",
    },
    q5: {
      a: "q3",
      b: "q6",
    },
    q6: {
      a: "q7",
      b: "q8",
    },
    q7: {
      a: "q7",
      b: "q8",
    },
    q8: {
      a: "q9",
      b: "q8",
    },
    q9: {
      a: "q7",
      b: "q10",
    },
    q10: {
      a: "q11",
      b: "q12",
    },
    q11: {
      a: "q11",
      b: "q13",
    },
    q12: {
      a: "q13",
      b: "q12",
    },
    q13: {
      a: "q13",
      b: "q13",
    },
  },
  2: {
    w0: {
      0: "w1",
      1: "w1",
    },
    w1: {
      0: "w2",
      1: "w3",
    },
    w2: {
      0: "w4",
      1: "w3",
    },
    w3: {
      0: "w6",
      1: "w5",
    },
    w4: {
      0: "w7",
      1: "w3",
    },
    w5: {
      0: "w6",
      1: "w7",
    },
    w6: {
      0: "w4",
      1: "w7",
    },
    w7: {
      0: "w7",
      1: "w7",
    },
  },
};



let input_display = document.getElementById("input-display");
let simulateBtn = document.getElementById("simulateBtn");

async function simulate() {
  let input_string = document.getElementById("inputString").value;
  console.log(input_string);
  let nextNode, transition, currentNode;
  currentNode = currentRegex == 1 ? "q0" : "w0";
  let input_display = document.getElementById("input-display");
  input_display.classList.remove("red");
  input_display.classList.remove("blue");
  input_display.innerHTML = "";

  // Insert <span> elements around each letter in the input display
  for (let i = 0; i < input_string.length; i++) {
    let spanElement = document.createElement("span");
    spanElement.textContent = input_string[i];
    input_display.appendChild(spanElement);
  }

  for (let i = 0; i < input_string.length; i++) {
    nextNode = nodes[currentRegex][currentNode][input_string[i]];

    transition = `${currentNode}${nextNode}`;

    let transitionElement = document.getElementById(transition);
    let circleElement = document.getElementById(nextNode);
    circleElement.classList.add("transition");
    circleElement.classList.add("hovered");

    transitionElement.classList.add("transition");
    

    // Highlight the current letter using span element
    let spanElement = input_display.children[i];
    spanElement.classList.add("big");

    await sleep(1000);
    circleElement.classList.remove("transition");
    circleElement.classList.remove("hovered");
    transitionElement.classList.remove("transition");


    // Remove highlighting after delay
    spanElement.classList.remove("big");

    await sleep(500);
    currentNode = nextNode;
  }

  simulateBtn.disabled = true;
}

function validate() {
  let input_string = document.getElementById("inputString").value;
  console.log(input_string);
  let nextNode, transition, currentNode;
  currentNode = currentRegex == 1 ? "q0" : "w0";
  input_display.innerHTML = input_string;
  input_display.classList.remove("red");
  input_display.classList.remove("blue");

  for (i = 0; i < input_string.length; i++) {
    if (currentRegex == 1) {
      if (input_string[i] !== "a" && input_string[i] !== "b") {
        console.log("invalid");
        input_display.classList.add("red");
        simulateBtn.disabled = true;
        return;
      }
    } else {
      if (input_string[i] !== "0" && input_string[i] !== "1") {
        console.log("invalid");
        input_display.classList.add("red");
        simulateBtn.disabled = true;
        return;
      }
    }

    nextNode = nodes[currentRegex][currentNode][input_string[i]];
    currentNode = nextNode;
  }
  if (currentRegex == 1) {
    if (currentNode == "q11") {
      console.log("valid");
      input_display.classList.add("blue");
      simulateBtn.disabled = false;
    } else if (currentNode == "q12"){
      console.log("valid");
      input_display.classList.add("blue");
      simulateBtn.disabled = false;
    } else if (currentNode == "q13"){
      console.log("valid");
      input_display.classList.add("blue");
      simulateBtn.disabled = false;
    } else {
      console.log("invalid");
      input_display.classList.add("red");
      simulateBtn.disabled = true;
    }
  }
  else {
    if (currentNode == "w7") {
      console.log("valid");
      input_display.classList.add("blue");

      simulateBtn.disabled = false;
    } else {
      console.log("invalid");
      input_display.classList.add("red");
      simulateBtn.disabled = true;
    }
  }
}

window.onload = function () {
  //switchRegex();

  simulateBtn.disabled = true;
};

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds); // 1000 milliseconds = 1 second
  });
}

function clearInput() {
  document.getElementById("inputString").value = "";
  input_display.classList.remove("blue");
  input_display.classList.remove("red");
  input_display.innerHTML = "";
  simulateBtn.disabled = true;
}

function toggleCFG() {
  var cfgContent = document.getElementById("cfgContent");
  cfgContent.classList.toggle("cfg-container");
  var showCfgBtn = document.querySelector(".show-cfg-btn");
  if (showCfgBtn.textContent === "Show CFG") {
    showCfgBtn.textContent = "Hide CFG";
  } else {
    showCfgBtn.textContent = "Show CFG";
  }
}

function togglePDA() {
  var pdaContent = document.getElementById("pdaContent");
  pdaContent.classList.toggle("pda-container");
  var showPdaBtn = document.querySelector(".show-pda-btn");

  if (pdaContent.style.display === "none") {
      pdaContent.style.display = "flex";
      showPdaBtn.textContent = "Hide PDA";
  } else {
      pdaContent.style.display = "none";
      showPdaBtn.textContent = "Show PDA";
  }
}

function showImage() {
  document.getElementById('overlay').style.display = 'flex';
}

document.getElementById('overlay').addEventListener('click', function() {
  this.style.display = 'none';
});