'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Edit2,
  Save,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function Post({
  hashtags = '',
  fecha_publicacion = '',
  hora_publicacion = '',
  text = '',
  platforms = [],
  onSave
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [postData, setPostData] = useState({
    hashtags,
    fecha_publicacion,
    hora_publicacion,
    text,
    platforms
  });

  // Información de las plataformas
  const platformInfo = {
    facebook: {
      color: 'bg-blue-600',
      icon: <Facebook className="h-4 w-4" />,
      name: 'Facebook'
    },
    twitter: {
      color: 'bg-sky-500',
      icon: <Twitter className="h-4 w-4" />,
      name: 'Twitter'
    },
    instagram: {
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
      icon: <Instagram className="h-4 w-4" />,
      name: 'Instagram'
    },
    linkedin: {
      color: 'bg-blue-700',
      icon: <Linkedin className="h-4 w-4" />,
      name: 'LinkedIn'
    }
  };

  const allPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin'];

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(postData);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPostData({
      hashtags,
      fecha_publicacion,
      hora_publicacion,
      text,
      platforms
    });
  };

  const togglePlatform = (platform) => {
    if (postData.platforms.includes(platform)) {
      setPostData({
        ...postData,
        platforms: postData.platforms.filter((p) => p !== platform)
      });
    } else {
      setPostData({
        ...postData,
        platforms: [...postData.platforms, platform]
      });
    }
  };

  // Formatear hashtags para mostrarlos
  const formatHashtags = (hashtags) => {
    return hashtags.split(' ').map((tag, index) => (
      <Badge key={index} variant="secondary" className="mr-1 mb-1">
        {tag}
      </Badge>
    ));
  };

  return (
    <Card className="w-auto border-2 shadow-md hover:shadow-md transition-shadow mb-2">
      <CardHeader className="pb-2 flex flex-row justify-between items-center pt-2 px-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {isEditing ? (
            <Input
              type="date"
              value={postData.fecha_publicacion}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  fecha_publicacion: e.target.value
                })
              }
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              {postData.fecha_publicacion}
            </span>
          )}
          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
          {isEditing ? (
            <Input
              type="time"
              value={postData.hora_publicacion}
              onChange={(e) =>
                setPostData({ ...postData, hora_publicacion: e.target.value })
              }
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              {postData.hora_publicacion}
            </span>
          )}
        </div>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4 text-destructive" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSave}>
              <Save className="h-4 w-4 text-primary" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-1 px-6 py-1">
        {isEditing ? (
          <Textarea
            value={postData.text}
            onChange={(e) => setPostData({ ...postData, text: e.target.value })}
            placeholder="Contenido del post"
            className="min-h-[100px] resize-none"
          />
        ) : (
          <div className="text-sm whitespace-pre-wrap">{postData.text}</div>
        )}

        <div>
          {isEditing ? (
            <Input
              value={postData.hashtags}
              onChange={(e) =>
                setPostData({ ...postData, hashtags: e.target.value })
              }
              placeholder="#hashtag1 #hashtag2"
              className="mt-2"
            />
          ) : (
            <div className="flex flex-wrap mt-2">
              {formatHashtags(postData.hashtags)}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full">
          <p className="text-xs text-muted-foreground mb-2">Plataformas:</p>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              {allPlatforms.map((platform) => (
                <Tooltip key={platform}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        'h-8 w-8 rounded-full border-2',
                        isEditing ? 'cursor-pointer' : 'cursor-default',
                        postData.platforms.includes(platform)
                          ? platformInfo[platform].color +
                              ' text-white border-transparent'
                          : 'bg-background border-muted-foreground/20 text-muted-foreground'
                      )}
                      onClick={() => isEditing && togglePlatform(platform)}
                    >
                      <span className="text-sm font-bold">
                        {platformInfo[platform].icon}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{platformInfo[platform].name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
