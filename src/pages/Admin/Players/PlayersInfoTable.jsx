import { Button, Card, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

function PlayersInfoTable({ players, queryString, handleDeletePlayer }) {
  const columns = [
    {
      title: '이름',
      dataIndex: 'playerName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.playerName.localeCompare(b.playerName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '이메일',
      dataIndex: 'playerEmail',
    },
    {
      title: '과정',
      dataIndex: 'courseName',
      render: (courseName) => <Tag>{courseName}</Tag>,
    },
    {
      render: (record) => (
        <Space size="middle">
          <Link
            to={`/admin/players/${record.key}/edit${queryString}`}
            className="text-xs hover:text-primary-color"
          >
            수정하기
          </Link>
          <Button
            type="text"
            onClick={() => handleDeletePlayer(record.key, record.playerName)}
            className="text-xs"
          >
            삭제하기
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={players} />
    </Card>
  );
}

export default PlayersInfoTable;
