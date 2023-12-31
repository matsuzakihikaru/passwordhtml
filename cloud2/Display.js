'use strict';

class Display {

	draw() {
		let turn = screen%20;
		let pass = Math.floor(screen / 20);

		context.clearRect(0, 0, 1500, 1000);

        context.font = "24px sans-serif";
        if (pass == 0 || pass == 7) {
        	context.fillText((turn+1)+" / 4組目 ", 0, 128*3+24);;
        }
        else{
        	context.fillText("条件を考えてください " +(turn+1)+" / 4組目 ", 0, 128*3+24);
        }

        context.fillText((pass+1)+" / 14 セット ", 0, 128*3+48);

        if (pass==0) {
        	context.fillText("条件は「前髪で額が隠れている人」です。", 0, 128*3+72);
        }
        if (pass==7) {
        	context.fillText("条件は「髪がパーマの人」です。", 0, 128*3+72);
        }

		//画像描画
	    for (let i = 0; i < 9; i++) {
	        let img = new Image();
	        if (all_data[pass][3][turn] - 1 == i) {
	        	img.src = '../images/synthesized/'+all_data[pass][1][turn];

	        }
	        else {
	        	img.src = '../images/synthesized/'+all_data[pass][2][turn*9+i];
	        }
	        
	        img.onload = function(){
	            context.drawImage(img, i%3*imgsize, Math.floor(i/3)*imgsize, imgsize, imgsize);}

	    }

	    let i = all_data[pass][3][turn] - 1;

 		let limit = 1800;
 		if (0<Math.floor(screen/20) & Math.floor(screen/20)<=6) {
 			limit = auth_limit[rand[Math.floor(screen/20)-1]];
 		}
 		else if (7<Math.floor(screen/20) & Math.floor(screen/20)<=13) {
 			limit = auth_limit[rand[Math.floor(screen/20)-2]];
 		}

	    let tl_limit = 100;

	    //tl 1条件目と8条件目は0.5秒の赤枠表示
	    if (pass == 0 || pass == 7) {
	    	tl_limit = 500;
	    }

	    setTimeout(function(){
    	context.strokeStyle = "red";
        context.lineWidth = 6;
        context.strokeRect(i%3*imgsize, Math.floor(i/3)*imgsize, imgsize, imgsize);
    	}, limit-tl_limit);

	    canvas.addEventListener('click', this.onClick, false);
	}

}