'use client';
import { Calendar, Clock, Edit2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';

export default function PostSkeleton() {
  return (
    <Card className="border-2 shadow-md hover:shadow-md transition-shadow mb-2 animate-skeletonpulse mt-6">
      <CardHeader className="pb-2 flex flex-row justify-between items-center pt-2 px-6">
        <div className="flex items-center space-x-4">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
        </div>
        <div className="flex space-x-1">
          <Edit2 className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1 px-6 py-1">
        <div className="text-sm whitespace-pre-wrap">
          <Skeleton className="animate-skeletonpulse w-auto rounded-sm bg-gray-200 h-[1em] mb-[.3em]" />
          <Skeleton className="animate-skeletonpulse w-auto rounded-sm bg-gray-200 h-[1em] mb-[.3em]" />
          <Skeleton className="animate-skeletonpulse w-auto rounded-sm bg-gray-200 h-[1em] mb-[.3em]" />
        </div>
        <div>
          <div className="flex flex-wrap mt-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full">
          <p className="text-xs text-muted-foreground mb-2">Plataformas:</p>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="animate-skeletonpulse bg-gray-200 h-8 w-8 rounded-full border-2" />
            <Skeleton className="animate-skeletonpulse bg-gray-200 h-8 w-8 rounded-full border-2" />
            <Skeleton className="animate-skeletonpulse bg-gray-200 h-8 w-8 rounded-full border-2" />
            <Skeleton className="animate-skeletonpulse bg-gray-200 h-8 w-8 rounded-full border-2" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
