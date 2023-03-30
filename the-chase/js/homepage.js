function showFeature(event, taskName) {
  document.getElementById('userInput').style.display = "none";
  document.getElementById('output').style.display = "none";
  
  let i, tabContent, tabLinks;

  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tabLinks");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(taskName).style.display = "block";
  event.currentTarget.className += " active";
}

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
    if (dependenciesArr[i].type === "functional") {
      symbol = " → ";
    } else if (dependenciesArr[i].type === "multivalued") {
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
  if (inputObj.chase.entailment.dependency_chased.type === "functional") {
    symbol = " → ";
  } else if (inputObj.chase.entailment.dependency_chased.type === "multivalued") {
    symbol = " →→ ";
  }
  dependencyChasedText += "{" + inputObj.chase.entailment.dependency_chased.lhs.attribute
    + "}" + symbol + "{" + inputObj.chase.entailment.dependency_chased.rhs.attribute+ "}";
  node = document.createTextNode(dependencyChasedText);
  dependencyChased.appendChild(node);
  
  document.getElementById("userInputFields").append(relation, dependencies, dependencyChased);
}

async function showOutputForEntailment() {
  let inputObj = await convertInputXmlToObj();
  if (Object.keys(inputObj).length === 0) {
    return;
  }
  showInputForEntailment(inputObj);
  
  // Code to split input object into arguments for chase(...)
  // ...
  
  // Code to display result returned by chase(...)
  // ...
  
  document.getElementById('output').style.display = "block";
}
