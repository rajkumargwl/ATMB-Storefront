import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    // projectId: 'm5xb8z9y',
    // dataset: 'production'
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET || "development",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
