import {chase} from "../../../backend/chase.js";
import {TASK_LOSSLESS_DECOMPOSITION} from "../../../backend/global.js";

function getRelationFromInput(inputObj) {
  let relation = "{" + inputObj.chase.lossless_decomposition.relation.attribute.toString()
  relation = relation.replaceAll("," , ", ") + "}";
  return relation;
}

function getDependenciesFromInput(inputObj) {
  let dependencies = "{";
  let dependenciesArr = inputObj.chase.lossless_decomposition.dependency;
  for (let i = 0; i < dependenciesArr.length; i++) {
    let symbol = "";
    if (dependenciesArr[i].type.toLowerCase() === "functional") {
      symbol = " → ";
    } else if (dependenciesArr[i].type.toLowerCase() === "multivalued") {
      symbol = " →→ ";
    }
    dependencies += "{" + dependenciesArr[i].lhs.attribute + "}"
      + symbol + "{" + dependenciesArr[i].rhs.attribute + "}";
    if (i != dependenciesArr.length - 1) {
      dependencies += ",";
    }
  }
  dependencies = dependencies.replaceAll("," , ", ") + "}";
  return dependencies;
}

function getFragmentsFromInput(inputObj) {
  let fragments = "{";
  let fragmentsArr = inputObj.chase.lossless_decomposition.fragment;
  for (let i = 0; i < fragmentsArr.length; i++) {
    fragments += "{" + fragmentsArr[i].attribute + "}";
    if (i != fragmentsArr.length - 1) {
      fragments += ",";
    }
  }
  fragments = fragments.replaceAll("," , ", ") + "}";
  return fragments;
}

function showInputForLossless(inputObj) {
  document.getElementById('userInput').style.display = "block";
  userInputFields.replaceChildren(); // clear previous user input fields
  
  let relation = document.createElement("p");
  let relationText = "Relation: " + getRelationFromInput(inputObj);
  let node = document.createTextNode(relationText);
  relation.appendChild(node);
  
  let dependencies = document.createElement("p");
  let dependenciesText = "Dependencies: " + getDependenciesFromInput(inputObj);
  node = document.createTextNode(dependenciesText.replaceAll("," , ", "));
  dependencies.appendChild(node);
  
  let fragments = document.createElement("p");
  let fragmentsText = "Fragments: " + getFragmentsFromInput(inputObj);
  
  node = document.createTextNode(fragmentsText);
  fragments.appendChild(node);
  
  document.getElementById("userInputFields").append(relation, dependencies, fragments);
}

export async function showOutputForLossless() {
  let inputObj = await convertInputXmlToObj("fileForLossless");
  if (inputObj === null) {
    return;
  }
  if (Object.keys(inputObj).length === 0) {
    return;
  }
  
  showInputForLossless(inputObj);
  
  document.getElementById('output').style.display = "block";
}