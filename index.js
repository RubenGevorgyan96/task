function serialize(numbers) {
  let bitMask = Array(300).fill(0)

  for (const number of numbers) {
    bitMask[number - 1] = 1
  }

  let bitString = ""
  for (let i = 0; i < bitMask.length; i += 8) {
    let byte = 0
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (bitMask[i + j] || 0)
    }
    bitString += String.fromCharCode(byte)
  }

  return bitString
}

function deserialize(bitString) {
  let bitMask = []
  for (const char of bitString) {
    let byte = char.charCodeAt(0)
    for (let j = 0; j < 8; j++) {
      bitMask.push((byte >> (7 - j)) & 1)
    }
  }

  const numbers = []
  for (let i = 0; i < bitMask.length; i++) {
    if (bitMask[i] === 1) {
      numbers.push(i + 1)
    }
  }

  return numbers
}

function compressionRatio(original, compressed) {
  return ((original.length - compressed.length) / original.length) * 100
}

const testCases = [
  [1, 2, 3],
  [10, 20, 30, 40, 50],
  Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1),
  Array.from({ length: 300 }, (_, i) => i + 1)
]

testCases.forEach((testCase) => {
  const original = JSON.stringify(testCase)
  const compressed = serialize(testCase)
  const decompressed = deserialize(compressed)
  const ratio = compressionRatio(original, compressed)

  console.log(
    `Original: ${original.length} chars, Compressed: ${
      compressed.length
    } chars, Compression Ratio: ${ratio.toFixed(2)}%`
  )
})
