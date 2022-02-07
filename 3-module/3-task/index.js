function camelize(str) {
  // ваш код...
  let words = str.split("-")
  function summator(res, word,index)
  {
    if (!word) return res
    res += index?word[0].toUpperCase():word[0] 
    return res+word.slice(1)
  }

  return  words.reduce(summator)
}


 function camelize1(str) {
  // ваш код...
  let words = str.split("-")
  let res=""

  for (let i = 0; i < words.length; i++) {
    const word=words[i]
    if (!i&& word) res+=word 
    else if (word) res+=word[0].toUpperCase()+word.slice(1)
  }
  return  res
} 