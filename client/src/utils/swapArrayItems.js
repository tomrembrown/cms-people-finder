export default function swapArrayItems(array, index1, index2) {
  let tempItem = array[index2]
  array[index2] = array[index1]
  array[index1] = tempItem
}
