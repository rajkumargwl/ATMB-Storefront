// /structure/footerStructure.ts
import {ListItemBuilder} from "sanity/structure-builder"

const footer = (S: any) =>
  S.listItem()
    .title("Footer")
    .child(
      S.document()
        .schemaType("footer")
        .documentId("footer") // single doc only
    )

export default footer