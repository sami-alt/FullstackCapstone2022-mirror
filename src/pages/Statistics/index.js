import React, {useState, useEffect} from 'react'
import { getTotals } from "api/totals"

import {Col, Form, Row, Button, DatePicker, Spin, Empty} from 'antd'
import { Line } from '@ant-design/plots'
import {
    LoadingOutlined
} from '@ant-design/icons'
import moment from 'moment'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Statistics(){

    const [totals, setTotals] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [startDate, setStartDate] = useState(moment('2022-07-04'));
    const [endDate, setEndDate] = useState(moment('2022-07-07'));

    // TODO: base on current date
    const defaultDates = {
        startDate: moment(startDate),
        endDate: moment(endDate)
    }

    const makeChartData = all_totals => {
        const chartData = []
        let start = moment(defaultDates.startDate)
        let end = moment(defaultDates.endDate)
        let count = 0;
        while (end.diff(start, 'days') >= 0){
            let totals_per_day = parseFloat(all_totals.total_animals_daily[count].animals_today)
            let data1 = {
                totals_per_day: totals_per_day,
                date: start.format('MMM DD')
            }
            chartData.push(data1)
            start.add(1, 'days')
            count++
        }
        console.log(chartData)
        setData(chartData)
        setTotal(all_totals.total_animals)
    }

    const fetchTotals = () => {
        console.log("fetching animal totals")
        getTotals(1)
        .then(json => {
            console.log("json: ", json)
            makeChartData(json)
            setTotals(json)
            setFetching(false)
        });
    }
    useEffect(() => {
        fetchTotals()
    }, [])


    // TODO: reset to default (last week)
    const onReset = () => {

    }

    const onFinish = query => {
        console.log(query)
        defaultDates.startDate = query.startDate
        defaultDates.endDate = query.endDate
        makeChartData(totals)
        setStartDate(query.startDate)
        setEndDate(query.endDate)
    }

    const onFinishFailed = errorInfo => {
        //alert(JSON.stringify(errorInfo, null, 2))
    }


    const renderGraph = () => {
        const config = {
            data,
            padding: 'auto',
            xField: 'date',
            yField: 'totals_per_day',
            xAxis: {
                // type: 'timeCat',
                tickCount: 5,
              },
          }
        if (fetching) {
            return <Spin indicator={spinIcon} />
        }
        if (totals.length <= 0) {
            return  <Empty />;
        }
        return <div>
            <h2 style={{textAlign: 'center'}}>{total} animals were admitted</h2>
            <Line {...config}
                title = {total}
                style={{ margin: 24, marginBottom: 24, height: 200 }
            }/>
        </div>
    }

    return <div>

        <h2 style={{textAlign: 'center'}}>Newly admitted animals between {moment(startDate).format('MMM DD')} and {moment(endDate).format('MMM DD')}</h2>
        <Form layout="vertical"
            initialValues={defaultDates}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            style={{ margin: 24, marginTop: 24 }}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="startDate"
                        label="Start date"
                        rules={[{required: true, message: 'Please specify the date'}]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="endDate"
                        label="End date"
                        rules={[{required: true, message: 'Please specify the date'}]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button onClick={onReset} style={{marginRight: 8}}>
                            Reset
                        </Button>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 8}}>
                            Show
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>

        <div>
            {renderGraph()}
        </div>

    </div>
}

export default Statistics