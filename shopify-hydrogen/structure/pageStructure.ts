import {DocumentsIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure';
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .schemaType('page')
    .child(S.documentTypeList('page'))
)
// pageStructure.ts




// import { DocumentIcon } from '@sanity/icons';
// import { ListItemBuilder } from 'sanity/structure';
// import defineStructure from '../utils/defineStructure';

// export default defineStructure<ListItemBuilder>((S) =>
//   S.listItem()
//     .title('Page')
//     .icon(DocumentIcon)
//     .schemaType('page')          // must match your schema name exactly
//     .child(
//       S.document()
//         .schemaType('page')      // must match your schema name
//         .documentId('singleton-page') // unique
//     )
// );

