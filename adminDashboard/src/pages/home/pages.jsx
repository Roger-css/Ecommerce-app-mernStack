import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Container,
  useTheme,
  Select,
  MenuItem,
  TextField,
  Menu,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import categoryList from "../../helpers/categoryList";
import { useSelector, useDispatch } from "react-redux";
import usePrivate from "../../hooks/usePrivate";
const pages = () => {
  const [page, setPage] = useState(false);
  const allCategories = useSelector((state) => state.category.categories);
  const [Category, setCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [contained, setContained] = useState(false);
  const [contained2, setContained2] = useState(false);
  const [Img, setImg] = useState([]);
  const [banner, setBanner] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const axios = usePrivate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const menuItemStyling = {
    height: "20px",
    fontSize: "14px",
    width: "130px",
    position: "relative",
  };

  const handleSubmit = async () => {
    if (title && Category && desc && Img.length > 0 && banner.length > 0) {
      const cat = categoryList(allCategories).find((c) => c.value === Category);
      const { type, _id } = cat;
      const form = new FormData();
      form.append("title", title);
      form.append("description", desc);
      form.append("category", _id);
      form.append("type", type);
      for (const img of Img) {
        form.append("products", img);
      }
      for (const ban of banner) {
        form.append("banners", ban);
      }
      try {
        const req = await axios.post("page/create", form);
        setAnchorEl(null);
        setAnchorEl2(null);
        setBanner([]);
        setCategory(0);
        setDesc("");
        setImg([]);
        setPage(false);
        setTitle("");
        console.log(req);
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  };
  const renderCreatePage = () => {
    return (
      <Modal open={page} onClose={() => setPage(false)}>
        <Box sx={style}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6">Create Page</Typography>
            <IconButton onClick={() => setPage(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box>
            <TextField
              className="mt-10"
              label="page title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              className="mt-10"
              label="Description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <Select
              defaultValue={0}
              sx={{ width: "270px" }}
              id="cats-select"
              className="mt-10"
              value={Category}
              renderValue={(selected) => {
                if (selected === 0) {
                  return <em>select a category</em>;
                } else {
                  return selected;
                }
              }}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <MenuItem value={0}>select a category</MenuItem>
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
              mt="10px"
            >
              <Button
                className="files3"
                color="primary"
                onMouseEnter={() => setContained(true)}
                onMouseLeave={() => setContained(false)}
                variant={contained ? "contained" : "outlined"}
                sx={{
                  padding: "0",
                  display: "block",
                  position: "relative",
                  width: "200px",
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
                  onChange={(e) => setImg([...e.target.files])}
                  multiple={true}
                />
              </Button>
              {Img?.length > 0 && (
                <Stack
                  sx={{ alignItems: "center" }}
                  spacing={3}
                  direction="row"
                >
                  <DoneAllIcon color="success" />
                  <Button
                    sx={{
                      width: "120px",
                      height: "50px",
                      fontSize: "14px",
                      ml: "10px",
                    }}
                    endIcon={<KeyboardArrowUpIcon />}
                    onClick={(e) => setAnchorEl2(e.currentTarget)}
                  >
                    UPLOADED IMAGES
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl2}
                    open={Boolean(anchorEl2)}
                    onClose={() => setAnchorEl2(null)}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    {Img.map((p) => {
                      return (
                        <MenuItem
                          key={p.name}
                          sx={menuItemStyling}
                          onClick={() => null}
                        >
                          <Typography fontSize="inherit">
                            {p.name.length > 10
                              ? `${p.name.slice(0, 10).toLowerCase()}...`
                              : p.name.toLowerCase()}
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              width: "5px",
                              height: "5px",
                              transform: "translate(-50%, 50%)",
                            }}
                            onClick={() => {
                              setBanner((prev) => prev.filter((i) => i != p));
                            }}
                          >
                            <CloseIcon sx={{ width: "20px" }} />
                          </IconButton>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Stack>
              )}
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              display="flex"
              alignItems="center"
              marginTop="10px"
            >
              <Button
                className="files2"
                color="primary"
                onMouseEnter={() => setContained2(true)}
                onMouseLeave={() => setContained2(false)}
                variant={contained2 ? "contained" : "outlined"}
                sx={{
                  padding: "0",
                  display: "block",
                  position: "relative",
                  width: "200px",

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
                  onChange={(e) => setBanner([...e.target.files])}
                  multiple={true}
                />
              </Button>
              {banner?.length > 0 && (
                <Stack
                  sx={{ mt: "20px", alignItems: "center" }}
                  direction="row"
                  spacing={3}
                >
                  <DoneAllIcon color="success" />
                  <Button
                    sx={{
                      width: "120px",
                      height: "50px",
                      fontSize: "14px",
                      ml: "10px",
                    }}
                    endIcon={<KeyboardArrowUpIcon />}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    UPLOADED IMAGES
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    {banner.map((p) => {
                      return (
                        <MenuItem
                          key={p.name}
                          sx={menuItemStyling}
                          onClick={() => null}
                        >
                          <Typography fontSize="inherit">
                            {p.name.length > 10
                              ? `${p.name.slice(0, 10).toLowerCase()}...`
                              : p.name.toLowerCase()}
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              width: "5px",
                              height: "5px",
                              transform: "translate(-50%, 50%)",
                            }}
                            onClick={() => {
                              setBanner((prev) => prev.filter((i) => i != p));
                            }}
                          >
                            <CloseIcon sx={{ width: "20px" }} />
                          </IconButton>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Stack>
              )}
            </Stack>
            <Stack
              mt="30px"
              width="100%"
              direction="row"
              justifyContent="flex-end"
            >
              <Button variant="contained" onClick={handleSubmit}>
                save changes
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Container sx={{ ml: "133px", maxWidth: "100%", overflow: "hidden" }}>
      <Button onClick={() => setPage(true)}>create page</Button>
      {renderCreatePage()}
    </Container>
  );
};

export default pages;
