// /structure/headerStructure.ts
import {ListItemBuilder} from "sanity/structure-builder"

const header = (S: any) =>
  S.listItem()
    .title("Header")
    .child(
      S.document()
        .schemaType("header")
        .documentId("header") // 👈 always the same ID
    )

export default header