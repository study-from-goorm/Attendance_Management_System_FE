import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Select,
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  InputNumber,
} from "antd";
import moment from "moment";
import { useSearchParams, useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

function CourseForm({ onSubmit, inputData }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/admin/courses");
  };

  const onFinish = (values) => {
    const [start, finish] = values.dateRange;
    const formattedValues = {
      ...values,
      startDate: start.format("YYYY-MM-DD"),
      finishDate: finish.format("YYYY-MM-DD"),
    };
    delete formattedValues.dateRange; // 필요하지 않은 dateRange 속성 제거

    onSubmit(formattedValues);
  };

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 13,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        courseName: inputData?.courseName,
        unitPeriod: inputData?.unitPeriod,
        dateRange: inputData
          ? [dayjs(inputData?.startDate), dayjs(inputData?.finishDate)]
          : [],
      }}
      onFinish={onFinish}
      autoComplete="off"
      className=" mt-6 mb-0"
    >
      <Form.Item
        label="과정명"
        name="courseName"
        rules={[
          {
            required: true,
            message: "과정명을 반드시 입력해 주세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="과정 기간"
        name="dateRange"
        rules={[{ required: true, message: "과정 기간를 선택해 주세요." }]}
      >
        <RangePicker />
      </Form.Item>
      <Form.Item
        label="단위 기간"
        name="unitPeriod"
        rules={[{ required: true, message: "단위 기간를 입력해 주세요." }]}
      >
        <InputNumber addonAfter="단위" min={0} max={10} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 12,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            {inputData ? "수정하기" : "등록하기"}
          </Button>
          <Button onClick={handleNavigate}>돌아가기</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default CourseForm;
