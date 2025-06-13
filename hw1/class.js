class Question{
    constructor(text,answer){
        this.text = text;
        this.answer = answer
    }
    
    check(userAnswer){
        if(userAnswer.toLowerCase() == this.answer.toLowerCase()){
             return true
        }else{
            false
        }
    }
    info(){
        return `${this.text}  Менің жауабым:${this.answer} тексеру нәтижесі: ${check(userAnswer)}`
    }
}

let surak1 = new Question('1-сұрақ: Java script қай тілдің тобына жатады?', 'Бейіндік');
let surak2 = new Question('2-cұрақ: HTML дегеніміз не?', 'Безендіру');

surak1.check(userAnswer);
surak2.check(userAnswer);

console.log(surak1.info());
console.log(surak2.info());