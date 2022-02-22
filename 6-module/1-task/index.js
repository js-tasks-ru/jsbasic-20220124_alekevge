/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem =document.createElement("table")
    this.header=document.createElement("thead")
    this.header.innerHTML= `
                  <tr>
                    <th>Имя</th>
                    <th>Возраст</th>
                    <th>Зарплата</th>
                    <th>Город</th>
                    <th></th>
                  </tr>
                ` 
    this.body = this.renderTableBody(rows)
    this.elem.appendChild(this.header)
    this.elem.appendChild(this.body)
  }

   renderTableBody(rows)
   {
      let body=document.createElement("tbody")
       
      for (const row of rows) 
      {
        let tr = document.createElement("tr")
      
        for (const key in row) 
        { 
          let td = document.createElement("td")
          td.textContent = row[key]
          tr.appendChild(td)   
        }

        let btn = document.createElement("button")
        btn.textContent="x"
        btn.addEventListener("click",() => {body.removeChild(tr)})
        tr.appendChild(btn)   
        body.appendChild(tr)  
     }
    return body
  }
}
