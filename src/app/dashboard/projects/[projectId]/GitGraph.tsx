"use client"

import {useEffect, useMemo, useState} from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { getCommitdata } from "@/app/store/slices/clientProjectSlice"
import { AppDispatch, RootState } from "@/app/store"

function fillMissingDates(data: { date: string; count: number }[]) {
  if (data.length === 0) return data;

  const startDate = new Date(data[0].date)
  const endDate = new Date(data[data.length - 1].date)
  const dateMap = new Map(data.map(item => [item.date, item.count]))
  const filled: { date: string; count: number }[] = []

  for (
    let d = new Date(startDate);
    d <= endDate;
    d.setDate(d.getDate() + 1)
  ) {
    const isoDate = d.toISOString().split("T")[0]
    filled.push({ date: isoDate, count: dateMap.get(isoDate) ?? 0 })
  }

  return filled
}

export function GitGraph({RepoName, RepoOwner}:{
  RepoName: string, RepoOwner: string
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { gitData } = useSelector((state: RootState) => state.projects)

 
  useEffect(() => {
     if(RepoName && RepoOwner){
    dispatch(
      getCommitdata({
        owner: RepoOwner,
        repo: RepoName,
        createdAt: "2025-03-17T00:00:00Z",

      }),
    )}
  }, [ dispatch, RepoOwner, RepoName])

  const [timeRange, setTimeRange] = useState("90d")

  // Defensive: make sure gitData is array of correct shape
  const rawData = useMemo(() => (
    Array.isArray(gitData)
      ? gitData
          .map(item => {
            if (
              typeof item === "object" &&
              item !== null &&
              "date" in item &&
              "count" in item &&
              typeof (item as { date?: unknown; count?: unknown }).date === "string" &&
              typeof (item as { date?: unknown; count?: unknown }).count === "number"
            ) {
              const { date, count } = item as { date: string; count: number };
              return { date, count };
            }
            return null;
          })
          .filter((item): item is { date: string; count: number } => item !== null)
      : []
  ), [gitData]);

  // Sort ascending by date
  const sortedData = useMemo(() => {
    return rawData.slice().sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }, [rawData])

  // Fill missing dates
  const filledData = useMemo(() => fillMissingDates(sortedData), [sortedData])

  // Filter by time range (7d, 30d, 90d)
  const filteredData = useMemo(() => {
    if (!filledData.length) return []

    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date()
    startDate.setDate(now.getDate() - daysToSubtract)

    return filledData.filter(item => new Date(item.date) >= startDate)
  }, [filledData, timeRange])

  return (
    <Card className="pt-0 rounded-2xl">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Track your project workflow</CardTitle>
          <CardDescription>Number of commit messages per day</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={{}} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillCount)"
              stroke="var(--chart-1)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
