
export interface HasChanges {
  code: number
  hasChanges: boolean
}

export interface GitBranch {
  branch: string
  username: string
}

export interface GitCommit {
  hash: string
  title: string
}

export interface NWABAPResult {
  abap_package: string
  abap_bsp: string
  abap_transport: string
}
