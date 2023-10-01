import React, { useEffect, useState } from 'react'
import './review.css'
import Qna from './Qna'
import { useFetch } from './useFetch'
import axios from 'axios'
import { useAuthValue } from './AuthLayer'

function Review({id, comments}) {
  const [data, setData] = useState([])
  const [list, setList] = useState(comments)
  const [question, setQuestion] = useState("")
  const [state, dispatch] = useAuthValue()
  const url1 =  `http://localhost:8800/api/hotels/find/${id}`
  const getList = async () => {
    let Data = []
    console.log("getList is called")
    try {
      for(const item of list){
        const res = await axios.get(`http://localhost:8800/api/comments/comment/${item}`)
        Data.push(res.data) 
        console.log(res.data)
      }
      setData(Data)
    } catch (error) {
      
    }
  }
  const deletequestion = async(comment_id) =>{
    console.log("This is to be deleted ", comment_id)
    try {
        const response = await axios.delete(`http://localhost:8800/api/comments/delete/question/${comment_id}/${id}`)
        setList(response.data.comments)
        // console.log("New List", response.data.comments)
        alert("Deleted Successfully")
    } catch (error) {
      console.log(error)
        alert("error")
    }
  }
  const handleAsk = async() => {
    try {
      const res = await axios.post(`http://localhost:8800/api/comments/hotelCom/${id}`, {user_id: state.user.details.name, comment: question, answer : []})
      setList(res.data.comments)
    } catch (error) {
      alert("Error")
    }
  }
  useEffect(() =>{
    // console.log("xxfxf", list)
    getList()
  },[list])
  useEffect(() =>{
    setList(comments)
  },[comments])
  // console.log(list)
  return (
    <div className="review">
        <div className="review_container">
            <div className="review_header">
                <h1>QnA</h1>
            </div>
            <div className="review_Questions">
              <input type="text" placeholder='Ask a question' onChange={(e) => {setQuestion(e.target.value)}}/>
              <div className="button_trans review_ask">
                <button onClick={() => handleAsk()}>Ask!</button>
              </div>
            </div>
            <hr />
            <div className="review_qna_box">
              {console.log("This is ", data)}
              {
                data?.map((item, i) =>(
                  <>
                  <Qna Data = {item} deleteQuestion = {deletequestion}/>
                  <hr />
                  </>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default Review