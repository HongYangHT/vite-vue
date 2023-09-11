export interface RootStoreState {
  accessToken: string
  refreshToken: string
  roles: string[] // NOTE: 角色权限
  permissions: string[] // NOTE: 页面权限,
  userInfo: UserInfo
}

export interface LoginForm {
  username: string
  password: string
  code: string
}

export interface RefreshForm {
  refreshToken: string
}

export interface UserInfo {
  username: string
  img: string
  loginTime: string
  accessToken: string
  refreshToken: string
  roles: string[] // NOTE: 角色权限
  permissions: string[] // NOTE: 页面权限
}
