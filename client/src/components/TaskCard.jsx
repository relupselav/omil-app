import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function TaskCard({ tasks, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="bg-white shadow-md rounded-3xl px-6 py-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-800">No Tasks</h1>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-md rounded-3xl pl-6 pr-4 py-4 mb-6"
        >
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {task.title}
            </h1>
            <p className="text-gray-600 mt-2">{task.desc}</p>
          </div>
          <div className="pt-4 flex justify-between items-center">
            <p className="text-gray-600">
              {dayjs(task.date).utc().format("DD/MM/YYYY")}
            </p>
            <div className="flex items-center">
              <Link
                to={`/tasks/${task._id}`}
                className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-l-3xl"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(task)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-r-3xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

TaskCard.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      desc: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TaskCard;
