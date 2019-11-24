const store = {
  rootNode: {
    isFile: false,
    path: '/',
    name: '',
    children: [],
  },
  currentFolder: {
    isFile: false,
    path: '/',
    name: '',
    children: [],
  },
  loading: false,
  previewing: false,
  previewContent: '',
  previewMime: 'text'
}
window.store = store
export default store
