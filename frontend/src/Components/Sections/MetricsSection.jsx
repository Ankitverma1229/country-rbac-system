import React from "react";
import MetricsCard from "../Cards/MetricsCards";

const MetricsSection = ({ metrics }) => (
  <section className="mt-5 w-full">
    <div className="flex justify-between gap-5 md:gap-0 flex-col md:flex-row">
      {metrics.map((metric, index) => (
        <MetricsCard
          key={index}
          title={metric.title}
          value={metric.value}
          Icon={metric.icon}
        />
      ))}
    </div>
  </section>
);

export default MetricsSection;
