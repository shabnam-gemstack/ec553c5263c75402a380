import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { GET_ASTROID_DETAIL } from "../api/api";
import {Grid,Typography,Card,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,CircularProgress,Paper} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

export class AstroidDetail extends React.Component{
  constructor(props){
  const { location } = props;
    super(props);
    this.state={
      astroidId:location.state.astroidId,
      loading:false,
      astroidDetails:null,
      error:false
    }
  }
  componentDidMount() {
  this.callFunction();
  }
  callFunction = () => {
    this.setState({loading:true});
  
  let url = GET_ASTROID_DETAIL;
  url = url.replace("astroidId", this.props.location.state.astroidId);
     axios.get(url)
      .then(res => {
              console.log(res)
              this.setState({loading:false,astroidDetails:res.data});
              }).catch (error =>{
                this.setState({loading:false,error:true,astroidDetails:null})})
  }
  render(){
  const { classes } = this.props;
  const{loading,astroidDetails,error}=this.state;
  return (
    <div>
     Astroid Details <div className="card"
       onClick={()=>{this.props.history.push("/")}}> <span style={{textDecoration : 'underline',cursor:'pointer' }}>Back</span></div>
      {loading ? (
        <div>
          {" "}
          <CircularProgress color="primary"></CircularProgress>{" "}
        </div>
      ) : astroidDetails ? (
        <Card variant="outlined" className={classes.astroidDetail}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Typography variant="body1">Name :{astroidDetails?.name} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Nasa JPL URL : {astroidDetails?.nasa_jpl_url}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Potentially Hazardous Asteroid :{astroidDetails?.is_potentially_hazardous_asteroid
                  ? "Yes"
                  : "No"}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      ) : (
       <h4>No Record Found.</h4>
      )}
    </div>
  );
      }
};
const AstroidDetailWithStyle = withStyles((theme) => ({
  astroidDetail: {
    width: '50%',
    margin: 'auto',
    textAlign: 'left',
    border: 'none',
    marginTop: '94px'
  },
  card:{
    flexDirection:'row',
    justifyContent:'flex-start',
    display:'flex'
  }
}))(AstroidDetail);
export default withRouter(AstroidDetailWithStyle);
