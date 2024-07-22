import {useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styles from './boarder.module.css';
import axios from "axios";
import {useQuery} from "react-query";

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드럽게 스크롤
    });
}
function QaBorader(props){
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState({});
    const [params, setParams] = useState('')
    const [resultQue,setResultQue]=useState({});
    const [trueResult, setTrueResult] = useState(false)
    // let responseData = null;


    const toggleExpanded = id => {
        setIsExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response] = await Promise.all([
                    axios.get(props.javaServer + 'qaboarder/svqaboardmain'+params,{headers: {
                            Authorization: props.token
                        }}, { withCredentials: true })
                ]);
                const responseData = response.data;
                // console.log(responseData)
                await setResultQue(responseData)
                // await console.log(resultQue)
                // setResultQue(responseData);
                // while(!resultQue) {
                //
                // }
                if(resultQue){
                    setTrueResult(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [params]);


    return (

        <div className="main-page-content">
            {/* <!-- ============================================== SERVICE ===================================================== --> */}
            {/*{resultQue}*/}
            {!trueResult && <div>Loading...</div>}


            {trueResult && (

                <div id="service">
                    <div className="service-content">
                        <div className="service-grid text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="main-title text-center wow fadeIn">
                                            <h3>Q&A 게시판</h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                축제에 대한 궁금한점을 물어보세요

                                            </p>
                                        </div>
                                        <button onClick={() => {

                                            navigate("/svqacreate");
                                        }}
                                                style={{
                                                    marginTop: "20px",
                                                    padding: "4px 12px",
                                                    textAlign: "center",
                                                    backgroundColor: "#7fccde",
                                                    color: "white",
                                                    border: "solid gray 2px",
                                                    width: "120px",
                                                    height: "50px",
                                                    fontSize: "20px"
                                                }}
                                        >글쓰기
                                        </button>
                                    </div>
                                </div>
                                <div className="row love-row wow fadeIn">
                                    {

                                        resultQue.qaboard.map(board => (
                                            <div className="col-md-4 col-sm-6">
                                                <div className="service-details" data-wow-delay=".1s"
                                                     style={{maxHeight: '35em', minHeight: "35em"}}>
                                                    <div className="service-head">
                                                        <a onClick={() => {
                                                            navigate("/svqaboarddetail/" + board[0])
                                                        }}>
                                                            <img // src="assets/img/service/design-development.jpg"
                                                                src={board[7] == null ? 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw' : board[7].split(';')[0] != null ?
                                                                    board[7].split(';')[0].split(":")[0] === "https" ?
                                                                        board[7].split(';')[0] : props.imgURLJ + "/" + board[7].split(';')[0] :
                                                                    'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=82d75629-ca89-4d4d-85b9-5e8dae133e20&mode=raw'}
                                                                alt="design-development"
                                                                style={{maxHeight: "200px"}}
                                                            /></a>

                                                    </div>
                                                    <div className="service-bottom">

                                                        <a onClick={() => {
                                                            navigate("/svqaboarddetail/" + board[0])

                                                        }}><h3>{board[1]}&nbsp;&nbsp;[{board[8]}]</h3></a>
                                                        <div className="underline1"></div>
                                                        <div className="underline2"></div>
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                                            gap: '10px'
                                                        }}>
                                                            <a onClick={() => toggleExpanded(board[0])}>
                                                                {isExpanded[board[0]] ? '접기' : '더보기'}
                                                            </a>
                                                            <h6>작성자 : {board[2]}</h6>
                                                            <h6>좋아요 : {board[5]}</h6>
                                                        </div>

                                                        <p style={{
                                                            maxHeight: isExpanded[1] ? 'none' : '100px',
                                                            overflow: 'hidden',
                                                            textAlign: 'center',
                                                            marginLeft: 0
                                                        }}>
                                                            {board[6]}


                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div>
                                    {
                                        resultQue.currentPage > 1 ?
                                            <a style={{
                                                background: `url("./이전화살표.png")`,
                                                backgroundSize: "cover",
                                                padding: "4px 9px",
                                                fontSize: "20px",
                                                border: "solid gray 1px",
                                                color: "black"
                                            }} onClick={() => {
                                                setParams('/?page=' + (resultQue.startPage - 1))
                                                // if (resultQue.isSuccess) {
                                                //     console.log('여기 확인:', resultQue.data);
                                                // }

                                            }}> &lt; </a> :
                                            null
                                    }
                                    {
                                        Array(resultQue.endPage - resultQue.startPage + 1).fill().map((_, index) => {
                                            const pageNumber = resultQue.startPage + index;
                                            return (
                                                pageNumber === resultQue.currentPage ? (
                                                    <span className="current-page" key={pageNumber}
                                                          style={{
                                                              border: "solid black ",
                                                              backgroundColor: "navy",
                                                              marginLeft: "5px",
                                                              padding: "4px 12px",
                                                              textAlign: "center",
                                                              fontSize: "20px",
                                                              color: "white",
                                                          }}
                                                    >{pageNumber}</span>
                                                ) : (
                                                    <a onClick={() => {
                                                        setParams('/?page=' + pageNumber)
                                                        // if (resultQue.isSuccess) {
                                                        //     console.log('여기 확인:', resultQue.data);
                                                        // }

                                                    }} key={pageNumber}
                                                       style={{
                                                           border: "solid grey 1px",
                                                           marginLeft: "5px",
                                                           padding: "4px 12px",
                                                           textAlign: "center",
                                                           color: "black",
                                                           fontSize: "20px"
                                                       }}
                                                    >{pageNumber}</a>
                                                )
                                            );
                                        })
                                    }

                                    {
                                        (resultQue.totalPage - resultQue.currentPage + 1) > resultQue.maxPageNumber ?
                                            <a style={{
                                                // background: `url("./이후화살표.png")`,
                                                marginLeft: "5px",
                                                backgroundSize: "cover",
                                                padding: "4px 12px",
                                                fontSize: "20px",
                                                border: "solid gray 1px",
                                                color: "black"
                                            }} onClick={() => {
                                                setParams('/?page=' + (resultQue.currentPage < resultQue.totalPage ? (resultQue.currentPage + resultQue.maxPageNumber) : resultQue.totalPage))
                                                // if (resultQue.isSuccess) {
                                                //     console.log('여기 확인:', resultQue.data);
                                                // }

                                            }}> > </a> : null
                                    }
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            )}

            {/* <!-- ================================ BLOG ========================== --> */}


            {/* <!-- ================================ CONTACT ========================== --> */}


        </div>

    )

}

export default QaBorader;