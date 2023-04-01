async function convertInputXmlToObj() {
  let inputObj = {};
  let file = document.getElementById("myFile").files[0];
  if (document.getElementById("myFile").value == "") {
    alert("Please select an input XML file!");
    return inputObj;
  }
  
  let text = await file.text();
  let parser = new XMLParser();
  inputObj = parser.parse(text);
  delete inputObj["?xml"];

  let str = JSON.stringify(inputObj, null, 4);
  console.log(str);
  return inputObj;
}

function convertToArray(element) {
  return element ? [].concat(element) : [];
}

function showInputForEntailment(inputObj) {
  document.getElementById('userInput').style.display = "block";
  userInputFields.replaceChildren(); // clear previous user input fields
  
  let relation = document.createElement("p");
  let relationText = "Relation: " + inputObj.chase.entailment.relation.attribute;
  let node = document.createTextNode(relationText);
  relation.appendChild(node);
  
  let dependencies = document.createElement("p");
  let dependenciesText = "Dependencies: ";
  let dependenciesArr = inputObj.chase.entailment.dependency;
  for (let i = 0; i < dependenciesArr.length; i++) {
    let symbol = "";
    if (dependenciesArr[i].type.toLowerCase() === "functional") {
      symbol = " → ";
    } else if (dependenciesArr[i].type.toLowerCase() === "multivalued") {
      symbol = " →→ ";
    }
    dependenciesText += "{" + dependenciesArr[i].lhs.attribute + "}"
      + symbol + "{" + dependenciesArr[i].rhs.attribute + "}";
    if (i == dependenciesArr.length - 2) {
      dependenciesText += ", ";
    }
  }
  node = document.createTextNode(dependenciesText);
  dependencies.appendChild(node);
  
  let dependencyChased = document.createElement("p");
  let dependencyChasedText = "We want to chase: ";
  let symbol = "";
  if (inputObj.chase.entailment.dependency_chased.type.toLowerCase() === "functional") {
    symbol = " → ";
  } else if (inputObj.chase.entailment.dependency_chased.type.toLowerCase() === "multivalued") {
    symbol = " →→ ";
  }
  dependencyChasedText += "{" + inputObj.chase.entailment.dependency_chased.lhs.attribute
    + "}" + symbol + "{" + inputObj.chase.entailment.dependency_chased.rhs.attribute + "}";
  node = document.createTextNode(dependencyChasedText);
  dependencyChased.appendChild(node);
  
  document.getElementById("userInputFields").append(relation, dependencies, dependencyChased);
}

function getArgsFromInputObj(inputObj) {
  let relation = convertToArray(inputObj.chase.entailment.relation.attribute);

  let dependenciesArr = convertToArray(inputObj.chase.entailment.dependency);
  let dependencies = [];
  for (let i = 0; i < dependenciesArr.length; i++) {
    let lhs = convertToArray(dependenciesArr[i].lhs.attribute);
    let rhs = convertToArray(dependenciesArr[i].rhs.attribute);
    
    let mvd = false;
    if (dependenciesArr[i].type.toLowerCase() === "multivalued") {
      mvd = true;
    }
    dependencies.push({lhs: lhs, rhs: rhs, mvd: mvd});
  }
  
  let type = document.querySelector('input[name="choice"]:checked').value;
  
  let dependencyChased = [];
  let lhs = convertToArray(inputObj.chase.entailment.dependency_chased.lhs.attribute);
  let rhs = convertToArray(inputObj.chase.entailment.dependency_chased.rhs.attribute);
  let mvd = false;
    if (inputObj.chase.entailment.dependency_chased.type.toLowerCase() === "multivalued") {
      mvd = true;
    }

  dependencyChased.push({lhs: lhs, rhs: rhs, mvd: mvd});
  
  return {relation: relation, dependencies: dependencies, type: type, dependencyChased: dependencyChased};
}

export async function showOutputForEntailment() {
  let inputObj = await convertInputXmlToObj();
  if (Object.keys(inputObj).length === 0) {
    return;
  }
  
  showInputForEntailment(inputObj);
  
  let args = getArgsFromInputObj(inputObj);
  console.log("relations:");
  console.log(args.relation);
  console.log("fds:");
  console.log(args.dependencies);
  console.log("type:");
  console.log(args.type);
  console.log("otherInfo:");
  console.log(args.dependencyChased);
  
  // Code to display result returned by chase(...)
  // let output = chase(args.relation, args.dependencies, TASK_ENTAILMENT, args.type, args.dependencyChased);
  
  document.getElementById('output').style.display = "block";
}
