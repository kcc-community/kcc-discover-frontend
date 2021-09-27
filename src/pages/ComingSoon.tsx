import React, { FunctionComponent } from 'react'
import Col from '../components/Column'
import styled, { useTheme } from 'styled-components'
import { Text } from 'style'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


const ComingSoon: React.FunctionComponent = (props) => {
  const theme = useTheme();

  return (
    <Col style={{alignItems: 'center', height: '100vh', justifyContent: 'center', background: theme.colors.background}}>
      <div style={{position: 'relative'}}>
        <ClimbingBoxLoader size="5vw" color={theme.colors.primary} loading={true}/>
      </div>
      <Text color={theme.colors.primary} bold fontSize="5vw" mt="15vw">Coming Soon</Text>
    </Col>
  )
}

export default ComingSoon
