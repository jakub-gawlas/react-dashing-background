import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DashingBackground from 'react-dashing-background' 

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      gradient: {
        stops: [
          {
            offset: 0,
            color: 'rgb(28,82,123)'
          },
          {
            offset: 1,
            color: 'rgb(18,53,80)'
          }
        ]
      },
      lines: {
        width: 2,
        color: 'rgb(47,115,162)',
        interval: 200,
        angle: Math.PI/2,
        offset: {
          x: 0,
          y: 0
        },
        dash: {
          segments: [10, 12],
          offset: 0
        },
        shadow: {
          color: 'white',
          blur: 0,
          offset: {
            x: 0,
            y: 0
          }
        }
      }
    }

    this.animationStep = this.animationStep.bind(this)
    window.requestAnimationFrame(this.animationStep)
  }

  animationStep(){
    const dashOffset = this.state.lines.dash.offset
    this.setState({
      lines: {
        ...this.state.lines,
        dash: {
          ...this.state.lines.dash,
          offset: dashOffset + 0.3
        }
      }
    })
    window.requestAnimationFrame(this.animationStep)
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '500px',
        overflow: 'hidden'
      }}>
          <DashingBackground {...this.state}>
            <p>Your browser doesn't support canvas</p>
          </DashingBackground>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
