import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'

export default class Graphs extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        let results = localStorage.getItem('results')
        if (results) {
            results = JSON.parse(results)
        } else {
            results = []
        }
        const data = [
            { try: 'F', times: 0 },
            { try: '1', times: 0 },
            { try: '2', times: 0 },
            { try: '3', times: 0 },
            { try: '4', times: 0 },
            { try: '5', times: 0 },
            { try: '6', times: 0 },
        ]
        results.forEach((result, index) => {
            let { tries } = result
            if (tries === -1) {
                let times = data[0].times
                times = times + 1
                data[0].times = times
            } else {
                let times = data[tries].times
                times = times + 1
                data[tries].times = times
            }
        })

        this.setState({
            data: data,
        })
    }

    render() {
        const { data: chartData } = this.state

        return (
            <Paper>
                <Chart data={chartData} width={300} height={300}>
                    <ArgumentAxis />
                    <ValueAxis max={100} />

                    <BarSeries
                        color='#0cce6b'
                        valueField='times'
                        argumentField='try'
                    />
                    <Title text='Guess Concentration' />

                    <Animation />
                </Chart>
            </Paper>
        )
    }
}
