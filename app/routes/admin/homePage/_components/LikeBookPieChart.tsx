import * as React from "react";
import { TrendingUp } from "lucide-react";
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
    totalLikes: number;
  }[];
};

const LikeBookPieChart = ({ likeStats }: LikeBookPieChartProps) => {
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
      likes: x.totalLikes,
      fill: colors[y],
    };
  });

  //memos
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.likes, 0);
  }, [likeStats]);

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
                          {totalVisitors.toLocaleString()}
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
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default LikeBookPieChart;
