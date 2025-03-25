import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";

type UserPieChartProps = {
  totalUsers: {
    block: number;
    unlock: number;
  };
};

const UserPieChart = ({ totalUsers }: UserPieChartProps) => {
  //constans
  const chartConfig = {
    users: {
      label: "Usuarios",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      status: "Bloqueados: ",
      users: totalUsers.block,
      fill: "#e7000b",
    },
    {
      status: "Desbloqueados: ",
      users: totalUsers.unlock,
      fill: "#00a63e",
    },
  ];

  //memos
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.users, 0);
  }, [totalUsers]);

  return (
    <Card className="flex flex-col w-[350px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total de Usuarios Registrados</CardTitle>
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
              dataKey="users"
              nameKey="status"
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
                          Usuarios
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
    </Card>
  );
};

export default UserPieChart;
