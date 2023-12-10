import PageTitle from '../../components/PageTitle';
import { Card, Flex, Button } from 'antd';

function AdminMainPage() {
  return (
    <>
      <PageTitle title="대시보드" />
      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Flex gap="small" wrap="wrap">
        {/* src > index.css > .ant-btn참고 / 기본 색상 변경함 */}
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
    </>
  );
}

export default AdminMainPage;
