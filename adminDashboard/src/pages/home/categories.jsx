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
import {
  IoCheckbox,
  IoSquareOutline,
  IoArrowDown,
  IoArrowForward,
} from "react-icons/io5";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import { useCreateCatMutation } from "../../api/actions/category";
import React from "react";
import { useSelector } from "react-redux";
const MainPage = () => {
  const allCategories = useSelector((state) => state.category.categories);
  const [Cat, setCat] = useState(0);
  const [Open, setOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState(0);
  const [Disable, setDisable] = useState(false);
  const [Img, setImg] = useState(null);
  const [expanded, setExpanded] = useState([]);
  const [checked, setChecked] = useState([]);
  const [updatedCategory, setUpdatedCategory] = useState(false);
  const ImgName = Img ? Img.name.slice(0, 9) : false;
  const handleClose = () => {
    setOpen(false);
    setCategory(0);
    setError("");
    setImg(null);
    setName("");
  };
  const handleCloseUpdatedCategory = () => {
    setUpdatedCategory(false);
  };
  const [error, setError] = useState("");
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
    setDisable(true);
    const Pic = Img?.type?.split("/")[0] == "image" ? true : false;
    if (Name) {
      const data = {
        name: `${Name[0].toUpperCase()}${Name.slice(1)}`,
        parentId: Category,
        categoryImage: Img,
      };
      try {
        const req = await createCat(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setCategory(0);
      setError("");
      setImg(null);
      setName("");
      setCat((p) => ++p);
      setDisable(false);
    } else if (Name && Img && !Pic) {
      setError("enter a valid image please");
    } else {
      setError("please enter a category name");
    }
  };
  const catsDeploy = (param) => {
    return param.map((p) => {
      return {
        value: p._id,
        label: p.name,
        children: p.children.length > 0 ? catsDeploy(p.children) : [],
      };
    });
  };
  const categoryList = (cats, option = []) => {
    for (let cat of cats) {
      if (cat.children?.length > 0) {
        option.push({ _id: cat._id, value: cat.name });
        categoryList(cat.children, option);
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
              {categoryList(allCategories).map((m) => (
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
              <Button disabled={Disable} variant="contained" type="submit">
                save changes
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      {/* for editing */}
      <Modal open={updatedCategory} onClose={handleCloseUpdatedCategory}>
        <Box sx={style}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6">Add new category</Typography>
            <IconButton onClick={handleCloseUpdatedCategory} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
      </Modal>
      {allCategories && (
        <ul>
          {
            <CheckboxTree
              nodes={catsDeploy(allCategories)}
              checked={checked}
              expanded={expanded}
              onCheck={(e) => setChecked(e)}
              onExpand={(e) => setExpanded(e)}
              icons={{
                check: <IoCheckbox />,
                uncheck: <IoSquareOutline />,
                halfCheck: <IoCheckbox opacity="0.5" />,
                expandOpen: <IoArrowForward />,
                expandClose: <IoArrowDown />,
                parentClose: <FcFolder />,
                parentOpen: <FcOpenedFolder />,
              }}
            />
          }
        </ul>
      )}
    </Container>
  );
};

export default MainPage;
