import svc from '../svc/covidService';
import moment from 'moment';

export default class GraphData {
    constructor(params){
        // this.states = params.states;
        // this.startDate = params.startDate;
        // this.endDate = params.endDate;
        this.allData = [];
    };
    async getInitialData(states, startDate, endDate) {
        console.log("getting data", states, startDate, endDate);
        let promises = states.map(state => {
            return this.getStateData(state, startDate, endDate);
        })
        let total = await Promise.all(promises);
        return this.allData;
    }
    async getStateData(state, startDate, endDate) {
        let totalData = [];
        let result = await svc.getStateSummaryData(state, startDate, endDate);
        // let result = await svc.getStateSummaryData(state, this.startDate, this.endDate);
        result.forEach(day => {
            totalData.push({ 
                x: moment(day.dateChecked).format('Y-MM-DD'), 
                y: day.positiveCasesViral
            })
        })
        totalData.sort((a,b) => {
            return moment(a.x) - moment(b.x)
        })
        let total = {
            id: state,
            data: totalData
        }
        this.allData.push(total);

        return totalData;
    }
}