

//先頭に0をつける（ 一桁の数字の場合 5 → 05 ）
export function zeroPadding(num){
  return ('0' + num).slice(-2);
}

/**
 * スケジュールから日付がNullのデータを取得する
 * (todoでは日付が入っていないデータを表示する)
 * @param array value  
 * @returns array value 
 */
  export function todos(value) {
  if(value.sch_date == null){
      return value;
  }
}


// 仮
export function sliceTime(value){
  const newValue = value.slice(0, 5);
  return  newValue;
}
// 仮
export function sliceValue(value){
  const newValue = value.slice(0, 2);
  return  newValue.replace(/^0+/, '');
}


//先頭の0を削除する
export function sliceZero(value){
  return  value.replace(/^0+/, '');
}
//年を切り取る 2022ｰ06ｰ22 → 06-22
export function sliceYear(value){
  const newValue = value.slice(5);
  return  newValue.replace(/^0+/, '');
}



