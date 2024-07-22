import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];

const AgeChart = () => {
    const [data, setData] = useState({});
    const [avgTimes, setAvgTimes] = useState({});
    const [currentIndex, setCurrentIndex] = useState(1);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://data.ex.co.kr/openapi/safeDriving/forecast?key=9710729048&type=json');
                const result = await response.json();
                setData(result.list[0]);
                calculateInitialAvgTimes(result.list[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (currentIndex < 24) {
                updateTimes();
                setCurrentIndex(currentIndex + 1);
            } else {
                clearInterval(timer);
            }
        }, 2000);

        return () => clearInterval(timer);
    }, [currentIndex, avgTimes]);

    const calculateInitialAvgTimes = (data) => {
        const initialAvgTimes = {
            '10대': (parseInt(data.csudj) + parseInt(data.cdjsu)) / 2,
            '20대': (parseInt(data.csudg) + parseInt(data.cdgsu)) / 2,
            '30대': (parseInt(data.csuus) + parseInt(data.cussu)) / 2,
            '40대': (parseInt(data.csubs) + parseInt(data.cbssu)) / 2,
            '50대': (parseInt(data.csugj) + parseInt(data.cgjsu)) / 2,
            '60대': (parseInt(data.csump) + parseInt(data.cmpsu)) / 2,
        };
        setAvgTimes(Object.keys(initialAvgTimes).reduce((acc, city) => {
            acc[city] = [initialAvgTimes[city]];
            return acc;
        }, {}));
    };

    const updateTimes = () => {
        setAvgTimes(prevTimes => {
            return Object.keys(prevTimes).reduce((acc, city) => {
                const lastTime = prevTimes[city][prevTimes[city].length - 1];
                let newTime = lastTime + (Math.random() * 2 - 1);
                newTime = Math.max(Math.min(newTime, 9), 0);
                acc[city] = [...prevTimes[city], newTime];
                return acc;
            }, {});
        });
    };

    const handleLabelClick = (city) => {
        setSelectedCity(city);
    };

    if (!data.csudj) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4 style={{ textAlign: 'center' }}>연령대별 검색량</h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Object.keys(avgTimes).map((city, idx) => (
                    <div key={city} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                        <div style={{ width: 20, height: 20, backgroundColor: colors[idx % colors.length], marginRight: 5 }} />
                        <VictoryLabel
                            text={city}
                            style={{
                                fill: colors[idx % colors.length],
                                cursor: 'pointer'
                            }}
                            events={{ onClick: () => handleLabelClick(city) }}
                        />
                    </div>
                ))}
            </div>
            <VictoryChart

                domainPadding={20}
                theme={VictoryTheme.material}
                width={800}
                height={500}
                style={{
                    parent: { background: "#fff" , border: "1px solid #ccc" }}}
            >
                <VictoryAxis
                    tickValues={Array.from({ length: 23 }, (_, i) => i)}
                    tickFormat={(t) => `${t}`}
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={Array.from({ length: 10 }, (_, i) => i)}
                />
                {Object.keys(avgTimes).map((city, idx) => (
                    <VictoryLine
                        key={city}
                        data={avgTimes[city].slice(0, currentIndex).map((time, i) => ({ x: i, y: time }))}
                        style={{
                            data: {
                                stroke: colors[idx % colors.length],
                                strokeWidth: 3,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                opacity: selectedCity === city ? 1 : 0.3
                            },
                            points: { fill: colors[idx % colors.length], size: 5 }
                        }}
                        interpolation="natural"
                    />
                ))}
            </VictoryChart>
        </div>
    );
};

export default AgeChart;
