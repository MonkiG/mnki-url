import { defineConfig } from 'vitest/config'
// import { config } from 'dotenv'

// config()

export default defineConfig({

  test: {
    env: process.env,
    clearMocks: true,
    globals: true,
    setupFiles: ['dotenv/config']
  }

})
