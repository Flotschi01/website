export interface CollectionConfig {
  id: string;          // The actual PocketBase collection name
  label: string;       // Display name in the admin sidebar/tabs
  textField: string;   // The main text field name in PB (e.g., 'content', 'body')
  hasImage: boolean;   // Whether this collection supports image uploads
  hasTitle?: boolean;  // Whether it needs a separate title field
}

export const adminCollections: CollectionConfig[] = [
  { id: 'home_posts', label: 'Home Page', textField: 'content', hasImage: true },
  { id: 'articles', label: 'Articles', textField: 'body', hasImage: true, hasTitle: true },
  { id: 'flyers', label: 'Flyers', textField: 'description', hasImage: true },
];