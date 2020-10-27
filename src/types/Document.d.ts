export default interface MarkdownDocument {
  name: string;
  owner: string;
  created: Date;
  markdown: string;
  tags: string[];
  users: Record<string, ('READ' | 'UPDATE' | 'DELETE')[]>
}