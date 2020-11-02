window.setInterval(function () {
  var shiui = new Date(2020, 10, 11);
  var time = new Date();
  var mss = shiui - time;
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
  document.getElementById("date").innerHTML =
    "双十一倒计时：" + days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + "秒";
}, 1000);