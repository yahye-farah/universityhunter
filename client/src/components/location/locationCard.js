import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationExpension from './locationExpension';
import CardActionArea from '@material-ui/core/CardActionArea';


const styles = theme => ({
  card: {
    display: "fluid"
  },
  details: {
    display: "fluid",
    flexDirection: "column",
    borderBottom: 0,
    maxHeight:300
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 25,
    display: "fluid"
  },
  controls: {
    display: "fluid",
    alignItems: "center",
    paddingTop:0,
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },

});

function MediaControlCard(props) {
  const { classes, theme } = props;
  return (
    <Card className={classes.card}>
    <CardActionArea>
        <ExpansionPanel defaultExpanded  className={classes.content} className={classes.details}>>
           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Location
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
             <LocationExpension  
             topCountries = {props.topCountries}
             seletedCountryorDepartment= {props.seletedCountryorDepartment}
             allCourses = {props.allCourses}
             />
           </ExpansionPanelDetails>
        </ExpansionPanel>
     
    </CardActionArea>
  </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
