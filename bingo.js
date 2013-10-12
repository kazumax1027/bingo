var status = 1; // 1:��~���A2:���s���A3:Stop�{�^���������ꂽ�i��~�O�j
var STATUS_STOPPED = 1;
var STATUS_RUNNING = 2;
var STATUS_STOPBTN_PRESSED = 3;

var timer_1;  // �r���S�p�^�C�}�[
var timer_bg; // �w�i�_�ŗp�^�C�}�[
var ind_bg;   // �w�i�_�ŗp�C���f�b�N�X

// �r���S�p�����z��
var numList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];

// ���ɕ\������摜�̔z��
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

var count = 0; // ���������肳�ꂽ��


// �r���S�̐������[���b�g���J�n����֐�
function runBingo(reservedNum, reservedMessage) {
  
  // ����I�Ɏ��s���邽�߂̊֐��I�u�W�F�N�g
  // �����_���ɐ�����I��ŕ\�����A�X�e�[�^�X��STATUS_STOPBTN_PRESSED�ɂȂ��Ă���΃^�C�}�[���~����
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
      
      // �\��ԍ����w�肳��Ă���ꍇ�A��דI�ɂ�����o�͂���
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
        document.bingoform.start_button.value = "�@Start!�@";
        status = STATUS_STOPPED;
      }
      
      return;
    }
  }
  
  num_td.style.backgroundColor = "#FFFFFF";
  timer_1 = setInterval(func_ref, 100);
}

// 1�ڂ̉摜��\������
function initImage() {
  var e_image = document.getElementById("id_image");
  e_image.src = imgList[0];
}

// �\��ԍ��̍ۂɁA�w�i��_�ł�����
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

// HTML�v�f�ɕ�������Z�b�g����
function setText(e, str) {
  e.innerText = str;
  e.textContent = str;
}
