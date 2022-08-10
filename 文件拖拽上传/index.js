import { FileUploader } from './FileUploader.js'

new FileUploader({
  element: document.querySelector('#file-uploader'),
  uploadURL: 'http://loachost:3000/upload'
})