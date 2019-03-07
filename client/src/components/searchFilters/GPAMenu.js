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

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClick2 = (gpa) => {
    this.props.GPAfilter('gpa',gpa,gpa+10)
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <div className = "buttonn">
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color='inherit'
        >
          GPA
        </Button>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => {
            this.handleClick2(90)
            this.handleClose()}}>90 %</MenuItem>
          <MenuItem  onClick={() => {
            this.handleClick2(80)
            this.handleClose()}}>80 %</MenuItem>
          <MenuItem  onClick={() => {
            this.handleClick2(70)
            this.handleClose()}}>70 %</MenuItem>
          <MenuItem  onClick={() => {
            this.handleClick2(60)
            this.handleClose()}}>60 %</MenuItem>

        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;