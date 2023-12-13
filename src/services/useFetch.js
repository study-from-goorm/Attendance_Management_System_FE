import {axiosPrivate} from "../api/axiosInstance.js";

export const fetchDateAndSession = async () => {
    try {
        const response = await axiosPrivate.get('/api/availableDatesSessions');
        console.log("=>(useFetch.js:11) response.data", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
//날짜와 회차에 따른 출결 데이터 가져오기
export const fetchData = async (date, session) => {
    try {
        const response = await axiosPrivate.get('/api/dummyData', {
            params: {date, session}
        });
        console.log("=>(useFetch.js:22) response.data", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
