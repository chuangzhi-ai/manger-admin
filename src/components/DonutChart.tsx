import { useEffect, useRef, useState } from 'react';
import { supabase, TrafficSource } from '../lib/supabase';

interface DonutChartProps {
  title: string;
  showLegendLabels?: boolean;
}

export default function DonutChart({ title, showLegendLabels = false }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sources, setSources] = useState<TrafficSource[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('traffic_sources')
        .select('*')
        .order('percentage', { ascending: false });

      if (data) {
        setSources(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sources.length === 0) return;

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
    const innerRadius = radius * 0.6;

    ctx.clearRect(0, 0, width, height);

    let currentAngle = -Math.PI / 2;

    sources.forEach((source) => {
      const sliceAngle = (source.percentage / 100) * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();

      ctx.fillStyle = source.color;
      ctx.fill();

      currentAngle += sliceAngle;
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }, [sources]);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex items-center gap-8">
        <canvas ref={canvasRef} className="flex-shrink-0" style={{ width: '180px', height: '180px' }} />
        <div className="flex-1 space-y-3">
          {sources.map((source) => (
            <div key={source.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: source.color }}></div>
                <span className="text-sm text-gray-700">{source.source_name}</span>
              </div>
              {showLegendLabels && (
                <span className="text-sm font-medium text-gray-600">{source.percentage}%</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
