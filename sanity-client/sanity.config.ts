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
import {documentInternationalization} from '@sanity/document-internationalization' 


const devOnlyPlugins = [visionTool()]

const savedDataset =
  typeof window !== 'undefined' && localStorage.getItem('sanity-dataset')

const dataset = savedDataset || 'development'


export default defineConfig({
  name: 'default',
  title: 'ATMB HQ',
  projectId: '15agngtk',
  dataset,
  plugins: [  
    structureTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    datasetSwitcherPlugin({datasets: ['production', 'development']}), 
    ...(isDev ? devOnlyPlugins : []),
    documentInternationalization({ // ✅ ADD THE PLUGIN HERE
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'en-es', title: 'Spanish'},
      ],
      // Replace with the names of the schemas you want to translate
      schemaTypes: ['header', 'footer','home', 'page'], // ✅ CONFIGURE YOUR SCHEMAS
    }),
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
      navbar: Navbar,
    },
  },
  
})

