import svc from '../svc/covidService';
import moment from 'moment';

export default class GraphData {
    constructor(){
        this.allData = []; //alldata from an api call for each state in this array
        this.twoWeekData = []; //this is the data formated for display for the defined 2 week period. Not sure if it's needed.
        this.sevenDayData = [];
        this.filteredData = [];
    };
    async getInitialData(states, startDate, endDate, graphType) {
        this.twoWeekData = [];
        let promises = states.map(state => {
            return this.getStateTotalByDaterange(state, startDate, endDate);
        })
        await Promise.all(promises);
        return this.twoWeekData;
    }
    async getStateTotalByDaterange(state, startDate, endDate) {
        let localData = [];
        let result = await svc.getStateSummaryData(state);
        this.updateAllData(result);
        result.forEach(day => {
            if(startDate.isBefore(day.dateChecked) && endDate.isAfter(day.dateChecked)){
                localData.push({ 
                    x: moment(day.dateChecked).format('Y-MM-DD'), 
                    y: day.positiveCasesViral
                })
            }
        })
        localData.sort((a,b) => {
            return moment(a.x) - moment(b.x)
        })
        let total = {
            id: state,
            data: localData
        }
        this.twoWeekData.push(total);
        this.filteredData.push(total);
        return this.filteredData;
    }

    updateAllData(result) {
        let findStateIndx = this.allData.findIndex(alldataState => alldataState[0].state === result[0].state);
        if(~findStateIndx) {
            this.allData[findStateIndx] = result;
        } else {
            this.allData = [...this.allData, result];
        }
    }

    async getSevenDayDataIndividualState(states, startDate, endDate) {
        this.sevenDayData = [];
        for(let i=0; i<states.length; i++) {
            let findStateIndx = -1;
            if(this.allData.length > 0){
                findStateIndx = this.allData.findIndex(alldataState => 
                    alldataState[0].state.toLowerCase() === states[i].toString()
                );
            }
            if(findStateIndx === -1){
                await this.getIndividualStateData(states[i]);
                findStateIndx = this.allData.findIndex(alldataState => 
                    alldataState[0].state.toLowerCase() === states[i].toString()
                );
            }
            this.getAllSevenDayData(findStateIndx, startDate, endDate)
        }
        return this.sevenDayData;
    }

    getAllSevenDayData(index, startDate, endDate) {
        for(let i = 0; i<this.allData[index].length; i++){
            if(this.allData[index][i].date > startDate.format('YYYYMMDD') && this.allData[index][i].date < endDate.format('YYYYMMDD')){
                let ave = this.getSevenDayDataByStateAndDate(index, this.allData[index][i].date);
                let dateArray = this.allData[index][i].date.toString().split('');
                let year = (dateArray[0]+dateArray[1]+dateArray[2]+dateArray[3]).toString();
                let month = (dateArray[4]+dateArray[5]).toString();
                let day = (dateArray[6]+dateArray[7]).toString();
                let stringDate = year + '-' + month + '-' + day;
                let dataDate = moment(stringDate).format('l');
                let dateIndex = this.sevenDayData.findIndex(obj => obj.date === dataDate);
                let currentState = this.allData[index][i].state.toLowerCase();
                if(dateIndex === -1){
                    let newObj = {
                        date: dataDate,
                    }
                    newObj[currentState] = Math.round(ave);
                    this.sevenDayData = [...this.sevenDayData, newObj];
                } else {
                    this.sevenDayData[dateIndex][currentState] = Math.round(ave);
                }
            }
        }
        this.sevenDayData = this.sevenDayData.sort((a,b) => {
            return moment(a.date) - moment(b.date)
        })
    }

    getSevenDayDataByStateAndDate(index, date) {
        let dataToAverage = [];
        for(let i = 0; i<this.allData[index].length; i++){
            if(this.allData[index][i].date <= date && this.allData[index][i].date >= (date - 6)) {
                dataToAverage = [...dataToAverage, this.allData[index][i].positiveCasesViral]
            }
        }
        return this.averageValue(dataToAverage);
    }

    averageValue(nums) {
        return nums.reduce((a, b) => (a + b)) / nums.length
    }

    async getIndividualStateData(individualState) {
       let result = await svc.getStateSummaryData(individualState);
       this.updateAllData(result);
       return result;
    }

    
}