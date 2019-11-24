import React, { useEffect } from 'react'
import { useGlobal } from 'reactn'

import { svc, constants } from '../vendors'
import FileExplorerNode from './FileExplorerNode'
import './FileExplorer.scss'

export default function FileExplorer() {
  const [rootNode, setRootNode] = useGlobal('rootNode')
  const [, setCurrentFolder] = useGlobal('currentFolder')
  const [, setLoading] = useGlobal('loading')

  useEffect(() => {
    const rootFolder = constants.FILE_EXPLORER_ROOT
    setLoading(true)
    svc
      .showFolderTree(rootFolder, 3)
      .then(resp => setRootNode(resp))
      .catch(e => e)
      .finally(() => setLoading(false))
  }, [])

  function exploreFolder(
    path,
    nodeIsFile,
    nodeChildren,
    changeCurrentFolder = false
  ) {
    if (nodeIsFile) return

    setLoading(true)
    const currentFolderInTree = findNodeBy(rootNode, node => node.path === path)
    if (nodeChildren && nodeChildren.length) {
      if (changeCurrentFolder) setCurrentFolder(currentFolderInTree)
      setLoading(false)
      return
    }
    svc.showFolderTree(path, 1).then(resp => {
      currentFolderInTree.children = [...resp.children]
      setRootNode({ ...rootNode })
      if (changeCurrentFolder) setCurrentFolder(resp)
    })
    .finally(() => setLoading(false))
  }

  function findNodeBy(treeRoot, predicate) {
    if (predicate(treeRoot)) return treeRoot

    const childFolders = treeRoot.children.filter(node => !node.isFile)
    // find deeper level
    for (const folder of childFolders) {
      // eslint-disable-next-line no-undef
      const foundNode = findNodeBy(folder, predicate)
      if (foundNode) return foundNode
    }

    return null
  }

  return (
    <table className="FileExplorer">
      <tbody>
        <tr>
          <td width="260px" align="left" valign="top">
            <ul className="ztree">
              <FileExplorerNode
                // {...rootNode}
                // eslint-disable-next-line react/no-children-prop
                children={rootNode.children}
                path={rootNode.path}
                name={rootNode.name}
                isFile={rootNode.isFile}
                nodeOnClick={exploreFolder}
                rootName="/"
              />
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
