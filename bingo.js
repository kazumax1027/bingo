var status = 1; // 1:停止中、2:実行中、3:Stopボタンが押された（停止前）
var STATUS_STOPPED = 1;
var STATUS_RUNNING = 2;
var STATUS_STOPBTN_PRESSED = 3;

var timer_1;  // ビンゴ用タイマー
var timer_bg; // 背景点滅用タイマー
var ind_bg;   // 背景点滅用インデックス

// ビンゴ用数字配列
var numList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];

// 横に表示する画像の配列
var imgList = [
  "images/eyes0033.jpg",
  "images/eyes0065.jpg",
  "images/eyes0067.jpg",
  "images/eyes0070.jpg",
  "images/eyes0071.jpg",
  "images/eyes0072.jpg",
  "images/eyes0081.jpg",
  "images/eyes0087.jpg",
  "images/eyes0120.jpg",
  "images/eyes0129.jpg",
  "images/eyes0965.jpg",
  "images/eyes0967.jpg"
];

var count = 0; // 数字が決定された数


// ビンゴの数字ルーレットを開始する関数
function runBingo(reservedNum, reservedMessage) {
  
  // 定期的に実行するための関数オブジェクト
  // ランダムに数字を選んで表示し、ステータスがSTATUS_STOPBTN_PRESSEDになっていればタイマーを停止する
  var func_ref = function() {
  
    var ind = Math.floor(Math.random() * numList.length);    
    setText(num, numList[ind]);

    if (status == STATUS_STOPBTN_PRESSED) {
      clearInterval(timer_1);

      count++;
      var e_td = document.getElementById("td_" + count);
      setText(e_td, " "+numList[ind]);
      
      var e_image = document.getElementById("id_image");
      e_image.src = imgList[count % imgList.length];
      
      // 予約番号が指定されている場合、作為的にそれを出力する
      if (reservedNum > 0) {
        num.innerText = reservedNum;
        // document.bingoform.recent_selected_num.value = reservedNum;
        if (reservedMessage != "") {
          // num_td.style.backgroundColor = "#FFF06F";
          ind_bg = 0;
          reserved_message.innerText = reservedMessage;
          timer_bg = setInterval(blinkBg, 500);
        }
      }
      else {
        numList.splice(ind, 1);
      }
      
      num_td.style.backgroundColor = "#FFF06F";
      
      if (numList.length > 0) {
        document.bingoform.start_button.value = "　Start!　";
        status = STATUS_STOPPED;
      }
      
      return;
    }
  }
  
  num_td.style.backgroundColor = "#FFFFFF";
  timer_1 = setInterval(func_ref, 100);
}

// 1つ目の画像を表示する
function initImage() {
  var e_image = document.getElementById("id_image");
  e_image.src = imgList[0];
}

// 予約番号の際に、背景を点滅させる
function blinkBg() {
  if (ind_bg > 3) {
    clearInterval(timer_bg);
  }

  if (ind_bg % 2 == 0) {
    num_td.style.backgroundColor = "#FFF06F";
  }
  else {
    num_td.style.backgroundColor = "#FFFFFF";
  }
  ind_bg++;
}

// HTML要素に文字列をセットする
function setText(e, str) {
  e.innerText = str;
  e.textContent = str;
}
