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
import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/usePrivate";
import { addAllCategories } from "../../state/reducers/category";
import { useDispatch, useSelector } from "react-redux";
const products = () => {
  const allCategories = useSelector((state) => state.category.categories);
  const axios = useAxios();
  const dispatch = useDispatch();
  const [Open, setOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState(0);
  const [Img, setImg] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);
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
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);
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
  const boolean = Quantity > 0 && Price > 0 && Name && Category ? true : false;
  const theme = useTheme();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Pic = Img.every((img) => {
      return img?.type?.split("/")[0] == "image";
    })
      ? true
      : false;
    if (boolean) {
      const data = {
        name: Name,
        quantity: Quantity,
        price: Price,
        category: Category,
        productPicture: Img,
        description: Description,
      };
      console.log(data);
      try {
        const req = await axios.post("product/create", data);
        console.log(req);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setCategory("");
      setError("");
      setImg(null);
      setName("");
    } else if (!Pic) {
      setError("please make sure all the images are valid");
    } else {
      setError("please fill all the fields with * on it");
    }
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
  const newImagesHandler = (e) => {
    for (let img of e) {
      setImg((p) => [...p, img]);
    }
  };
  return (
    <Container sx={{ ml: "133px" }}>
      <Button onClick={() => setOpen(true)}>Open model</Button>
      <Modal open={Open} onClose={handleClose}>
        <Box sx={style}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6">Add new asss</Typography>
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
              label="Category Name"
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
              label="Category Quantity"
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
              label="Category Price"
              value={Price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
            />
            <TextField
              className="mt-10"
              size="small"
              label="Category Description"
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
                <Stack sx={{ mt: "10px" }} direction="row" spacing={3}>
                  <DoneAllIcon color="success" />
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
    </Container>
  );
};

export default products;
