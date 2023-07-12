export interface ISharedTracker {
  files: string[]
  folders: { [name: string]: ISharedTracker }
}
