

//数字の前に0をつける（ 一桁の数字の場合 5 → 05 ）
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

