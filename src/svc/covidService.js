import axios from "axios";
import moment from 'moment';


class CovidData {

    async getSummaryData() {
        const result = await axios(
            `https://api.covid19api.com/summary`,
        );
        return result.data
    };
    async getStateSummaryData(state, startDate, endDate) {
        const result = await axios(
            `https://covidtracking.com/api/v1/states/${state}/daily.json`,
        );
        let data = [];
        result.data.forEach(day => {
            if(startDate.isBefore(day.dateChecked) && endDate.isAfter(day.dateChecked)){
                data.push(day);
            }
        });
        return data;
    };
}

const svc = new CovidData();
export default svc;