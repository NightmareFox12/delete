'use server';

import { NextPage } from 'next';
import { Nose } from './_components/nose';
import { TaskGrid } from './_components/TaskGrid';

const TaskPage: NextPage = async () => {
  return (
    <section>
      <Nose />
      <TaskGrid />
    </section>
  );
};

export default TaskPage;
