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
  Menu,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import useAxios from "../../hooks/usePrivate";
import { useDispatch, useSelector } from "react-redux";
import useInitialData from "../../hooks/useInitialData";
const products = () => {
  const allCategories = useSelector((state) => state.category.categories);
  const axios = useAxios();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [Open, setOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState(0);
  const [Img, setImg] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const products = useSelector((state) => state.product.products);
  const [productsModel, setProductsModel] = useState(false);
  const [CurrentProduct, setCurrentProduct] = useState(null);
  const initialData = useInitialData();
  const menuItemStyling = {
    height: "20px",
    fontSize: "14px",
    width: "130px",
    position: "relative",
  };
  const handleClose = () => {
    setOpen(false);
    setCategory(0);
    setError("");
    setImg([]);
    setName("");
  };
  const closing = () => {
    setAnchorEl(null);
  };
  const [error, setError] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const customStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "500px",
    overflowY: "scroll",
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const handleSubModel = (product) => {
    setCurrentProduct(product);
    setProductsModel(true);
  };
  const handleCloseSubModel = () => {
    setCurrentProduct(null);
    setProductsModel(false);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const boolean = Quantity > 0 && Price > 0 && Name && Category ? true : false;
  const theme = useTheme();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Pic = Img?.every((p) => {
      return p.type?.split("/")[0] == "image";
    })
      ? true
      : false;
    if (boolean) {
      const myData = new FormData();
      myData.append("name", Name);
      myData.append("quantity", Quantity);
      myData.append("price", Price);
      myData.append("category", Category);
      myData.append("description", Description);
      for (let img of Img) {
        myData.append("productPictures", img);
      }
      try {
        const req = await axios.post("product/create", myData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        initialData();
        console.log(req);
        handleClose();
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    } else if (!Pic) {
      setError("please make sure all the images are valid");
    } else {
      setError("please fill all the fields with * on it");
    }
  };
  const renderCats = (cats, option = []) => {
    for (let cat of cats) {
      if (cat.children?.length > 0) {
        option.push({ _id: cat._id, value: cat.name });
        renderCats(cat.children, option);
      } else {
        option.push({ _id: cat._id, value: cat.name });
      }
    }
    return option;
  };
  const newImagesHandler = (e) => {
    if (e.length > 1) {
      for (let img of e) {
        setImg((p) => [...p, img]);
      }
    } else {
      setImg((p) => [...p, e[0]]);
    }
  };
  const renderProducts = (table) => {
    return (
      <TableContainer sx={{ maxHeight: "450px" }} component={Paper}>
        <Table stickyHeader={true} sx={{ minWidth: 650 }} aria-label="products">
          <TableHead>
            <TableRow sx={{ color: theme.palette.common.white }}>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((e, i) => {
              return (
                <StyledTableRow
                  onClick={() => handleSubModel(e)}
                  key={e._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {e.name}
                  </TableCell>
                  <TableCell>{e.price || "--"}</TableCell>
                  <TableCell>{e.quantity || "--"}</TableCell>
                  <TableCell>{e.category?.name || "--"}</TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderProductModel = (e) => {
    return (
      <Modal
        sx={{ overflow: "hidden" }}
        open={productsModel}
        onClose={handleCloseSubModel}
      >
        <Box sx={customStyle}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6">Product details</Typography>
            <IconButton onClick={handleCloseSubModel} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box sx={{ mt: "20px" }}>
            <div className="flexy">
              <div className="width50">
                <label>name</label>
                <p>{e.name || "--"}</p>
              </div>
              <div className="width50">
                <label>price</label>
                <p>{e.price || "--"}</p>
              </div>
            </div>
            <div className="flexy">
              <div className="width50">
                <label>quantity</label>
                <p>{e.quantity || "--"}</p>
              </div>
              <div className="width50">
                <label>category</label>
                <p>{e.category?.name || "--"}</p>
              </div>
            </div>
            <div className="flexy">
              <div>
                <label>description</label>
                <p>{e.description || "--"}</p>
              </div>
            </div>
            <div className="flexy">
              <div>
                <label>product Pictures</label>
                <div className="mf">
                  <ImageList sx={{ width: "575px" }} cols={3} rowHeight={164}>
                    {e.productPictures.length > 0
                      ? e.productPictures.map((item) => (
                          <ImageListItem key={item.img}>
                            <img
                              src={`http://localhost:3000/uploads/${item.img}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`http://localhost:3000/uploads/${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt="image"
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))
                      : "--"}
                  </ImageList>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
    );
  };
  return (
    <Container sx={{ ml: "133px", maxWidth: "100%", overflow: "hidden" }}>
      <Button onClick={() => setOpen(true)}>Open model</Button>
      <Modal open={Open} onClose={handleClose}>
        <Box sx={style}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6">Add new product</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: "20px", width: "100%" }}
          >
            <TextField
              className="mt-10"
              size="small"
              required
              label="Product Name"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
            <TextField
              className="mt-10"
              size="small"
              type="number"
              required
              label="Product Quantity"
              value={Quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError("");
              }}
            />
            <TextField
              className="mt-10"
              size="small"
              required
              type="number"
              label="Product Price"
              value={Price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
            />
            <TextField
              className="mt-10"
              size="small"
              label="product Description"
              value={Description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
            />
            <Select
              defaultValue={0}
              size="small"
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
                size="small"
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
                  multiple
                  id="upload"
                  type="file"
                  onChange={(e) => {
                    newImagesHandler(e.target.files);
                    setError("");
                  }}
                />
              </Button>
              {Img?.length > 0 && (
                <Stack
                  sx={{ mt: "10px", alignItems: "center" }}
                  direction="row"
                  spacing={3}
                >
                  <DoneAllIcon color="success" />
                  <Button
                    sx={{ width: "120px", height: "50px", fontSize: "14px" }}
                    endIcon={<KeyboardArrowUpIcon />}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    UPLOADED IMAGES
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closing}
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
                              setImg((prev) => prev.filter((i) => i != p));
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
      <Box mt="10px">{products.length > 0 && renderProducts(products)}</Box>
      {CurrentProduct && productsModel && renderProductModel(CurrentProduct)}
    </Container>
  );
};

export default products;
