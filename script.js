
//status values : un-attempted, passed, failed
const questions = [
    {
        questionNum : 1,
        Question : "What is the capital of India?",
        options  : ['New Delhi','Gujrat','Kolkata','Chennai'],
        Answer   : 'New Delhi',
        status : 'un-attempted',
        userchoice: 'blank'
    },
    {
        QuestionNum: 2,
        Question : "Which is the biggest Indian state by population?",
        options  : ['New Delhi','Gujrat','Kolkata','Uttar Pradesh'],
        Answer   : 'Uttar Pradesh',
        status: 'un-attempted',
        userchoice: 'blank'
    },
    {
        QuestionNum: 3,
        Question : "Whos was the first prime Minister of india",
        options  : ['Nehru','Gandhi','Sonia', 'Modi'],
        Answer   : 'Nehru',
        status: 'un-attempted',
        userchoice: 'blank'
    },
    {
        QuestionNum: 4,
        Question : "Where is Kedarnath Temple located?",
        options  : ['New Delhi','Uttarakhand','Gujrat','Uttar Pradesh'],
        Answer   : 'Uttarakhand',
        status: 'un-attempted',
        userchoice: 'blank'
    },
    {
        QuestionNum: 5,
        Question : "Words 'satyameva jayate' inscribed below emblem of india is taken from?",
        options  : ['Rigved','Ramayana','Mundak Upnishad','Mahabharat'],
        Answer   : 'Mundak Upnishad',
        status: 'un-attempted',
        userchoice: 'blank'
    },
    {
        QuestionNum: 6,
        Question : "Which Indian State has the highest area?",
        options  : ['New Delhi','Uttarakhand','Rajasthan','Uttar Pradesh'],
        Answer   : 'Rajasthan',
        status: 'un-attempted',
        userchoice: 'blank'
    }

];

const summary = {
    TotalQuestions : questions.length,
    Attempted : 0,
    Remaining: questions.length,
    Correct : 0,
    incorrect: 0
};

let QuestionPointer = 0; //this points to the current question we are in 

//Adding Question to the DOM
const questionContainer = document.querySelector('.question-container');
let Ques = document.createElement('p');
Ques.innerText = questions[QuestionPointer].Question;
Ques.classList.add('question-style');
questionContainer.appendChild(Ques);

//Adding Options to the DOM
for(let op of questions[QuestionPointer].options){   // looping through options
    let lab = document.createElement('label');  //craetion label element
    lab.setAttribute('for',op);                 //setting its attribute 'for' same as radio checkbtn 'id'
    lab.innerText = op;                         //setting label text to options
    lab.classList.add('label-style')
    let inp = document.createElement('input');   //creating input element
    inp.setAttribute('type','radio');  // setting its type to radio checkbtn
    inp.setAttribute('name', questions.questionNum);     // setting name of all optios to same value. here 1 so that radio butto functionality can be acheived
    inp.setAttribute('id', op );      // setting id same as option name
    inp.classList.add('option-style');  
    questionContainer.appendChild(lab);             //appending label
    lab.appendChild(inp);             //appending radio checkbtn to label
    
}



//Updating value of summary elements which is a span
let numberofquestions = document.querySelector("#total-question");
let attemptedquestion = document.querySelector("#attempted");
let remainingquestions = document.querySelector("#remaining");
let correctquestions = document.querySelector("#correct");
let incorrectquestions = document.querySelector("#incorrect");

numberofquestions.innerText = `${summary.TotalQuestions}`;
attemptedquestion.innerText = `${summary.Attempted}`;
remainingquestions.innerText = `${summary.Remaining}`;
correctquestions.innerText = `${summary.Correct}`;
incorrectquestions.innerText = `${summary.incorrect}`;



//creating function to check if option/choice is selected by user and if selected then check if it is correct or not.
//if correct then make choice green and update userr choice.
//this functh ion also calls summary updater in order to update usmmary object values up to date

function answerChecker(){
    if(questions[QuestionPointer].status === 'un-attempted'){
        let availableOptions = document.querySelectorAll('input');
        for(let option of availableOptions){
            if(option.checked === true){
                if(option.id === questions[QuestionPointer].Answer){
                    option.parentElement.classList.add('green-background');
                    questions[QuestionPointer].status = 'passed';
                    questions[QuestionPointer].userchoice = questions[QuestionPointer].Answer;
                    summaryObjectUpdater(questions[QuestionPointer].status);

                }
                else{
                    option.parentElement.classList.add('red-background');
                    questions[QuestionPointer].status = 'failed';
                    questions[QuestionPointer].userchoice = option.id;
                    summaryObjectUpdater(questions[QuestionPointer.status]);
                }

            }
        }
    }
}


//Summary Updater function- runs whenever we have a change in the status of question
function summaryObjectUpdater(status){
    summary.Attempted++;
    summary.Remaining = summary.TotalQuestions-summary.Attempted;
    if(status === 'passed'){
        summary.Correct++;
    }
    else{
        summary.incorrect++;
    }

    summaryDOMUpdater();

}
//this function will update the DOM element values of summary elements
function summaryDOMUpdater(){
    numberofquestions.innerText = `${summary.TotalQuestions}`;
    attemptedquestion.innerText = `${summary.Attempted}`;
    remainingquestions.innerText = `${summary.Remaining}`;
    correctquestions.innerText = `${summary.Correct}`;
    incorrectquestions.innerText = `${summary.incorrect}`;

}

// Adding eventlistner to check button if it is clicked
const checkbutton = document.querySelector('#checkbtn');
checkbutton.addEventListener('click',answerChecker);


//Adding Event Listner to next button

////////////////////***********Going to next question by clicking on next button. This will remove the current question  */
// removecurrentquestion() will remove current question from the DOM
function removeCurrentQuestion(){
    document.querySelector('.question-style').remove();
    for(let i=0;i<4;i++){
    document.querySelector('.label-style').remove();
    // document.querySelector('.option-style').remove();  //removing label removed the input as input is child of label
    }
}

//nextquestion function will load next question to the DOM
function nextQuestion(){
    if(QuestionPointer==questions.length-1){
        nextbtn.classList.add('btn-disable');
    }
    else{
        removeCurrentQuestion();   //first removing the current question 
        QuestionPointer++;
        //Adding Question to the DOM
        const questionContainer = document.querySelector('.question-container');
        let Ques = document.createElement('p');
        Ques.innerText = questions[QuestionPointer].Question;
        Ques.classList.add('question-style');
        questionContainer.appendChild(Ques);

        //Adding Options to the DOM
        for(let op of questions[QuestionPointer].options){   // looping through options
            let lab = document.createElement('label');  //craetion label element
            lab.setAttribute('for',op);                 //setting its attribute 'for' same as radio checkbtn 'id'
            lab.innerText = op;                         //setting label text to options
            lab.classList.add('label-style')
            let inp = document.createElement('input');   //creating input element
            inp.setAttribute('type','radio');  // setting its type to radio checkbtn
            inp.setAttribute('name', questions.questionNum);     // setting name of all optios to same value. here 1 so that radio butto functionality can be acheived
            inp.setAttribute('id', op );      // setting id same as option name
            inp.classList.add('option-style');  
            questionContainer.appendChild(lab);             //appending label
            lab.appendChild(inp);             //appending radio checkbtn to label
    
        }

        if(questions[QuestionPointer].status === 'passed'){
            console.log('level1')
            for(let x of document.querySelectorAll('label')){
                if(x.innerText === questions[QuestionPointer].Answer){
                    x.classList.add('green-background');
                }
            }

        }
        if(questions[QuestionPointer].status === 'failed'){
            for(let x of document.querySelectorAll('label')){
                if(x.innerText === questions[QuestionPointer].userchoice){
                    x.classList.add('red-background');
                }
            }

        }
    }
}
 let nextbtn = document.querySelector('#nextbtn');
 nextbtn.addEventListener('click',nextQuestion);



 /***********clicking on previous button. Thiw will take us back to previous question */

 function prevoiusQuestion(){
    if(QuestionPointer!==0){
        removeCurrentQuestion();
        QuestionPointer--;
        const questionContainer = document.querySelector('.question-container');
        let Ques = document.createElement('p');
        Ques.innerText = questions[QuestionPointer].Question;
        Ques.classList.add('question-style');
        questionContainer.appendChild(Ques);

        //Adding Options to the DOM
        for(let op of questions[QuestionPointer].options){   // looping through options
            let lab = document.createElement('label');  //craetion label element
            lab.setAttribute('for',op);                 //setting its attribute 'for' same as radio checkbtn 'id'
            lab.innerText = op;                         //setting label text to options
            lab.classList.add('label-style')
            let inp = document.createElement('input');   //creating input element
            inp.setAttribute('type','radio');  // setting its type to radio checkbtn
            inp.setAttribute('name', questions.questionNum);     // setting name of all optios to same value. here 1 so that radio butto functionality can be acheived
            inp.setAttribute('id', op );      // setting id same as option name
            inp.classList.add('option-style');  
            questionContainer.appendChild(lab);             //appending label
            lab.appendChild(inp);
        }

        if(questions[QuestionPointer].status === 'passed'){
            console.log('level1')
            for(let x of document.querySelectorAll('label')){
                if(x.innerText === questions[QuestionPointer].Answer){
                    x.classList.add('green-background');
                }
            }

        }
        if(questions[QuestionPointer].status === 'failed'){
            for(let x of document.querySelectorAll('label')){
                if(x.innerText === questions[QuestionPointer].userchoice){
                    x.classList.add('red-background');
                }
            }

        }
    }

 }

 let prevbutton = document.querySelector('#previousbtn');
 prevbutton.addEventListener('click',prevoiusQuestion);


