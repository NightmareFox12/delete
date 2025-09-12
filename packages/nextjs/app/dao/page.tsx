'use server';

import { NextPage } from 'next';
import { Nose } from './_components/nose';
import { TaskGrid } from './_components/TaskGrid';

const TaskPage: NextPage = async () => {
  return (
    <div>
      <Nose />
      <TaskGrid />
    </div>
  );
};

export default TaskPage;
