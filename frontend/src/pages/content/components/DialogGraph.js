import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Graph from "../Graph";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlineClose } from "react-icons/ai";

// Component on home-screen (Click to see graph in full page (material UI used))
// Used Template from website!

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


// Function starts here
export default function DialogGraph(props) {
  const handleClose = () => {
    props.setDiagOpen(false);
  };
  const [dialogLoad, setdialogLoad] = React.useState(true);

  return (
    // <> another way <>
    <React.Fragment>  
      <Dialog
        fullScreen
        open={props.diagOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent>

          {/* <Toolbar> */}
          <IconButton
            sx={{ position: "sticky", top: 0 }}
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            fontSize="large"
          >
          {/* close Icon X */}
            <AiOutlineClose />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textAlign: "center" }}
            variant="h3"
            component="div"
          >
          {/* Description of plot - title */}
            {props.description}
          </Typography>
          <DialogContent>
            {/* To display graph use graph component! */}
            <Graph
              selectedOptionId={props.selectedOptionId}
              valueStart={props.valueStart}
              valueEnd={props.valueEnd}
              topic={props.topic}
              dialogLoad={dialogLoad}
              setdialogLoad={setdialogLoad}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Close</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
