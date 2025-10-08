import { useEffect, useRef } from 'react';

interface DataPoint {
  hour: string;
  trend: number;
  monthly: number;
}

const generateData = (): DataPoint[] => {
  const hours = [];
  for (let i = 6; i <= 23; i++) {
    hours.push(`${i}:00`);
  }

  return hours.map((hour, index) => {
    const baseValue = 10000 + Math.sin(index * 0.5) * 5000;
    const trendVariation = Math.sin(index * 0.8) * 30000 + 30000;
    const monthlyVariation = Math.sin(index * 0.6) * 15000 + 10000;

    return {
      hour,
      trend: Math.round(baseValue + trendVariation),
      monthly: Math.round(baseValue + monthlyVariation),
    };
  });
};

export default function AreaChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = generateData();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = Math.max(...data.map(d => Math.max(d.trend, d.monthly)));
    const minValue = 0;

    const xStep = chartWidth / (data.length - 1);
    const yScale = chartHeight / (maxValue - minValue);

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      const value = Math.round(maxValue - (maxValue / 5) * i);
      ctx.fillText(value.toLocaleString(), padding.left - 10, y + 4);
    }

    const drawArea = (values: number[], color: string, opacity: number) => {
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, `${color}00`);

      ctx.beginPath();
      ctx.moveTo(padding.left, height - padding.bottom);

      values.forEach((value, i) => {
        const x = padding.left + i * xStep;
        const y = height - padding.bottom - (value - minValue) * yScale;
        if (i === 0) {
          ctx.lineTo(x, y);
        } else {
          const prevX = padding.left + (i - 1) * xStep;
          const prevY = height - padding.bottom - (values[i - 1] - minValue) * yScale;
          const cpX = (prevX + x) / 2;
          ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
        }
      });

      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    drawArea(data.map(d => d.trend), '#60a5fa', 0.5);
    drawArea(data.map(d => d.monthly), '#34d399', 0.5);

    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      if (i % 3 === 0) {
        const x = padding.left + i * xStep;
        ctx.fillText(d.hour, x, height - padding.bottom + 20);
      }
    });
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">访问量趋势</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
            <span className="text-sm text-gray-600">浏览趋势</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
            <span className="text-sm text-gray-600">月访问量</span>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full" style={{ height: '300px' }} />
    </div>
  );
}
