import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();
  let title = 'An error occurred!';
  let content = '에러가 발생하였습니다.';

  if (error) {
    content = error.message;
  }

  return (
    <>
      {/* nav bar 추가예정 */}
      <PageContent title={title}>
        <p>{error.message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
