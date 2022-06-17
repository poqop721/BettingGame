function watchJokbo(){
       
        document.querySelector('.modalbackground').style.display ='flex';
        exitModal();
}

function exitModal() {
   
    function offClick() {
        document.querySelector('.modalbackground').style.display ='none';
    }

 

    document.querySelector('.close').addEventListener('click', offClick);
    document.querySelector('.modalbox').addEventListener('click', offClick);
    document.querySelector('.modalbackground').addEventListener('click', offClick);
 
}

