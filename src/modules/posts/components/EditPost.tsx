import { useState, useRef, ChangeEvent, MouseEvent,  useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { editSchema } from "../../../shared/validation/post";
import {
  Box,
  Button,
  FormControl,
  Input,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Item from "../../../components/Item";
import { handleSnackBar } from "../../../redux/slices/snackbar";
import { useAppDispatch } from "../../../redux/store/store";
import postAPI from "../../../shared/services/api/post";
import Spinner from "@/shared/widgets/Spinner";
import ClearIcon from '@mui/icons-material/Clear';
// import { defaultImage } from "./PostCard";


type Schema = z.infer<typeof editSchema>;


// async function urlToBlob(imageUrl: string) {
//   try {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     return blob;
//   } catch (error) {
//     console.error('Error converting URL to Blob:', error);
//   }
// }

// async function urlToFile(imageUrl: string, fileName: string, mimeType: string){
//   try {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     return new File([blob], fileName, { type: mimeType });
//   } catch (error) {
//     console.error("Error converting URL to File:", error);
//     return null;
//   }
// }


const EditPost = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params=useParams();
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['edit', params.id],
    queryFn: async() => await postAPI.fetchById(params.id || ''),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  const postData=data?.data;
  const [prevImage, setPrevImage]=useState<string>(postData?.image);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue
  } = useForm<Schema>({ resolver: zodResolver(editSchema) });
  const dispatch = useAppDispatch();
  const image = watch("image");
  const imagePreview = image instanceof File ? URL.createObjectURL(image) : prevImage; 

  useEffect(() => {
    if (isSuccess && postData) {
      // urlToFile(postData.image, "image.jpg", "image/jpeg").then((blob)=>{
      //   if(blob){
      //     setValue('image', blob);
      //   }
      // });
      setPrevImage(postData?.image);
      setValue('image', postData?.image);
      setValue('title', postData?.title);
      setValue('content', postData?.content);
      setValue('tags', postData?.tags.join(','));
    }
  }, [isSuccess, postData, setValue]);

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    try {
    setPrevImage(imagePreview);
      let fd!:any;
      if(prevImage){
        await postAPI.update(params?.id as string, {
          title: data.title,
          image: data?.image,
          content: data.content,
          tags: data.tags
        })
      } else {
        if(!data.image){
          fd=data;
        } else {
          fd = new FormData();
          fd.append("image", data?.image);
          fd.append("title", data.title);
          fd.append("content", data.content);
          fd.append("tags", data.tags); 
        }
        const response = await postAPI.update(params?.id as string, fd);
        if (response.data?.statusCode === 200) {
          dispatch(
            handleSnackBar({
              snackOpen: true,
              snackType: "success",
              snackMessage: "Post updated successfully"
            })
          );
        }
      }
      reset();     
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(
          handleSnackBar({
            snackOpen: true,
            snackType: "error",
            snackMessage: error?.message
          })
        );
      }
    }
  };

  const deleteImage=(e: MouseEvent<HTMLDivElement>)=>{ 
    e.stopPropagation();
    reset({ image: undefined });
    setPrevImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input value to allow re-selection of the same file
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };

  if(isLoading){
    return <Spinner />
  }
  
  return (
    <Item elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{ margin: "auto" }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Edit Post
          </Typography>
          <Box sx={{ textAlign: "left"}}>
            <FormControl
              fullWidth
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <Box
                onClick={handleClick}
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  margin: "4px 0",
                  alignItems: "center",
                  height: 300,
                  border: `${imagePreview ? ``: `4px dashed gray`}`,
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  backgroundColor: "#f2f2f2", 
                  backgroundImage:`url(${imagePreview })`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionX:"center"
                }}
              >
                 {imagePreview && (
                    <div 
                    onClick={deleteImage}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top:'10px',
                        background: '#fff',
                        borderRadius: '50%',
                        height: '30px',
                        width: '30px',
                        display:'grid',
                        placeItems: 'center' 
                    }}>
                    <ClearIcon />
                    </div>                  
                )}

                {(!imagePreview || !postData.image) && <>
                  <AddPhotoAlternateIcon sx={{ fontSize: '5rem' }} />
                  <Typography component="p" mt={2}>
                    Upload photo
                  </Typography>
                </>}

                <Controller
                  name="image"
                  control={control}
                  render={({ field: { name, onBlur, onChange } }) => (
                    <Input
                      size="small"
                      inputComponent="input"
                      name={name}
                      type="file"
                      inputRef={fileInputRef}
                      // accept="image/*"
                      onBlur={onBlur}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>onChange(e.target.files?.[0])}
                      sx={{ display: "none" }}
                    />
                  )}
                />
                {errors.image && (
                  <span className="error">
                    <ErrorOutlineIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    {errors.image.message}
                  </span>
                )}
              </Box>

              <TextField
                fullWidth
                label="Title..."
                autoComplete="off"
                sx={{ maxWidth: "100%" }}
                id="title"
                size="small"
                margin="dense"
                {...register("title")}
                error={errors.title && Boolean(errors.title?.message)}
                helperText={
                  errors.title && (
                    <>
                      <ErrorOutlineIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      {errors.title?.message}
                    </>
                  )
                }
              />

              <TextField
                fullWidth
                multiline
                maxRows={6}
                minRows={6}
                label="Post..."
                autoComplete="off"
                sx={{ maxWidth: "100%" }}
                id="content"
                size="small"
                margin="dense"
                {...register("content")}
                error={errors.content && Boolean(errors.content?.message)}
                helperText={
                  errors.content && (
                    <>
                      <ErrorOutlineIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      {errors.content?.message}
                    </>
                  )
                }
              />

              <TextField
                fullWidth
                label="Tags..."
                autoComplete="off"
                sx={{ maxWidth: "100%" }}
                id="tags"
                size="small"
                margin="dense"
                {...register("tags")}
                error={errors.tags && Boolean(errors.tags?.message)}
                helperText={
                  errors.tags && (
                    <>
                      <ErrorOutlineIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      {errors.tags?.message}
                    </>
                  )
                }
              />

              <Box mt={5} sx={{ mx: "auto" }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{
                    p: 1,
                    marginRight: "0.8rem",
                    minWidth: { xs: 100, md: 200 },
                  }}
                >
                  Update
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Item>
  );
};

export default EditPost;
