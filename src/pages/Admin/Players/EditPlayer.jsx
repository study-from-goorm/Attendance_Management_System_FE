import { Modal } from "antd";
import PageTitle from "../../../components/PageTitle";
import {
  useNavigate,
  useSearchParams,
  useLoaderData,
  useSubmit,
  redirect,
} from "react-router-dom";
import {
  fetchPlayer,
  queryClient,
  updatePlayer,
} from "../../../api/requestApi";
import PlayerForm from "./PlayerForm";

function EditPlayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchedCourse = searchParams.get("course");
  const queryString = searchedCourse ? `?course=${searchedCourse}` : "";
  const player = useLoaderData();
  const submit = useSubmit();

  const handleCancel = () => {
    navigate(`/admin/players${queryString}`);
  };

  const handleSubmit = (formData) => {
    submit(formData, { method: "PATCH" });
  };

  return (
    <Modal open={true} onCancel={handleCancel} footer={null}>
      <PageTitle title="플레이어 수정" />
      <PlayerForm inputData={player} onSubmit={handleSubmit} />
    </Modal>
  );
}

export default EditPlayer;

export async function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["players", { playerId: params.id }],
    queryFn: ({ signal }) => fetchPlayer({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData);

  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const courseId = queryParams.get("course");

  // await updatePlayer({ id: params.id, playerData: updatedData });
  // await queryClient.invalidateQueries(['playuers']);
  return redirect(`/admin/players${courseId ? `?course=${courseId}` : ""}`);
}
