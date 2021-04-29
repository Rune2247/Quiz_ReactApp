import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../styles/quiz.css'


function QuizzPage() {
    const [qusetion, setqusetion] = useState([]);
    const [answerList, setanswerList] = useState([]);
    const [correctAnswer, setcorrectAnwer] = useState();


    //useEffect question
    useEffect(() => {
        Axios.get("http://localhost:8099/questions").then((data) => {

            setqusetion(data.data)


            // console.log(data.data.answers);
            let obj = []
            data.data.answers.forEach(element => {
                obj.push(element)
            });
            setanswerList(obj)

        })
    }, [])


    // useEffect for Post logic
    function answerPost(questionid, answerid) {

        console.log(questionid)
        console.log(answerid);

        Axios.post("http://localhost:8099/questions/" + questionid + "/answer/" + answerid, {
            answerid: answerid,
            questionid: questionid
        }).then(function response(res) {
            setcorrectAnwer(res.data)

            console.log(res.data);

        })


    }


    return <div className="quizPage">
        <div className="quizContainer">

            <div className="quistion">

                <h2>category: {qusetion.category}</h2>
                <p>field: {qusetion.field}</p>
                <h3>The question is: {qusetion.question}</h3>
                <div className="answers">
                    {
                        answerList.map((value) => {
                            return (
                                <div>
                                    <p>{value.answer}</p>
                                    <button onClick={() => { answerPost(qusetion.id, value.id) }}>Tryk for svar</button>
                                </div>)
                        })
                    }
                </div>
                <h1>{correctAnswer != null ? correctAnswer.correctAnswer + "!" : ""}</h1>
                <p>{correctAnswer != null ? correctAnswer.explanation.explanation + "" : ""}</p>
                <p>{correctAnswer != null ? correctAnswer.explanation.sourceUrl + "" : ""}</p>
                <div>{correctAnswer != null ? <button onClick={() => { newQuistion() }}>Next Question!</button> : ""}</div>
            </div>


        </div>

    </div>
}

function newQuistion() {
    window.location.reload();
}

export default QuizzPage