import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";

type LikeBookPieChartProps = {
  likeStats: {
    bookTitle: string;
    bookLikes: number;
  }[];
  totalLikes: number;
};

//TODO: agregar a este endpoint para obtener el numero de todos los loke
const LikeBookPieChart = ({ likeStats,totalLikes }: LikeBookPieChartProps) => {
  //constans
  const colors = [
    "#00a63e",
    "#fd9a00",
    "#007595",
    "#51a2ff",
    "#2b7fff",
    "#7f22fe",
    "#ff2056",
    "#155dfc",
    "#861043",
    "#bbf451",
  ];

  const chartConfig = {
    books: {
      label: "Libros",
    },
  } satisfies ChartConfig;

  const chartData = likeStats.map((x, y: number) => {
    return {
      title: x.bookTitle,
      likes: x.bookLikes,
      fill: colors[y],
    };
  });

  return (
    <Card className="flex flex-col w-[350px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total de Reacciones</CardTitle>
        <CardDescription>
          Cantidad total de 'Me gusta' por libro.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square ">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="likes"
              nameKey="title"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalLikes}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Me gusta
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 px-2 font-medium leading-none">
          En la gráfica se muestran los 10 libros con más 'me gusta'
        </div>
   
      </CardFooter>
    </Card>
  );
};

export default LikeBookPieChart;
