import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import styles from "./recommendPage.module.css";
import SimpleSlider from "./SimpleSlider";




function RecommendPage(props) {

    const [width, setWidth] = useState('100%');



    const items = [

    ];

    for(var i =0; i < 10; i++){
          items.push( { id: i, url: './assets/img/about-image.jpg' })

    }
    return (

        <div className="main-page-content">

            <div id="skill">
                <div className="skill-main">
                    {/* <!-- ================================ 배너 =============================== --> */}



                    {/* <!-- ================================ 배너 =============================== --> */}

                </div>

            </div>
            <div id="about" className={styles.conSlider}>
                <div className="about-content" style={{margin:'0 auto', width:'80%'}}>





                    <SimpleSlider myProp={items}/>


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

export default RecommendPage;