import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import HeaderBar from './HeaderBar';
// Dialog
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

// Custom styling
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import "./index.css";

class App extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            data: [
                ["Get approval from client regarding proposal", 12, 3, "38%", 1, 14],
                ["Create database", 32, 2, "80%", 9, 7],
                ["Add list function to legal", 12, 0.45, "30%", 4, 12],
                ["New design for menu", 2, 2, "99%", 2, 5],
                ["System design", 6, 1, "45%", 5, 4],
                ["Architecture design", 13, 1, "65%", 7, 7],
                ["Analytics implementation", 12, 0.1, "87%", 4, 12],
                ["Refactor code in list view", 4, 0.5, "23%", 1, 4],
                ["Add dropdown menus", 7, 0.25, "12%", 1, 2],
                ["Login form functionality", 8, 2, "67%", 2, 1],
                ["Login form overlay", 2, 1.5, "89%", 2, 1],
                ["Upload source to cloud", 9, 2, "56%", 4, 9],
                ["Buy hosting", 32, 1, "26%", 1, 9],
                ["Gather user info", 32, 1, "2%", 8, 8],
                ["Add dropdown function to lists", 6, 0.25, "34%", 1, 3],
                ["Buy domain", 7, 2, "97%", 1, 3],
                ["Update React", 3, 1, "90%", 3, 6],
                ["Get approval from UX", 12, 3, "83%", 1, 12],
                ["Find UI framework", 2, 1, "51%", 4, 11],
                ["Fix responsive menu problem with tablets", 8, 0.75, "23%", 1, 10],
                ["Update database version", 5, 3, "88%", 8, 17]
              ]
        } 
      }

    addTask = (task,reach,impact,confidence,effort) => {
        //alert(reach + " " + impact + " " + confidence + " " + effort);
        let arr = [task, reach, impact, confidence, effort];
        var newArray = this.state.data.slice();    
        newArray.push(arr);   
        this.setState({data:newArray})
    }

    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
                '&:first-of-type': {
                    backgroundColor: "#000",
                  }
            }
          },
          MUIDataTableHeadCell: {
              fixedHeader: {
                backgroundColor: "#f5f5f5",
                color: "#000",
                textTransform: "uppercase"
              },
          },
          MUIDataTableSelectCell: {
              headerCell: {
                backgroundColor: "#f5f5f5",
              },
              fixedHeader: {
                backgroundColor: "#f5f5f5",
              }
          },
          MuiToolbar: {
            root: {
                backgroundColor: "#fff"
            }
          }
        }
      })   

  render() {
    const columns = ["Tasks", "Reach", "Impact", "Confidence", "Effort", "Score"];

    const data = this.state.data;

    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      fixedHeader: true,
      rowsPerPageOptions: [10, 20, 100]
    }; 

    return (
    <span id="rice">
    <HeaderBar />
    <MuiThemeProvider theme={this.getMuiTheme()}>
      <MUIDataTable
        title={"Product Board / Scoring Table"}
        data={data}
        columns={columns}
        options={options}
      />
      <FormDialog addNewTask={this.addTask}/>
      </MuiThemeProvider>
      </span>
    );
  }
}

const styles = theme => ({
    textField: {
        marginLeft: 16,
        marginRight: 16,
        width: 200,
      },
  });

// Dialog
class FormDialog extends React.Component {
  state = {
    open: false,
    task: "",
    reach: 0,
    impact: 0,        
    confidence: 0,
    effort: 0,
    score: 0
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAddTask = () => {
    this.setState({ open: false });
    this.props.addNewTask(this.state.task, this.state.reach, this.state.impact,this.state.confidence,this.state.effort)
  };

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen} className="add-button">
          Add task
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new task to the list, add numbers for each section. 
            </DialogContentText>
            <TextField
          id="standard-name"
          label="Task"
          value={this.state.task}
          onChange={this.handleChange('task')}
          margin="normal"
        />
            <TextField
          id="reach-number"
          label="Reach"
          value={this.state.reach}
          onChange={this.handleChange('reach')}
          type="number"
          margin="normal"
        />
            <TextField
          id="impact-number"
          label="Impact"
          value={this.state.impact}
          onChange={this.handleChange('impact')}
          type="number"
          margin="normal"
        />
            <TextField
          id="confidence-number"
          label="Confidence"
          value={this.state.confidence}
          onChange={this.handleChange('confidence')}
          type="number"
          margin="normal"
        />
            <TextField
          id="effort-number"
          label="Effort"
          value={this.state.effort}
          onChange={this.handleChange('effort')}
          type="number"
          margin="normal"
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleAddTask} color="primary">
              Add new task
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(FormDialog);

ReactDOM.render(<App />, document.getElementById("root"));