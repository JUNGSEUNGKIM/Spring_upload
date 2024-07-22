import React, {useEffect, useState} from "react";
import styles from './create.module.css';
import axios from "axios";
import  {useNavigate, useParams} from "react-router-dom";
import Select from 'react-select'
// import 'react-select/dist/react-select.css';


function Create(props) {
    // useEffect(() => {
    //     axios.get(props.serverURL+"/create",{withCredentials: true})
    // }, []);
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // 게시글 텍스트를 formData에 추가합니다.
        formData.append('title', title);
        formData.append('content', content);
        formData.append('user_id',props.loginId)

        // 선택한 각 사진을 formData에 추가합니다.
        images.forEach((file, index) => {
            formData.append(`files`, file);
        });
        formData.append('festival_code',selectedOption.value )
        // console.log(formData.get('image1'))

        try {
            // const response = await axios.post(props.serverURL+'/svcreate', formData,{withCredentials: true}, {
            const response = await axios.post(props.javaServer+ 'boarder/svcreate', formData,{headers: {
                    Authorization: props.token
                }},{withCredentials: true}, {
                headers: {
                    Authorization: props.loginId,  // 토큰을 Authorization 헤더에 포함
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/boarder');

            // 서버에서의 응답 처리
        } catch (error) {
            console.error('Error posting with images:', error);
        }
    };

    let [festivals,setFestivals]=useState([]);
   
    const festival2Week = async () => {
        try {
            // axios.get 메서드를 사용하여 서버에서 데이터를 가져옵니다.
            // alert(props.token)
            const response = await axios.get(props.javaServer + 'festival/svfestivalselect', {headers: {
                    Authorization: props.token
                }},{ withCredentials: true });
            // 가져온 데이터를 이용하여 festivals 상태를 설정합니다.
            setFestivals(response.data.festival);
            // console.log("::",festivals);
            return response.data;
        } catch (error) {
            // 오류 처리를 해줍니다.
            console.error('Error get festival:', error);
        }
    }

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 festival2Week 함수를 호출합니다.
    useEffect(() => {
        festival2Week();
        // console.log("::::::::::FEstival:::", festivals);
    }, []);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        // console.log("::::옵션선택:::",selectedOption)
    };



    const newOptions = festivals.map(festival => ({
        value: festival[0],
        label: festival[1]
    }));









    return (
        <div>

            <div id="about">
                <div className="about-content">
                    <div className="love-grid text-center">
                        <div className="container">
                            <div className="row" style={{display: 'inline-block'}}>
                                <div className="col-md-12" style={{textAlign: 'center'}}>
                                    <div className="main-title text-center wow fadeIn">
                                        {/* <!-- ================================ LOGIN =============================== --> */}
                                        <form  method="post"
                                              className={`${styles.formDefault} ${styles.formContact}`}>
                                            <div className={styles.formContactWrapper}>
                                                <h1 className="form-default__title">게시글 작성하기</h1>

                                                <input name="title" type="text" id="title" value={title}
                                                       onChange={handleTitleChange}
                                                       required placeholder="제목을 입력하세요*"/>
                                                <label htmlFor="contact_message">YOUR MESSAGE*</label>
                                                <textarea value={content} className={styles.textAreaCS}
                                                          name="contact_message"
                                                          id="contact_message"
                                                          onChange={handleContentChange}
                                                          required></textarea>
                                                <label htmlFor="contact_message">사진을 업로드 해주세요</label>
                                                <input type="file" accept="image/*" multiple
                                                       onChange={handleFileChange}/>
                                                {/*{festivals}*/}
                                                <label htmlFor="contact_message">다녀온 축제를 선택해주세요</label>
                                                <Select
                                                    value={selectedOption}
                                                    onChange={handleChange}
                                                    options={newOptions}
                                                />


                                                <button type={'button'} className={styles.loginBtn}
                                                        onClick={handleSubmit}>글쓰기
                                                </button>
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

        </div>
    )
}

export default Create;