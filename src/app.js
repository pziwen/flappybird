var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");//获取绘制环境

//创建一个图片
var img = new Image();
img.src = "src/img/birdDown.png";

var birdX = 200;
var birdY = 100;
var birdTimer = null;

//加载完图片后执行
(function () {
    //绘制柱子
    function drawColumn() {
        for (var i=0;i<columnArr.length;i++){
            columnArr[i].positionX--;
            context.drawImage(columnArr[i].imgA,columnArr[i].positionX,columnArr[i].positionY);
            context.drawImage(columnArr[i].imgB,columnArr[i].positionX,columnArr[i].positionY + 350);

            if (birdX+40 >= columnArr[i].positionX && birdX-63 <= columnArr[i].positionX){
                //经过加分
                if (columnArr[i].id != same){
                    mark++;
                    same = columnArr[i].id;
                    document.getElementById("mark").innerHTML="得分："+mark;
                }
                //判断碰撞
                if (birdY<columnArr[i].positionY+250 || birdY+38>columnArr[i].positionY+350){
                    // console.log("die")
                    clearInterval(columnTimer);
                    clearInterval(birdTimer);

                    var oRes = document.getElementById("res");
                    oRes.style.display = "block";

                    //奖牌
                    oRes.children[0].innerHTML = "得分："+mark;
                    if(mark>0 && mark<=10){
                        oRes.children[1].src = "src/img/tong.png";
                    }
                    if(mark>10 && mark<=50){
                        oRes.children[1].src = "src/img/yin.png";
                    }
                    if(mark>50 && mark<=100){
                        oRes.children[1].src = "src/img/jin.png";
                    }
                    if(mark>100){
                        oRes.children[1].src = "src/img/zuan.png";
                    }
                    setTimeout(function () {
                        oRes.innerHTML = "<p id='pid'>游戏即将重新开始</p>";
                        setTimeout(function () {
                            location.reload();//重新刷新页面
                        },3000);
                    },3000);
                }
            }
        }
    }

    img.onload = function () {
        if (birdTimer == null){//避免更换图片时重新加载
            birdTimer = setInterval(function () {
                if (birdY <= 362){
                    birdY++;
                }
                context.clearRect(0,0,800,400);//清空上一帧画布
                drawColumn();
                context.drawImage(img,birdX,birdY);
            },10);
        }

    };
}());


//编辑小鸟动作
(function (){
    document.onmousedown = function () {
        img.src = "src/img/birdUp.png";
        birdY = birdY - 30;
    }
    document.onmouseup = function () {
        img.src = "src/img/birdDown.png";
    }
}());


//柱子

var columnArr = [];
var columnTimer = null;

(function () {
    function createColumn() {
        //定时器，规定时间内产生柱子
        columnTimer = setInterval(function () {
            var column = {};//柱子容器
            column.positionX = 800;
            column.positionY = -Math.round(Math.random()*100 + 100);
            column.imgA = new Image();
            column.imgB = new Image();
            column.imgA.src = "src/img/zhuziUp.png";
            column.imgB.src = "src/img/zhuziDown.png";

            column.id = new Date().getTime();
            columnArr.push(column);
        },2000);
    }
    createColumn();
}());



var same = null;
var mark = 0;

