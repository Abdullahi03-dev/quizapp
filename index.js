let time=document.querySelector('.time')
let btns=document.querySelectorAll('#btn')
let contain=document.getElementById('contain')
let nextbtn=document.getElementById('nextbtn')
let questionlist=document.querySelector('.question')
let container=document.querySelector('.container')
let button=document.querySelector('button')
let btn1=document.querySelector('.btn1')
let btn2=document.querySelector('.btn2')
let btn3=document.querySelector('.btn3')
let btn4=document.querySelector('.btn4')
let restart=document.getElementById('restart')
let indicator=document.getElementById('indicator')
let hintbtn=document.getElementById('hintbtn')
let hintTag=document.getElementById('hintTag')
let genreTag=document.getElementById('genreTag')
let questionlists=document.querySelector('.questionlist')
let queslist=1
let questions=[{
	question:`Find the derivative of the function<br>y=2x<sup>2</sup>(2x-1).`,
	options:['12x<sup>2</sup>-4x','13x<sup>3</sup>+4x','12y<sup>2</sup>-3y','12x-4x'],
	hint:'USE PRODUCT RULE',
	genre:'MATHS:CALCULUS',
	correct:['12x<sup>2</sup>-4x']
		
},{
	question:'Factorise The Equation<br>x<sup>2</sup>+8x-20',
	options:['(x+10)(x-3)','(x+30)(x+3)','(x+11)(x-3)','(x-10)(x-3)' ,'(x+10)(x-2)'],
	hint:'QUADRATIC EQUATION',
	genre:'MATH:QUAD EQUATION',
	correct:['(x+10)(x-2)']
},{
    question:'Factorise The Equation<br>(3a+2)(2a-7)=0',
	options:['a=-2/4 or -7/2','a=2/3 or 7/2','a=-2/3 or 7/2','a=-2/3 or -7/2', 'a=-4/3 or 7/2'],
	hint:'EXPAND THE EQUATION',
	genre:'QUAD EQUATION',
	correct:['a=-2/3 or 7/2']
},{
	question:'The physical quantity that has the same dimensions as impulse is?',
	options:['Energy','Momentum','Surface','Tension', 'Pressure'],
	hint:'A SIMPLE PHYSICS QUESTION',
	genre:'PHYSICS',
	correct:['Momentum']
},{
	question:'The useless guy on earth',
	options:['Fahad','Abdallah','Khalifah','Aziz', 'Samad'],
	hint:'No HINT SO EASY',
	genre:'....',
	correct:['Fahad']
}];
let interval;
let seconds=20;
let leadingsec=0
function timer(){
seconds--;
if (seconds<=5) {
	time.classList.add('timess')
}
 if (seconds===0) {
	 	btn1.disabled=true
		btn2.disabled=true
		btn3.disabled=true
		btn4.disabled=true
	 	nextbtn.disabled=true
	 	hintbtn.disabled=true
	 	contain.classList.add('blurry')
	 	document.getElementById('timeup').style='visibility:visible;';
    	seconds=0;
    	leadingsec='0' + seconds.toString();
    	clearInterval(interval)
   }
   if (seconds<10) {
   	leadingsec='0' + seconds.toString();
   }
    else{
    	leadingsec=seconds
    }
    time.innerText=leadingsec
}

	let currentques=0
	let score=0
	let currentdata=questions[currentques]
	let answer

function questione() {
	contain.style='display:block';
	currentdata=questions[currentques]
	questionlist.innerHTML=currentdata.question
	questionlist.classList.add('h1')
	btn1.innerHTML=currentdata.options[0]
	btn2.innerHTML=currentdata.options[1]
	btn3.innerHTML=currentdata.options[2]
	btn4.innerHTML=currentdata.options[3]
	answer=currentdata.correct[0]
	hintTagss=currentdata.hint
	genreTagss=currentdata.genre
	questionlists.innerHTML=`QUESTION:${queslist}/${questions.length}`
	selected()
}

window.onload=function() {
	// body...
startbtn.style='display:none';
questione()
interval=setInterval(timer,1500)


}
 let target;
function nextaction() {
	indicator.innerHTML=''
	hintTag.innerHTML=''
	genreTag.innerHTML=''
	btn1.disabled=false
	btn2.disabled=false
	btn3.disabled=false
	btn4.disabled=false
	currentques++
	queslist++
	answer=currentdata.correct[0]
	hintTagss=currentdata.hint
	genreTagss=currentdata.genre


	if (currentques<questions.length) {
		questione()
	}else{
		contain.innerHTML=`<div class='final'>
               <h2>YOU HAVE FINISHED ANSWERING</h2>
               <h3>YOUR FINAL SCORE IS:${Math.floor(Math.sqrt(score))}/${questions.length}</h3>
		</div>`

      restart.style='display:block';
	}
	selected()

	for (let i = 0; i < btns.length; i++) {
		btns[i].classList.remove('btnColor')
		btns[i].classList.remove('btnColorred')
		
	}
}



nextbtn.addEventListener('click',function() {
	// body...
	nextaction()
})
hintbtn.addEventListener('click',function() {
	// body...
	hintaction()
})






function hintaction() {
	// body...

	hintTag.innerHTML=`HINT:${hintTagss}`
	genreTag.innerHTML=`GENRE:${genreTagss}`
}














function selected() {
	// body...
	btns.forEach(answerel=>{
		answerel.addEventListener('click',function(e) {
			 target=e.target
			 answerel.classList.remove('btnColor')
			 if (target.matches('button')) {
				if (target.textContent.trim()===answer){
				score++
				target.classList.add('btnColor')
				clearInterval(interval)
		        leadingsec='00'
	            time.innerText=leadingsec
	   			indicator.innerHTML='CORRECT!'
		        console.log('correct')
		        btn1.disabled=true
		        btn2.disabled=true
		        btn3.disabled=true
		        btn4.disabled=true
	   		}  else if(target.textContent.trim()!==answer){
	   			indicator.innerHTML='WRONG'
				target.classList.add('btnColorred')
				console.log('wrong')
				btn1.disabled=true
		        btn2.disabled=true
		        btn3.disabled=true
		        btn4.disabled=true
			}
		}
		})
	})
}

