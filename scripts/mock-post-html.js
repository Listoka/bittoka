const postData = require('./mock-post-data.json')
const { headings, paragraphs } = postData[0]

function createPostHtml(minPostSize, maxPostSize) {
  const blocks = []
  const postSize = Math.floor(Math.random() * (maxPostSize - minPostSize + 1)) + minPostSize
  while (blocks.length < postSize) {
    if (Math.random() < 0.3) blocks.push(getHeading())
    blocks.push(getParagraph())
  }

  return blocks.join('\n')
}

function getHeading() {
  let h = headings[Math.floor(Math.random() * headings.length)]

  return `<h2>${h}</h2>`
}

function getParagraph() {
  let p = paragraphs[Math.floor(Math.random() * paragraphs.length)]
  let num = Math.floor(Math.random() * 100)

  if (num < 20) return `<pre><code>${p}</code></pre>`
  if (num < 35) return `<blockquote>${p}</blockquote>`

  return `<p>${p}</p>`
}

function getTitleString() {
  return headings[Math.floor(Math.random() * headings.length)]
}

function getTeaser() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)]
}

module.exports = {
  createPostHtml,
  getTitleString,
  getTeaser,
}
