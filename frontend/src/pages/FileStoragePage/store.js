const store = {
  rootNode: {
    isFile: false,
    path: '/',
    name: '',
    children: [],
  },
  currentFolder: {
    isFile: false,
    path: '/a',
    name: '',
    children: [],
  },
  loading: false,
  previewing: false,
  previewContent: '',
  previewType: 'text',
  previewFileExt: '.txt'
}

export default store
