import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './searchFilters.css'

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClick1 = (first) => {
    if(first === 20) {
      this.props.GPAfilter('price',first, 50)
    }else {
    this.props.GPAfilter('price',first, first+50)
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
          <div  className="buttonn">
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color='primary'
        >
          Price
        </Button>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => {
            this.handleClick1(200)
            this.handleClose()}}>200 JD</MenuItem>
          <MenuItem onClick={() => {
            this.handleClick1(150)
            this.handleClose()}}> 150 JD</MenuItem>
          <MenuItem onClick={() => {
            this.handleClick1(100)
            this.handleClose()}}>100 JD</MenuItem>
          <MenuItem onClick={() => {
            this.handleClick1(50)
            this.handleClose()}}>50 JD</MenuItem>
            <MenuItem onClick={() => {
            this.handleClick1(20)
            this.handleClose()}}>20 JD</MenuItem>

        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;