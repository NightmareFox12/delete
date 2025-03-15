import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { News } from '~/types/news.entity';

type NewsCardProps = {
  x: News;
};
const NewsCard = ({ x }: NewsCardProps) => {
  return (
    <>
      <Card className='shadow-lg'>
        <CardHeader>
          <img
            src={x.thumbnail}
            alt={x.title}
            className='w-full h-50 object-fill'
          />
          <CardTitle>{x.title}</CardTitle>
          <CardDescription>
            <span className='font-semibold text-black'>Autores: </span>
            {x.authors.map((j) => j)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-ellipsis'>{x.excerpt}</p>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </>
  );
};

export default NewsCard;
