import axios from "axios";
import moment from 'moment';


class CovidData {

    async getSummaryData() {
        const result = await axios(
            `https://api.covid19api.com/summary`,
        );
        return result.data
    };
    async getStateSummaryData(state, dateStart, dateEnd) {
        const result = await axios(
            `https://covidtracking.com/api/v1/states/${state}/daily.json`,
        );
        let data = [];
        result.data.forEach(day => {
            if(moment(day.dateChecked) > moment().subtract(14, 'days')){
                data.push(day);
            }
        });
        return data;
    };
}

const svc = new CovidData();
export default svc;