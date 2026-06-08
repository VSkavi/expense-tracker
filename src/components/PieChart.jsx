import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";
const data = [
    {
        name: "Food",
        value: 500,
    },
    {
        name: "Shopping",
        value: 300,
    },
    {
        name: "Bills",
        value: 200,
    },
];

function ChartComponent() {
    return (
        <PieChart width={400} height={300}>
            <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={index} />
                ))}
            </Pie>

            <Tooltip />
        </PieChart>
    );
}

export default ChartComponent;