import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import styles from './TourShop.module.css';
import axios from "axios";

function TourShop(props){
    const navigate = useNavigate();
    const [params, setParams] = useState('');
    const [resultQue, setResultQue] = useState({});
    const [trueResult, setTrueResult] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response] = await Promise.all([
                    axios.get(props.javaServer + 'tourshop/svshopmain'+params, {headers: {
                        Authorization: props.token
                        }}, {withCredentials: true })
                ]);
                const responseData = response.data;
                console.log(responseData);
                await setResultQue(responseData);
                await console.log(resultQue);

                if (resultQue){
                    setTrueResult(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
    }, [params]);

    return (
        <div className="main-page-content">
            {!trueResult && <div>Loading...</div>}


            {trueResult && (
                <div id="service">
                    <div className="service-content">
                        <div className="service-grid text-center">
                            <div className="container">
                                <div className="row">
                                    {/* <!-- ================================ 게시판 헤더 / 상품 등록 ================================ --> */}
                                    <div className="col-md-12">
                                        <div className="main-title text-center wow fadeIn">
                                            <h3> GARAGE 투어 SHOP </h3>
                                            <div className="underline1"></div>
                                            <div className="underline2"></div>
                                            <p>
                                                가라게가 추천하는 투어와 축제를 만나보세요!
                                            </p>
                                        </div>
                                        <button onClick={() => {
                                            navigate("/add");
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
                                        >상품등록
                                        </button>
                                    </div>
                                </div>
                                {/* <!-- ================================ 게시판 메인 ================================ --> */}
                                <div className="row love-row wow fadeIn">
                                    {

                                        resultQue.shop.map(shop => (
                                            <div className="col-md-4 col-sm-6">
                                                <div className="service-details" data-wow-delay=".1s"
                                                     style={{maxHeight:"35em", minHeight:"35em"}}>
                                                    <div className="service-head">
                                                        <a onClick={() => {
                                                            navigate("/shopdetail/"+shop[0])
                                                        }}>
                                                            <img
                                                                src={shop[1]==null?'https://toeic.ybmclass.com/toeic/img/noimage.gif':shop[1].split(';')[0]!=null?
                                                                    shop[1].split(';')[0].split(":")[0]==="https"?
                                                                        shop[1].split(';')[0]:props.imgURLJ + "/" + shop[1].split(';')[0]:
                                                                    'https://toeic.ybmclass.com/toeic/img/noimage.gif'}
                                                                alt="design-development"
                                                                style={{maxHeight: "200px"}}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="service-bottom">
                                                        <a onClick={() => {
                                                            navigate("/shopdetail/"+shop[0])
                                                        }}>
                                                            <h3> {shop[2]}&nbsp;&nbsp;{shop[6]}</h3>
                                                        </a>
                                                        <div className="underline1"></div>
                                                        <div className="underline2"></div>
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                                            gap: '10px'
                                                        }}>
                                                            <h6>{shop[4]} / 1인</h6>
                                                            <h6>{shop[5]}</h6>   {/* Location */}

                                                        </div>
                                                        <p style={{
                                                            maxHeight: '100px',
                                                            overflow: 'hidden',
                                                            textAlign: 'center',
                                                            marginLeft: 0
                                                        }}>
                                                            {/*{shop[3]}   /!* Content *!/*/}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <!-- ================================ 페이징 처리 ================================ --> */}
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
                                            }} onClick={()=> {
                                            setParams('/?page=' + (resultQue.startPage - 1))
                                            }}>
                                                &lt; </a> : null
                                    }
                                    {
                                        Array(resultQue.endPage - resultQue.startPage + 1).fill().map((_,index) => {
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
                                                          }}>
                                                        {pageNumber}
                                                    </span>
                                                ) : (
                                                    <a onClick={()=> {
                                                        setParams('/?page' + pageNumber)
                                                    }} key={pageNumber}
                                                       style={{
                                                           border: "solid grey 1px",
                                                           marginLeft: "5px",
                                                           padding: "4px 12px",
                                                           textAlign: "center",
                                                           color: "black",
                                                           fontSize: "20px"
                                                   }}>
                                                    {pageNumber}
                                                   </a>
                                                )
                                            );
                                        })
                                    }
                                    {
                                        (resultQue.totalPage - resultQue.currentPage + 1) > resultQue.maxPageNumber ?
                                            <a style={{
                                                marginLeft: "5px",
                                                backgroundSize: "cover",
                                                padding: "4px 12px",
                                                fontSize: "20px",
                                                border: "solid gray 1px",
                                                color: "black"
                                            }} onClick={() => {
                                            setParams('/?page' + (resultQue.currnetPage < resultQue.totalPage ? (resultQue.currnetPage + resultQue.maxPageNumber) : resultQue.totalPage))
                                            }}>
                                                >
                                            </a> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </div>
    )
}

export default TourShop;