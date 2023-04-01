function showInputForLossless(inputObj) {
  document.getElementById('userInput').style.display = "block";
  userInputFields.replaceChildren(); // clear previous user input fields
  
  let relation = document.createElement("p");
  let relationText = "Relation: {" + inputObj.chase.lossless_decomposition.relation.attribute + "}";
  let node = document.createTextNode(relationText.replaceAll("," , ", "));
  relation.appendChild(node);
  
  let dependencies = document.createElement("p");
  let dependenciesText = "Dependencies: ";
  let dependenciesArr = inputObj.chase.lossless_decomposition.dependency;
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
  
  let fragments = document.createElement("p");
  let fragmentsText = "Fragments: ";
  let fragmentsArr = inputObj.chase.lossless_decomposition.fragment;
  for (let i = 0; i < fragmentsArr.length; i++) {
    fragmentsText += "{" + fragmentsArr[i].attribute + "}";
    if (i != fragmentsArr.length - 1) {
      fragmentsText += ",";
    }
  }
  node = document.createTextNode(fragmentsText.replaceAll("," , ", "));
  fragments.appendChild(node);
  
  document.getElementById("userInputFields").append(relation, dependencies, fragments);
}

export async function showOutputForLossless() {
  let inputObj = await convertInputXmlToObj("fileForLossless");
  if (Object.keys(inputObj).length === 0) {
    return;
  }
  
  showInputForLossless(inputObj);
  
  document.getElementById('output').style.display = "block";
}