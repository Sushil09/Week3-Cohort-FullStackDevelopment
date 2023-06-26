function addTodo() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      completed: false,
      description: description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((jsonData) => {
    var parent = document.getElementById("mainArea");
    var secondParent = document.createElement("div");
    var child1 = document.createElement("span");
    var child2 = document.createElement("span");
    var button = document.createElement("button");
    secondParent.appendChild(child1).innerHTML = jsonData.title;
    secondParent.appendChild(child2).innerHTML = jsonData.description;
    secondParent.appendChild(button).innerHTML = "Delete";
    var br = document.createElement("br");
    secondParent.appendChild(br);
    parent.appendChild(secondParent);
  });
}

async function getTodos() {
  const data = await fetch("http://localhost:3000/todos");
  const jsonData = await data.json();
  var parent = document.getElementById("mainArea");

  for (let i = 0; i < jsonData.length; i++) {
    var secondParent = document.createElement("div");
    var child1 = document.createElement("span");
    var child2 = document.createElement("span");
    var button = document.createElement("button");
    secondParent.appendChild(child1).innerHTML = jsonData[i].title;
    secondParent.appendChild(child2).innerHTML = jsonData[i].description;
    secondParent.appendChild(button).innerHTML = "Delete";
    button.setAttribute("onclick", "deleteTodo(" + jsonData[i].id + ")");

    var br = document.createElement("br");
    secondParent.appendChild(br);
    parent.appendChild(secondParent);
  }
}
getTodos();

function deleteTodo(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });
}
