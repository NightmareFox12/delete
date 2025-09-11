'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Check,
  CircleQuestionMarkIcon,
  Info,
  Loader,
  Plus,
  Rocket,
  Trash,
  Upload,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import RotatingText from '~~/components/ui/RotatingText';
import { useBreakpoint } from '~~/hooks/useBreakpoint';
import { useScaffoldWriteContract } from '~~/hooks/scaffold-stark/useScaffoldWriteContract';
import { DaoFormSchema } from '~~/libs/schemas/dao.schema';
import toast from 'react-hot-toast';
import { useScaffoldReadContract } from '~~/hooks/scaffold-stark/useScaffoldReadContract';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~~/components/ui/shadcn/dialog";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "~~/components/ui/shadcn/form";
// import { Input } from "~~/components/ui/shadcn/input";
// import { Label } from "~~/components/ui/shadcn/label";
// import { Progress } from "~~/components/ui/shadcn/progress";
// import { ScrollArea } from "~~/components/ui/shadcn/scroll-area";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~~/components/ui/shadcn/select";
// import { Skeleton } from "~~/components/ui/shadcn/skeleton";
// import { Switch } from "~~/components/ui/shadcn/switch";
// import { Textarea } from "~~/components/ui/shadcn/textarea";
// import { Tooltip, TooltipContent, TooltipTrigger } from "~~/components/ui/shadcn/tooltip";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// import { useBreakpoint } from "~~/hooks/useBreakpoint";
// import { DaoFormSchema } from "~~/lib/schemes/dao.scheme";

export const CreateDaoDialog: React.FC = () => {
  const { isMd } = useBreakpoint();

  //states
  const [loadImage, setLoadImage] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // Form
  const daoForm = useForm<z.infer<typeof DaoFormSchema>>({
    resolver: zodResolver(DaoFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      categories: undefined,
      logo: undefined,
      isPublic: true,
    },
  });

  //Subscriptions
  const {
    name: nameWatch,
    description: descriptionWatch,
    categories: categoriesWatch,
    isPublic: isPublicWatch,
    logo: logoWatch,
  } = daoForm.watch();

  //Smart contract
  // const { writeContractAsync: writeAgoraDaoFabricAsync } = useScaffoldWriteContract({ contractName: "AgoraDaoFabric" });

  const { data: daoCategories, isLoading: daoCategoriesLoading } =
    useScaffoldReadContract({
      contractName: 'AgoraDaoFabric',
      functionName: 'get_all_categories',
    });

  //effects
  useEffect(() => {
    if (!loadImage) return;
    setProgress(0);
    daoForm.setValue('logo', undefined);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        return next >= 100 ? 100 : next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [daoForm, loadImage]);

  //functions
  const isUploadFormImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoadImage(true);
    const file = e.target.files?.[0];
    if (!file) {
      setLoadImage(false);
      return;
    }

    setLoadImage(false);

    if (file.size >= 1024 * 1024) {
      daoForm.setError('logo', { message: 'The image is greater than 1MB' });
      return undefined;
    }

    daoForm.clearErrors('logo');
    return file;
  };

  const onSubmit = async (data: z.infer<typeof DaoFormSchema>) => {
    try {
      setSubmitLoading(true);
      console.log(data);
      // let res: { response: string; cid: string } | undefined;
      // if (data.logo) {
      //   const formData = new FormData();
      //   formData.append('name', data.name);
      //   formData.append('logo', data.logo);

      //   const req = await fetch('/api/upload-image', {
      //     method: 'POST',
      //     body: formData,
      //   });

      //   res = await req.json();
      //   console.log(res);

      //   if (!req.ok) return toast.error(res!.response);
      // }

      // await writeAgoraDaoFabricAsync({
      //   functionName: "createDao",
      //   args: [data.name, data.description, BigInt(data.categories), res?.cid || "", data.isPublic],
      // });
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  //TODO: pinnata eliminacion tambien,si el usuario rechaza la metamask
  //TODO: luego de la imagen conectar la creacion con el smart contract
  //TODO: Poner filtros al buscador como por ejemplo daos creadas por ti
  //TODO: inventarme la de la vaina de acceso para daos privadas
  //TODO: en el header poner el nombre de mi dao actual. Tambien que puedas customizar el color del header de mi dao... o mejor dicho, el color primario (o agregar a premium)

  return (
    <>
      {/* Button Modal */}
      <div className='flex justify-center p-3'>
        <button
          className='btn btn-accent'
          onClick={() => {
            const myModal = document.getElementById(
              'create_dao_modal'
            ) as HTMLDialogElement;
            if (!myModal) return;
            myModal.showModal();
          }}
        >
          <Plus className='w-4 h-4' />

          <RotatingText
            texts={[
              'Create DAO',
              'Launch DAO',
              'Descentralize Now',
              'Start DAO',
            ]}
            mainClassName='px-2 sm:px-2 md:px-3 overflow-hidden  justify-center rounded-lg'
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
            elementLevelClassName='text-primary-foreground'
            transition={{ type: 'tween', damping: 30, stiffness: 400 }}
            rotationInterval={5000}
          />
        </button>
      </div>

      <dialog id='create_dao_modal' className='modal'>
        <div className='modal-box sm:w-6/12 sm:!max-w-3xl md:w-6/12 md:!max-w-5xl max-h-[80dvh] !overflow-y-visible'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              <X className='w-4 h-4' />
            </button>
          </form>
          <h3 className='font-bold text-lg'>⚒️ Create your DAO!</h3>
          <p className='text-sm text-base-content/60'>
            Once you have completed all the required fields press the
            &quot;Launch DAO&quot; button.
          </p>

          <form
            onSubmit={daoForm.handleSubmit(onSubmit)}
            autoComplete='off'
            autoCapitalize='sentences'
            className='space-y-4 px-1'
          >
            {/* name */}
            <fieldset className='fieldset'>
              <legend className='fieldset-legend text-[13px]'>
                Name
                <span className='-ml-1 text-error font-bold text-bold'>*</span>
              </legend>
              <input
                {...daoForm.register('name')}
                className='input w-full bg-base-300'
                placeholder='e.g. Governance Stark'
              />
              <div className='flex justify-between'>
                {daoForm.formState.errors.name ? (
                  <p className='label text-error my-0'>
                    {daoForm.formState.errors.name.message}
                  </p>
                ) : (
                  <span />
                )}

                <p className='label my-0'>{nameWatch?.length ?? 0}/30</p>
              </div>
            </fieldset>

            {/* description */}
            <fieldset className='fieldset'>
              <legend className='fieldset-legend text-[13px]'>
                Description
                <span className='-ml-1 text-error font-bold text-bold'>*</span>
              </legend>
              <textarea
                {...daoForm.register('description')}
                className='textarea resize-none h-28 bg-base-200 w-full'
                placeholder='e.g. A decentralized organization that enables transparent decision-making, in which users actively participate in the financing and management of community-driven projects.'
              />
              <div className='flex justify-between'>
                {daoForm.formState.errors.description ? (
                  <p className='label text-error my-0'>
                    {daoForm.formState.errors.description.message}
                  </p>
                ) : (
                  <span />
                )}

                <p className='label my-0'>
                  {descriptionWatch?.length ?? 0}/300
                </p>
              </div>
            </fieldset>

            {/* categories */}
            {daoCategoriesLoading || daoCategories === undefined ? (
              <div className='h-10 w-full skeleton bg-primary' />
            ) : (
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>
                  Categories
                  <span className='-ml-1 text-error font-bold text-bold'>
                    *
                  </span>
                </legend>
                <select
                  defaultValue=''
                  value={categoriesWatch ?? ''}
                  {...daoForm.register('categories')}
                  className='select w-full'
                >
                  <option disabled={true}>Pick a category</option>
                  {daoCategories.map((x, y) => (
                    <option key={y} value={y.toString()}>
                      {x.toString()}
                    </option>
                  ))}
                </select>
                <span className='label text-error my-0'>Optional</span>
              </fieldset>
            )}

            {/* logo */}
            <fieldset className='fieldset'>
              <legend className='fieldset-legend w-full ml-2'>
                <article className='w-full flex justify-between items-center'>
                  <p>Logo</p>

                  <div
                    className='tooltip tooltip-left'
                    data-tip='Choose the logo that your DAO will represent. This field is optional and can be modified later.'
                  >
                    <button className='btn btn-sm btn-ghost rounded-full'>
                      <CircleQuestionMarkIcon className='w-4 h-4' />
                    </button>
                  </div>
                </article>
              </legend>
              <div className='relative h-60 bg-accent rounded-lg flex flex-col items-center justify-center overflow-hidden mx-1 border'>
                <input
                  type='file'
                  onClick={(e) => (e.currentTarget.value = '')}
                  onChange={async (e) => {
                    const file = await isUploadFormImage(e);
                    if (file !== undefined) daoForm.setValue('logo', file);
                  }}
                  disabled={submitLoading}
                  accept='.jpeg,.png,.jpg'
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
                />

                {logoWatch !== undefined ? (
                  <div className='relative w-full h-auto overflow-hidden'>
                    {
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={URL.createObjectURL(logoWatch)}
                        alt='logo DAO'
                        className='w-full h-auto object-cover block z-10'
                        style={{ position: 'relative' }}
                      />
                    }

                    {/* Button */}
                    <div className='absolute top-0 right-0.5 z-30'>
                      <button
                        type='button'
                        onClick={() => {
                          daoForm.setValue('logo', undefined);
                        }}
                        disabled={submitLoading}
                        className='btn btn-error text-primary-content rounded-full p-3'
                      >
                        <Trash className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                ) : !loadImage ? (
                  <div
                    className={`absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10 ${daoForm.formState.errors.logo ? 'text-error' : ''}`}
                  >
                    <Upload className='w-10 h-10' />
                    <p className='my-0 font-semibold'>
                      Choose or drag an image
                    </p>
                    <span className='font-semibold'>
                      The image must be less than 1 MB
                    </span>
                    <span className='text-center text-sm'>
                      It is recommended that the appearance of the image be
                      100x100
                    </span>
                  </div>
                ) : (
                  <div className='w-full h-full px-4 flex justify-center items-center'>
                    {/* <Progress value={progress} /> */}
                  </div>
                )}
              </div>

              {daoForm.formState.errors.logo ? (
                <p className='label my-0 text-error ml-2'>
                  {daoForm.formState.errors.logo.message}
                </p>
              ) : (
                <p className='label my-0 ml-2'>Optional</p>
              )}
            </fieldset>

            {/* Is Public */}
            <fieldset className='fieldset'>
              <legend className='fieldset-legend w-full'>
                <article className='w-full flex justify-between items-center'>
                  <div className='flex gap-2'>
                    <p className='m-0'> DAO Visibility</p>
                    <span className='text-error font-bold text-bold'>*</span>
                  </div>
                  <div
                    className='tooltip tooltip-left'
                    data-tip='In any public DAO, anyone can join and help the growth of the
                community. A private DAO can only join those users who have the
                link (private DAO will not appear in the search engine)'
                  >
                    <button className='btn btn-sm btn-ghost rounded-full'>
                      <CircleQuestionMarkIcon className='w-4 h-4' />
                    </button>
                  </div>
                </article>
              </legend>
              <div className='flex justify-center gap-2 items-center'>
                <p className='m-0 text-sm font-semibold'>
                  {isPublicWatch ? 'Public' : 'Private'} DAO
                </p>
                <input
                  type='checkbox'
                  defaultChecked
                  checked={isPublicWatch}
                  onChange={(e) =>
                    daoForm.setValue('isPublic', e.currentTarget.checked)
                  }
                  className='toggle'
                />
              </div>
              <span className='label text-error my-0'>Optional</span>
            </fieldset>

            {/* Action Buttons */}
            <div className='modal-action justify-center'>
              <div>
                <button
                  type='button'
                  onClick={() => daoForm.reset()}
                  disabled={submitLoading}
                  className='btn btn-error mr-6'
                >
                  <Trash className='w-4 h-4' />
                  Clear all
                </button>

                <button
                  type='submit'
                  disabled={
                    // daoCategoriesLoading ||
                    submitLoading || !daoForm.formState.isValid
                  }
                  className='btn btn-accent'
                >
                  <Rocket className='w-4 h-4' /> Launch DAO
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );

  // return (
  //   <Dialog>

  //     <DialogContent className='p-3'>
  //       <ScrollArea className='h-[500px] p-1 px-1 mt-2.5'>
  //         <DialogHeader>
  //           <DialogTitle>Create your DAO!</DialogTitle>
  //           <DialogDescription>
  //             Once you have completed all the required fields press the
  //             &quot;Launch DAO&quot; button.
  //           </DialogDescription>
  //         </DialogHeader>

  //         <Form {...daoForm}>
  //           <form
  //             onSubmit={daoForm.handleSubmit(onSubmit)}
  //             autoComplete='off'
  //             autoCapitalize='sentences'
  //             className='space-y-4 px-1'
  //           >
  //             {/* Name */}
  //             <FormField
  //               control={daoForm.control}
  //               name='name'
  //               disabled={submitLoading}
  //               render={({ field, fieldState }) => (
  //                 <FormItem>
  //                   <FormLabel>
  //                     Name{' '}
  //                     <span className='text-destructive font-bold text-bold'>
  //                       *
  //                     </span>
  //                   </FormLabel>
  //                   <FormControl>
  //                     <Input placeholder='shadcn' {...field} />
  //                   </FormControl>
  //                   <div className='w-full flex justify-between px-1'>
  //                     {fieldState.error === undefined && <span />}
  //                     <FormMessage className='-my-1' />

  //                     <FormDescription className='-my-1 justify-end'>
  //                       {field.value.length}/30
  //                     </FormDescription>
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />

  //             {/* Description */}
  //             <FormField
  //               control={daoForm.control}
  //               name='description'
  //               disabled={submitLoading}
  //               render={({ field, fieldState }) => (
  //                 <FormItem>
  //                   <FormLabel>
  //                     Description{' '}
  //                     <span className='text-destructive font-bold text-bold'>
  //                       *
  //                     </span>
  //                   </FormLabel>
  //                   <FormControl>
  //                     <Textarea
  //                       placeholder='e.g. Decentralized organization supporting social impact projects'
  //                       className='resize-none h-28'
  //                       {...field}
  //                     />
  //                   </FormControl>
  //                   <div className='w-full flex justify-between px-1'>
  //                     {fieldState.error === undefined && <span />}
  //                     <FormMessage className='-my-1' />

  //                     <FormDescription className='-my-1 justify-end'>
  //                       {field.value.length}/300
  //                     </FormDescription>
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />

  //             {/* Categories */}
  //             {daoCategoriesLoading || daoCategories === undefined ? (
  //               <Skeleton className='h-10 w-full' />
  //             ) : (
  //               <FormField
  //                 control={daoForm.control}
  //                 name='categories'
  //                 disabled={submitLoading}
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>
  //                       Categories{' '}
  //                       <span className='text-destructive font-bold text-bold'>
  //                         *
  //                       </span>
  //                     </FormLabel>
  //                     <Select
  //                       value={field.value}
  //                       onValueChange={field.onChange}
  //                       disabled={submitLoading}
  //                     >
  //                       <FormControl>
  //                         <SelectTrigger className='w-full'>
  //                           <SelectValue placeholder='Choose a category' />
  //                         </SelectTrigger>
  //                       </FormControl>

  //                       <SelectContent>
  //                         {daoCategories.map((x, y) => (
  //                           <SelectItem key={y} value={y.toString()}>
  //                             {x.toString().toLowerCase()}
  //                           </SelectItem>
  //                         ))}
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage className='-my-1' />
  //                   </FormItem>
  //                 )}
  //               />
  //             )}

  //             {/* Logo */}
  //             <FormField
  //               control={daoForm.control}
  //               name='logo'
  //               disabled={submitLoading}
  //               render={({ field, fieldState }) => (
  //                 <FormItem>
  //                   <FormLabel className='flex justify-between items-center'>
  //                     Logo
  //                     <Tooltip>
  //                       <TooltipTrigger asChild>
  //                         <Button type='button' size='icon' variant='ghost'>
  //                           <CircleQuestionMarkIcon className='w-4 h-4' />
  //                         </Button>
  //                       </TooltipTrigger>
  //                       <TooltipContent>
  //                         <p>
  //                           Choose the logo that your DAO will represent. This
  //                           field is optional and can be modified later.
  //                         </p>
  //                       </TooltipContent>
  //                     </Tooltip>
  //                   </FormLabel>
  //                   <FormControl>
  //                     <div className='relative h-60 bg-accent rounded-lg flex flex-col items-center justify-center overflow-hidden mx-2 border'>
  //                       <input
  //                         type='file'
  //                         onClick={(e) => (e.currentTarget.value = '')}
  //                         onChange={async (e) => {
  //                           const file = await isUploadFormImage(e);
  //                           if (file !== undefined) field.onChange(file);
  //                         }}
  //                         disabled={submitLoading}
  //                         accept='.jpeg,.png,.jpg'
  //                         className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
  //                       />

  //                       {logoWatch !== undefined ? (
  //                         <div className='relative w-full h-auto overflow-hidden'>
  //                           {
  //                             // eslint-disable-next-line @next/next/no-img-element
  //                             <img
  //                               src={URL.createObjectURL(logoWatch)}
  //                               alt='logo DAO'
  //                               className='w-full h-auto object-cover block z-10'
  //                               style={{ position: 'relative' }}
  //                             />
  //                           }

  //                           {/* Button */}
  //                           <div className='absolute top-2 right-2 z-30'>
  //                             <Button
  //                               type='button'
  //                               size='sm'
  //                               variant='destructive'
  //                               onClick={() =>
  //                                 daoForm.setValue('logo', undefined)
  //                               }
  //                               disabled={submitLoading}
  //                               className='hover:bg-destructive/80 hover:scale-[0.90] transition-all delay-75'
  //                             >
  //                               <Trash />
  //                             </Button>
  //                           </div>
  //                         </div>
  //                       ) : !loadImage ? (
  //                         <div
  //                           className={`absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10  ${fieldState.error ? 'text-destructive' : ''}`}
  //                         >
  //                           <Upload className='w-10 h-10' />
  //                           <p className='my-0 font-semibold'>
  //                             Choose or drag an image
  //                           </p>
  //                           <span className='font-semibold'>
  //                             The image must be less than 1 MB
  //                           </span>
  //                           <span className='text-center text-sm'>
  //                             It is recommended that the appearance of the image
  //                             be 100x100
  //                           </span>
  //                         </div>
  //                       ) : (
  //                         <div className='w-full h-full px-4 flex justify-center items-center'>
  //                           <Progress value={progress} />
  //                         </div>
  //                       )}
  //                     </div>
  //                   </FormControl>
  //                   <FormMessage className='-my-1 ml-2' />
  //                 </FormItem>
  //               )}
  //             />

  //             {/* Is Public */}
  //             <FormField
  //               control={daoForm.control}
  //               name='isPublic'
  //               disabled={submitLoading}
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel className='w-full flex justify-between'>
  //                     <div>
  //                       Dao Visibility{' '}
  //                       <span className='text-destructive font-bold text-bold'>
  //                         *
  //                       </span>
  //                     </div>
  //                     <Tooltip>
  //                       <TooltipTrigger asChild>
  //                         <Button type='button' size='icon' variant='ghost'>
  //                           <CircleQuestionMarkIcon className='w-4 h-4' />
  //                         </Button>
  //                       </TooltipTrigger>
  //                       <TooltipContent>
  //                         <p>
  //                           In any public DAO, anyone can join and help the
  //                           growth of the community.
  //                         </p>

  //                         <p>
  //                           A private DAO can only join those users who have the
  //                           link{' '}
  //                           <b>
  //                             (private DAO will not appear in the search engine)
  //                           </b>
  //                         </p>
  //                       </TooltipContent>
  //                     </Tooltip>
  //                   </FormLabel>
  //                   <FormControl>
  //                     <div className='flex justify-center gap-2'>
  //                       <Label htmlFor='airplane-mode'>
  //                         {field.value ? 'Public DAO' : 'Private DAO'}
  //                       </Label>
  //                       <Switch
  //                         checked={field.value}
  //                         onCheckedChange={(value) => field.onChange(value)}
  //                         disabled={submitLoading}
  //                       />
  //                     </div>
  //                   </FormControl>
  //                   <FormMessage />
  //                 </FormItem>
  //               )}
  //             />

  //             {/* Submit buttons */}
  //             <div className='w-full flex justify-center gap-6 mt-4'>
  //               <Button
  //                 type='button'
  //                 onClick={() => daoForm.reset()}
  //                 disabled={submitLoading}
  //                 variant='destructive'
  //               >
  //                 <Trash className='w-4 h-4' />
  //                 Clear all
  //               </Button>

  //               <Button
  //                 type='submit'
  //                 disabled={
  //                   daoCategoriesLoading ||
  //                   submitLoading ||
  //                   !daoForm.formState.isValid
  //                 }
  //               >
  //                 {daoCategoriesLoading || submitLoading ? (
  //                   <>
  //                     <Loader className='w-4 h-4 animate-spin' />
  //                     Creating DAO
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Rocket className='w-4 h-4' /> Launch DAO
  //                   </>
  //                 )}
  //               </Button>
  //             </div>
  //           </form>
  //         </Form>
  //       </ScrollArea>
  //     </DialogContent>
  //   </Dialog>
  // );
};
