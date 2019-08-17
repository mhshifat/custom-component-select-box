document.querySelectorAll(".container").forEach(item => {
  const con = item;
  const select = con.querySelector("select");
  const selectSelected = con.querySelector(
    ".select-selected .select-selected-text"
  );
  const options = con.querySelector(".select-options");
  let selectedOption = select.options[select.selectedIndex];

  selectSelected.innerHTML = selectedOption.innerHTML;

  selectSelected.parentElement.addEventListener("click", function(e) {
    e.stopPropagation();
    options.classList.toggle("status-options");
    options.innerHTML = "";
    if (!options.className.includes("status-options")) {
      options.style.border = "1px solid rgba(247, 247, 247, 0.1)";
      options.style.borderTop = "none";
      options.style.borderTopLeftRadius = "0";
      options.style.borderTopRightRadius = "0";
      options.style.boxShadow = "0 10px 40px rgba(255,255,255,0.1)";
      options.previousSibling.previousSibling.style.border =
        "1px solid rgba(247, 247, 247, 0.1)";
      options.previousSibling.previousSibling.style.borderBottom = "none";
      options.previousSibling.previousSibling.style.borderBottomLeftRadius =
        "0";
      options.previousSibling.previousSibling.style.borderBottomRightRadius =
        "0";
    } else {
      options.style = "none";
      options.previousSibling.previousSibling.style = "none";
    }
    for (const opt of select.options) {
      if (opt.value !== "Select an Option") {
        const div = document.createElement("div");
        div.setAttribute("class", "select-option");
        div.innerHTML = opt.value;
        if (opt.innerHTML === selectedOption.innerHTML) {
          div.classList.add("selected");
        }
        div.addEventListener("click", function(e) {
          e.stopPropagation();
          selectedOption = this;
          selectSelected.innerHTML = selectedOption.innerHTML;
          select.selectedIndex = Array.from(select.options).findIndex(
            o => o.value === this.innerHTML
          );
          Array.from(this.parentElement.querySelectorAll(".selected")).forEach(
            s => s.classList.remove("selected")
          );
          this.classList.add("selected");
          options.classList.toggle("status-options");
        });
        options.appendChild(div);
      }
    }
  });
});

document.querySelector("body").addEventListener("click", function(e) {
  Array.from(this.querySelectorAll(".select-options")).forEach(op => {
    op.classList.add("status-options");
    op.style = "none";
    op.previousSibling.previousSibling.style = "none";
  });
});
