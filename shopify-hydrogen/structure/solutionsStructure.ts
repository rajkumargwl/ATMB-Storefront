import {ListItemBuilder} from 'sanity/structure'

import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Solutions')
    .id('solutionsItem') // ✅ unique ID for sidebar
  
    .child(
      S.document()
        .schemaType('solutions')
        .documentId('solutions') // ✅ still singleton
    )
)
