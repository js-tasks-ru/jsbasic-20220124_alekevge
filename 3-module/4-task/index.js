function showSalary1(users, age) {
  // ваш код...
  let res=users.filter(x=>x.age<=age)
               .map(x=>[x.name, x.balance].join(", "))
               .join("\n")
  return res
}


function showSalary(users, age) {
  // ваш код...
  function reducer(sum, cur)
  {
    return (sum? sum+"\n" :sum) + (cur.age<=age?cur.name+", "+cur.balance:"")
  }
  return users.reduce((sum,cur) => cur.age <= age ?  reducer(sum,cur) : sum ,"")
}

//обе функции рабочие