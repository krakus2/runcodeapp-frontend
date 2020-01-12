import React from "react";
import { compose } from "recompose";

import withContext from "../../context/withContext";
import withTasks from "../../hocs/withTasks";
import { Line, Wrapper } from "../../styles/Tasks";

const Tasks = ({ context, tasks = [], loading = false, onTaskClick }) => (
  <Wrapper isMobile={context.isMobile}>
    <h3>Lista dodanych zadań</h3>
    <ul>
      {loading ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
            margin: "20px 0"
          }}
        >
          Ładowanie trwa...
        </p>
      ) : (
        tasks.map(task_id => (
          <Line key={task_id} onClick={onTaskClick(task_id)}>
            ID Zadania - {task_id}
          </Line>
        ))
      )}
    </ul>
  </Wrapper>
);

export default compose(
  withContext,
  withTasks
)(Tasks);
