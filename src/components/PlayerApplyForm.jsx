import { Button, DatePicker, Flex, Form, Input, Radio, Space } from "antd";
import { useEffect, useState } from "react";

// Submit 버튼 활성화 <- 모든 validation 조건 충족시
const SubmitButton = ({ form, onClick }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      onClick={() => onClick()}
      disabled={!submittable}
    >
      Submit
    </Button>
  );
};

const PlayerApplyForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  // Form 제출시
  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    onSubmit({
      ...values,
      applicationTargetDate: values.applicationTargetDate.format("YYYY-MM-DD"),
    });
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="신청할 날짜"
        name="applicationTargetDate"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="신청 구분"
        name="applicationType"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Radio.Group>
          <Radio value="조퇴">조퇴</Radio>
          <Radio value="외출">외출</Radio>
          <Radio value="공결">공결</Radio>
          <Radio value="휴가">휴가</Radio>
          {/* <Radio value="출석정정">출석 정정</Radio>
          <Radio value="발급">확인서/출석부 발급</Radio> */}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        hasFeedback
        label="사유"
        name="applicationReason"
        validateDebounce={1000}
        rules={[
          {
            min: 10,
          },
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={4} placeholder="사유를 입력하세요..." />
      </Form.Item>
      <Form.Item>
        <Flex justify="center">
          <Space>
            <SubmitButton form={form} onClick={handleSubmit} />
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default PlayerApplyForm;
