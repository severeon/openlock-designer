import React from 'react'

function convertFromUnitsToPx (units) {
  if (units <= 0) return 0
  return (units * 24) + 'px'
}

class RectangularTile extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      rotation: 0
    }

    this.$el
    this.onDoubleClick = this.onDoubleClick.bind(this)

    this.rotation = 0
  }

  onDoubleClick (e) {
    let {rotation} = this.state

    rotation += 90
    if (rotation >= 360) {
      rotation = 0
    }

    this.$el.setAttribute('data-rotation', rotation)
    this.setState({ rotation })
  }

  render () {
    let styles = {
      width: convertFromUnitsToPx(this.props.width),
      height: convertFromUnitsToPx(this.props.height),
      background: this.props.color || '#CCC'
    }

    let props = Object.assign({}, this.props, {
      onDoubleClick: this.onDoubleClick
    })

    delete props.color
    delete props.codename

    return (
      <div className='openforge-tile' style={styles} {...props} ref={el => { this.$el = el }}>
        <div className='content'>{this.props.children}</div>
      </div>
    )
  }
}

RectangularTile.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  codename: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  color: React.PropTypes.string
}

export default RectangularTile
