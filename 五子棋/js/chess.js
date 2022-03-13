var Gobang={
    NO_CHESS:0,
    BLACK_CHESS:-1,
    WHITE_CHESS:1,
    chessArr:[],
    chessboardHtml:"",
    playerColor:"black",
    comColor:"white",
    isPlayerTurn:true,
    isGameStart:false,
    isGameOver:false,
    playerLastChess:[],
    comLastChess:[],
    init:function(){
        for(var i=0;i<15*15;i++){
            var div=$("<div></div>");
            $("div.chessboard").append(div);
        }
        this.chessboardHtml=$("div.chessboard").html();
        var _t=this;
        $(".right a").click(function(event){
            event.preventDefault();
            _t.resetChessBoard();
            if(_t.isGameStart){
                _t.gameOver();
            }else{
                _t.GameStart();
            }
        });
        this.resetChessBoard();
        $(document).ready(function(){
            Gobang.init();
        });
    },
    resetChessBoard:function(){
        $("div.chessboard").html(this.chessboardHtml);
        this.isGameOver=false;
        //初始化棋子状态
        var i,j;
        for(i=0;i<15;i++){
            this.chessArr[i]=[];
            for(j=0;j<15;j++){
                this.chessArr[i][j]=this.NO_CHESS
            }
      }
      var _t=this;
      $("div.chessboard div").click(function(){
          if(!_t.isPlayerTurn||_t.isGameOver){
              return;
          }
          if(!_t.isGameStart){
              _t.GameStart();
          }
          var index=$(this).index(),
            i=Math.floor(index/15),
            j=index%15;
          if(_t.chessArr[i][j]==_t.NO_CHESS){
              _t.playChess(i,j,_t.playerColor);
              if(i===0&&j===0){
                  $(this).removeClass("hover-up-left");
              }
              _t.playerLastChess=[i,j];
              _t.isPlayerWin(i,j);
          }
      });
        $("div.chessboard div").hover(
            function(){
                if(!_t.isPlayerTurn||_t.isGameOver){ return;}
                var index=$(this).index(),
                    i=Math.floor(index/15);
                    j=index%15;
                if(_t.chessArr[i][j]===_t.NO_CHESS){
                    if(i===0&&j===0){
                        $(this).addClass("hover-up-left");
                    }
                    else if (i === 0 && j === 14) {
						$(this).addClass("hover-up-right");
					}
					else if (i === 14 && j === 0) {
						$(this).addClass("hover-down-left");
					}
					else if (i === 14 && j === 14) {
						$(this).addClass("hover-down-right");
					}
					else if (i === 0) {
						$(this).addClass("hover-up");
					}
					else if (i === 14) {
						$(this).addClass("hover-down");
					}
					else if (j === 0) {
						$(this).addClass("hover-left");
					}
					else if (j === 14) {
						$(this).addClass("hover-right");
					}
					else {
						$(this).addClass("hover");
					}
                    //此处省略部分代码,已完成
                }
            },
            function(){
                if(!_t.isPlayerTurn||_t.isGameOver){return; }
                var index=$(this).index(),
                    i=Math.floor(index/15),
                    j=index%15;
                if(i===0&&j===0){
                    $(this).removeClass("hover-up-left");
                }
                else if (i === 0 && j === 14) {
                    $(this).removeClass("hover-up-right");
                }
                else if (i === 14 && j === 0) {
                    $(this).removeClass("hover-down-left");
                }
                else if (i === 14 && j === 14) {
                    $(this).removeClass("hover-down-right");
                }
                else if (i === 0) {
                    $(this).removeClass("hover-up");
                }
                else if (i === 14) {
                    $(this).removeClass("hover-down");
                }
                else if (j === 0) {
                    $(this).removeClass("hover-left");
                }
                else if (j === 14) {
                    $(this).removeClass("hover-right");
                }
                else {
                    $(this).removeClass("hover");
                }
                //省略,已完成
            }
        )
    },
    gameStart:function(){
        this.isGameStart=true;
        $("#play_btn").html("重&nbsp;&nbsp;&nbsp;玩");
    },
    gameOver:function(){
        this.isGameStart=false;
        $("#play_btn").html("开&nbsp;&nbsp;&nbsp;始");
    },
    playChess:function(i,j,color){
        this.chessArr[i][j]=color==="black"?this.BLACK_CHESS:this.WHITE_CHESS;
        if(color===this.comColor){
            $("div.chessboard div."+color+"-last").addClass(color).removeClass(color+"-last");
            $("div.chessboard div:eq("+(i*15+j)+")").addClass(color+"-last");
        }else{
            $("div.chessboard div:eq("+(i*15+j)+")").addClass(color);
        }
    },
    comTurn:function(){
        this.isPlayerTurn=false;
        var maxX=0,
            maxY=0,
            maxWeight=0,
            i,j,tem;
        for(i=14;i>=0;i--){
            for(j=14;j>=0;j--){
                if(this.chessArr[i][j]!==this.NO_CHESS){
                    continue;
                }
                tem=this.comWeight(i,j);
                if(tem>maxWeight){
                    maxWeight=tem;
                    maxX=i;
                    maxY=j;
                }
            }
        }
        this.playChess(maxX,maxY,this.comColor);
        this.comLastChess=[maxX,maxY];
        if((maxWeight>=100000&&maxWeight<250000)||(maxWeight>=500000)){
            this.showResult(false);
            this.gameOver();
            this.isPlayerTurn=true;
        }else{
            this.isPlayerTurn=true;
        }
    },
    //判断玩家是否取胜
    isPlayerWin:function(i,j){
        var nums=1,
            chessColor=this.BLACK_CHESS,
            m,n;
        for(m=j-1;m>=0;m--){
            if(this.chessArr[i][m]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        for(m=j+1;m<15;m++){
            if(this.chessArr[i][m]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        if(nums>=5)
        {
            this.isPlayerWin();
            return;
        }else{
            nums=1;
        }
        //y方向
        for(m=j-1;m>=0;m--){
            if(this.chessArr[m][j]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        for(m=j+1;m<15;m++){
            if(this.chessArr[m][j]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        if(nums>=5)
        {
            this.isPlayerWin();
            return;
        }else{
            nums=1;
        }
        //左斜方向
        for(m=i-1,n=j-1;m>=0&&n>=0;m--,n--){
            if(this.chessArr[m][n]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        for(m=i+1,n=j+1;m<15&&n<15;m++,n++){
            if(this.chessArr[m][n]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        if(nums>=5)
        {
            this.isPlayerWin();
            return;
        }else{
            nums=1;
        }
        //右斜方向
        for(m=i-1,n=j+1;m>=0&&n<15;m--,n++){
            if(this.chessArr[m][n]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        for(m=i+1,n=j-1;m<15&&n>=01;m++,n--){
            if(this.chessArr[m][n]===chessColor){
                nums++;
            }else{
                break;
            }
        }
        if(nums>=5)
        {
            this.isPlayerWin();
            return;
        }else{
            nums=1;
        }
        this.comTurn;
    },
    isPlayerWin:function(){
        this.showResult(true);
        this.gameOver();
    },
    //x 是否为空
    numAndsideX:function(i,j,chessColor){
        var m,n,
            nums=1,
            side1=false,
            side2=false;
        for(m=j-1;m>=0;m--){
            if(this.chessArr[i][m]===chessColor){
                nums++;
            }else{
                if(this.chessArr[i][m]===this.NO_CHESS){
                    side1=true;
                }
                break;
            }
        }
        for(m=j+1;m<15;m++){
            if(this.chessArr[i][m]===chessColor){
                nums++
            }else{
                if(this.chessArr[i][m]===this.NO_CHESS){
                    side2=true;
                }
                break;
            }
        }
        return {"nums":nums,"side1":side1,"side2":side2};
    },
    //y方向
    numAndsideY:function(i,j,chessColor){
        var m,n,
            nums=1,
            side1=false,
            side2=false;
        for(n=i-1;n>=0;n--){
            if(this.chessArr[n][j]===chessColor){
                nums++;
            }else{
                if(this.chessArr[n][j]===this.NO_CHESS){
                    side1=true;
                }
                break;
            }
        }
        for(n=i+1;n<15;n++){
            if(this.chessArr[n][j]===chessColor){
                nums++
            }else{
                if(this.chessArr[n][j]===this.NO_CHESS){
                    side2=true;
                }
                break;
            }
        }
        return {"nums":nums,"side1":side1,"side2":side2};
    },
    //右斜方向
    numAndsideXY:function(i,j,chessColor){
        var m,n,
            nums=1,
            side1=false,
            side2=false;
        for(n=i-1,m=j-1;n>=0&&m>=0;n--,m--){
            if(this.chessArr[n][m]===chessColor){
                nums++;
            }else{
                if(this.chessArr[n][m]===this.NO_CHESS){
                    side1=true;
                }
                break;
            }
        }
        for(n=i+1,m=j+1;n<15&&m<15;n++,m++){
            if(this.chessArr[n][m]===chessColor){
                nums++
            }else{
                if(this.chessArr[n][m]===this.NO_CHESS){
                    side2=true;
                }
                break;
            }
        }
        return {"nums":nums,"side1":side1,"side2":side2};
    },
    //左斜方向
    numAndsideYX:function(i,j,chessColor){
        var m,n,
            nums=1,
            side1=false,
            side2=false;
        for(n=i+1,m=j-1;n<15&&m>=0;n++,m--){
            if(this.chessArr[n][m]===chessColor){
                nums++;
            }else{
                if(this.chessArr[n][m]===this.NO_CHESS){
                    side1=true;
                }
                break;
            }
        }
        for(n=i-1,m=j+1;n>=0,m<15;n--,m++){
            if(this.chessArr[n][m]===chessColor){
                nums++
            }else{
                if(this.chessArr[n][m]===this.NO_CHESS){
                    side2=true;
                }
                break;
            }
        }
        return {"nums":nums,"side1":side1,"side2":side2};
    },
    //省略部分代码,已完成
    comWeight:function(i,j){
        var weight=14-(Math.abs(i-7)+Math.abs(j-7)),
            pointInfo={};
            chessColor=this.WHITE_CHESS;
        //x方向
        pointInfo=this.numAndsideX(i,j,chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,true);
        pointInfo=this.numAndsideX(i,j,-chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,false);
        //y方向
        pointInfo=this.numAndsideY(i,j,chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,true);
        pointInfo=this.numAndsideY(i,j,-chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,false);
        //左斜
        pointInfo=this.numAndsideXY(i,j,chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,true);
        pointInfo=this.numAndsideXY(i,j,-chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,false);
        //右斜
        pointInfo=this.numAndsideYX(i,j,chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,true);
        pointInfo=this.numAndsideYX(i,j,-chessColor);
        weight+=this.judgeWeight(pointInfo.nums,pointInfo.side1,pointInfo.side2,false);
        return weight;
    },
    judgeWeight:function(nums,side1,side2,isCom){
        var weight=0;
        switch(nums){
            case 1:
                if(side1&&side2){
                    weight=isCom?15:10;
                }
            break;
            case 2:
                if(side1&&side2){
                    weight=isCom?100:50;
                }
                else if(side1||side2){
                    weight=isCom?10:5;
                }
            break;
            case 3:
				if (side1 && side2) {
					weight = isCom ? 500 : 200;	//三个连子两边为空
				}
				else if (side1 || side2) {
					weight = isCom ? 30 : 20;	//三个连子一边为空
				}
				break;
			case 4:
				if (side1 && side2) {
					weight = isCom ? 5000 : 2000;	//四个连子两边为空
				}
				else if (side1 || side2) {
					weight = isCom ? 400 : 100;	//四个连子一边为空
				}
				break;
			case 5:
				weight = isCom ? 100000 : 10000;
				break;
			default:
				weight = isCom ? 500000 : 250000;
				break;
        }
        return weight;
    },
    showResult:function(isPlayerWin){
        if(isPlayerWin){
            var resultDiv=$("<div id='success'></div>");
                resultDiv.addClass("imgDiv");
                resultDiv.html("<img src='images/success.png' width='100%' height='100%'>");
                $("body").append(resultDiv);//从body中添加 resultDIv
                setTimeout("$('#success').remove()",3000);
        }else{
            var resultDIv=$("<div id='failure'></div>");
                resultDIv.addClass("imgDiv");
                resultDIv.html("<img src='images/failure.png' width='100%' height='100%'>");
                $("body").append(resultDIv);
                setTimeout("$('#failure').remove()",3000);
        }
        this.isGameOver=true;
        this.markWinChesses(isPlayerWin);
    },
    markWinChesses:function(isPlayerWin){
        var nums=1,
            lineChess=[],
            i,
            j,
            chessColor,
            m,n;
        if(isPlayerWin){
            chessColor=this.BLACK_CHESS;
            i=this.playerLastChess[0];
            j=this.playerLastChess[1];
        }else{
            chessColor=this.WHITE_CHESS;
            i=this.comLastChess[0];
            j=this.comLastChess[1];
        }
        $("div.chessboard div."+this.comColor+"-last").addClass(this.comColor).removeClass(this.comColor+"-last");
        //x
        lineChess[0]=[i,j];
        for(m=j-i;m>=0;m--){
            if(this.chessArr[i][m]===chessColor){
                lineChess[nums]=[i,m];
                nums++;
            }else{
                break;
            }
        }
        for(m=j+i;m<15;m++){
            if(this.chessArr[i][m]===chessColor){
                lineChess[nums]=[i,m];
                nums++;
            }else{
                break;
            }
        }
        if(nums>=5){
            for(k=nums-1;k>=0;k--){
                this.markWinChesses(lineChess[k][0]*15+lineChess[k][1],isPlayerWin?this.playerColor:this.comColor);
            }
        }
        //省
    },
    markChess:function(pos,color){
        $("div.chessboard div:eq("+pos+")").removeClass(color).addClass(color+"-last");
    },
}