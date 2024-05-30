let signs = ['+', '-', '*', '/']
let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container_h3')
let container_main = document.querySelector('.main')
let container_start = document.querySelector('.start')
let start_button = document.querySelector('.start-btn')
let cookie = false
let cookies = document.cookie.split('; ')
for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].split('=')[0 == 'numbers_high_score']) {
        cookie = cookies[i].split('=')[1]
        break
    }
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)+ min)
}


function getRandomSign() {
    return signs[randint(0, 3)]
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = 
        [array[randomIndex], array[currentIndex]];
    }
    return array;
}

if (cookie) {
    let data = cookie.split('/')
    container_h3,innerHTML = `<h3>В прошлый раз вы дали ${data[1]}
    правильных ответов из ${datat[0]}.</h3>
    <h3>Точность - ${Math.round(data[1] * 100 / data[0])}%.</h3>`
}

class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`

        if (sign == '+') { this.correct = a + b}
        else if (sign == '-') { this.correct = a - b}
        else if (sign == '*') { this.correct = a * b}
        else if (sign == '/') { this.correct = Math.round(parseFloat((a / b)) * 100) / 100}

        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15),
        ]

        shuffle(this.answers)
    }

    display() {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i++) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }

}

let current_question
let correct_answers_given
let total_answers_given

start_button.addEventListener('click', () => {
    container_main.style.display = 'flex'
    container_start.style.display = 'none'
    current_question = new Question()
    current_question.display()
    correct_answers_given = 0
    total_answers_given = 0

    setTimeout(() => {
        let new_cookie = `numbers_high_score=
        ${total_answers_given}/${correct_answers_given};
        max-age=60*60*1000`
        document.cookie = new_cookie

        container_main.style.display = 'none'
        container_start.style.display = 'flex'
        if (total_answers_given > 0){
            container_h3.innerHTML = `<h3>Вы дали ${correct_answers_given} 
            правильных ответов из ${total_answers_given}.</h3>
            <h3>Точность - ${Math.round((correct_answers_given * 100) / 
            total_answers_given)}%.</h3>`
        } else {
            container_h3.innerHTML = `<h3>Вы дали ${correct_answers_given} 
            правильных ответов из ${total_answers_given}.</h3>
            <h3>Точноcть - 0%.</h3>`
        }
    }, 1000)
})   

for (let i = 0; i < answer_buttons.length; i++) {
    answer_buttons[i].addEventListener('click',() => {
        if (answer_buttons[i].innerHTML == current_question.correct) {

            correct_answers_given += 1
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })

        } else {
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers_given += 1
        current_question = new Question()
        current_question.display()
    })
}

if (total_answers_given == 0) {

}