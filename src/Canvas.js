export default class Canvas {
  constructor({ canvas, width, height, gradient, lines }){
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.setDimensions({ width, height })
    this.setProps({ gradient, lines })
  }

  setDimensions({ width, height }){
    this.canvas.width = width
    this.canvas.height = height
    this.width = width
    this.height = height
  }

  setProps({ gradient, lines }){
    this.gradient = gradient
    this.lines = lines
  }

  getLinearGradient({ stops }){
    const linearGradient = this.context.createLinearGradient(0, 0, 0, this.height)
    stops.forEach( (stop) => linearGradient.addColorStop(stop.offset, stop.color))
    return linearGradient
  }

  drawGradient(gradient){
    const linearGradient = this.getLinearGradient(gradient)
    this.context.fillStyle = linearGradient
    this.context.fillRect(0, 0, this.width, this.height)
  }
  
  prepareDash({ segments, offset }){
    this.context.setLineDash(segments)
    this.context.lineDashOffset = offset
  }

  prepareShadow({ color, blur, offset }){
    this.context.shadowColor = color
    this.context.shadowBlur = blur
    this.context.shadowOffsetX = offset.x
    this.context.shadowOffsetY = offset.y 
  }

  prepareContextToDrawLines({ color, dash, shadow }){
    this.context.strokeStyle = color
    this.prepareDash(dash)
    this.prepareShadow(shadow)    
  }

  randomFromRange({min = 0, max = 10}){
    return Math.random()*Math.abs(max-min)+Math.min(min, max)
  }

  drawLine({x1, y1, x2, y2, width}){
    const lineWidth = typeof width === 'number' ? 
      width : 
      this.randomFromRange({ min: width.min, max: width.max}) 

    this.context.lineWidth = lineWidth
    this.context.beginPath()
    this.context.moveTo(x1, y1)
    this.context.lineTo(x2, y2)
    this.context.stroke()
  }

  calculateCountLines( { dimension, offset, interval, angle}){
    const countLines = ( (dimension + offset) / interval ) * angle
    return Math.ceil(countLines)
  }

  getCountLines({ offset, interval, angle }){
    const widthCountLines = this.calculateCountLines({ dimension: this.width, offset: offset.x, interval, angle })
    const heightCountLines = this.calculateCountLines({ dimension: this.height, offset: offset.y, interval, angle })
    return Math.max(heightCountLines, widthCountLines)
  }

  drawLines({ width: lineWidth = 1, interval, angle, offset }){
    this.prepareContextToDrawLines(arguments[0])

    const centerWidth = this.width/2
    const countLines = this.getCountLines({ offset, interval, angle })
    const offsetCountLines = Math.floor(centerWidth/interval)

    //[...Array(countLines)].forEach( (_, idx) => {
    for(let i = 0; i<=countLines * 2; ++i){
      const k = i - countLines - offsetCountLines
      const lineProps = {
        x1: centerWidth + interval * k,
        y1: -offset.y,
        x2: centerWidth + interval * k + angle * (this.height + offset.y),
        y2: this.height
      }
      this.drawLine({...lineProps, width: lineWidth})
    }

    for(let i = 0; i<=countLines * 2; ++i){
      const k = i - countLines + offsetCountLines
      const lineProps = {
        x1: centerWidth + interval * k,
        y1: -offset.y,
        x2: centerWidth + interval * k - angle * (this.height + offset.y),
        y2: this.height
      }
      this.drawLine({...lineProps, width: lineWidth})
    }
  }

  render(){
    this.drawGradient(this.gradient)        
    this.drawLines(this.lines)
  }
}