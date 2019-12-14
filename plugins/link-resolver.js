export default function(doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'post') {
    return '/post/' + doc.uid
  }

  return '/not-found'
}
