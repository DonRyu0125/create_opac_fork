"use client"

import { useState } from "react"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    X,
    Share,
    Bookmark,
    Download,
    Eye,
    Calendar,
    FileText,
    ImageIcon,
    Music,
    Video,
    Copy,
    ExternalLink,
    Info,
    Folder,
    HardDrive,
} from "lucide-react"

interface FileDetailModalProps {
    file: {
        id: number
        name: string
        type: string
        size: string
        preview: string
        category: string
        date: string
        description: string
    }
    isOpen: boolean
    onClose: () => void
}

const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-5 h-5" />
    if (type.startsWith("audio/")) return <Music className="w-5 h-5" />
    if (type.startsWith("video/")) return <Video className="w-5 h-5" />
    return <FileText className="w-5 h-5" />
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

export default function DetailView({ file, isOpen, onClose }: FileDetailModalProps) {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [copied, setCopied] = useState(false)

    if (!isOpen) return null

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    const formatFileSize = (size: string) => {
        const numericSize = Number.parseFloat(size.replace(/[^\d.]/g, ""))
        const unit = size.replace(/[\d.]/g, "")
        return { size: numericSize, unit }
    }

    const { size: numericSize, unit } = formatFileSize(file.size)

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex h-full">
                    {/* Left Side - Preview */}
                    <div className="flex-1 bg-gray-50 flex items-center justify-center relative">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
                        >
                            <X className="w-4 h-4" />
                        </Button>

                        <div className="w-full h-full flex items-center justify-center p-8">
                            {file.type.startsWith("image/") ? (
                                <div className="relative w-full h-full max-w-lg max-h-lg">
                                    <img
                                        src={file.preview || "/placeholder.svg"}
                                        alt={file.name}
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
                                    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        {getFileIcon(file.type)}
                                    </div>
                                    <p className="text-sm">Preview not available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="w-96 bg-white flex flex-col">
                        {/* Header */}
                        <CardHeader className="pb-4">
                            <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                        {getFileIcon(file.type)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">MINISIS Inc</p>
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {file.date}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>

                        {/* Content */}
                        <CardContent className="flex-1 space-y-6 overflow-y-auto">
                            {/* File Name */}
                            <div>
                                <h2 className="font-semibold text-lg text-gray-900 mb-2 break-words">{file.name}</h2>
                                <Badge className={getCategoryColor(file.category)}>{file.category}</Badge>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <Info className="w-4 h-4 mr-2" />
                                    Description
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{file.description}</p>
                            </div>

                            <Separator />

                            {/* File Details */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-900 flex items-center">
                                    <HardDrive className="w-4 h-4 mr-2" />
                                    File Details
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Type:</span>
                                        <span className="font-medium text-gray-900">{file.type}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Size:</span>
                                        <span className="font-medium text-gray-900">{file.size}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Modified:</span>
                                        <span className="font-medium text-gray-900">{file.date}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Location:</span>
                                        <span className="font-medium text-gray-900 flex items-center">
                                            <Folder className="w-3 h-3 mr-1" />
                                            /discover
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* File Path */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">File Path</h3>
                                <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded text-xs font-mono">
                                    <span className="flex-1 truncate text-gray-600">/home/discover/{file.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(`/home/discover/${file.name}`)}
                                        className="h-6 w-6 p-0"
                                    >
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                </div>
                                {copied && <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>}
                            </div>
                        </CardContent>

                        {/* Actions */}
                        <div className="p-6 border-t bg-gray-50">
                            <div className="grid grid-cols-2 gap-3">
                                <Button className="w-full" size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                    size="sm"
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                >
                                    <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                                    {isBookmarked ? "Saved" : "Save"}
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent" size="sm">
                                    <Share className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>

                            <Button variant="ghost" className="w-full mt-3" size="sm">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open in New Tab
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
