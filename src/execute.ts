export function exec(func: any, argsIndexes: any[]){
  if (argsIndexes.length == 0)
    return func.apply(null, []);
  
  let length = Math.max(...(argsIndexes.map(v => v.index) || [])) + 1;
  let args = [...Array(length)].map(_ => undefined);
  argsIndexes.forEach(v => args[v.index] = v.value);

  return func.apply(null, args);
}
