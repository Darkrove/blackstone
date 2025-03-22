import { Icons } from "@/components/shared/icons";
import Counter from "@/components/shared/counter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCards() {
  const stats = [
    {
      title: "Total Hours Spent",
      value: 120,
      icon: <Icons.clock className="size-5 text-muted-foreground" />,
    },
    {
      title: "Attempted POI",
      value: 100,
      icon: <Icons.target className="size-5 text-muted-foreground" />,
    },
    {
      title: "Points Earned",
      value: 100,
      icon: <Icons.award className="size-5 text-muted-foreground" />,
    },
    {
      title: "Total Hours Spent",
      value: 120,
      icon: <Icons.clock className="size-5 text-muted-foreground" />,
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Counter value={stat.value} />
            </div>
            <p className="text-xs text-muted-foreground">+80% from last month</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
