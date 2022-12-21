let addElf = false;
let missingElves = true;
const elvesURL = "http://localhost:3000/elves";

document.addEventListener("DOMContentLoaded", () => {
  //Help Santa Btn
  const addBtn = document.querySelector("#new-elf-btn");
  const elfFormContainer = document.querySelector("#elf-form");
  const helpWanted = document.querySelector("#help-wanted");
  addBtn.addEventListener("click", (e) => {
    addElf = !addElf;
    if (addElf) {
      elfFormContainer.style.display = "block";
      helpWanted.style.display = "none";
      e.target.textContent = "Hide Form";
    } else {
      elfFormContainer.style.display = "none";
      helpWanted.style.display = "block";
      e.target.textContent = "Help Santa";
    }
  });

  document.querySelector("#elf-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const newElf = {};
    newElf.name = e.target.name.value;
    newElf.image = e.target.image.value;
    newElf.task = e.target.task.value;
    if (
      newElf.name.toUpperCase().includes("GRINCH") ||
      newElf.name.toUpperCase().includes("SCROOGE")
    ) {
      window.alert("No grumps allowed, ELVES ONLY!");
      e.target.reset();
      return;
    }
    fetch(elvesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newElf),
    })
      .then((res) => res.json())
      .then((elf) => {
        if (missingElves) {
          loadElves();
          missingElves = false;
        } else {
          renderElf(elf);
        }
        e.target.reset();
      });
  });
});

const renderElf = (elf) => {
  const parentNode = document.querySelector("#elf-employees");
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  const h2Element = document.createElement("h2");
  h2Element.textContent = elf.name;
  cardDiv.append(h2Element);
  const h3Element = document.createElement("h3");
  h3Element.textContent = `I can build ${elf.task}!`;
  cardDiv.append(h3Element);
  const img = document.createElement("img");
  img.src = elf.image;
  img.className = "elf-avatar";
  cardDiv.append(img);
  parentNode.append(cardDiv);
};

const loadElves = () => {
  fetch(elvesURL)
    .then((resp) => resp.json())
    .then((elves) => {
      elves.forEach(renderElf);
    });
};
