import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Graph from "../Graph";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlineClose } from "react-icons/ai";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogGraph(props) {
  const handleClose = () => {
    props.setDiagOpen(false);
  };
  const [dialogLoad, setdialogLoad] = React.useState(true);

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        fullScreen
        open={props.diagOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* <DialogTitle>Optional sizes</DialogTitle> */}
        <DialogContent>
          {/* <AppBar
            sx={{
              position: "sticky",
              top: 0,
              backgroundImage: "url( #947add, #e85555)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          > */}{" "}
          {/* <Toolbar> */}
          <IconButton
            sx={{ position: "sticky", top: 0 }}
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            fontSize="large"
          >
            <AiOutlineClose />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textAlign: "center" }}
            variant="h3"
            component="div"
          >
            {props.description}
          </Typography>
          <DialogContent>
            {/* <LiveSearch
              topic={props.topic}
              setselectedOptionId={props.setselectedOptionId}
              // handleOptionClick={props.selectedOptionId}
              // setDisplayStart={props.valueStart}
              // setDisplayEnd={props.valueEnd}
            /> */}

            {/* {dialogLoad && (
              <div className="parent-container">
                <motion.div
                  className="boxi"
                  animate={{
                    scale: [1, 1.6, 1.6, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["10%", "10%", "50%", "50%", "10%"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                ></motion.div>
              </div>
            )} */}

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
