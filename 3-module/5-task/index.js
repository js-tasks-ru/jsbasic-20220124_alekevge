function getMinMax1(str) {
  // ваш код...
  let arr=str.split(" ").filter(x=>isFinite(x))
  return {min:Math.min(...arr),
          max:Math.max(...arr)}
}



function getMinMax(str) {
  // ваш код...
  function compare(el,res)
  {
    return {min:  isFinite(el) ?  Math.min(+el,res.min) : res.min,  //el<res.min?+el:res.min, 
            max:  isFinite(el) ?  Math.max(+el,res.max) : res.max,  ///el>res.max?+el:res.max
           }
  }

  let result=str.split(" ").reduce((sum,el) => sum=compare(el,sum), {min: Infinity, max: -Infinity})
  
  return result
}
