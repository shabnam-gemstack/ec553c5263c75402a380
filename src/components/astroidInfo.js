import React from "react";
import { withRouter } from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Grid,Typography, TextField, Button, ListItem, List, ListItemAvatar,Avatar,ListItemSecondaryAction,ListItemText  } from "@material-ui/core";
import axios from 'axios';
import { GET_RANDOM_ASTROID } from "../api/api";
import CircularProgress from '@material-ui/core/CircularProgress';
export class AstroidF extends React.Component{
  constructor(props){
    super(props);
    this.state={
      astroidName:'',
      astroidList:[],
      loading:false
    }
  }
  
  getAstroidDetail= async(event) => {
    event.preventDefault();
    const { history } = this.props;
    const { astroidName } = this.props;
    history.push({
      pathname: "/astroidDetail",
      state: {
        astroidName: astroidName,
      },
    });
  }
  selectRandomAstroid(astroid){
    const { history } = this.props;
    history.push({
      pathname: "/astroidDetail",
      state: {
        astroidId: astroid.id,
      },
    });
  }
  getRandomAstroidList = async (event) => {
      event.preventDefault();
    this.setState({loading:true});
      await axios.get(GET_RANDOM_ASTROID)
        .then(res => {
          if(res.status === 200){
            const astroidListData = res.data;
            this.setState({astroidList:astroidListData.near_earth_objects,loading:false});
            console.log(this.state.astroidList)
          }
        }).catch(error =>{
          console.log(error)
          this.setState({loading:false,astroidList:[]});
        });
  }
 
  render(){
    const {astroidName,astroidList,loading}=this.state;
    const {classes}=this.props;
    console.log(this.state.astroidList)
  return (
    <Grid container direction="column" alignItems="center" justify="center" className={classes.astroidInfo}>
       <TextField id="standard-basic"
       variant="outlined" label="Enter Astroid Id"
        onChange={(e)=>{this.setState({astroidName:e.target.value})}} placeholder="Enter Astroid Id" />
      <div  style={{marginTop: '15px'}}>
       <Button color="primary"
        variant="contained"
        onClick={this.getAstroidDetail}
        disabled={!(astroidName.length > 0)}
        style={{marginLeft: '10px'}}>
          Submit</Button>
          <Button color="primary"
        variant="contained"
        onClick={e=>{this.getRandomAstroidList(e)}}
        style={{marginLeft: '2em'}}>
          Random Astroid</Button>
        </div>
        {loading ? (
        <div><CircularProgress color="primary" /></div>
      ) : (
        astroidList &&
        astroidList.length > 0 && (
          <>
            <Typography variant="h6" className={classes.title}>
              Select a Random Astroid
            </Typography>
            <div className={classes.randomAstroid}>
            <List>
                {astroidList.map((astroid) => {
                  return (
                    <ListItem key={astroid.id}>
                      <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={astroid.name}
                      />
                       <ListItemSecondaryAction>
                    <Button onClick={()=>{this.selectRandomAstroid(astroid,false)}} size="small" variant="outlined" color="primary">
                        Select
                    </Button>
                  </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </>
        )
      )}
     </Grid>
  );
  }
}
const AstroidFWithStyle=withStyles((theme)=> ({
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  randomAstroid: {
    backgroundColor: 'antiquewhite',
    width: '100%'

  },
  astroidInfo:{
    marginTop:"70px"
  }
}))(AstroidF);
export default withRouter(AstroidFWithStyle);
