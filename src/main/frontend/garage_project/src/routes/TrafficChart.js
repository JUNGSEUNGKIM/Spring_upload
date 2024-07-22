import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryTheme ,VictoryLine, VictoryLabel} from 'victory';
import styled from 'styled-components';

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];

const ScatterPoint = ({ x, y, datum, min, max }) => {
    const i = React.useMemo(() => {
        return Math.floor(((datum.y - min) / (max - min)) * (colors.length - 1));
    }, [datum, min, max]);

    return <circle fill={colors[i]} cx={x} cy={y} r={6} />;
};
const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(parseFloat);
    return hours + minutes / 60;
};


const AVGTimes = {
    '대전': 2, // 02:00
    '대구': 3.3, // 03:30
    '울산': 4.1, // 04:10
    '부산': 4, // 04:00
    '광주': 3.2, // 03:20
    '목포': 3.5, // 03:50
    '강릉': 2.5, // 02:50
    '남양주': 1.3, // 02:50
};


const TrafficChart = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://data.ex.co.kr/openapi/safeDriving/forecast?key=9710729048&type=json');
                const result = await response.json();
                // 데이터의 'list' 배열의 첫 번째 요소만을 사용합니다.
                setData(result.list[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // 각 지역의 평균 소요 시간을 계산합니다.
    const avgTimes = {
        '대전': (parseTime(data.csudj) + parseTime(data.csudj_bus)) / 2,
        '대구': (parseTime(data.csudg) + parseTime(data.csudg_bus)) / 2,
        '울산': (parseTime(data.csuus) + parseTime(data.csuus_bus)) / 2,
        '부산': (parseTime(data.csubs) + parseTime(data.csubs_bus)) / 2,
        '광주': (parseTime(data.csugj) + parseTime(data.csugj_bus)) / 2,
        '목포': (parseTime(data.csump) + parseTime(data.csump_bus)) / 2,
        '강릉': (parseTime(data.csukr) + parseTime(data.csukr_bus)) / 2,
        '남양주': (parseTime(data.csuyy) + parseTime(data.csuyy_bus)) / 2,
    };

    console.log(avgTimes)
    // 새로운 형태의 데이터를 생성합니다.
    const chartData = Object.keys(avgTimes).map(city => ({ x: city, y: avgTimes[city] }));


    // y값에 대한 최솟값과 최댓값을 찾습니다.
    const temperatures = chartData.map(({ y }) => y);
    const min = Math.min(...temperatures);
    const max = Math.max(...temperatures);

    return (
        <div>
            <h4>서울에서 주요 도시까지의 소요 시간</h4>
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}

                          style={{
                              parent: { background: "#fff" , border: "1px solid #ccc" } // 하얀 배경색 추가
                          }}>
                <VictoryLine
                    data={Object.keys(AVGTimes).map(city => ({ x: city, y: AVGTimes[city] }))}
                    style={{
                        data: {stroke: "black"}
                    }}

                />
                <VictoryAxis
                    // X축 라벨 설정
                    tickValues={Object.keys(AVGTimes)} // 도시 이름을 직접 지정
                    tickFormat={(city) => city} // 도시 이름으로 포맷팅
                    label="도시" // X축 라벨 추가
                    style={{
                        axisLabel: { padding: 30 } // 라벨과 차트 사이의 간격 조정
                    }}

                />
                <VictoryAxis/>
                <VictoryAxis dependentAxis
                             tickValues={["0", "1", "2", "3", "4", "5", "6", "7"]}
                             label="소요 시간 (시간)"
                             style={{
                             axisLabel: { padding: 30 } // Y축 라벨과 차트 사이의 간격 조정
                             }}
                />
                <VictoryScatter
                    data={chartData}
                    dataComponent={<ScatterPoint min={min} max={max}/>}
                />
                {/*<VictoryLine*/}
                {/*    data={Object.keys(AVGTimes).map(city => ({ x: city, y: AVGTimes[city] }))}*/}
                {/*    style={{*/}
                {/*        data: {stroke: "black"}*/}
                {/*    }}*/}

                {/*/>*/}
                <VictoryLabel
                    text="도트: 실 소요 시간, 선: 평균 소요 시간"
                    x={170} // 가로 위치 조정
                    y={50} // 세로 위치 조정
                    textAnchor="middle" // 가로 위치를 가운데로 설정
                    style={{ fontSize: 10 }} // 폰트 크기 조정
                />
            </VictoryChart>

        </div>
    );
};

export default TrafficChart;
