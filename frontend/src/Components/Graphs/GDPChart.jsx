import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`Year: ${label}`}</p>
        <p className="intro" style={{ color: '#8884d8' }}>{`GDP: $${payload[0].value.toFixed(2)}B`}</p>
      </div>
    );
  }
  return null;
};

const GDPChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#666', fontSize: 12 }} 
            tickLine={{ stroke: '#666' }} 
            tickMargin={8} 
          />
          <YAxis 
            tick={{ fill: '#666' }} 
            tickLine={{ stroke: '#666' }} 
            tickFormatter={(value) => `$${value}B`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="gdp" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorGdp)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GDPChart;
