import React from 'react'
import { Configuration, OpenAIApi } from 'openai'
import logo from './images/OpenAI_Logo.svg'
import style from './index.css'
import * as ReactBootStrap from 'react-bootstrap'
function App() {
  const [res, setres] = React.useState('')
  const [spinning, setSpinning] = React.useState(false)
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const createCompletion = async () => {
    setSpinning(true)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: document.getElementById('prompt').value,
      temperature: 0,
      max_tokens: 2048,
    })
    setres(response.data.choices[0].text)
    setSpinning(false)
  }

  return (
  <div className='app'>
    <header>
    <img src={logo} className="logo"/>
</header>
  <main>
    <div className='content'>
    <div className='input-div'>
    <input placeholder="What's on your mind?" id="prompt" onKeyDown={e => {
      if (e.key === "Enter"){createCompletion()}
    }}>
    </input>
    <div className='spinner-div'>
    {spinning ? <ReactBootStrap.Spinner animation="border" role="status" className='spinner' size="sm">
    </ReactBootStrap.Spinner> : <button className='button' onClick={createCompletion}>&#62;</button>} 
      </div> 
      </div>  
    <p className='output'>
    {res !== "" ? res : "...Hello, Ask me Anything."}
    </p>
    </div>
  </main>
  </div>

  );
}

export default App;
