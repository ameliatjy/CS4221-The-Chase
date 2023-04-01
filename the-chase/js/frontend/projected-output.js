function showInputForProjected(inputObj) {
  document.getElementById('userInput').style.display = "block";
  userInputFields.replaceChildren(); // clear previous user input fields
  
  let relation = document.createElement("p");
  let relationText = "Relation: {" + inputObj.chase.projected_dependencies.relation.attribute + "}";
  let node = document.createTextNode(relationText.replaceAll("," , ", "));
  relation.appendChild(node);
  
  let dependencies = document.createElement("p");
  let dependenciesText = "Dependencies: ";
  let dependenciesArr = inputObj.chase.projected_dependencies.dependency;
  for (let i = 0; i < dependenciesArr.length; i++) {
    let symbol = "";
    if (dependenciesArr[i].type.toLowerCase() === "functional") {
      symbol = " → ";
    } else if (dependenciesArr[i].type.toLowerCase() === "multivalued") {
      symbol = " →→ ";
    }
    dependenciesText += "{" + dependenciesArr[i].lhs.attribute + "}"
      + symbol + "{" + dependenciesArr[i].rhs.attribute + "}";
    if (i != dependenciesArr.length - 1) {
      dependenciesText += ", ";
    }
  }
  node = document.createTextNode(dependenciesText.replaceAll("," , ", "));
  dependencies.appendChild(node);
  
  let projection = document.createElement("p");
  let projectionText = "Projection: {" + inputObj.chase.projected_dependencies.relation.attribute + "}";
  node = document.createTextNode(projectionText.replaceAll("," , ", "));
  projection.appendChild(node);
  
  document.getElementById("userInputFields").append(relation, dependencies, projection);
}

export async function showOutputForProjected() {
  let inputObj = await convertInputXmlToObj("fileForProjected");
  if (Object.keys(inputObj).length === 0) {
    return;
  }
  
  showInputForProjected(inputObj);
  
  document.getElementById('output').style.display = "block";
}