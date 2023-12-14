import { Select, Form, Input, Button, Space } from "antd";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function PlayerForm({ inputData, onSubmit, courses, searchedCourse }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [passwordValue, setPasswordValue] = useState("");

  const onFinish = (values) => {
    onSubmit(
      inputData
        ? {
            ...values,
          }
        : {
            ...values,
            courseId: parseInt(values?.courseId, 10),
            courseName: selectedCourse?.label,
          },
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCourseChange = (value, option) => {
    setSelectedCourse({ value, label: option.label });
  };

  const handleNavigate = () => {
    const currentCourse = searchParams.get("course");
    const queryString = currentCourse ? `?course=${currentCourse}` : "";

    navigate(`/admin/players${queryString}`);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
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
        courseId: searchedCourse ? parseInt(searchedCourse) : null,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className=" mt-6 mb-0"
    >
      {inputData?.courseName ? (
        <Form.Item label="과정">
          <Input defaultValue={inputData?.courseName} disabled />
        </Form.Item>
      ) : (
        <Form.Item
          label="과정"
          name="courseId"
          rules={[
            {
              required: true,
              message: "과정을 반드시 선택해 주세요.",
            },
          ]}
        >
          <Select
            style={{ width: 240 }}
            options={courses}
            onChange={handleCourseChange}
            allowClear
            placeholder="과정을 선택해 주세요."
          />
        </Form.Item>
      )}
      {inputData?.playerName ? (
        <Form.Item label="플레이어 이름">
          <Input defaultValue={inputData?.playerName} disabled />
        </Form.Item>
      ) : (
        <Form.Item
          label="플레이어 이름"
          name="playerName"
          rules={[
            {
              required: true,
              message: "플레이어 이름을 입력해 주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      {inputData?.playerEmail ? (
        <Form.Item label="플레이어 이메일">
          <Input defaultValue={inputData?.playerEmail} disabled />
        </Form.Item>
      ) : (
        <Form.Item
          label="플레이어 이메일"
          name="playerEmail"
          rules={[
            {
              required: true,
              message: "플레이어 이메일을 입력해 주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        label="비밀번호"
        name="playerPassword"
        rules={
          inputData
            ? null
            : [
                {
                  required: true,
                  message: "플레이어 비밀번호를 설정해 주세요.",
                },
              ]
        }
      >
        <Input.Password onChange={inputData ? handlePasswordChange : null} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 12,
        }}
      >
        <Space>
          {inputData && passwordValue && (
            <Button type="primary" htmlType="submit">
              수정하기
            </Button>
          )}
          {!inputData && (
            <Button type="primary" htmlType="submit">
              등록하기
            </Button>
          )}
          <Button onClick={handleNavigate}>돌아가기</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default PlayerForm;
