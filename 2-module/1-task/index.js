function sumSalary(salaries) {
  // ваш код...
  salaries=Object.values(salaries)
  let res = 0;
  for (let i = 0; i < salaries.length; i++) {
    const el = salaries[i];
    if (isFinite(el)) res+=el  
  } 
  return res
}
