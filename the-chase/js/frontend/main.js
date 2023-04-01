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
