let calculator = {
  // ваш код
  sum: function(a,b)
  {
    return this.a+this.b
  },
  
  mul: function (a,b)
  {
    return this.a*this.b
  },

  read:function (a,b)
  {
    if (a!==undefined&& b!==undefined)
    {
      this.a=a
      this.b=b
    } 
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
