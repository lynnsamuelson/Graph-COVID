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
        console.log("getStateSummaryData", state, dateStart.format('l'), dateEnd.format('l'))
        const result = await axios(
            `https://covidtracking.com/api/v1/states/${state}/daily.json`,
            // `https://covidtracking.com/api/v1/states/tn/daily.json`,
        );
        // let data = [];
        // let test =  result.data.forEach(day => {
        //     if(moment(day.dateChecked) > moment().subtract(14, 'days')){
        //         data.push(day);
        //     }
        // });
        return result.data;
    };
}

const svc = new CovidData();
export default svc;