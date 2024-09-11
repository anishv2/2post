import commentAPI from "@/shared/services/api/comment";
import { Button, FormControl, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/shared/validation/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AlertCard from "@/shared/widgets/AlertCard";


type Schema=z.infer<typeof commentSchema>
const CommentBox = ({ postId }: { postId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(commentSchema)
  });

  const queryClient=useQueryClient();

  const onSubmit: SubmitHandler<Schema> = async(data) => {
    console.log("comment posted", data);
    await mutation.mutate({ content: data.content, postId });
    reset();
  };

  const mutation=useMutation({
    mutationFn: async(data: { content: string, postId: string})=>await commentAPI.create(data),
    onSuccess: () => {
      
    },
    onSettled:async(_,error)=>{
      if(error){
        return <AlertCard message={error.message} severity="error" />;
      }
      else queryClient.invalidateQueries({ queryKey: ['post'] })
    }
  })

  return (
    <FormControl
      fullWidth
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <TextField
        fullWidth
        multiline
        maxRows={2}
        minRows={2}
        //   label="Comment..."
        autoComplete="off"
        sx={{ maxWidth: "100%" }}
        id="content"
        size="small"
        margin="dense"
        {...register("content")}
      />
      {errors.content && (
        <span className="error">
          <ErrorOutlineIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          {errors.content.message}
        </span>
      )}
      <Button
        variant="contained"
        type="submit"
        color="primary"
        fullWidth
        disabled={!isDirty || !isValid}
        sx={{
          p: 1,
          marginRight: "0.8rem",
          minWidth: { xs: 100, md: 200 },
        }}
      >
        Comment
      </Button>
    </FormControl>
  );
};

export default CommentBox;
