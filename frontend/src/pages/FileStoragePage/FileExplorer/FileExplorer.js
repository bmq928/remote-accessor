import React, { useEffect } from 'react'
import { useGlobal } from 'reactn'

import { svc, constants } from '../vendors'
import FileExplorerNode from './FileExplorerNode'
import './FileExplorer.scss'

export default function FileExplorer() {
  const [rootNode, setRootNode] = useGlobal('rootNode')
  const [, setCurrentFolder] = useGlobal('currentFolder')

  useEffect(() => {
    const rootFolder = constants.FILE_EXPLORER_ROOT
    svc
      .showFolderTree(rootFolder, 1)
      .then(resp => setRootNode(resp))
      .catch(e => e)
  }, [])

  function nodeOnClick(path, nodeIsFile, nodeChildren) {
    if(nodeChildren && nodeChildren.length) return
    if (nodeIsFile) {
      return
    }

    svc.showFolderTree(path, 1).then(resp => {
      setCurrentFolder(resp)

      const currentFolderInTree = findNodeBy(
        rootNode,
        node => node.path === path
      )
      currentFolderInTree.children = [...resp.children]
      setRootNode({...rootNode})
    })
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
                nodeOnClick={nodeOnClick}
                rootName="/"
              />
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
