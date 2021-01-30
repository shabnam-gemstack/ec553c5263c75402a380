import './App.css';
import { Switch,Route } from "react-router-dom";
import  AstroidDetail from "./components/astroidDetail";
import AstroidInfo from "./components/astroidInfo";
import {Typography,Grid} from "@material-ui/core";
function App() {
  return (
    <div className="App">
      <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" >Astroid Info</Typography>
      <Switch>
          <Route path="/" exact>
                <AstroidInfo />
           </Route>  
          <Route path="/astroidDetail">
                <AstroidDetail />
           </Route> 
      </Switch>
      </Grid>
    </div>
  );
}

export default App;
