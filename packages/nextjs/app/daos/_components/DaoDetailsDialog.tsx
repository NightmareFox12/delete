import { Image, Info } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { useScaffoldEventHistory } from '~~/hooks/scaffold-stark/useScaffoldEventHistory';
import { UserJoinedEvent } from '~~/types/events.types';

type DaoDetailsDialogProps = {
  daoID: bigint;
  daoAddress: string;
  name: string;
  description: string;
  imageUri: string;
  creationDate: bigint;
};

export const DaoDetailsDialog: React.FC<DaoDetailsDialogProps> = ({
  daoID,
  daoAddress,
  name,
  description,
  imageUri,
  creationDate,
}) => {
  //refs
  const dialogRef = useRef<HTMLDialogElement>(null);

  //const
  const parsedDate = new Date(parseInt((creationDate * 1000n).toString()))
    .toISOString()
    .split('T')[0];

  //Smart contract
  const {
    data: userJoined,
    isLoading: isLoadingEvents,
  } = useScaffoldEventHistory({
    contractName: 'AgoraDao',
    eventName: 'UserJoined',
    contractAddress: daoAddress,
    fromBlock: 0n,
    watch: true,
    blockData: true,
    transactionData: true,
    receiptData: true,
  });

  //TODO: agregar tabla de eventos con un tab para (unidos,votaciones o mas cosas)

  //memos
  const userJoinedArr = useMemo(() => {
    if (!userJoined || userJoined.length === 0 || isLoadingEvents) return [];

    const data: UserJoinedEvent[] = [];
    userJoined.map((x) => data.push(x as unknown as UserJoinedEvent));

    return data;
  }, [isLoadingEvents, userJoined]);

  console.log(userJoined)
  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className='btn btn-accent p-3'
      >
        <Info className='w-4 h-4' />
      </button>
      <dialog ref={dialogRef} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>{name} Details</h3>
          <p className=''>{description}</p>
          <div className='flex justify-between'>
            <span className='text-sm text-base-content/70'>
              Created on: <span className='font-semibold'>{parsedDate}</span>
            </span>
            <div className='badge badge-neutral font-semibold text-[12px]'>
              ID #{daoID}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center mt-2'>
            {imageUri.length > 4 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://ipfs.io/ipfs/${imageUri}`}
                alt={name}
                className='object-cover w-32 h-32'
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image className='w-12 h-12' />
            )}
            <span className='text-sm text-muted-foreground'>Logo</span>
          </div>

          <div className='overflow-x-auto'>
            <table className='table'>
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>User</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {userJoinedArr.map((x, y) => (
                  <tr key={y} className='bg-base-200'>
                    <th></th>
                    <td>{x.args.user.toString()}</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  );

  // return (
  //   <Dialog>

  //     <DialogContent>
  //       <DialogHeader className="sm:max-w-md">
  //         <DialogTitle>{name} Details</DialogTitle>
  //         <DialogDescription className="break-all overflow-ellipsis">{description}</DialogDescription>
  //       </DialogHeader>

  //       <div className="sm:max-w-md flex justify-between">
  //         <span className="text-sm text-muted-foreground">Created on: {parsedDate}</span>
  //         <Badge>ID #{daoID}</Badge>
  //       </div>

  //       <div className="sm:max-w-md flex flex-col justify-center items-center">
  //         {imageUri.length > 4 ? (
  //           // eslint-disable-next-line @next/next/no-img-element
  //           <img src={`https://ipfs.io/ipfs/${imageUri}`} alt={name} className="object-cover w-32 h-32" />
  //         ) : (
  //           // eslint-disable-next-line jsx-a11y/alt-text
  //           <Image className="w-12 h-12" />
  //         )}
  //         <span className="text-sm text-muted-foreground">Logo</span>
  //       </div>

  //       {isLoadingEvents ? (
  //         <Skeleton className="sm:max-w-md h-24" />
  //       ) : (
  //         <div className="sm:max-w-md flex justify-center items-center flex-col">
  //           <Tabs defaultValue="users-joined" className="w-full">
  //             <TabsList className="w-full flex justify-center items-center">
  //               <TabsTrigger className="flex-1" value="users-joined">
  //                 User Joined
  //               </TabsTrigger>
  //               <TabsTrigger className="flex-1" value="password">
  //                 Password
  //               </TabsTrigger>
  //             </TabsList>
  //             <TabsContent value="users-joined">
  //               <ScrollArea className="w-[300px] sm:w-full">
  //                 <UserJoinedTable data={userJoinedArr.slice(0, 4)} />
  //                 <ScrollBar orientation="horizontal" />
  //               </ScrollArea>
  //             </TabsContent>
  //             <TabsContent value="password">Change your password here.</TabsContent>
  //           </Tabs>
  //         </div>
  //       )}
  //     </DialogContent>
  //   </Dialog>
  // );
};
