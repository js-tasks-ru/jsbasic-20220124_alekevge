function highlight(table) {
  // ваш код...
  for (let i=0; i<table.rows.length;i++)
  {
    const row = table.rows[i]
    row.hidden = ![...row.cells].some((cell)=>cell.dataset.available!==undefined)

    if (row.cells[3].dataset.available=="true") 
      row.classList.add("available")
    else
      row.classList.add("unavailable")


    if (row.cells[2].textContent=="f")
      row.classList.add("female")
    else
      row.classList.add("male")


    if (+row.cells[1].textContent<18) 
    row.style.textDecoration= "line-through"

  }
}
