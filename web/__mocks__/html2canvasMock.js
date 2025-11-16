// web/__mocks__/html2canvasMock.js
module.exports = jest.fn(() => Promise.resolve(
  // Retorna um "canvas" falso com a função "toDataURL"
  { toDataURL: () => 'data:image/png;base64,mockedimagedata...' }
));