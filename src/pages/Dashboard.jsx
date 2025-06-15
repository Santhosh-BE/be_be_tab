import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Images, Video, MapPin, Link as LinkIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const mediaLoading = false;
  const recentFiles = [];

  return (
    <div className="p-6">
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Welcome back! Here's what's happening with your media.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Images className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Total Photos
                  </p>
                  <p className="text-2xl font-bold text-slate-900">{0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Video className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Videos</p>

                  <p className="text-2xl font-bold text-slate-900">{0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Addresses
                  </p>

                  <p className="text-2xl font-bold text-slate-900">{0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <LinkIcon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Mappings</p>

                  <p className="text-2xl font-bold text-slate-900">{0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Recent Uploads
              </h3>
              <div className="space-y-4">
                {mediaLoading ? null : recentFiles.length > 0 ? (
                  recentFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-slate-200 rounded-lg flex items-center justify-center">
                        {file.mimeType?.startsWith('image') ? (
                          <Images className="h-6 w-6 text-slate-500" />
                        ) : (
                          <Video className="h-6 w-6 text-slate-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {file.originalName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {file.createdAt
                            ? new Date(file.createdAt).toLocaleDateString()
                            : 'Recently'}
                        </p>
                      </div>
                      <div className="text-xs text-slate-400">
                        {file.size
                          ? Math.round((file.size / 1024 / 1024) * 10) / 10 +
                            ' MB'
                          : ''}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Images className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm">No uploads yet</p>
                    <p className="text-xs mt-1">
                      Start by uploading some media
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-col space-y-5">
                <Link to="/upload">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-4 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <div className="flex items-center">
                      <Plus className="h-5 w-5 text-primary mr-3" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-primary">
                          Upload New Media
                        </p>
                        <p className="text-xs text-primary/70">
                          Add photos and videos
                        </p>
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link to="/manage-address">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-4 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-emerald-600 mr-3" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-emerald-900">
                          Add Address
                        </p>
                        <p className="text-xs text-emerald-600">
                          Create new location
                        </p>
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link to="/map-to-address">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-4 border-amber-200 hover:border-amber-300 hover:bg-amber-50"
                  >
                    <div className="flex items-center">
                      <LinkIcon className="h-5 w-5 text-amber-600 mr-3" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-amber-900">
                          Map Photos
                        </p>
                        <p className="text-xs text-amber-600">
                          Link photos to addresses
                        </p>
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
