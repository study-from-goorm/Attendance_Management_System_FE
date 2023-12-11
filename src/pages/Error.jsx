import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();
  console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', error);
  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!111';
    message = 'Could not find resource or page.';
  }

  if (error.status === 422) {
    message = error.data.message;
  }

  return (
    <>
      {/* nav bar 추가예정 */}
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
