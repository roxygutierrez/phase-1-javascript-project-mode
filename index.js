let addElf = false;
let missingElves = true;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-elf-btn");
  const elfFormContainer = document.querySelector("#elf-form");
  const helpWanted = document.querySelector("#help-wanted");
  addBtn.addEventListener("click", () => {
    addElf = !addElf;
    if (addElf) {
      elfFormContainer.style.display = "block";
      helpWanted.style.display = "none";
    } else {
      elfFormContainer.style.display = "none";
      helpWanted.style.display = "block";
    }
  });

  document.querySelector("#elf-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const newElf = {};
    newElf.name = e.target.name.value;
    newElf.image = e.target.image.value;
    if (
      newElf.name.toUpperCase().includes("GRINCH") ||
      newElf.name.toUpperCase().includes("SCROOGE")
    ) {
      window.alert("No grumps allowed, ELVES ONLY!");
      e.target.reset();
      return;
    }
    fetch("http://localhost:3000/elves", {
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
  const img = document.createElement("img");
  img.src = elf.image;
  img.className = "elf-avatar";
  cardDiv.append(img);
  parentNode.append(cardDiv);
};

const loadElves = () => {
  fetch("http://localhost:3000/elves")
    .then((resp) => resp.json())
    .then((elves) => {
      elves.forEach(renderElf);
    });
};
