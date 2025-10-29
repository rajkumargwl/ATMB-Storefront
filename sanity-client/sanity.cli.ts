import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '15agngtk',
    dataset: process.env.SANITY_DATASET || "development",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
