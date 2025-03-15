import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { Book } from '~/types/book.entity';

type CardBookProps = {
  x: Book;
};

const CardBook = ({ x }: CardBookProps) => {
  return (
    <>
      <Card className='shadow-lg'>
        <CardHeader>
          <img
            src={x.coverImage}
            alt={x.title}
            className='w-full h-50 object-contain'
          />
          <CardTitle>{x.title}</CardTitle>
          {/* <CardDescription>Juan description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>
            Año de publicación:{' '}
            <span className='font-medium'>{x.firstPublishYear}</span>
          </p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardBook;
