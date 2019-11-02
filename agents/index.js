const config = require('config')

const { sensors } = require('./vendors')
const { initLogger } = require('./vendors').logging
const messages = require('./messages')
const logger = initLogger(
  config.get('production'),
  config.get('logFolder'),
  config.get('moduleName')
)
const PORT = config.get('port')
const io = require('socket.io')(PORT)

io.on('connection', socket => {
  logger.info('Server is started on port: ' + PORT)

  socket.on(messages.PROCESS_MONITOR_DATA_REQUESTED, async () => {
    const metrics = await sensors.processMonitor.poll()
    socket.emit(messages.PROCESS_MONITOR_DATA_EMITTED, metrics)
  })

  socket.on(messages.FILE_EXPLORER_FILE_CONTENT_READ_REQUESTED, async ({filePath}) => {
    const content = await sensors.fileExplorer.readFileContent(filePath)
    socket.emit(messages.FILE_EXPLORER_FILE_CONTENT_READ_DONE, content)
  })

  socket.on(messages.FILE_EXPLORER_LIST_FOLDER_ITEM_REQUESTED, async ({folderPath}) => {
    const items = await sensors.fileExplorer.listFolderItems(folderPath)
    socket.emit(messages.FILE_EXPLORER_LIST_FOLDER_ITEM_DONE, items)
  })

  socket.on(messages.FILE_EXPLORER_SHOW_FOLDER_TREE_REQUESTED, async ({folderPath, depth}) => {
    const content = await sensors.fileExplorer.showFolderTree(folderPath, depth)
    socket.emit(messages.FILE_EXPLORER_SHOW_FOLDER_TREE_DONE, content)
  })
})
