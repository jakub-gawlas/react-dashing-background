import React, { Component } from 'react'
import Canvas from './Canvas'

function _debounce(func, ms){
  let timeout;
  return function(){
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout( func, ms)
  }
}

class DashingBackground extends Component {
 constructor(props){
    super(props)
  }

  componentDidMount(){
    const { width, height } = this.elementContainer.getBoundingClientRect()
    this.state = { width, height }
    this.canvas = new Canvas({ ...this.state, ...this.props, canvas: this.elementCanvas})
    this.canvas.render()

    this.onWindowResize = _debounce(this.onWindowResize.bind(this), 100)
    this.onWindowResizeListener = window.addEventListener('resize', this.onWindowResize)
  }

  componentWillReceiveProps(nextProps){
    this.canvas.setProps(nextProps)
    this.canvas.render()
  }

  shouldComponentUpdate(){
    return false
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize(){
    const { width, height } = this.elementContainer.getBoundingClientRect()
    this.setState(
      { width, height }, 
      () => {
        this.canvas.setDimensions(this.state)
        this.canvas.render()
      }
    )
  }

  render(){
    return(
      <div 
        ref={ (container) => this.elementContainer = container}
        style={{width: '100%', height: '100%'}}
      >
        <canvas
          ref={ (canvas) => {
            this.elementCanvas = canvas
          } }
          width={this.props.width}
          height={this.props.height}
        >
          {this.props.children}
        </canvas>
      </div>
    )
  }
}

export default DashingBackground;
