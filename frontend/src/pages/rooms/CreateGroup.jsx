import React from 'react'
import * as Yup from "yup";
import toast from "react-hot-toast";
import TextField from '@mui/material/TextField';
import { useState } from "react";



import {
  Slide, Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from '../../components/hook-form/FormProvider';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { useCreateGroup } from '../../hooks/useCreateGroup';



const CreateGroupForm = ({ handleClose }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }


    try {
      const res = await fetch(`/api/users?search=${search}`);
      const data = await res.json();
      console.log(data)
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <Stack>
      <Stack spacing={3} sx={{ pt: 2 }}>
        <TextField id="outlined-basic" label="Tên nhóm" variant="outlined" onChange={e => setGroupChatName(e.target.value)} />
        <TextField id="outlined-basic" label="Thành viên" variant="outlined" onChange={e => handleSearch(e.target.value)} />
        <Stack
          spacing={2}
          direction={"row"}
          alignItems="center"
          justifyContent={"end"}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 2 }}
    >
      <DialogTitle>{"Create New Group"}</DialogTitle>

      <DialogContent >
        {/* Create Group Form */}
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup
