import {defineConfig, isDev} from 'sanity'
import { datasetSwitcherPlugin } from './plugins/customDocumentActions/datasetSwitcher'

import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'
import Navbar from './components/studio/Navbar'
import {CustomLayout} from './plugins/customDocumentActions/customFooter'

const devOnlyPlugins = [visionTool()]

const savedDataset =
  typeof window !== 'undefined' && localStorage.getItem('sanity-dataset')

const dataset = savedDataset || 'development'


export default defineConfig({
  name: 'default',
  title: 'Shopify - 0dv7ud-pz',
  projectId: 'm5xb8z9y',
  dataset,
  plugins: [  
    structureTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },

  studio: {
    components: {
      // navbar: Navbar,
      layout: CustomLayout,
    },
  },
})