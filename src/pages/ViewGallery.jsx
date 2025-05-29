import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Image, Heart, Search } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import dummy from '../assets/dummy.jpg';

export default function ViewGallery() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);
  const mediaFiles = [
    {
      id: '1',
      originalName: 'Sunset Beach',
      mimeType: 'image/jpeg',
      createdAt: '2024-12-01T10:00:00Z',
      url: dummy,
    },
    {
      id: '2',
      originalName: 'Mountain View',
      mimeType: 'image/jpeg',
      createdAt: '2024-12-05T12:30:00Z',
      url: dummy,
    },
    {
      id: '3',
      originalName: 'Vacation Clip',
      mimeType: 'video/mp4',
      createdAt: '2024-12-10T09:15:00Z',
      url: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
    },
    {
      id: '4',
      originalName: 'City Night',
      mimeType: 'image/jpeg',
      createdAt: '2024-12-15T18:45:00Z',
      url: dummy,
    },
    {
      id: '5',
      originalName: 'Concert Footage',
      mimeType: 'video/mp4',
      createdAt: '2024-12-20T14:20:00Z',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  ];

  const filteredFiles =
    mediaFiles?.filter((file) => {
      const matchesSearch = file.originalName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'photos' && file.mimeType?.startsWith('image')) ||
        (filter === 'videos' && file.mimeType?.startsWith('video'));

      return matchesSearch && matchesFilter;
    }) || [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Media Gallery</h1>
            <p className="mt-1 text-sm text-slate-600">
              Browse and manage your uploaded media
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Media</SelectItem>
                <SelectItem value="photos">Photos</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            {isLoading ? 'Loading...' : `${filteredFiles.length} file(s) found`}
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Image className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No media found
            </h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Upload some photos and videos to get started'}
            </p>
            {!searchTerm && filter === 'all' && <Button>Upload Media</Button>}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  className="group relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="aspect-square flex items-center justify-center relative">
                    {file.mimeType?.startsWith('image') ? (
                      <img
                        src={file.url}
                        alt={file.originalName}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <video
                        src={file.url}
                        className="object-cover w-full h-full"
                        muted
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/80 text-slate-600 hover:bg-white/90 h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-black/50 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-medium truncate">
                        {file.originalName}
                      </p>
                      <p className="text-white/75 text-xs">
                        {file.createdAt
                          ? formatDate(file.createdAt)
                          : 'Recently uploaded'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
