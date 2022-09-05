import React, {useState, useEffect} from 'react'
import { getTotals, getDailyTotals } from "api/totals"

import { Col, Form, Row, Button, DatePicker, Spin, Empty } from 'antd'
import { Line } from '@ant-design/plots'
import { LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Statistics(){
    const defaultStartDate = () => moment().startOf('isoWeek').subtract('days', 7)
    const defaultEndDate = () => moment().startOf('isoWeek')

    const [totals, setTotals] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [total, setTotal] = useState(0);
    const [startDate, setStartDate] = useState(defaultStartDate());
    const [endDate, setEndDate] = useState(defaultEndDate);

    const defaultDates = {
        startDate: moment(startDate),
        endDate: moment(endDate)
    }

    const fetchTotals = () => {
        //console.log("fetching animal totals")
        let start = moment(startDate).format('yyyy-MM-DD')
        let end = moment(endDate).format('yyyy-MM-DD')
        getTotals(start, end)
        .then(res => {
            //console.log("getTotals: ", res.data)
            setTotal(res.data.totalAnimals)
            renderGraph()
        })
        getDailyTotals(start, end)
        .then(res => {
            //console.log("getDailyTotals: ", res.data)
            setTotals(res.data)
            setFetching(false)
            renderGraph()
        })
    }
    useEffect(() => {
        fetchTotals()
    }, [startDate, endDate])


    const onFinish = query => {
        console.log(query)
        defaultDates.startDate = query.startDate
        defaultDates.endDate = query.endDate

        setStartDate(query.startDate)
        setEndDate(query.endDate)
    }

    const onFinishFailed = errorInfo => {
        //alert(JSON.stringify(errorInfo, null, 2))
    }


    const renderGraph = () => {
        const config = {
            data: totals,
            padding: 'auto',
            xField: 'date',
            yField: 'totalAnimals',
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
            <h2 style={{textAlign: 'center'}}>{total} eläintä otettu sisään</h2>
            <Line {...config}
                title = ''
                style={{ margin: 24, marginBottom: 24, height: 200 }
            }/>
        </div>
    }

    return <div>

        <h2 style={{textAlign: 'center'}}>Eläimiä saapunut {moment(startDate).format('MMM DD')} ja {moment(endDate).format('MMM DD')} Välillä</h2>
        <Form layout="vertical"
            initialValues={defaultDates}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            style={{ margin: 24, marginTop: 24 }}
        >
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="startDate"
                        label="Ensimäinen päivämäärä"
                        rules={[{required: true, message: 'Anna päivämäärä'}]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="endDate"
                        label="Viimeinen päivämäärä"
                        rules={[{required: true, message: 'Anna päivämäärä'}]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 8, marginTop: 30}}>
                            Näytä
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