import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
      import { getDatabase, ref, query, orderByChild, equalTo, get, update,onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
    // Initialize Firebase
    const firebaseConfig = {
    apiKey: "AIzaSyAe3aXDjUiXGdBfzxs45XmPDp__Z-XFiU4",
    authDomain: "jsquizapp-9385d.firebaseapp.com",
    databaseURL: "https://jsquizapp-9385d-default-rtdb.firebaseio.com",
    projectId: "jsquizapp-9385d",
    storageBucket: "jsquizapp-9385d.firebasestorage.app",
    messagingSenderId: "692918879672",
    appId: "1:692918879672:web:3382b4d9a23ff97e73fb4d",
    measurementId: "G-511JNHNZK2"
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbref=ref(db,'Users')





let userdata
let userTime
let userQuestions
onValue(dbref,(snapshot)=>{
			// alert('hi')
			console.log(JSON.stringify(snapshot))
			if (snapshot.exists()) {
				snapshot.forEach((childSnapshot)=>{
					if (childSnapshot.child('name').val()=='sample user') {
						console.log('finally worled')
		   userdata=childSnapshot.val()
		   userTime=userdata.time
		   userQuestions=userdata.questionsList
		   console.log(userTime)
		   console.log(userQuestions)
						
					}else{
						console.log('no user found')
					}

				})
			}
		})































let questionTag=document.getElementById('questionTag');
let checkboxes=document.querySelectorAll('#input_1')
let label=document.querySelectorAll('#label')
let question_length=document.querySelector('#question_length')
let final_modal=document.querySelector('.final_modal')
let scoreTag=document.querySelector('.scoreTag')
let finalTag=document.querySelector('.finalTag')
let question_length1=1;
//TIMER STUFFS
let interval;
let seconds=parseInt(userTime);
let leadingsec=0
function timer(){
seconds--;
if (seconds<=5) {
  time.classList.add('redTime')
}
 if (seconds===0) {
     finalTag.innerHTML='TIME UP!! LOCAL STOARGE DEV'
      scoreTag.innerHTML=`YOU SCORED ${Math.floor(Math.sqrt(score))} OUT OF ${currentques}`
      window.scrollTo({top:0,behaviour:'smooth'})
      final_modal.classList.add('modal_show')
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
    document.getElementById('time').innerText=leadingsec
}
function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
           }
           return array;
     }
let jsonData=[];
(async function fetchQues() {
  const url ='https://abdullahi03-dev.github.io/Jschallenge-/jsquiz1.json';
  try{
    const response=await fetch(url);
    const data=await response.json()
    jsonData=data
     jsonData=shuffleArray(jsonData);
    console.log(jsonData)
    questioneDisplay()
    console.log(jsonData)
  } catch(error){
    console.log("error:",error)
  }
})()


let currentques=0;
let score=0;
let currentdata=jsonData[currentques];
let answer;

function questioneDisplay() {
  questionTag.innerHTML=jsonData[currentques].question
  answer=jsonData[currentques].correctAnswer[0]
  question_length.innerHTML='Q.'+question_length1
  

  for (var i = 0; i < checkboxes.length; i++) {
   checkboxes[i].value=jsonData[currentques].options[i];
   label[i].textContent=jsonData[currentques].options[i];
  }
  // hintTagss=currentdata.hint
  // genreTagss=currentdata.genre
  // questionlists.innerHTML=`QUESTION:${queslist}/${questions.length}`
  selected()
}

window.onload=function() {
  
interval=setInterval(timer,1500)
}

function nextaction() {
  currentques++
  question_length1++
  if (currentques!==userQuestions) {
    questioneDisplay()
  }
 else if(currentques==3){
  finalTag.innerHTML='Congratulations on completing the quiz!'
      scoreTag.innerHTML=`YOU SCORED ${Math.floor(Math.sqrt(score))} OUT OF ${currentques}`
      window.scrollTo({top:0,behaviour:'smooth'})
      final_modal.classList.add('modal_show')
  }
  selected()
  checkboxes.forEach(checkbox=>{
    checkbox.checked=false
  })
}

document.getElementById('nextbtn').addEventListener('click',nextaction)

function selected() {
  // body...
  checkboxes.forEach(answerel=>{
    answerel.addEventListener('change',function(e) {
       target=e.target
        if (target.value.trim()===answer){
          console.log(answer)
        score++
        console.log(score)
            console.log('correct')
        }  else if(target.textContent.trim()!==answer){
        score=score
        console.log(score)
        console.log('wrong')
      }
    })
  })
}
