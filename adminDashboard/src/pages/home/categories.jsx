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
import CheckboxTree from "react-checkbox-tree";
import {
  useCreateCatMutation,
  useUpdateCatMutation,
} from "../../api/actions/category";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MainPage = () => {
  const theme = useTheme();
  const allCategories = useSelector((state) => state.category.categories);
  const [Open, setOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState(0);
  const [Disable, setDisable] = useState(false);
  const [Img, setImg] = useState(null);
  const [expanded, setExpanded] = useState([]);
  const [checked, setChecked] = useState([]);
  const [updatedCategory, setUpdatedCategory] = useState(false);
  const [expandedArray, setExpandedArray] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const ImgName = Img ? Img.name.slice(0, 9) : false;
  const handleClose = () => {
    setOpen(false);
    setCategory(0);
    setError("");
    setImg(null);
    setName("");
  };
  const categoryList = (cats, option = []) => {
    for (let cat of cats) {
      if (cat.children?.length > 0) {
        option.push({ _id: cat._id, value: cat.name, parentId: cat.parentId });
        categoryList(cat.children, option);
      } else {
        option.push({ _id: cat._id, value: cat.name, parentId: cat.parentId });
      }
    }
    return option;
  };
  useEffect(() => {
    const cat = categoryList(allCategories);
    const checkedArray = [];
    const expandedArray = [];
    let mounted = true;
    checked.length > 0 &&
      checked.forEach((item, i) => {
        const category = cat.find((value, _i) => item === value._id);
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((item, i) => {
        const category = cat.find((value, _i) => item === value._id);
        category && expandedArray.push(category);
      });
    mounted && setExpandedArray(expandedArray);
    mounted && setCheckedArray(checkedArray);
    return () => (mounted = false);
  }, [checked, expanded]);
  const handleCloseUpdatedCategory = () => {
    setUpdatedCategory(false);
  };
  const [error, setError] = useState("");
  const [createCat] = useCreateCatMutation();
  const [updateCat] = useUpdateCatMutation();
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
  const styledModel = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "750px",
    bgcolor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "100%",
  };
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
      setDisable(false);
    } else if (Name && Img && !Pic) {
      setError("enter a valid image please");
    } else {
      setError("please enter a category name");
    }
  };
  const handleUpdateCategory = async () => {
    setDisable(true);
    setUpdatedCategory(false);
    try {
      const form = new FormData();
      expandedArray.forEach((item) => {
        form.append("name", item.value);
        form.append("_id", item._id);
        form.append("parentId", item.parentId);
        form.append("type", item.type);
      });
      checkedArray.forEach((item) => {
        form.append("name", item.value);
        form.append("_id", item._id);
        form.append("parentId", item.parentId);
        form.append("type", item.type);
      });
      const req = await updateCat(form);
      console.log(req);
    } catch (er) {
      console.log(er);
    } finally {
      setDisable(false);
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
                  multiple={false}
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
        <Box sx={styledModel}>
          <Stack
            sx={{
              mb: "5px",
              right: 0,
              display: "flex",
              flexDirection: "row-reverse",
            }}
            direction="row"
            display="flex"
            justifyContent="space-between"
          >
            <IconButton onClick={handleCloseUpdatedCategory} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box
            className="editBox"
            sx={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {expandedArray.length > 0 && (
              <>
                <Typography sx={{ mb: "20px" }} variant="h6">
                  Expanded Categories
                </Typography>
                {expandedArray.map((item, i) => {
                  return (
                    <Stack
                      key={i}
                      sx={{ mb: "15px" }}
                      direction="row"
                      spacing={3}
                    >
                      <TextField
                        size="small"
                        sx={{ width: "30%" }}
                        label="Category Name"
                        value={expandedArray[i].value}
                        onChange={(e) =>
                          setExpandedArray((p) => {
                            p[i].value = e.target.value;
                            return [...p];
                          })
                        }
                      />
                      <select
                        className="boringSelect"
                        style={{ width: "200px" }}
                        id="cats-select"
                        value={expandedArray[i].parentId || 0}
                        onChange={(e) => {
                          setExpandedArray((p) => {
                            p[i].parentId = e.target.value;
                            return [...p];
                          });
                          setError("");
                        }}
                      >
                        <option className="defaultOp op" value={0} disabled>
                          select a category
                        </option>
                        {categoryList(allCategories).map((m) => {
                          return (
                            <option className="op" value={m._id} key={m._id}>
                              {m.value}
                            </option>
                          );
                        })}
                      </select>
                      <Select
                        size="small"
                        defaultValue={0}
                        sx={{ width: "200px", mt: "10px" }}
                        id="updatedCats-select"
                        value={expandedArray[i].type || 0}
                        renderValue={(selected) => {
                          if (selected === 0) {
                            return <em>category type</em>;
                          }

                          return selected;
                        }}
                        onChange={(e) => {
                          setExpandedArray((p) => {
                            p[i].type = e.target.value;
                            return [...p];
                          });
                        }}
                      >
                        <MenuItem value={0} disabled>
                          category type
                        </MenuItem>
                        <MenuItem value="product">product</MenuItem>
                        <MenuItem value="page">page</MenuItem>
                        <MenuItem value="store">store</MenuItem>
                      </Select>
                    </Stack>
                  );
                })}
              </>
            )}
            {checkedArray.length > 0 && (
              <>
                <Typography sx={{ mb: "20px" }} variant="h6">
                  Checked Categories
                </Typography>
                {checkedArray.map((item, i) => {
                  return (
                    <Stack
                      key={i}
                      sx={{ mb: "15px" }}
                      direction="row"
                      spacing={3}
                    >
                      <TextField
                        size="small"
                        sx={{ width: "30%" }}
                        label="Category Name"
                        value={checkedArray[i].value}
                        onChange={(e) =>
                          setCheckedArray((p) => {
                            p[i].value = e.target.value;
                            return [...p];
                          })
                        }
                      />
                      <select
                        className="boringSelect"
                        style={{ width: "200px" }}
                        id="cats-select"
                        value={checkedArray[i].parentId || 0}
                        onChange={(e) => {
                          setCheckedArray((p) => {
                            p[i].parentId = e.target.value;
                            return [...p];
                          });
                          setError("");
                        }}
                      >
                        <option className="defaultOp op" value={0} disabled>
                          select a category
                        </option>
                        {categoryList(allCategories).map((m) => {
                          return (
                            <option className="op" value={m._id} key={m._id}>
                              {m.value}
                            </option>
                          );
                        })}
                      </select>
                      <Select
                        size="small"
                        defaultValue={0}
                        sx={{ width: "200px", mt: "10px" }}
                        id="updatedCats-select"
                        value={checkedArray[i].type || 0}
                        renderValue={(selected) => {
                          if (selected === 0) {
                            return <em>category type</em>;
                          }

                          return selected;
                        }}
                        onChange={(e) => {
                          setCheckedArray((p) => {
                            p[i].type = e.target.value;
                            return [...p];
                          });
                        }}
                      >
                        <MenuItem value={0} disabled>
                          category type
                        </MenuItem>
                        <MenuItem value="product">product</MenuItem>
                        <MenuItem value="page">page</MenuItem>
                        <MenuItem value="store">store</MenuItem>
                      </Select>
                    </Stack>
                  );
                })}
              </>
            )}
          </Box>
          <Stack
            m="20px 0 0"
            direction="row"
            display="flex"
            flexDirection="row-reverse"
          >
            <Button
              variant="contained"
              onClick={handleUpdateCategory}
              size="small"
              disabled={Disable}
            >
              save Changes
            </Button>
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
      <div style={{ display: "flex" }}>
        <button onClick={() => setUpdatedCategory(true)}>Edit</button>
        <button>delete</button>
      </div>
    </Container>
  );
};

export default MainPage;
