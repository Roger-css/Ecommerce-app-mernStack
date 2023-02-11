import {
  Button,
  Modal,
  Typography,
  Container,
  Box,
  IconButton,
  Alert,
  TextField,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import useAxios from "../../hooks/usePrivate";
import { useCreateCatMutation } from "../../api/actions/category";
import React from "react";
import { addAllCategories } from "../../state/reducers/category";
import { useDispatch, useSelector } from "react-redux";
const MainPage = () => {
  const allCategories = useSelector((state) => state.category.categories);
  const axios = useAxios();
  const dispatch = useDispatch();
  const [Cat, setCat] = useState(0);
  const [Open, setOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState(0);
  const [Img, setImg] = useState(null);
  const ImgName = Img ? Img.name.slice(0, 9) : false;
  const handleClose = () => {
    setOpen(false);
    setCategory(0);
    setError("");
    setImg(null);
    setName("");
  };
  const [error, setError] = useState("");
  useEffect(() => {
    const fetching = async () => {
      try {
        const req = await axios.get("category/get");
        dispatch(addAllCategories(req.data.ordeCtegories));
        console.log(req);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);
  const [createCat] = useCreateCatMutation();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Pic = Img?.type?.split("/")[0] == "image" ? true : false;
    if (Name) {
      const form = new FormData();
      const data = {
        name: Name,
        parentId: Category,
        categoryImage: Img,
      };
      try {
        const req = await createCat(data);
        console.log(req);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setCategory(0);
      setError("");
      setImg(null);
      setName("");
      setCat((p) => ++p);
    } else if (Name && Img && !Pic) {
      setError("enter a valid image please");
    } else {
      setError("please enter a category name");
    }
  };

  const catsDeploy = (param) => {
    return param.map((p) => {
      return (
        <React.Fragment key={p._id}>
          <li>{p.name}</li>
          {p.children.length > 0 && <ul>{catsDeploy(p.children)}</ul>}
        </React.Fragment>
      );
    });
  };
  const renderCats = (cats, option = []) => {
    for (let cat of cats) {
      if (cat.children.length > 0) {
        option.push({ _id: cat._id, value: cat.name });
        renderCats(cat.children, option);
      } else {
        option.push({ _id: cat._id, value: cat.name });
      }
    }
    return option;
  };
  return (
    <Container sx={{ ml: "133px" }}>
      <Button onClick={() => setOpen(true)}>Open model</Button>
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
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            ></TextField>
            <Select
              defaultValue={0}
              sx={{ width: "200px", mt: "10px" }}
              id="cats-select"
              value={Category}
              renderValue={(selected) => {
                if (selected === 0) {
                  return <em>select a category</em>;
                }

                return selected;
              }}
              onChange={(e) => {
                setCategory(e.target.value);
                setError("");
              }}
            >
              <MenuItem value={0} disabled>
                select a category
              </MenuItem>
              {renderCats(allCategories).map((m) => (
                <MenuItem value={m.value} key={m._id}>
                  {m.value}
                </MenuItem>
              ))}
            </Select>
            <Stack
              direction="row"
              spacing={3}
              display="flex"
              alignItems="center"
            >
              <Button
                className="files"
                color="primary"
                sx={{
                  padding: "0",
                  display: "block",
                  position: "relative",
                  width: "200px",
                  marginTop: "10px",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <input
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: "0",
                    padding: "10px 8px",
                  }}
                  id="upload"
                  type="file"
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                    setError("");
                  }}
                />
              </Button>
              {Img && (
                <Stack sx={{ mt: "10px" }} direction="row" spacing={3}>
                  <DoneAllIcon color="success" />
                  <Typography>{ImgName}</Typography>
                </Stack>
              )}
            </Stack>
            {error && (
              <Alert sx={{ mt: "10px" }} severity="error">
                {error}
              </Alert>
            )}

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
      {allCategories && <ul>{catsDeploy(allCategories)}</ul>}
    </Container>
  );
};

export default MainPage;
