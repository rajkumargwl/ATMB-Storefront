import {ListItemBuilder, StructureResolver} from 'sanity/structure';
import collections from './collectionStructure'
import colorThemes from './colorThemeStructure'
import home from './homeStructure'
import header from './headerStructure'
import footer from './footerStructure'
import pages from './pageStructure'
import products from './productStructure'
import settings from './settingStructure'
import solutionsStructure from './solutionsStructure'
//structure -> index.tsx
/**
 * Structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schema types progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'collection',
    'colorTheme',
    'home',
    'header',
    'footer',
    'solutions',
    'media.tag',
    'page',
    'product',
    'productVariant',
    'settings',
  ].includes(id)
}
 
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      solutionsStructure(S, context),
      home(S, context),
      header(S),
      footer(S),
      pages(S, context),
      // S.documentTypeList('page').title('Pages'),
      S.divider(),
      collections(S, context),
      products(S, context),
      S.divider(),
      colorThemes(S, context),
      S.divider(),
      settings(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
 
