// /structure/headerStructure.ts
import {StructureBuilder} from 'sanity/structure'

export default (S: StructureBuilder) =>
  S.listItem()
    .title('Header')
    .id('header')
    .child(
      S.document()
        .schemaType('header')
        .documentId('header') // enforce singleton
    )
