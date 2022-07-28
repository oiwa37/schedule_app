/**
 * 先頭に0をつける（ 一桁の数字の場合 5 → 05 ）
 * @param int num 
 * @return int num
 */
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


//文字列の長さを管理する関数
/**
 * 文字列(タイトル)が6文字以上だった場合、6文字にし以降を”…”で省略
 * @param string value カレンダーの日付内に表示される予定のタイトル
 * @return string value 整型後の文字列
 */
export function titleLimit(value){
  if( value.length >= 7 ){
    const newValue =  value.slice(0, 6);
    return newValue + '...';
  }else{
    return value;
  }
}
/**
 * 文字列(タイトル)が17文字以上だった場合、16文字にし以降を”…”で省略
 * @param string value TodoListに表示される予定
 * @return string value 整型後の文字列
 */
export function todoTitleLimit(value){
  if( value.length >= 16 ){
    const newValue =  value.slice(0, 16);
    return newValue + '...';
  }else{
    return value;
  }
}

/**
 *  valueから先頭5文字を切り取る
 * @param string value 
 * @returns string newValue
 */
export function sliceTime(value){
  const newValue = value.slice(0, 5);
  return  newValue;
}

/**
 * valueから先頭2文字を切り取る
 * @param string value 
 * @returns string newValue
 */
export function sliceValue(value){
  const newValue = value.slice(0, 2);
  return  newValue.replace(/^0+/, '');
}

/**
 * 先頭の0を削除する
 * @param string value 
 * @returns string value
 */
export function sliceZero(value){
  return  value.replace(/^0+/, '');
}


/**
 * 年を切り取る 2022ｰ06ｰ22 → 06-22
 * @param string value 
 * @returns string newValue
 */
export function sliceYear(value){
  const newValue = value.slice(5);
  return  newValue.replace(/^0+/, '');
}

