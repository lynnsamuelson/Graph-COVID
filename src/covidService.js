import axios from "axios";

class CovidData {

    async getSummaryData() {
        const result = await axios(
            `https://api.covid19api.com/summary`,
        );
        return result.data
    };
    async getCountrySummaryData() {
        const result = await axios(
            `https://covidtracking.com/api/v1/states/tn/daily.json`,
            // `https://api.covid19api.com/summary`,
        );
        return result.data;
    };
}

const svc = new CovidData();
export default svc;