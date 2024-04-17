import { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";

export default function Chart({ transactions, account }) {
    const calculateTotals = (type, key) => transactions.reduce((acc, item) => item[key].toLowerCase() === type.toLowerCase() ? acc - item.amount : acc, 0);
    const uniqueCategories = [...new Set(transactions.map(item => item.category.toLowerCase()))];
    const formattedCategories = uniqueCategories.map(category => category.charAt(0).toUpperCase() + category.slice(1));
    const categoryTotals = formattedCategories.map(category => ({ asset: category, amount: -calculateTotals(category, 'category') }));
    const total = (-calculateTotals(account, 'account')).toFixed(2);
    const winSize = window.innerWidth / 4.5

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            data: categoryTotals.map(item => ({ ...item, amount: -item.amount })),
            series: [
                {
                    ...prevOptions.series[0],
                    innerLabels: [
                        prevOptions.series[0].innerLabels[0],
                        {
                            ...prevOptions.series[0].innerLabels[1],
                            text: `$${total}`,
                        },
                    ],
                },
            ],
        }));
    }, [transactions, account]);

    useEffect(() => {
        const handleResize = () => {
            window.location.reload();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [options, setOptions] = useState({
        data: categoryTotals.map(item => ({ ...item, amount: -item.amount })),
        title: { text: account, color: "white" },
        height: winSize,
        width: winSize,
        background: {
            visible: false,
        },
        legend: { enabled: false },
        series: [
            {
                type: "donut",
                calloutLabelKey: "asset",
                calloutLabel: { color: "white" },
                angleKey: "amount",
                innerRadiusRatio: .8,
                innerLabels: [
                    { text: "Total", fontWeight: "bold", color: "white" },
                    { text: `$${total}`, fontSize: 24, color: "white" },
                ],
                innerCircle: { fill: "#223F5B" },
            },
        ],
    });

    return <AgChartsReact options={options} />;
};
