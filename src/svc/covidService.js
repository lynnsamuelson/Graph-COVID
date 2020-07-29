import axios from "axios";
import moment from 'moment';


class CovidData {

    async getSummaryData() {
        const result = await axios(
            `https://api.covid19api.com/summary`,
        );
        return result.data
    };
    async getStateSummaryData(state) {
        const result = await axios(
            `https://covidtracking.com/api/v1/states/${state}/daily.json`,
        );
        let data = [];
        // console.log("api call", result.data);
        result.data.forEach(day => {
            data.push(day);
        });
        return data;
    };
}

const svc = new CovidData();
export default svc;