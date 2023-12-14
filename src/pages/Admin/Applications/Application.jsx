import {
  fetchApplication,
  queryClient,
  updateApplication,
} from "../../../api/requestApi";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { Modal } from "antd";
import PageTitle from "../../../components/PageTitle";
import ApplicationForm from "./ApplicationForm";

function Application() {
  const application = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();

  const handleCancel = () => {
    navigate("..");
  };

  const handleSubmit = (formData) => {
    submit(formData, { method: "PATCH" });
  };

  return (
    <Modal open={true} onCancel={handleCancel} footer={null}>
      <PageTitle title="신청서" />
      <ApplicationForm onSubmit={handleSubmit} inputData={application} />
    </Modal>
  );
}

export default Application;

export async function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["admin-applications", { applicationId: params.applicationId }],
    queryFn: ({ signal }) =>
      fetchApplication({ signal, id: params.applicationId }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData);

  await updateApplication({
    id: params.applicationId,
    applicationData: updatedData,
  });
  await queryClient.invalidateQueries("admin-applications");
  return redirect("/admin/applications");
}
