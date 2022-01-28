/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

function checkSpace(name)
{
  let i=0
  while (name[i])
  {
    if (name[i]===" ") return true
    i++
  }
  return false
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  return !!name && name['length'] >= 4 && !checkSpace(name)
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
