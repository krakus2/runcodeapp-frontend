import { compose, withHandlers, lifecycle } from "recompose";
import axios from "axios";

const withTasks = compose(
  withHandlers({
    onTaskClick: ({ history }) => task_id => async () =>
      history.push(`/task?task_id=${task_id}`)
  }),
  lifecycle({
    async componentDidMount() {
      this.setState({ loading: true });
      const res = await axios.get("/api/tests");
      this.setState({ tasks: res.data, loading: false });
    }
  })
);

export default withTasks;
