export default function findNodeBy(treeRoot, predicate) {
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
