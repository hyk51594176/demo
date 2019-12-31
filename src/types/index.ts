
export interface LinePropAttr {
  fontSize: string
  lineHeight: string
  margin?: string
}
export interface TabPropAttr {
  primary?: boolean
}
export interface EnWordAttr {
  fontSize?: string
  lineHeight?: string
  marginBottom?: string
}

export interface LogoAttr {
  width: string
}
export interface ShowPicAttr {
  marginBottom?: string
}

export interface PositionListAttr {
  top: number
}
export interface IndexFooterAttr {
  isFixed?: boolean
}
export interface PositionData {
  firstCategory: string
  secondCategory: string
  positionId: number
  applyTimeDesc: string
  departmentName: string
  workLocation: string
  name: string
}
export interface UlListProps {
  positionData: Array<PositionData>
}
export interface ScrollNoticeProps extends UlListProps{
  delay?: number
}

