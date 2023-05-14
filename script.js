$(document).ready(function(){
    var a=[
            [ "","",""],
            [ "","",""],
            [ "","",""]
            ];

            $('#btnNext').click(function(){
                var bvalidPlay=false;
                //Human Play
                //row=r=fila
                for(r= 0; r <=2; r++){
                    //column=c
                for(c=0; c <=2; c++){
                    if(a[r][c]!= $('#t' + r + c).val()){
                        a[r][c]=$('#t' + r + c).val();
                    }

                }

           }

            if (checkWhoWin()){
                resetArray();
                $('#forma')[0].reset();
            }
           // Computer play
           do{
                 r=  Math.floor(Math.random() * 3);  //0-2
                  c= Math.floor(Math.random() * 3);   //0-2
                console.log(r,'',c);
                    if(a[r][c] == ""){
                        a[r][c]="0";
                        $('#t' + r + c).val("0");
                        bValidPlay=true;
                    }

                }while (!bValidPlay);
                checkWhoWin('0','Computer');
                if(checkWhoWin('x','Human')){
                    resetArray();
                    $('form').reset();
                }

                //Validacion de quien gano

            });

            function checkWhoWin(whoChar, whoGuy){
     //Check if player win
     var player =whoChar;
     var whowin = '';
     for(r=0; r <= 2; r++){// Horizontal check
         if((a[r][0]==player) &&
           (a[r][1]==player) &&
           (a[r][2]==player)){
                  whowin=whoGuy;
              }
     }

     for(c=0; c<= 2; c++){ //vertical check
      if((a[0][c]==player) &&
        (a[1][c]==player) &&
        (a[2][c]==player)){
               whowin=whoGuy;
           }
    }

      whowin= ((a[0][0]==player) && (a[1][1]==player) &&
                      (a[2][2]==player)? whoGuy : whowin);
      whowin= ((a[2][0]==player) && (a[1][1]==player) &&
                      (a[0][2]==player)? whoGuy : whowin);

    var bWinner = false;

     if(whowin.length >0) {
         alert(whowin + ' win!!!');
         bWinner= true;
         return true;
             }
             var plays = 0;
             for(r= 0; r <=2; r++){
                //column=c
            for(c=0; c <=2; c++){
                if(a[r][c].length >0){
                    plays ++;

                }

            }

       }
       if(plays==9)
       {
            return true;
       }
       return false;

       }

       function resetArray(){
       // var plays = 0;
        for(r= 0; r <=2; r++){
           //column=c
       for(c=0; c <=2; c++){
           a[r][c]='';
           }

       }

       }

    });
