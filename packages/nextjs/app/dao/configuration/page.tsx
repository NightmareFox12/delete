'use server';

import { NextPage } from 'next';
import { ModalAdmin } from './_components/AdminModal';

const ConfigurationPage: NextPage = async () => {
  return (
    <section>
      <ModalAdmin />
    </section>
  );
};

export default ConfigurationPage;
