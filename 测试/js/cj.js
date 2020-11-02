$(document).ready(function () {
  // 转盘的初定义
  var lottery = {
    index: 0, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 10, //初始转动速度
    times: 0, //转动次数
    cycle: 30, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: 0, //中奖位置
    init: function (id) {
      if ($("#" + id).find(".prize").length > 0) {
        $lottery = $("#" + id);
        $units = $lottery.find(".prize");
        this.obj = $lottery;
        this.count = $units.length;
      }
    },
    roll: function () {
      var index = this.index;
      var count = this.count;
      var lottery = this.obj;
      $(lottery).find(".prize").removeClass("active");
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      $(lottery)
        .find(".prize-" + this.index)
        .addClass("active");
      this.index = index;
      return false;
    },
    stop: function (index) {
      this.prize = index;
      return false;
    },
  };

  // 中奖转动事件
  function roll() {
    lottery.times += 1;
    lottery.roll();
    var prize_site = $("#lotteryBoxs").attr("prize_site");
    if (lottery.times > lottery.cycle + 10 && lottery.index == prize_site) {
      var prize_id = $("#lotteryBoxs").attr("prize_id");
      var prize_name = $("#lotteryBoxs").attr("prize_name");
      console.log(prize_site + "结果");
      //中奖情况的判断--模态框
      if (prize_site == 1 || prize_site == 2 || prize_site == 3) {
        //已中奖
        setTimeout(function () {
          console.log("恭喜你获得" + prize_name);
        }, 500);
      } else {
        //未中奖
        setTimeout(function () {
          console.log("中奖结果：" + prize_name);
        }, 500);
      }

      clearTimeout(lottery.timer);
      lottery.prize = -1;
      lottery.times = 0;
      click = false;
    } else {
      if (lottery.times < lottery.cycle) {
        lottery.speed -= 20;
      } else if (lottery.times == lottery.cycle) {
        var index = (Math.random() * lottery.count) | 0;
        lottery.prize = index;
      } else {
        if (
          lottery.times > lottery.cycle + 10 &&
          ((lottery.prize == 0 && lottery.index == lottery.count - 1) || lottery.prize == lottery.index + 1)
        ) {
          lottery.speed += 90;
        } else {
          lottery.speed += 30;
        }
      }
      if (lottery.speed < 30) {
        lottery.speed = 30;
      }
      lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
  }

  var click = false;

  // 后台数据的调用
  $(function () {
    lottery.init("lotteryBoxs");
    $(".btn").click(function () {
      if (click) {
        return false;
      } else {
        lottery.speed = 100;

        //此处数据应该从接口获取
        var prizeArr = ["谢谢参与", "一等奖", "二等奖", "三等奖"];
        var prizeId = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        var prize_site = prizeId;
        console.log("位置" + prizeId);
        $("#lotteryBoxs").attr("prize_site", prize_site);
        $("#lotteryBoxs").attr("prize_name", prizeArr[prizeId]);
        roll();
        click = true;
        return false;
      }
    });
  });
});
