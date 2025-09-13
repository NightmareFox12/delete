'use client';

import { useScaffoldReadContract } from '~~/hooks/scaffold-stark/useScaffoldReadContract';
import { useAccount } from '~~/hooks/useAccount';

export const ModalAdmin: React.FC = () => {
  const { isConnected } = useAccount();

  //Smart contract
  const {} = useScaffoldReadContract({
    contractName: 'AgoraDao',
    functionName: 'is_user',
  });

  return (
    <dialog open={!isConnected} className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Hello!</h3>
        <p className='py-4'>Press ESC key or click outside to close</p>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};
