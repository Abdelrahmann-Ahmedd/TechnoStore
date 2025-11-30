import React from 'react'

export default React.memo(function KPI({
    title,
    data,
    color,
    icon
}: {
    title: string;
    data: number;
    color: string;
    icon: string
}) {
    return (
        <div
        className="p-4 rounded-3 shadow-sm bg-white d-flex justify-content-between align-items-center kpi-card"
        style={{ borderLeft: `5px solid ${color}` }}
        >
        <div>
            <h6 className="text-secondary mb-1">{title}</h6>
            <h3 className="mb-0 fw-bold">{data}</h3>
        </div>

        <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
            width: "50px",
            height: "50px",
            backgroundColor: `${color}20`,
            color: color,
            fontSize: "22px"
            }}
        >
            <i className={icon}></i>
        </div>
        </div>
    );
});

