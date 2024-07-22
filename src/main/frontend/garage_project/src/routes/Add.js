import React, {useEffect, useState} from "react";
import styles from './create.module.css';
import axios from "axios";
import  {useNavigate, useParam} from "react-router-dom";
import Select from 'react-select'


function Add(props) {

    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // 게시글 텍스트를 formData에 추가합니다.
        formData.append('tourTitle', title);
        formData.append('content', content);
        formData.append('tourPrice', price);
        formData.append('location', location);

        // // 선택한 각 사진을 formData에 추가합니다.
        images.forEach((file, index) => {
            formData.append(`files`, file);
        });
        // formData.append('festival_code',selectedOption.value )
        // // console.log(formData.get('image1'))

        try {
            const response = await axios.post(props.javaServer + 'tourshop/add', formData,{headers: {
                    Authorization: props.token
                }},{withCredentials: true}, {
                headers: {
                    Authorization: props.loginId,  // 토큰을 Authorization 헤더에 포함
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/tourshop');

            // 서버에서의 응답 처리
        } catch (error) {
            console.error('Error posting with images:', error);
        }
    };



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
                                                <h1 className="form-default__title">상품 등록하기</h1>

                                                <input name="tourtitle" type="text" id="title" value={title}
                                                       onChange={handleTitleChange}
                                                       required placeholder="제목을 입력하세요*"/>
                                                <label htmlFor="contact_message">내용을 입력해주세요*</label>
                                                <textarea value={content} className={styles.textAreaCS}
                                                          name="contact_message"
                                                          id="contact_message"
                                                          onChange={handleContentChange}
                                                          required></textarea>
                                                <label htmlFor="contact_message">가격을 입력해주세요*</label>
                                                <textarea name="price" type="text" id="price" value={price}
                                                          onChange={handlePriceChange}/>
                                                <label htmlFor="contact_message">위치을 입력해주세요*</label>
                                                <textarea name="location" type="text" id="location" value={location}
                                                          onChange={handleLocationChange}/>
                                                <label htmlFor="contact_message">사진을 업로드 해주세요*</label>
                                                <input type="file" accept="image/*" multiple
                                                       onChange={handleFileChange}/>


                                                <button type={'button'} className={styles.loginBtn}
                                                        onClick={handleSubmit}>상품등록
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
        </div>
    )
}

export default Add;