import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'

import { FilePondErrorDescription, FilePondFile } from 'filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

// Register the plugin
registerPlugin(FilePondPluginImagePreview)

const AssetUpload: React.FC = () => {
	const [files, setFiles] = useState<File[]>([])

	const handleProcessFile = (
		error: FilePondErrorDescription | null,
		file: FilePondFile
	): void => {
		if (error) {
			console.error('Error uploading file:', error)
			return
		}
		console.log('File uploaded:', file)
	}

	return (
		<FilePond
			files={files}
			onupdatefiles={(fileItems) => {
				setFiles(fileItems.map((fileItem) => fileItem.file as File))
			}}
			allowMultiple={true}
			maxFiles={5}
			server={{
				url: 'https://your-backend-server.com/upload',
				process: {
					url: '/process',
					method: 'POST',
					headers: {
						Authorization: 'Bearer YOUR_ACCESS_TOKEN',
					},
					ondata: (formData: FormData): FormData => {
						formData.append('extraData', 'value')
						return formData
					},
					onload: (response: string) => {
						// Parse the upload response
						return response
					},
				},
				revert: '/revert',
			}}
			name="files"
			labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
			onprocessfile={handleProcessFile}
		/>
	)
}

export default AssetUpload
