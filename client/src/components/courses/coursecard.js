import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 200,
    maxWidth: 300, 
    maxHeight:300,
    display: "fluid"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 100,
    width: 250
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class MediaControlCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen : true
    }
  }
  onClickHandler = (courseId) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
    if(this.state.isOpen) {
      this.props.increaseViewers(courseId)
    }
    
  }
  render() {
    const { classes, theme } = this.props;
    const course = this.props.course;
    return (
      <div>
      <Grid>
        <Grid></Grid>
        <Grid>
        <Card className={classes.card}>
        <Paper className={classes.paper}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {course.university.universityName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {course.courseName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Location:{course.university.location.countryName} CreditPrice:{" "}
                {course.price} JD, GPA:{course.GPA}%
              </Typography>
            </CardContent>
            <IconButton color="primary">{course.courseLevel}</IconButton>
            <ExpansionPanel onClick = {() => {this.onClickHandler(course._id)}}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Description <button>View</button>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{course.description}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
          </Paper>
          <Paper className={classes.paper}>
           
          <img
          className={classes.cover}
            src={require("../../images/jordan.png")}
           
          /> 
          </Paper>
        </Card>
        </Grid>
        </Grid>
        
        <Divider></Divider>
        </div>
    );
  }
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
