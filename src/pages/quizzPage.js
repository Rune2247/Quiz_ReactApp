import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function QuizzPage() {
    const [qusetion, setqusetion] = useState([]);
    const [answerList, setanswerList] = useState([]);


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





    return <div className="quizPage">
        <div className="quizContainer">

            <div>

                <h1> {qusetion.category}</h1>
                <p>{qusetion.field}</p>
                <h1>The quistion is: {qusetion.question}</h1>
                <div>
                    {
                        answerList.map((value, key) => {
                            return (
                                <div>
                                    <p>{value.answer}</p>

                                    <button onClick={() => { answerPost(qusetion.id, value.id) }}>Tryk for svar</button>

                                </div>)
                        })
                    }
                </div>
            </div>


        </div>

    </div>
}

function answerPost(questionid, answerid) {

    console.log(questionid)
    console.log(answerid);

    Axios.post("http://localhost:8099/questions/" + questionid + "/answer/" + answerid, {
        answerid: answerid,
        questionid: questionid
    }).then(function response(res) {
        console.log(res.data);
    })


}

export default QuizzPage