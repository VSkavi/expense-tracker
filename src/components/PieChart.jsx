import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = [
    "#003B7A",
    "#4F7FD8",
    "#F0C75E",
    "#9A86FD",
    "#FF8A65",
];

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
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>

            <Tooltip />
        </PieChart>
    );
}

export default ChartComponent;
