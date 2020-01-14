import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { useStore } from '@hanyk/usestore'
const test = (id: number) => (dispatch: any) => Promise.resolve(id).then(res => dispatch({ type: 'FETCH_DATA', payload: [id] }))
const App: React.FC = () => {
  const [state, dispatch] = useStore<{ episodes: [] }>()
  console.log(state)
  return (
    <>
      <Header />
      <Banner />
      <Content />
      <Footer />
      <button onClick={() => dispatch(test(123))}>test</button>
      <br />
      {state.episodes}
      <br />
      <button
        onClick={() =>
          dispatch({
            type: 'ADD_DATA',
            payload: [Date.now()]
          })
        }
      >
        test2
      </button>
    </>
  )
}

export default App
