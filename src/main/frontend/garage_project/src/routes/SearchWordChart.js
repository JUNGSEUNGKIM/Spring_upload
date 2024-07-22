import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis,VictoryLabel } from 'victory';

const SearchWordChart = () => {
    // useState 훅을 사용하여 sampleData 상태와 이를 업데이트하는 함수를 생성합니다.
    const [sampleData, setSampleData] = useState([]);

    // useEffect 훅을 사용하여 컴포넌트가 처음 렌더링될 때 타이머를 설정합니다.
    useEffect(() => {
        // 일정한 간격으로 새로운 랜덤 데이터를 생성하고 상태를 업데이트하는 함수를 정의합니다.
        const updateDataInterval = setInterval(() => {
            // 30개의 키워드 목록을 정의합니다.
            const keywords = [
                "공연", "광주", "국내여행", "축제", "맛집", "음식", "행사", "가을여행", "문화",
                "산책", "휴양지", "자연", "명소", "쇼핑", "휴가", "풍경", "연인", "가을축제",
                "휴식", "가을나들이", "힐링", "가족여행", "전시", "체험", "자유여행",
                "가을맞이", "지역축제", "휴가철", "공연장", "가을문화"
            ]; // 더 많은 키워드를 추가할 수 있습니다.
            // 최대 4개의 키워드를 선택합니다.
            const randomKeywords = [];
            while (randomKeywords.length < 4) {
                const randomIndex = Math.floor(Math.random() * keywords.length);
                if (!randomKeywords.includes(keywords[randomIndex])) {
                    randomKeywords.push(keywords[randomIndex]);
                }
            }
            // 선택된 키워드에 대한 랜덤한 데이터를 생성합니다.
            const newData = randomKeywords.map(keyword => ({
                keyword: keyword,
                count: Math.floor(Math.random() * 100) + 1,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}` // 랜덤한 컬러 생성
            }));
            // 생성된 데이터를 상태에 업데이트합니다.
            setSampleData(newData);
        }, 1000); // 2초마다 새로운 데이터를 생성하도록 설정합니다.

        // 컴포넌트가 언마운트되거나 업데이트될 때 타이머를 정리합니다.
        return () => clearInterval(updateDataInterval);
    }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 설정합니다.

    return (
        <div>
            <h4>서울에서 주요 도시까지의 소요 시간</h4>
            <VictoryChart theme={VictoryTheme.material} domainPadding={{x: 10}}
                          style={{parent: {background: "#fff", border: "1px solid #ccc"}}}>
                {/* 제목 추가 */}

                {/* X 축 라벨 추가 */}
                <VictoryAxis
                    tickValues={sampleData.map(data => data.keyword)}
                    label="Keywords"
                    style={{axisLabel: {padding: 30}}}
                />
                {/* Y 축 라벨 추가 */}
                <VictoryAxis dependentAxis
                             tickFormat={(tick) => `${tick}`}
                             label="Count"
                             style={{axisLabel: {padding: 40}}}
                />
                {sampleData.map((data, index) => (
                    <VictoryBar
                        key={index}
                        horizontal
                        style={{
                            data: {fill: data.color}
                        }}
                        data={[data]}
                        x="keyword"
                        y="count"
                    />
                ))}
            </VictoryChart>
        </div>
    );
};

export default SearchWordChart;
