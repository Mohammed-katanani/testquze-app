let selsctQustions=[]
let quzeFile='quze2';
let  qustions=new XMLHttpRequest();
qustions.open("get",`${quzeFile}.json`,false)
qustions.onload=()=>{
    let qustion=JSON.parse(qustions.responseText)
    qustNum=15;
        for(let i=0;i<qustNum;i++){
            let x =Math.floor(Math.random()*qustion.length)
            selsctQustions.push(qustion[x])
            qustion.splice(x,1)
        }

}
qustions.send();
////////////////////////////////////////////////////////////
let qustionBar=document.querySelector(".qustion");
let answer=document.querySelector(".answer");
let next=document.querySelector(".next");
let timer=document.querySelector(".timer");
let qusNum=document.querySelector(".qusNum");
let startContiner=document.querySelector(".startContiner");
let continer=document.querySelector(".continer");
let start=document.querySelector(".start");

let cunter=0;
let y;
let mark =0;
//start quze
start.addEventListener("click",()=>{
    startContiner.style.display="none"
    continer.style.display="flex"

    addQustion()
    function addQustion(){
        //add qustion and answer
    qustionBar.innerHTML=`<span>${cunter+1}</span> ${selsctQustions[cunter].question} `
        y=Array.from(selsctQustions[cunter].answer);
    
    while(y.length!=0){
        let x =Math.floor(Math.random()*y.length)
        answer.innerHTML+=`<li>${y[x]}</li>`
        y.splice(x,1)
    }
    //add class from answer
    let answerList=Array.from(document.querySelectorAll(".answer li"));
    answerList.forEach(e => {
        e.addEventListener("click",()=>{
            answerList.forEach(el=>{
                el.classList.remove("choosen");
            })
            e.classList.add("choosen");
        
        })
    });
    }
    
    //add qus nam
    selsctQustions.forEach((el,i) => {
        qusNum.innerHTML+=`<li>${i+1}</li>`
    });
                //add time down
    
                let time=qustNum*60*0.2;
                let topTime=time;
                let counter = setInterval(() => {
                    let minutes=Math.floor(time/60);
                    let seconds=Math.floor(time%60)
                    document.querySelector(".timer .minutes").innerHTML=minutes<10?`0${minutes}`:minutes;
                    document.querySelector(".timer .seconds").innerHTML=seconds<10?`0${seconds}`:seconds;
                    --time;
                    if(time<=topTime*0.1){
                        Array.from(document.querySelectorAll(".timer span")).forEach(el => {
                            el.classList.add("did")
                        });
                    }
                    if(time<0){
                        clearInterval(counter);
                        finsh();
                        // else(document.querySelector(".answer li.choosen").innerHTML==selsctQustions[cunter].answer[0])
                        //     mark++;
                        // finsh()
                        
                    }
                }, 1000);
            

    //add class done from list qustion
    
        let listQus=Array.from(document.querySelectorAll(".qusNum li"))
        
    
    
    //next botton
    
    next.addEventListener("click",()=>{
        if(document.querySelector(".answer li.choosen").innerHTML==selsctQustions[cunter].answer[0]){
            mark++;
            listQus[cunter].classList.add("done")
        }else 
        listQus[cunter].classList.add("bad")
    
        qustionBar.innerHTML=""
        answer.innerHTML=""
        cunter++;
    
        if(cunter==qustNum){
            clearInterval(counter);
            finsh();
        }
        addQustion();
    
    })

})



    ////////////////////////////////////////
    function finsh(){
        let score='';
        if(mark>=qustNum/2)
        score="good";
        else 
        score="bad";
    
        document.body.innerHTML=""
        let newDiv =document.createElement("div");
        newDiv.innerHTML=` <div class="box ${score}">
        <h2>test score</h2>
        <div class="mark ">${mark}</div>
        <div class="from">/${qustNum}</div>
    </div>` 
        newDiv.className="mark"
        document.body.appendChild(newDiv)
        }
        //////////
