import { useEffect, useRef } from 'react';

interface RadarData {
  label: string;
  male: number;
  female: number;
}

const data: RadarData[] = [
  { label: '周一', male: 85, female: 70 },
  { label: '周二', male: 75, female: 65 },
  { label: '周三', male: 90, female: 80 },
  { label: '欧洲', male: 70, female: 85 },
  { label: 'Ipad', male: 80, female: 75 },
  { label: '美洲', male: 65, female: 60 },
];

export default function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    const levels = 5;

    ctx.clearRect(0, 0, width, height);

    for (let level = levels; level > 0; level--) {
      const r = (radius / levels) * level;
      ctx.strokeStyle = level === levels ? '#e5e7eb' : '#f3f4f6';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let i = 0; i <= data.length; i++) {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    for (let i = 0; i < data.length; i++) {
      const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      const labelRadius = radius + 25;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);

      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data[i].label, labelX, labelY);
    }

    const drawDataSet = (values: number[], color: string, fillColor: string) => {
      ctx.beginPath();
      for (let i = 0; i <= values.length; i++) {
        const value = values[i % values.length];
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const r = (radius * value) / 100;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      values.forEach((value, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const r = (radius * value) / 100;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    drawDataSet(
      data.map(d => d.male),
      '#60a5fa',
      'rgba(96, 165, 250, 0.1)'
    );
    drawDataSet(
      data.map(d => d.female),
      '#a78bfa',
      'rgba(167, 139, 250, 0.1)'
    );
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">访问数量</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-600">男性</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-gray-600">女性</span>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full" style={{ height: '280px' }} />
    </div>
  );
}
