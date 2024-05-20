import React from 'react'
import { Dialog, DialogTitle, Slide } from "@mui/material"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroup = ({ open, handleClose }) => {
    return (
        <Dialog fullWidth maxWidth="xs" open={open} TransitionComponent={Transition} keepMounted sx={{ P: 4 }}>


<DialogTitle>Create new group</DialogTitle>
        </Dialog>
    )
}

export default CreateGroup
