import React from 'react';
import Gantt from 'frappe-gantt';

import '../styles/gantt.scss'
const tasks = [
  {
    id: 'Task 1',
    name: 'Redesign website',
    start: '2022-01-01',
    end: '2022-01-05',
    progress: 20,
    dependencies: ''
  },
  {
    id: 'Task 2',
    name: 'Develop new features',
    start: '2022-01-06',
    end: '2022-01-10',
    progress: 0,
    dependencies: 'Task 1'
  }
];

class GanttChart extends React.Component {
  componentDidMount() {
    this.gantt = new Gantt(this.ganttContainer, tasks);
  }

  render() {
    return (
      <div>
        <h2>Gantt Chart</h2>
        <div ref={node => (this.ganttContainer = node)} />
      </div>
    );
  }
}

export default GanttChart;