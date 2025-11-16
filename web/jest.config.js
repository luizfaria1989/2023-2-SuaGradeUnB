const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Fornece o caminho para o seu app Next.js
  dir: './',
})

// Configurações customizadas do Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  
  // AQUI ESTÁ A CORREÇÃO
  moduleNameMapper: {
    // 1. Esta linha foi ADICIONADA.
    // Ela diz ao Jest que qualquer importação que começa com '@/'
    // deve ser resolvida a partir da pasta raiz (rootDir, que é a pasta 'web/').
    '^@/(.*)$': '<rootDir>/$1',
    
    // Mocks existentes que você já tinha:
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^html2canvas$': '<rootDir>/__mocks__/html2canvasMock.js'
  },
  
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
}

module.exports = createJestConfig(customJestConfig)