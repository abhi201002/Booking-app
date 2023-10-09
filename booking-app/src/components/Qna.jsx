import React, { useState } from 'react'
import './qna.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { useAuthValue } from './AuthLayer'
import axios from 'axios'
import { useEffect } from 'react'

function Qna({Data, deleteQuestion}) {
    const [data, setData] = useState(Data)
    const [reply, setReply] = useState(true)
    const [comment, setComment] = useState("")
    const [state, dispatch] = useAuthValue()

    useEffect(() =>{
        setData(Data)
    },[Data])

    const onReply = async() => {
        setReply(true)
        if(comment === "") return
        try {
            const response = await axios.put(`http://localhost:8800/api/comments/answer/${data._id}`, {user_id: state.user.details.name, answer: comment})
            console.log(response.data)
            setData(response.data)
            setComment("")
        } catch (error) {
            alert("Error")
        }
    }
    const deleteAnswer = async(answer_id) =>{
        try {
            const response = await axios.put(`http://localhost:8800/api/comments/delete/answer/${answer_id}/${data._id}`)
            setData(response.data)
            alert("Deleted Successfully")
        } catch (error) {
          console.log(error)
            alert("error")
        }
    }
  return (
    <div className="review_qna">
        <div className="review_question_user">
            <div className="review_user">
                <FontAwesomeIcon icon={faCircleUser} style={{"--fa-primary-color": "#7a7d7f", "--fa-secondary-color": "#0071c2",}} />
                <div>{data.user_id} asked</div>
                {/* {console.log(data)} */}
            </div>
            <div className="review_question">
                {data.comment}
            </div>
            {console.log("evv", data._id)}
            {state.user?.isAdmin || state.user?.details.name === data.user_id?
                // <button onClick={() => {deleteQuestion(data._id)}}>Delete</button>
                <div class="review_dropdown_question">
                    <button class="btn btn-secondary review_dropdown_button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ...
                    </button>
                    <div class="dropdown-menu review_dropdown_option" aria-labelledby="dropdownMenuButton">
                        <button onClick={() => {deleteQuestion(data._id)}} class="dropdown-item">Delete</button>
                    </div>
                </div>
                // <button >Delete</button>
                :
                ""
            }
        </div>
        <div className="review_ans_box">
            {data.answer.length ?
                data.answer.map((ans) => (
                    <div className="review_answer_user">
                        <div className="review_user">
                            <FontAwesomeIcon icon={faCircleUser} style={{"--fa-primary-color": "#7a7d7f", "--fa-secondary-color": "#0071c2",}} />
                            <div>{ans.user_id} replied</div>
                        </div>
                        <div className="review_answer">
                            {ans.answer}
                        </div>
                        {state.user?.isAdmin || state.user?.details.name === ans.user_id?
                            // <button onClick={() => {deleteAnswer(ans._id)}}>Delete</button>
                            <div class="review_dropdown_answer">
                                <button class="btn btn-secondary review_dropdown_button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ...
                                </button>
                                <div class="dropdown-menu review_dropdown_option" aria-labelledby="dropdownMenuButton">
                                    <button onClick={() => {deleteAnswer(ans._id)}} class="dropdown-item">Delete</button>
                                </div>
                            </div>
                            // <button >Delete</button>
                            :
                            ""
                        }
                        {/* <button onClick={() => {deleteAnswer()}}></button> */}
                    </div>
                ))
                :
                <div className="review_noAns">No Replies Yet</div>
            }
        </div>
        <div className="button_trans reply_button">
            <button className={["review_reply", !comment ? "disabled" : ""].join(" ")} onClick={() => {onReply()}} disabled = {!comment}>
                Reply
            </button>
        </div>
        {reply ? 
            <div className="review_comment">
                <input type="text" placeholder='Type your reply here ......' value={comment} onChange={(e) => {setComment(e.target.value)}}/>
            </div>
            :
            ""
        }
    </div>
  )
}

export default Qna