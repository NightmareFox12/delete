'use server';
import { NextPage } from 'next';
import { Nose } from './_components/nose';

const TaskPage: NextPage = async () => {
  return (
    <div>
      <Nose />
    </div>
  );
};

export default TaskPage;
