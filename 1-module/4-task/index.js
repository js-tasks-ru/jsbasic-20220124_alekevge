function checkSpam(str) {
  // ваш код...
  let spam1 = "1xBet"
  let spam2 = "XXX"
  str = toLowerCase(str)
  return str.includes(toLowerCase(spam1)) ||  str.includes(toLowerCase(spam2))
}

function toLowerCase(str)
{
  //приведем все к одному регистру
  let res=""
  for (let i = 0; i < str.length; i++) {
    res+=str[i].toLowerCase()
  }
  return res
}