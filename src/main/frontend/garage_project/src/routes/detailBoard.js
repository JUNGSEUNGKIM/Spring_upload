import React, {useEffect, useState} from "react";
import styles from './detailBoard.module.css';
import axios from "axios";
import  {useNavigate, useParams} from "react-router-dom";
import DetailBoardSlider from "./detailBoardSlider"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import boarder from "./boarder";

function scrollToTop(){
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
}
function DetailBoard(props) {

    const navigate = useNavigate();
    const [resultQue,setResultQue]=useState({});
    const [trueResult, setTrueResult] = useState(false)
    const [boardLike,setBoardLike] = useState(1)

    const {code} = useParams()

    const fetchData = async () => {
        const result = await axios.get(props.javaServer+'boarder/svboarddetail/'+code,{params:{user_id:props.loginId}}, { withCredentials: true });
        setResultQue(result.data);
        setBoardLike(result.data.board.likes)
        resultQue ? setTrueResult(true) : setTrueResult(false)
        console.log(result.data)
        scrollToTop();
    };
    useEffect(() => {


        fetchData();

        // console.log(resultQue)
    }, [setResultQue]);

    useEffect(() => {
        console.log(resultQue); // resultQue가 업데이트될 때마다 실행됨
    }, [resultQue]);

   const [upDateTX, setUpDateTX] = useState(true);
   const [upTitle, setUpTitle] = useState("");
   const [upText, setUpText] = useState("");
   const [commentTX, setCommentTX] = useState("");
   const [commentTexts, setCommentTexts] = useState({});
    const setCommentText = (commentId, text) => {
        setCommentTexts(prevState => ({
            ...prevState,
            [commentId]: text
        }));
    };
    const handleCommentTextChange = (commentId, text) => {
        setCommentText(commentId, text);
    };


    const boarderUpdate = () =>{

        setUpDateTX(false)
        setUpText(resultQue.board.content)
        setUpTitle(resultQue.board.title)
        console.log(resultQue.board.boarder_code ,resultQue.board.content, "::",upTitle , resultQue.board.title,"::",upText, props.loginId)
        console.log(resultQue)
    }

    const updateAxios = (board_code) => {
        // console.log(resultQue.board.boarder_code ,resultQue.board.content, "::",upTitle , resultQue.board.title,"::",upText, props.loginId)
        // console.log(resultQue)
        const response = axios.post(props.javaServer+"boarder/svboardedit",{
            boarder_code : board_code,
            title : upTitle,
            content : upText,
            user_id:props.loginId
        },{withCredentials:true})
        fetchData();
        // console.log(response,":::::::::::::::업데이트 에러?")
        if(response){setUpDateTX(true); fetchData();}else{alert("다시 입력해 주세요")}
    }
    const [editCot, setEditCot] = useState({});
    const editComment = id => {
        setEditCot(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const [addCot, setAddCot] = useState({});

    const  addCommentUp= id => {
        setAddCot(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };





    return (
        <div className="main-page-content">

            <div id="skill">
                <div className="skill-main">

                    {/* <!-- ================================ 배너 =============================== --> */}

                </div>

            </div>
            {!trueResult  && <div>Loading...</div>}

            {trueResult  && (



            <div id="about">
                <div className="about-content">

                    <div className="love-grid text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title text-center wow fadeIn" style={{paddingTop:0}}>
                                        <header className={styles.singleWebsiteHeader}>

                                            <div className={styles.singleNomineeHaderFlex}>
                                                <div className={styles.singleNomineeehaderLeft} style={{paddingTop:"5%", paddingBottom:0}}>

                                                    <h3 className="single-website__author">
                                                        <span
                                                            className="single-website__author__location">
                                                            {upDateTX ?
                                                                resultQue.board.title


                                                                : <input type="text" onChange={(e)=>{setUpTitle(e.target.value)}} value={upTitle}></input>}

                                                        </span>
                                                    </h3>
                                                    <div style={{textAlign:"right", width:"100%", paddingRight:"10%"}}>
                                                    <h6 style={{display:"inline-block", padding:"0 0.5%" , fontSize:"1em"}} className={styles.singleWebsiteTitle}>작성자 {resultQue.board.author}</h6>
                                                    <h6 style={{display:"inline-block", padding:"0 0.5%" , fontSize:"1em"}} className={styles.singleWebsiteTitle}>조회수 {resultQue.board.views}</h6>
                                                        {/*{setBoardLike(resultQue.board.likes)}*/}
                                                    <h6 style={{display:"inline-block", padding:"0 0.5%" , fontSize:"1em"}} className={styles.singleWebsiteTitle}>좋아요 {boardLike}<a onClick={()=>{
                                                        axios.get(props.serverURL+"/like/"+resultQue.board.boarder_code,{prams:{user_id:props.loginId}},{withCredentials:true})
                                                        setBoardLike(prevCount => prevCount + 1);
                                                    }}>👍</a></h6>
                                                    </div>
                                                </div>
                                                <div className="single-nominee__header__right">
                                                </div>
                                            </div>
                                        </header>
                                    </div>
                                </div>
                            </div>
                            <div style={{margin:'5%'}}></div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title text-center wow fadeIn">

                                        {/* <!-- ================================  =============================== --> */}

                                        <section className={styles.singleWebsite} style={{textAlign:"left"}}>
                                            <div className={styles.container}>
                                                <div className={styles.singleWebsiteWrapper}>
                                                    <h4>{resultQue.board.festival_code}</h4>
                                                    {resultQue.board.image_name.split(";").length === 1?
                                                    <img alt="img" src={props.imgURLJ+"/"+resultQue.board.image_name.split(";")[0]} style={{display:"block",margin:"0 auto"}}></img>
                                                    :<DetailBoardSlider myProp={resultQue.board.image_name}
                                                                       style={{width: "50%"}}/>}

                                                    <div style={{
                                                        border: "0.001px solid black",
                                                        borderWidth: "0.5px",
                                                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                                        borderRadius: "5px",
                                                        width: "100%",
                                                        textAlign: "left",
                                                        height: "20em",
                                                        padding: "2%",
                                                        marginTop: "10%",
                                                        marginBottom: "5%"
                                                    }}>

                                                        <h5 style={{
                                                            margin: "0.5em",
                                                            paddingBottom: "1em",
                                                            borderBottom: "1px solid #ccc"
                                                        }}>게시글</h5>
                                                        {upDateTX ?
                                                            resultQue.board.content
                                                            : <textarea style={{width:"100%", height:"80%"}} onChange={(e)=>{setUpText(e.target.value)}} value={upText}></textarea>}
                                                    </div>


                                                </div>
                                            </div>
                                            <div style={{width: "90%", margin: "0 auto"}}>
                                                <div className="comment-section">
                                                    <div className="comment-header" style={{textAlign: "left"}}>댓글</div>
                                                    {resultQue.comments && resultQue.comments.length > 0 ? (
                                                        resultQue.comments.map(comment => (
                                                            <div className="comment" >
                                                                <div className="comment reply-form" style={{ display: "flex", alignItems: "center" }}>
                                                                    <div>
                                                                        <p style={{ display: "inline-block", marginRight: "8px" }}>
                                                                            {comment.author}
                                                                            {comment.author === props.loginId ? <span style={{ fontSize: "0.8em", marginLeft: "4px" }}>(본인)</span> : null}
                                                                        </p>
                                                                        <h6 style={{ fontSize: "0.8em", marginLeft: "4px" }}>&nbsp;&nbsp;&nbsp;&nbsp;{comment.created_at}</h6>
                                                                    </div>
                                                                    <div style={{ flexGrow: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.2)",overflowY: 'scroll', borderRadius: "5px", height:"4em", width:"55%", marginRight:"5%"}}>
                                                                        {!editCot[comment.comment_id]?
                                                                        <p className="comment-content" style={{ display: "inline-block", marginRight: "8px", margin:"0 0 0 0",padding:"1em"}} >
                                                                            {comment.content}
                                                                        </p>
                                                                            :<textarea rows="2" style={{width:"100%",height:"100%", display: "inline-block", marginRight: "8px", margin:"0 0 0 0",padding:"1em"}} value={commentTexts[comment.comment_id]} onChange={(e)=>{handleCommentTextChange(comment.comment_id, e.target.value)}}>{commentTexts[comment.comment_id]}</textarea>
                                                                        }
                                                                    </div>
                                                                    <div className="comment-buttons">
                                                                        <button type="button" onClick={() => {addCommentUp(comment.comment_id)}}>답글쓰기 </button>
                                                                        {comment.author === props.loginId && (
                                                                            <>
                                                                                {!editCot[comment.comment_id]?
                                                                                <button className="edit-button" onClick={() => {editComment(comment.comment_id);handleCommentTextChange(comment.comment_id, comment.content);}}  type="button">수정 </button>
                                                                                :<button className="edit-button" onClick={()=>{editCommentUp(comment.comment_id); }} type="button">등록</button>}


                                                                                <button type="button"  onClick={()=>deleteComment(comment.comment_id)}>삭제 </button>
                                                                            </>)}
                                                                    </div>
                                                                <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "8px 0" }}/>
                                                                </div>
                                                                    {!addCot[comment.comment_id]?null:
                                                                        <div className="comment-form" style={{display: "flex", width:"100%"}}>
                                                                             <textarea style={{width:"100%", marginLeft:"10%", }} className="comment-input" name="content" rows="2" placeholder={props.loginId+"님 댓글을 남겨보세요"} value={commentTexts[comment.comment_id]} required onChange={(e)=>{handleCommentTextChange (comment.comment_id,e.target.value)}}></textarea><br/>
                                                                            <input type="button" value="등록" className="submit-button" onClick={()=>{addComment(comment.comment_id)
                                                                            addCommentUp(comment.comment_id)}}/>
                                                                        </div>}

                                                                {comment.children && comment.children.length > 0 && (
                                                                    comment.children.map(childComment => (
                                                                        <div className="comment reply-form" key={childComment.comment_id} style={{ display: "flex", alignItems: "center" }}>
                                                                            <div>
                                                                                <p style={{ display: "inline-block", marginRight: "8px" }}>
                                                                                    &nbsp;&nbsp;└ {childComment.author}
                                                                                    {childComment.author === resultQue.loginId ? <span style={{ fontSize: "0.8em", marginLeft: "4px" }}>(본인)</span> : null}
                                                                                </p>
                                                                                <h6 style={{ fontSize: "0.8em", marginLeft: "4px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{childComment.created_at}</h6>
                                                                            </div>
                                                                            <div style={{ flexGrow: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.2)",overflowY: 'scroll', borderRadius: "5px", height:"4em", width:"55%", marginRight:"5%", verticalAlign:"top"}}>
                                                                                {!editCot[childComment.comment_id]?
                                                                                    <p className="comment-content" style={{ display: "inline-block", marginRight: "8px", margin:"0 0 0 0",padding:"1em"}} >
                                                                                        {childComment.content}
                                                                                    </p>
                                                                                    :<textarea rows="2" style={{width:"100%",height:"100%", display: "inline-block", marginRight: "8px", margin:"0 0 0 0",padding:"1em"}} value={commentTexts[childComment.comment_id]} onChange={(e)=>{handleCommentTextChange(childComment.comment_id, e.target.value)}}>{commentTexts[childComment.comment_id]}</textarea>
                                                                                }
                                                                            </div>


                                                                            <div className="comment-buttons">
                                                                                {/*<button type="button"*/}
                                                                                {/*        onClick={() => {*/}
                                                                                {/*        }}>답글쓰기*/}
                                                                                {/*</button>*/}
                                                                                {childComment.author === props.loginId && (
                                                                                    <>
                                                                                        {!editCot[childComment.comment_id]?
                                                                                            <button className="edit-button" onClick={() => {
                                                                                                editComment(childComment.comment_id)
                                                                                                handleCommentTextChange(childComment.comment_id, childComment.content)
                                                                                            }}  type="button">수정 </button>
                                                                                            :<button className="edit-button" onClick={()=>{editCommentUp(childComment.comment_id);}} type="button">등록</button>}
                                                                                        <button type="button" onClick={()=>deleteComment(childComment.comment_id)}>삭제 </button>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))



                                                                )}
                                                                <>
                                                                    <hr style={{
                                                                        border: "none",
                                                                        borderTop: "1px solid #ccc",
                                                                        margin: "8px 0"
                                                                    }}/>
                                                                </>
                                                            </div>
                                                        ))
                                                    ) : <div><p>댓글이 없습니다.</p></div>}
                                                </div>


                                            </div>



                                            <div className="comment-form"  style={{display: "flex", width:"100%", margin:"1%"}}>
                                                    <textarea className="comment-input" name="content" rows="2" style={{width:"80%", marginLeft:"5%", }}
                                                              placeholder={props.loginId+"님 댓글을 남겨보세요"}
                                                              value={commentTX}
                                                              required onChange={(e)=>{setCommentTX(e.target.value)}}>{commentTX}</textarea><br/>
                                                    <input type="button" value="등록" className="submit-button" onClick={()=>{addComment()}}
                                                           style={{
                                                               marginLeft:"20px",
                                                               width: "100px",
                                                               height: "50px",
                                                               background: "#a6e1ec",
                                                               color: "white",
                                                               letterSpacing: "2px",
                                                               border: "none"
                                                    }}
                                                    />
                                            </div>

                                            <div className="center">
                                                <a onClick={()=>{navigate("/boarder")}}  className="button"
                                                    style={{
                                                        marginLeft: "6%",
                                                        padding: "4px 12px",
                                                        textAlign: "center",
                                                        backgroundColor: "#7fccde",
                                                        color: "white",
                                                        fontSize: "12px"

                                                    }}>이전 페이지로 돌아가기</a>
                                                {upDateTX ?
                                                    <a onClick={() => boarderUpdate()} className="button"
                                                        style={{
                                                            marginLeft: "10px",
                                                            padding: "4px 12px",
                                                            textAlign: "center",
                                                            backgroundColor: "#7fccde",
                                                            color: "white",
                                                            fontSize: "12px"
                                                        }}
                                                    >수정</a>
                                                :<a className="button" onClick={()=>updateAxios(resultQue.board.boarder_code)}
                                                    style={{
                                                        marginLeft: "10px",
                                                        padding: "4px 12px",
                                                        textAlign: "center",
                                                        backgroundColor: "#7fccde",
                                                        color: "white",
                                                        fontSize: "12px"
                                                    }}>등록</a>
                                                }


                                                <a  className="button" onClick={()=>{
                                                    axios.get(props.javaServer+"boarder/svboarddelete/"+resultQue.board.boarder_code, {withCredentials:true})
                                                        .then((resDe) => {
                                                            // 응답 데이터에 접근하여 삭제 결과 확인
                                                            const deleteResult = resDe.data.result;

                                                            // 삭제 결과에 따라 처리
                                                            if (deleteResult) {
                                                                alert("삭제되었습니다.");
                                                                navigate("/boarder");
                                                            } else {
                                                                alert("삭제에 실패하였습니다.");
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            // 오류 처리
                                                            console.error("삭제 요청 중 오류 발생:", error);
                                                        });
                                                }}
                                                style={{
                                                    marginLeft: "10px",
                                                    padding: "4px 12px",
                                                    textAlign: "center",
                                                    backgroundColor: "#7fccde",
                                                    color: "white",
                                                    fontSize: "12px"
                                                }}
                                                >삭제</a>
                                            </div>

                                        </section>


                                        {/* <!-- ================================ LOGIN =============================== --> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            )}
            <div id="skill">
                <div className="skill-main">

                    {/* <!-- ================================ 배너 =============================== --> */}

                </div>

            </div>


            {/* <!-- ================================ ABOUT =============================== --> */}


        </div>
    )
    function editCommentUp(code){
        try{
            axios.post(props.javaServer+'boarder/sveditcomment/'+code,{boarder_code:resultQue.board.boarder_code,content:commentTexts[code],user_id:props.loginId},{withCredentials:true})
                .then((res)=>{
                    if (res.data.result) {
                        alert("수정완료");
                        editComment(code)
                        fetchData();
                    } else {
                        alert("삭제실패");
                    }
                }).catch((error)=>{

            })
        }catch (error){
            console.error('Error Delete Comment :', error)
        }
    }
    function deleteComment(code){
        try{
            axios.post(props.javaServer+'boarder/svdeletecomment/'+code,{boarder_code:resultQue.board.boarder_code},{withCredentials:true})
                .then((res)=>{
                    if (res.data.result) {
                        alert("삭제완료");
                        fetchData();
                    } else {
                        alert("삭제실패");
                    }
                }).catch((error)=>{

            })
        }catch (error){
            console.error('Error Delete Comment :', error)
        }
    }

    function addComment(comment_id){
        try {
            let text;
            if(comment_id === undefined){
                text = commentTX;
            }else{
                text = commentTexts[comment_id]
            }
            axios.post(props.javaServer+'boarder/svaddcomment',{
                content:text,
                user_id:props.loginId,
                boarder_code:resultQue.board.boarder_code,
                comment_id:comment_id

            }, {withCredentials: true}
            ).then((res)=>{

              if(res.data.result){
                  alert("댓글을 등록하였습니다.")
                  // console.log("/detailboard/"+resultQue.board.board_code)
                  // navigate("/detailboard/"+resultQue.board.board_code)
                  // window.location.reload()
                  fetchData();
                  setCommentTX("");
              }
            }).catch((error) => {
                // 오류 처리
                console.error("댓글등록에러:", error);
            });



            // 서버에서의 응답 처리
        } catch (error) {
            console.error('Error posting with images:', error);
        }
    }

}

export default DetailBoard;