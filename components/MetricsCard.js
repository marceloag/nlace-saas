import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function MetricsCard({
  title,
  value,
  description,
  icon,
  trend,
  className
}) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm md:text-base font-medium">
          {title}
        </CardTitle>
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold break-words">{value}</div>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                'text-xs inline-flex items-center',
                trend.positive ? 'text-green-600' : 'text-red-600'
              )}
            >
              <span className="mr-1">{trend.positive ? '↑' : '↓'}</span>
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
