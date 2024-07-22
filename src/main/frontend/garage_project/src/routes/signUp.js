
import React, {useEffect, useState} from "react";
import styles from './signUp.module.css';
import axios from "axios";
import  {useNavigate, useParams} from "react-router-dom";

function SignUp(props) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        password: '',
        name:'',
        nickname:'',
        gender:'',
        birth:'',
        locationX:'',
        locationY:'',
        tagFamily:'',
        tagLike:'',

    });

    const handleChange = (e) => {
        if(e.target.name === 'id'){
            setId(e.target.value);
        }
        const { name, value, type, checked } = e.target;
        let newValue;

        if (type === 'checkbox') {
            newValue = checked ? [...formData[name], value] : formData[name].filter(item => item !== value);
        } else {
            newValue = value;
        }

        setFormData({
            ...formData,
            [name]: newValue
        });

        // console.log(formData);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedFormData = { ...formData };
        let tagLike = '';
        if(formData.tagLike.length>0) {
            for (let i = 0; i < formData.tagLike.length; i++) {
                tagLike = tagLike + ',#' + formData.tagLike[i];
            }
            updatedFormData.tagLike= tagLike.substr(1);
        }
        let tagFamily = '';
        if(formData.tagFamily.length>0) {
            for (let i = 0; i < formData.tagFamily.length; i++) {
                tagFamily = tagFamily + ',#' + formData.tagFamily[i];
            }
            updatedFormData.tagFamily= tagFamily.substr(1);
        }
        setFormData(updatedFormData)
        console.log(updatedFormData);
        // Axios를 사용하여 POST 요청 보내기
        axios.post(props.serverURL+'/signup', updatedFormData)
            .then(response => {
                console.log('데이터 전송 성공:', response);
                if(response.data.result){
                    navigate('/login');
                }
                // 성공적으로 데이터를 전송한 후 할 일을 여기에 작성
            })
            .catch(error => {
                console.error('데이터 전송 실패:', error);
                alert("회원가입에 실패하였습니다. 다시 입력해주세요")
                // navigate('/login');
                // 오류 처리를 여기에 작성
            });
    };
    const getCurrentLocationSU = ()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            setFormData({
                ...formData,
                locationX:position.coords.latitude,
                locationY:position.coords.longitude

            });

        })
        setSubmitLoc('위치정보 제공을 허용하셨습니다.')

    }
     const [submitLoc, setSubmitLoc] = useState(''); // 선택된 성별 상태를 저장

    // const handleChange = (event) => {
    //     setGender(event.target.value); // 선택된 성별을 상태에 저장
    // };
    const [id, setId] = useState('');
    const [idChecked, setIdChecked] = useState(false);

    const checkId = () => {
        const formCheckId = {
            inputUserId: id
        }
        let idCheckResult ;
            // 여기서는 간단한 조건을 통해 아이디 체크를 시뮬레이션합니다.
        // 실제로는 서버 요청 등의 로직이 들어갈 수 있습니다.
        if(id!=='') {
            axios.post(props.serverURL+'/idcheck', formCheckId)
                .then(response => {
                    console.log('데이터 전송 성공:', response);
                    idCheckResult = response.data.result
                    if (idCheckResult) {
                        alert('사용 가능한 아이디입니다.');
                        setIdChecked(true);
                    } else {
                        alert('아이디가 이미 존재합니다.');
                        setId('');
                    }
                    console.log("result:::", idCheckResult)
                    // 성공적으로 데이터를 전송한 후 할 일을 여기에 작성
                })
                .catch(error => {
                    console.error('데이터 전송 실패:', error);
                    // 오류 처리를 여기에 작성
                });
        }

        //
    };
    return (
        <div className="main-page-content">

            <div id="about">
                <div className="about-content">
                    <div className="love-grid text-center">
                        <div className="container">
                            <div className="row" style={{display:'inline-block'}}>
                                <div className="col-md-12" style={{textAlign:'center'}}>
                                    <div className="main-title text-center wow fadeIn" >
                                        {/* <!-- ================================ LOGIN =============================== --> */}
                                        <form action="/signUp" method="post" className={`${styles.formDefault} ${styles.formContact}`}>
                                            <div className={styles.formContactWrapper}>
                                                <h1 className="form-default__title">Sign Up Page</h1>

                                                <input name={'id'} type="text" id="id"
                                                       style={{maxWidth: '70%', marginRight: '7%'}}
                                                       required value={id}
                                                       placeholder="INPUT ID *" disabled={idChecked} onChange={handleChange}/>
                                                <button type="button" onClick={checkId} >중복</button>
                                                <button onClick={()=>{
                                                    setIdChecked(false)
                                                }}>다시</button>
                                                {/*<p id="idCheckPoint"></p>*/}
                                                <input name={'password'} type="password" id="password"
                                                       required placeholder="INPUT PASSWORD*"  onChange={handleChange}/>
                                                <input name="password_check" type="password" id="password_check"
                                                       required placeholder="INPUT PASSWORD CHECK*" />
                                                <input name={'name'} type="text" id="name" required
                                                       placeholder="YOUR NAME *"  onChange={handleChange}/>
                                                <input type="text" name={'nickname'} id="nickname" maxLength="100"
                                                       placeholder="YOUR NICKNAME"  onChange={handleChange}/>

                                                {/*<input name="gender" type="checkbox" id="gender" required*/}
                                                {/*       placeholder="GENDER(M/F) *"/>*/}

                                                <div style={{border:"1px dotted black", height:"30%",paddingBottom:"10%"}}>
                                                    <label htmlFor="gender">GENDER(M/F) </label>
                                                    <select name={'gender'} value={formData.gender} onChange={handleChange}>
                                                        <option value="">Select gender</option>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                    </select>
                                                    <p>Selected gender: {formData.gender}</p>
                                                </div>

                                                <div className={styles.checkBoxContainer}>
                                                    <label> WHO"S TOGETHER</label>
                                                    <div className={styles.checkBoxDiv} ><label>가족(유아)</label><input
                                                        type="checkbox" name="tagFamily" value="가족(유아)" onChange={handleChange}/></div>
                                                    <div className={styles.checkBoxDiv}><label>부부/연인</label><input
                                                        type="checkbox" name="tagFamily" value="부부/연인" onChange={handleChange}/></div>
                                                    <div className={styles.checkBoxDiv}><label>반려동물</label><input
                                                        type="checkbox" name="tagFamily" value="반려동물" onChange={handleChange}/></div>
                                                    <div className={styles.checkBoxDiv}><label>혼자</label><input
                                                        type="checkbox" name="tagFamily" value="혼자" onChange={handleChange}/></div>

                                                </div>
                                                <div className={styles.checkBoxContainer}>
                                                    <label> LIKE TAG</label>
                                                    <div className={styles.checkBoxDiv}><label>사진</label><input
                                                        type="checkbox" name="tagLike" value="사진" onChange={handleChange}/></div>
                                                    <div className={styles.checkBoxDiv}><label>맛집</label><input
                                                        type="checkbox" name="tagLike" value="맛집" onChange={handleChange}/></div>
                                                    <div className={styles.checkBoxDiv}><label>체험</label><input
                                                        type="checkbox" name="tagLike" value="체험" onChange={handleChange}/></div>
                                                    <div className={styles.checkBoxDiv}><label>자연</label><input
                                                        type="checkbox" name="tagLike" value="자연" onChange={handleChange}/></div>

                                                </div>

                                                <label style={{marginTop: '10%'}}>YOUR BIRTH</label>
                                                <input type="date" name={'birth'} id="birth" maxLength="100"
                                                       placeholder="YOUR BIRTH" style={{marginBottom: "5%"}}  onChange={handleChange}/>
                                                {/*<input type="checkbox" name="tagFamily"/>*/}
                                                <div>

                                                    <button type="button" onClick={() => {
                                                        getCurrentLocationSU()

                                                    }}>위치허용
                                                    </button>
                                                    <p> {submitLoc}</p>
                                                </div>


                                                {/*<input name="submit" id="singUpButton" className={styles.loginBtn} type="submit"*/}
                                                {/*       value="Sign UP"/>*/}
                                                <button className={styles.loginBtn} onClick={(event)=>{
                                                    handleSubmit(event)
                                                }}>Sign Up</button>


                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div id="skill">
                <div className="skill-main">

                    {/* <!-- ================================ 배너 =============================== --> */}

                </div>

            </div>


            {/* <!-- ================================ ABOUT =============================== --> */}


        </div>
    )
}

export default SignUp;