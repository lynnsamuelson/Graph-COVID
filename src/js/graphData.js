import svc from '../svc/covidService';
import moment from 'moment';

export default class GraphData {
    constructor(params){
        console.log("created GraphData", params);
        this.states = params.states[0];
        this.startDate = params.startDate;
        this.endDate = params.endDate;
    };
    async getInitialData() {
        let totalData = [];
        let result = await svc.getStateSummaryData(this.states, this.startDate, this.endDate)
        console.log("result", result)
        result.forEach(day => {
            totalData.push({ 
                x: moment(day.dateChecked).format('l'), 
                y: day.positiveCasesViral
            })
        })
        totalData.sort((a,b) => {
            return moment(a.x) - moment(b.x)
        })
        let total = {
            id:"total",
            color: "hsl(294, 70%, 50%)",
            data: totalData
        }
        return total;
    }

}