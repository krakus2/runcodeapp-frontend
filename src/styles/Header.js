import styled from 'styled-components'
import { device } from './breakpoints'

export const HeaderWrapper = styled.div`
  display: grid;
  @media ${device.mobile} {
    grid-template-columns: 100%;
  }
  @media ${device.desktop} {
    grid-template-columns: 30% 70%;
  }
`

export const MyAppBar = styled.header`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #e0e4e7;
  box-sizing: border-box;
  padding: 0 50px;
`
