import svc from '../svc/covidService';
import moment from 'moment';

export default class GraphData {
    constructor(){
        this.allData = [];
    };
    async getInitialData(states, startDate, endDate) {
        let promises = states.map(state => {
            return this.getStateTotalByDaterange(state, startDate, endDate);
        })
        await Promise.all(promises);
        return this.allData;
    }
    async getStateTotalByDaterange(state, startDate, endDate) {
        let totalData = [];
        let result = await svc.getStateSummaryData(state);
        result.forEach(day => {
            if(startDate.isBefore(day.dateChecked) && endDate.isAfter(day.dateChecked)){
                totalData.push({ 
                    x: moment(day.dateChecked).format('Y-MM-DD'), 
                    y: day.positiveCasesViral
                })
            }
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