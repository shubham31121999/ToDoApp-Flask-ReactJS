
import PropTypes from 'prop-types';

function TodoStats({ stats }) {
  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div>
      <h2>Stats</h2>
      <p>Total Todos: {stats.total || 0}</p>
      <p>Completed Todos: {stats.completed || 0}</p>
      <p>Completion Rate: {stats.completionRate ? stats.completionRate.toFixed(2) : 0}%</p>
    </div>
  );
}

TodoStats.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number,
    completed: PropTypes.number,
    completionRate: PropTypes.number
  })
};

TodoStats.defaultProps = {
  stats: {
    total: 0,
    completed: 0,
    completionRate: 0
  }
};

export default TodoStats;
