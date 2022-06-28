import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const Content = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    strong {
      display: block;
      font-size: 2rem;
      padding-bottom: 2rem;
    }
  }
`
