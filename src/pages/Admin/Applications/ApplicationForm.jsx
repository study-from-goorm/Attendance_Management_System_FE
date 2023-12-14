import { Form, Button, Space, Descriptions, Tag } from "antd";
import { statusToColor } from "../../../utils";

function ApplicationForm({ onSubmit, inputData }) {
  const {
    applicationDate,
    applicationTargetDate,
    courseName,
    playerName,
    applicationType,
    applicationStatus,
    applicationReason,
  } = inputData;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values, onFinish);
  };

  const handleSubmit = (statusValue) => {
    form.setFieldsValue({ applicationStatus: statusValue });
    form.submit();
  };

  const borderedItems = [
    {
      key: "1",
      label: "신청날짜",
      children: `${applicationDate}`,
    },
    {
      key: "2",
      label: "적용날짜",
      children: `${applicationTargetDate}`,
    },
    {
      key: "3",
      label: "과정",
      children: `${courseName}`,
    },
    {
      key: "4",
      label: "이름",
      children: `${playerName}`,
    },
    {
      key: "5",
      label: "신청타입",
      children: `${applicationType}`,
    },
    {
      key: "6",
      label: "신청상태",
      children: (
        <Tag color={statusToColor(applicationStatus)}>{applicationStatus}</Tag>
      ),
    },
    {
      key: "7",
      label: "사유",
      children: <p className="">{applicationReason}</p>,
    },
  ];

  return (
    <>
      <Descriptions
        bordered
        items={borderedItems}
        column={2}
        contentStyle={{
          maxHeight: "100px",
          overflow: "scroll",
        }}
        labelStyle={{
          width: "100px",
          textAlign: "center",
        }}
        className="mt-6"
      />
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          applicationStatus: applicationStatus,
        }}
      >
        <Form.Item name="applicationStatus">
          <input value={applicationStatus} hidden />
        </Form.Item>
        <Space className="flex justify-center">
          <Button className="success" onClick={() => handleSubmit("승인")}>
            승인하기
          </Button>
          <Button type="primary" danger onClick={() => handleSubmit("거절")}>
            거절하기
          </Button>
        </Space>
      </Form>
    </>
  );
}

export default ApplicationForm;
