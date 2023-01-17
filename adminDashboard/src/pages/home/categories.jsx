import {
  Button,
  Modal,
  Typography,
  Container,
  Box,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Input,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

const MainPage = () => {
  const [Open, setOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState([]);
  const [Img, setImg] = useState(null);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const theme = useTheme();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    const data = {
      Name,
      Category,
      Img,
    };

    console.log(data);
  };
  const categories = [
    {
      name: "phones",
      children: [
        {
          name: "electronics",
          children: [
            {
              name: "laptops",
              children: [],
            },
          ],
        },
        {
          name: "iphones",
          children: [],
        },
        {
          name: "realme",
          children: [],
        },
      ],
    },
    {
      name: "watches",
      children: [],
    },
  ];
  const catsDeploy = (param) => {
    return param.map((p) => {
      return (
        <React.Fragment key={p.name}>
          <li>{p.name}</li>
          {p.children.length > 0 && <ul>{catsDeploy(p.children)}</ul>}
        </React.Fragment>
      );
    });
  };
  return (
    <Container sx={{ ml: "133px" }}>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={Open} onClose={handleClose}>
        <Box sx={style}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6">Add new category</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: "20px", width: "100%" }}
          >
            <TextField
              label="Category Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>

            <Select
              multiple
              sx={{ width: "200px", mt: "10px" }}
              id="demo-simple-select"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="" disabled>
                zero
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Button
              className="files"
              color="primary"
              sx={{
                display: "block",
                position: "relative",
                width: "200px",
                marginTop: "10px",
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <input
                style={{ width: "100%", height: "100%", opacity: "0" }}
                id="upload"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </Button>
            <Stack
              mt="30px"
              width="100%"
              direction="row"
              justifyContent="flex-end"
            >
              <Button variant="contained" type="submit">
                save changes
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      {categories && <ul>{catsDeploy(categories)}</ul>}
    </Container>
  );
};

export default MainPage;
