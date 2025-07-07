const animate = document.getElementById('animate');
const container = document.getElementById('container');
const btn = document.getElementsByTagName('button')[0]

function myMove(){
    btn.addEventListener('click', ()=>{
        let pos = 0
        const maxPos = 350;
        const interval = setInterval(()=>{
            if(pos >= maxPos){
                clearInterval(interval);
            }else{
                pos++
                animate.style.left = pos+'px'
            }
        }, 1)
    })
}
myMove()