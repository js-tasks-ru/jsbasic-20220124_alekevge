function factorial(n) {
  // ваш код...
  let fact=1
  while (n>=0)
  {
    if (n==0) return fact
    fact*=n
    n--
  }
  return null;
}
