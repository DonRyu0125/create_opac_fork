"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Share,
    Bookmark,
    Search,
    Grid3X3,
    List,
    Download,
    Eye,
    Calendar,
    FileText,
    ImageIcon,
    Music,
    Video,
    MoreHorizontal,
} from "lucide-react"
// DetailView component is defined in this file
import Layout from "@/components/layouts"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import api from "@/services/api"

import LoadingState from "./LoadingState"

interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
    roleId: string;
    roleName: string;
    organizationUuid: string;
    multiTenant: string;
    ".issued": string;
    ".expires": string;
    logo: string | null;
    avatar: string | null;
}

const files = [
    {
        id: 1,
        name: "20250226085245_signed_revised_TA.pdf",
        type: "application/pdf",
        size: "188.47kB",
        preview: "/placeholder.svg?height=300&width=300",
        category: "Documents",
        date: "Mon Jun 16 2025",
        description:
            "PBIBibliothèque et Archives Library and Archives Canada TASK AUTHORIZATION FORM TASK AUTHORIZATION TA FORM MINISIS Inc ToT...",
    },
    {
        id: 2,
        name: "aaa08454_rgb_Herert_Vollrath_Kohler.jpg",
        type: "image/jpeg",
        size: "74.54kB",
        preview: "/placeholder.svg?height=300&width=300",
        category: "Images",
        date: "Mon Jun 16 2025",
        description: "OCR extraction tool Tesseract returned no output...",
    },
    {
        id: 3,
        name: "aab59332_rgb_lombardini_2007.jpg",
        type: "image/jpeg",
        size: "92.09kB",
        preview: "/placeholder.svg?height=300&width=300",
        category: "Images",
        date: "Mon Jun 16 2025",
        description: "OCR extraction tool Tesseract returned no output...",
    },
    {
        id: 4,
        name: "aac23084_rgb_clarke_and_kohler.jpg",
        type: "image/jpeg",
        size: "135.02kB",
        preview: "/placeholder.svg?height=300&width=300",
        category: "Images",
        date: "Wed Jun 18 2025",
        description: "OCR extraction tool Tesseract returned no output...",
    },
    {
        id: 5,
        name: "AHOW_026_Oxus_Chariot_Model_22_Feb_2010.mp3",
        type: "audio/mpeg",
        size: "6.55MB",
        preview: "/placeholder.svg?height=300&width=300",
        category: "Audio",
        date: "Wed Jun 18 2025",
        description: "Content or description not found...",
    },
    {
        id: 6,
        name: "Animated_Short_big_buck_bunny_SeenAsQuicktime_ac.mp4",
        type: "video/mp4",
        size: "5.26MB",
        preview: "/placeholder.svg?height=300&width=300",
        category: "Video",
        date: "Wed Jun 18 2025",
        description: "Content or description not found...",
    },
]

const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    if (type.startsWith("audio/")) return <Music className="w-4 h-4" />
    if (type.startsWith("video/")) return <Video className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case "Images":
            return "bg-pink-100 text-pink-800"
        case "Documents":
            return "bg-blue-100 text-blue-800"
        case "Audio":
            return "bg-purple-100 text-purple-800"
        case "Video":
            return "bg-green-100 text-green-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function Minista() {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)


    // Automatically authenticate when component mounts
    const { error: authError, isPending: isAuthLoading } = useQuery<AuthResponse>({
        queryKey: ['minista-login'],
        queryFn: async () => {
            try {
                // Use the autoLogin function from our API service
                const formData = new URLSearchParams();
                formData.append('username', 'Cams.Dev');
                formData.append('password', 'Cams.Dev_12!');
                formData.append('grant_type', 'password');

                const response = await api.post<AuthResponse>(('/token'), formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                // Store token in session storage
                const { access_token, expires_in } = response.data;
                sessionStorage.setItem('auth_token', access_token);

                // Store expiration time
                const expiresAt = new Date();
                expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);
                sessionStorage.setItem('auth_expires', expiresAt.toISOString());

                // Store full auth data
                sessionStorage.setItem('auth_data', JSON.stringify(response.data));

                return response.data;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        // Retry 3 times if the request fails
        retry: 3,
    })


    // Define the response type for asset search
    interface AssetSearchResponse {
        FiltersOptions: null;
        PageItems: Array<{
            Thumbnail: string;
            PackageUuid: string;
            Uuid: string;
            Hidden: boolean;
            OrganizationUuid: string;
            OriginalName: string | null;
            Name: string;
            Title: string | null;
            Description: string | null;
            Content: string;
            MimeType: string;
            AipStorage: string;
            OriginalPath: string;
            BlobContainer: string;
            BlobReference: string;
            BlobUri: string;
            MbSize: number;
            BytesSize: number;
            PackageName: string;
            IngestDate: string;
            IngestDateTimeString: string;
            CurrentStage: string;
            CurrentStatus: string;
            MetsPath: string;
            PremisFilePath: string;
            Extension: string;
            RelativePath: string;
            FormatRegistryName: string | null;
            FormatName: string;
            FormatVersion: string | null;
            FormatUuid: string;
            FormatKey: string | null;
            FormatType: string;
            ChecksumInfo: string;
            FileDetails: Array<{
                Name: string;
                Value: string;
                Message: string | null;
                Outcome: number;
            }>;
        }>;
    }

    interface DetailViewProps {
        file: {
            id: string
            name: string
            category: string
            size: string
            date: string
            thumbnail: string
            description: string
            originalData?: AssetSearchResponse['PageItems'][0] // Optional original API data
        }
        isOpen: boolean
        onClose: () => void
    }

    const { data: assetData } = useQuery<AssetSearchResponse>({
        queryKey: ['minista-asset-search'],
        queryFn: async () => {
            const response = await api.post<AssetSearchResponse>(('api/Discover/AssetsSearch'), {
                ClusterSearchKeyword: "++@",
                ClusterSearchOperator: "regex",
                Filters: [],
                Page: 0,
                PageSize: 24,
                SortedBy: [{ Id: "FileName", Desc: false }],
            }, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`,
                }
            });
            return response.data;
        },
        enabled: !isAuthLoading // Only run this query when authentication is complete
    })

    // Map API response to our file format
    const mapAssetToFile = (asset: AssetSearchResponse['PageItems'][0]) => ({
        id: asset.Uuid,
        name: asset.Name,
        category: asset.Extension?.replace('.', '') || 'Unknown',
        size: `${asset.MbSize} MB`,
        date: new Date(asset.IngestDate).toLocaleDateString(),
        thumbnail: asset.Thumbnail ? `data:image/jpeg;base64,${asset.Thumbnail}` : '/placeholder.png',
        description: asset.Content || asset.Description || 'No description available',
        originalData: asset // Keep the original data for reference
    });

    // Use mock data as fallback when API data is not available
    const mockFiles = [
        {
            id: "1",
            name: "Document 1.pdf",
            category: "PDF",
            size: "2.4 MB",
            date: "2023-01-15",
            thumbnail: "/placeholder.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            id: "2",
            name: "Image 1.jpg",
            category: "Image",
            size: "1.2 MB",
            date: "2023-02-20",
            thumbnail: "/placeholder.png",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ]

    const openDetail = (file: (typeof files)[0]) => {
        setSelectedFile(file)
        setIsDetailOpen(true)
    }

    // Map API data to our file format or use mock data if API data is not available
    const files = assetData?.PageItems ? assetData.PageItems.map(mapAssetToFile) : mockFiles;

    const filteredFiles = files.filter(
        (file) =>
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Layout>
            {isAuthLoading && (
                <LoadingState />
            )}
            {authError && (
                <div className="max-w-6xl mx-auto px-4 py-2 bg-red-50 border border-red-200 rounded-md mt-2">
                    <p className="text-red-600">Authentication error: {authError instanceof Error ? authError.message : 'Unknown error'}</p>
                </div>
            )}
            {!isAuthLoading && <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b ">
                    <div className="max-w-6xl mx-auto px-4 py-4">


                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
                                <Badge variant="default" className="text-sm">
                                    {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search files..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-200"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div
                        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
                    >
                        {filteredFiles.map((file) => (
                            <Card
                                key={file.id}
                                className="overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white cursor-pointer"
                                onClick={() => openDetail(file)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                                                    {file.category.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-sm text-gray-900">MINISIS Inc</p>
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {file.date}
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-0">
                                    <div className="relative aspect-square bg-gray-100">
                                        <img 
                                            src={file.thumbnail || "/placeholder.svg"} 
                                            alt={file.name} 
                                            className="object-cover w-full h-full" 
                                        />
                                        <div className="absolute top-2 right-2">
                                            <Badge className="bg-blue-100 text-blue-800">{file.category}</Badge>
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                            {file.size}
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col space-y-3 pt-4">
                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-4">
                                            <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={(e) => e.stopPropagation()}>
                                                <Share className="w-5 h-5 text-gray-600" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={(e) => e.stopPropagation()}>
                                                <Eye className="w-4 h-4 text-gray-600" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={(e) => e.stopPropagation()}>
                                                <Download className="w-4 h-4 text-gray-600" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={(e) => e.stopPropagation()}>
                                                <Bookmark className="w-5 h-5 text-gray-600" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* File Info */}
                                    <div className="w-full text-left space-y-2">
                                        <p className="font-medium text-sm text-gray-900 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-600 line-clamp-2">{file.description}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* File Detail Modal */}
                {isDetailOpen && selectedFile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-xl font-semibold">{selectedFile.name}</h2>
                                <Button variant="ghost" size="sm" onClick={() => setIsDetailOpen(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-5 h-5"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                        src={selectedFile.thumbnail}
                                        alt={selectedFile.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                        <p className="mt-1 text-sm text-gray-900">{selectedFile.category}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Size</h3>
                                        <p className="mt-1 text-sm text-gray-900">{selectedFile.size}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Date</h3>
                                        <p className="mt-1 text-sm text-gray-900">{selectedFile.date}</p>
                                    </div>
                                    {selectedFile.originalData && (
                                        <>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Format</h3>
                                                <p className="mt-1 text-sm text-gray-900">{selectedFile.originalData.FormatName || 'Unknown'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">MIME Type</h3>
                                                <p className="mt-1 text-sm text-gray-900">{selectedFile.originalData.MimeType}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Ingest Date</h3>
                                                <p className="mt-1 text-sm text-gray-900">{selectedFile.originalData.IngestDateTimeString}</p>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                        <ScrollArea className="h-[200px]">
                                            <p className="text-sm text-gray-900">{selectedFile.description}</p>
                                        </ScrollArea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 p-4 border-t">
                                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                    Close
                                </Button>
                                <Button>
                                    <Download className="w-4 h-4 mr-2" /> Download
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>}
        </Layout>
    )
}
