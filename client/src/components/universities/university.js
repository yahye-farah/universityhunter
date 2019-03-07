import React, {Component} from 'react';
////////////////
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import UniversityCard from './universityCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const University = (props) => {
    const { classes, theme } = props;
    return (
    <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
              <Grid  item>
                <UniversityCard />
                <h5>Jordan University</h5>
              </Grid>
              <Grid  item>
                <UniversityCard/>
                <h5>Jordan University</h5>
                
              </Grid>
          
          </Grid>
        </Grid> 
    </Grid>
    )
}

University.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(University);
