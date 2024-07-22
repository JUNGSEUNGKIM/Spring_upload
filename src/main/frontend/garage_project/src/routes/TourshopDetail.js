import React, { useEffect, useState } from "react";
import styles from './detailBoard.module.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DetailBoardSlider from "./detailBoardSlider";

function scrollToTop() {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
}

function TourshopDetail(props) {
    const navigate = useNavigate();
    const [resultQue, setResultQue] = useState({});
    const [trueResult, setTrueResult] = useState(false);

    const { code } = useParams();

    const fetchData = async () => {
        const result = await axios.get(props.javaServer + `tourshop/svshopdetail/` + code, {params:{userId:props.loginId}},  { withCredentials: true });
        // setResultQue(result.data);
        // resultQue ? setTrueResult(true) : setTrueResult(false)
        // console.log(result.data)
        if (result.data) {
            setResultQue(result.data)
            setTrueResult(true);
            console.log(result.data);
        } else {
            setTrueResult(false);
        }
        scrollToTop();
    };

    useEffect(() => {
        fetchData();
        // console.log("shopdetailpage resultQue:::" + resultQue)
        // console.log("shopdetailpage shopId:::" + code)
    }, [setResultQue]);

    useEffect(() => {
        console.log(resultQue); // resultQue가 업데이트될 때마다 실행됨
    }, [resultQue]);

    // // resultQue이 정의되었는지 확인 후, 속성을 변수로 할당하여 사용
    // let tourTitle = '';
    // let content = '';
    // let imageName = '';
    // let imagePath = '';
    // let location = '';
    // let shopId = '';
    // let tourPrice = '';
    //
    // if (resultQue && resultQue.shop) {
    //     tourTitle = resultQue.shop.tourTitle;
    //     content = resultQue.shop.content;
    //     imageName = resultQue.shop.imageName;
    //     imagePath = resultQue.shop.imagePath;
    //     location = resultQue.shop.location;
    //     shopId = resultQue.shop.shopId;
    //     tourPrice = resultQue.shop.tourPrice;
    // }

    const [upDateTX, setUpDateTX] = useState(true);
    const [upTitle, setUpTitle] = useState("");
    const [upText, setUpText] = useState("");
    const [reviewTX, setReviewTX] = useState("");
    const [reviewTexts, setReviewTexts] = useState({});

    const setReviewText = (reviewID, text) => {
        setReviewTexts(prevState => ({
            ...prevState,
            [reviewID]: text
        }));
    };

    const handleReviewTextChange = (reviewID, text) => {
        setReviewText(reviewID, text);
    };

    const shopUpdate = () => {
        setUpDateTX(false);
        setUpText(resultQue.shop.content);
        setUpTitle(resultQue.shop.tourTitle);
        console.log(resultQue.shop.shopId, resultQue.shop.content, "::", upTitle, resultQue.shop.tourTitle, "::", upText, props.loginId)
        console.log(resultQue);
    };

    //  글수정/댓글 관련 코드
    const updateAxios = (shopId) => {
        // console.log(resultQue.board.boarder_code ,resultQue.board.content, "::",upTitle , resultQue.board.title,"::",upText, props.loginId)
        // console.log(resultQue)
        const response = axios.post(props.javaServer+"tourshop/svboardedit",{
            shopId : shopId,
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
            {!trueResult && <div>Loading...</div>}
            {trueResult && (
                <div id="about">
                    <div className="about-content">
                        <div className="love-grid text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="main-title text-center wow fadeIn" style={{ paddingTop: 0 }}>
                                            <header className={styles.singleWebsiteHeader}>
                                                <div className={styles.singleNomineeHaderFlex}>
                                                    <div className={styles.singleNomineeehaderLeft} style={{ paddingTop: "5%", paddingBottom: 0 }}>
                                                        <h3 className="single-website__author">
                                                            {resultQue.shop.tourTitle}
                                                            <span className="single-website__author__location">
                                                                {upDateTX ? resultQue.shop.tourTitle : (
                                                                    <input type="text" onChange={(e) => setUpTitle(e.target.value)} value={upTitle} />
                                                                )}
                                                            </span>
                                                        </h3>
                                                        <div style={{ textAlign: "right", width: "100%", paddingRight: "10%" }}>
                                                            {/*<h6>boarddetail 작성자/조회수/좋아요</h6>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            </header>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ margin: '5%' }}></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="main-title text-center wow fadeIn">
                                            <section className={styles.singleWebsite} style={{ textAlign: "left" }}>
                                                <div className={styles.container}>
                                                    <div className={styles.singleWebsiteWrapper}>
                                                        {/*<h4>{resultQue.shop.shopId}</h4>*/}
                                                        {resultQue.shop.imageName.split(";").length === 1 ? (
                                                            <img alt="img" src={`${props.imgURLJ}/${resultQue.shop.imageName.split(";")[0]}`} style={{ display: "block", margin: "0 auto" }} />
                                                        ) : (
                                                            <DetailBoardSlider myProp={resultQue.shop.imageName} style={{ width: "50%" }} />
                                                        )}
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
                                                            }}>행사내용</h5>
                                                            {upDateTX ? resultQue.shop.content : (
                                                                <textarea style={{ width: "100%", height: "80%" }} onChange={(e) => setUpText(e.target.value)} value={upText}></textarea>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ width: "90%", margin: "0 auto" }}>
                                                    <div className="comment-section">
                                                        <div className="comment-header" style={{ textAlign: "left" }}>리뷰</div>
                                                        {resultQue.reviews && resultQue.reviews.length > 0 ? (
                                                            resultQue.reviews.map(review => (
                                                                <div className="comment" key={review.reviewId}>
                                                                    <div className="comment reply-form" style={{ display: "flex", alignItems: "center" }}>
                                                                        <div>
                                                                            <p style={{ display: "inline-block", marginRight: "8px" }}>
                                                                                {review.author}
                                                                                {review.author === props.loginId ? (
                                                                                    <span style={{ fontSize: "0.8em", marginLeft: "4px" }}>(본인)</span>
                                                                                ) : null}
                                                                            </p>
                                                                            <h6 style={{ fontSize: "0.8em", marginLeft: "4px" }}>
                                                                                &nbsp;&nbsp;&nbsp;&nbsp;{review.created_at}
                                                                            </h6>
                                                                        </div>
                                                                        <div style={{
                                                                            flexGrow: 1,
                                                                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                                                            overflowY: 'scroll',
                                                                            borderRadius: "5px",
                                                                            height: "4em",
                                                                            width: "55%",
                                                                            marginRight: "5%"
                                                                        }}>
                                                                            {!editCot[review.reviewId] ? (
                                                                                <p className="comment-content" style={{
                                                                                    display: "inline-block",
                                                                                    marginRight: "8px",
                                                                                    margin: "0 0 0 0",
                                                                                    padding: "1em"
                                                                                }}>
                                                                                    {review.content}
                                                                                </p>
                                                                            ) : (
                                                                                <textarea rows="2" style={{
                                                                                    width: "100%",
                                                                                    height: "100%",
                                                                                    display: "inline-block",
                                                                                    marginRight: "8px",
                                                                                    margin: "0 0 0 0",
                                                                                    padding: "1em"
                                                                                }} value={reviewTexts[review.reviewId]}
                                                                                          onChange={(e) => handleReviewTextChange(review.reviewId, e.target.value)} />
                                                                            )}
                                                                        </div>
                                                                        <div className="comment-buttons">
                                                                            <button type="button" onClick={() => addCommentUp(review.reviewId)}>리뷰등록</button>
                                                                            {review.author === props.loginId && (
                                                                                <>
                                                                                    {!editCot[review.reviewId] ? (
                                                                                        <button className="edit-button" onClick={() => {
                                                                                            editComment(review.reviewId);
                                                                                            handleReviewTextChange(review.reviewId, review.content);
                                                                                        }} type="button">수정</button>
                                                                                    ) : (
                                                                                        <button className="edit-button" onClick={() => editCommentUp(review.reviewId)} type="button">등록</button>
                                                                                    )}
                                                                                    <button type="button" onClick={() => deleteComment(review.reviewId)}>삭제</button>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    {!addCot[review.reviewId] ? null : (
                                                                        <div className="comment-form" style={{ display: "flex", width: "100%" }}>
                                                                            <textarea style={{ width: "100%", marginLeft: "10%" }} className="comment-input" name="content" rows="2" placeholder={`${props.loginId}님 리뷰를 남겨주세요`} value={reviewTexts[review.reviewId]} required onChange={(e) => handleReviewTextChange(review.reviewId, e.target.value)}></textarea><br />
                                                                            <input type="button" value="등록" className="submit-button" onClick={() => {
                                                                                addComment(review.reviewId);
                                                                                addCommentUp(review.reviewId);
                                                                            }} />
                                                                        </div>
                                                                    )}
                                                                    {review.children && review.children.length > 0 && (
                                                                        review.children.map(childComment => (
                                                                            <div className="comment reply-form" key={childComment.reviewId} style={{ display: "flex", alignItems: "center" }}>
                                                                                <div>
                                                                                    <p style={{ display: "inline-block", marginRight: "8px" }}>
                                                                                        &nbsp;&nbsp;└ {childComment.author}
                                                                                        {childComment.author === resultQue.loginId ? (
                                                                                            <span style={{ fontSize: "0.8em", marginLeft: "4px" }}>
                                                                                                (본인)
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </p>
                                                                                    <h6 style={{ fontSize: "0.8em", marginLeft: "4px" }}>
                                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                        {childComment.created_at}
                                                                                    </h6>
                                                                                </div>
                                                                                <div style={{ flexGrow: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", overflowY: 'scroll', borderRadius: "5px", height: "4em", width: "55%", marginRight: "5%", verticalAlign: "top" }}>
                                                                                    {!editCot[childComment.reviewId] ? (
                                                                                        <p className="comment-content" style={{ display: "inline-block", marginRight: "8px", margin: "0 0 0 0", padding: "1em" }}>
                                                                                            {childComment.content}
                                                                                        </p>
                                                                                    ) : (
                                                                                        <textarea rows="2" style={{ width: "100%", height: "100%", display: "inline-block", marginRight: "8px", margin: "0 0 0 0", padding: "1em" }} value={reviewTexts[childComment.reviewId]} onChange={(e) => handleReviewTextChange(childComment.reviewId, e.target.value)} />
                                                                                    )}
                                                                                </div>
                                                                                <div className="comment-buttons">
                                                                                    {childComment.author === props.loginId && (
                                                                                        <>
                                                                                            {!editCot[childComment.reviewId] ? (
                                                                                                <button className="edit-button" onClick={() => {
                                                                                                    editComment(childComment.reviewId);
                                                                                                    handleReviewTextChange(childComment.reviewId, childComment.content);
                                                                                                }} type="button">수정</button>
                                                                                            ) : (
                                                                                                <button className="edit-button" onClick={() => editCommentUp(childComment.reviewId)} type="button">등록</button>
                                                                                            )}
                                                                                            <button type="button" onClick={() => deleteComment(childComment.reviewId)}>삭제</button>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                    <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "8px 0" }} />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div><p>리뷰가 없습니다.</p></div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="comment-form" style={{display: "flex", width:"100%", margin:"1%"}}>
                                                    <textarea className="comment-input" name="content" rows="2" style={{width:"80%", marginLeft:"5%"}}
                                                              placeholder={props.loginId + "님 리뷰를 남겨남겨주세요!"}
                                                              value={reviewTX}
                                                              required onChange={(e)=> setReviewTX(e.target.value)}>
                                                        {reviewTX}<br/>
                                                    </textarea>
                                                    <input type="button" value="등록" className="submit-button" onClick={() => {addComment()}}
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
                                                    <a onClick={() => {
                                                        navigate("/tourshop")
                                                    }} className="button"
                                                       style={{
                                                           marginLeft: "6%",
                                                           padding: "4px 12px",
                                                           textAlign: "center",
                                                           backgroundColor: "#7fccde",
                                                           color: "white",
                                                           fontSize: "12px"
                                                       }}>
                                                        이전 페이지로 돌아가기
                                                    </a>
                                                    {upDateTX ?
                                                        <a onClick={() => shopUpdate()} className="button"
                                                           style={{
                                                               marginLeft: "10px",
                                                               padding: "4px 12px",
                                                               textAlign: "center",
                                                               backgroundColor: "#7fccde",
                                                               color: "white",
                                                               fontSize: "12px"
                                                           }}>
                                                            수정
                                                        </a>
                                                        : <a className="button"
                                                             onClick={() => updateAxios(resultQue.shop.shopId)}
                                                             style={{
                                                                 marginLeft: "10px",
                                                                 padding: "4px 12px",
                                                                 textAlign: "center",
                                                                 backgroundColor: "#7fccde",
                                                                 color: "white",
                                                                 fontSize: "12px"
                                                             }}>
                                                            등록
                                                        </a>
                                                    }

                                                    <a className="button" onClick={() => {
                                                        /*========================================= 게시글 삭제 =========================================*/
                                                        axios.get(props.javaServer + "tourshop/svshopdelete/" + resultQue.shop.shopId, {withCredentials: true})
                                                            .then((resDe) => {
                                                                // 응답 데이터에 접근하여 삭제 결과 확인
                                                                const deleteResult = resDe.data.result;

                                                                // 삭제 결과에 따라 처리
                                                                if (deleteResult) {
                                                                    alert("삭제되었습니다.");
                                                                    navigate("/tourshop");
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    function editCommentUp(code){
        try{
            axios.post(props.javaServer+'tourshop/sveditreview/'+code,{shopId:resultQue.shop.shopId,content:reviewTexts[code],user_id:props.loginId},{withCredentials:true})
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
            axios.post(props.javaServer+'tourshop/svdeletecomment/'+code,{shopId:resultQue.shop.shopId},{withCredentials:true})
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

    function addComment(reviewId){
        try {
            let text;
            if(reviewId === undefined){
                text = reviewTX;
            }else{
                text = reviewTexts[reviewId]
            }
            axios.post(props.javaServer+'tourshop/svaddcomment',{
                    content:text,
                    user_id:props.loginId,
                    shopId:resultQue.shop.shopId,
                    reviewId:reviewId

                }, {withCredentials: true}
            ).then((res)=>{

                if(res.data.result){
                    alert("댓글을 등록하였습니다.")
                    // console.log("/detailboard/"+resultQue.board.board_code)
                    // navigate("/detailboard/"+resultQue.board.board_code)
                    // window.location.reload()
                    fetchData();
                    setReviewTX("");
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

export default TourshopDetail;
