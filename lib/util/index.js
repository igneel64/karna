const asyncForEach = async function(array, callback){
  for(let index = 0; index < array.length ; index+=1){
    await callback(array[index], index, array);
  }
};

const asyncFind = async function(array, predicate){
  let results = await Promise.all(array.map(predicate));
  return results.find( (_, index) => results[index] );
}


export {
  asyncForEach,
  asyncFind,
}
