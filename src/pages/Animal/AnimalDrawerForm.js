import React, { useState } from 'react';
import { Drawer, Input, Col, Select, Form, Row, Button, DatePicker, Spin } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { addNewAnimal } from "../../api/animal";
import { LoadingOutlined } from "@ant-design/icons";
import { successNotification } from "./Notification";

const { Option } = Select;

const antIcon = (<LoadingOutlined style={{ fontSize: 24, }} spin />
);

function AnimalDrawerForm({ showDrawer, setShowDrawer, fetchAndRenderAnimals }) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = animal => {
        setSubmitting(true)
        if (animal.inTesyDate){
            animal.inTesyDate = animal.inTesyDate.format("YYYY-MM-DD")
        }
        addNewAnimal(animal)
            .then(() => {
                onCLose();
                successNotification("Eläin lisätty")
                fetchAndRenderAnimals();
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setSubmitting(false);
            })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Lisää uusi eläin"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
        >
            {/*animal name and animal type -------------------------------------------*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="species"
                        label="laji"
                        rules={[{ required: true, message: 'kirjoita tähän animalAge' }]}
                    >
                        <Input placeholder="kirjoita tähän eläintyyppi" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="callingNameOfTheAnimal"
                        label="Nimi"
                    >
                        <Input placeholder="kirjoita tähän eläimen nimi" />
                    </Form.Item>
                </Col>
            </Row>

            {/*sex and breed-------------------------------------------*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="breedAnimal"
                        label="Rotu"
                    >
                        <Input placeholder="kirjoita tähän eläimen rotu" />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item
                        name="animalAge"
                        label="Ikä"
                    >
                        <Input placeholder="ikä" />
                    </Form.Item>
                </Col>
            </Row>

            {/*color and sitution -------------------------------------------*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="animalColor"
                        label="Väri"
                    >
                        <Input placeholder="kirjoita tähän väri" />
                    </Form.Item>
                </Col>
            </Row>

            {/*  hand over date and arrival date .......................................................................*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="inDate"
                        label="Tulopäivä"
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="inTesyDate"
                        label="Luovutettu Tesylle"
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>

            {/*  hand over date and arrival date and from whom .......................................................................*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="outTesyDate"
                        label="Lähtöpäivä"
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="fromWhere"
                        label="Mistä/keneltä"
                    >
                        <Input placeholder="kirjoita tähän Mistä/keneltä" />
                    </Form.Item>
                </Col>
            </Row>

            {/*  teys no and microchip ------------------------------------------------*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="tesyId"
                        label="TESY No"
                    >
                        <Input placeholder="kirjoita tähän TESY no" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="microchipNumber"
                        label="Sirunro"
                    >
                        <Input placeholder="kirjoita tähän eläimen sirunro" />
                    </Form.Item>
                </Col>
            </Row>

            {/*reason and population -------------------------------------------*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="reason"
                        label="Syy"
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="population"
                        label="populaatio"
                    >
                        <Input placeholder="populaation nimi" />
                    </Form.Item>
                </Col>
            </Row>

            {/*euthanizedReasons and seyStatistics  -------------------------------------------*/}
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="euthanizedReasons"
                        label="Eutanasian syy"
                    >
                        <Input placeholder="kirjoita eutanasian syy" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="seyStatistics"
                        label="sey statistics"
                    >
                        <Input placeholder="sey statistics" />
                    </Form.Item>
                </Col>
            </Row>

            {/*extraNotes  -------------------------------------------*/}
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="extraNotes"
                        label="Huom"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>

            {/* submit button.......................................................................*/}
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default AnimalDrawerForm;
