import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/config";
import {Input,Select,Button,RTE} from "../index";


/**
 * PostForm — handles both CREATE and EDIT post workflows.
 *
 * Props:
 *  post — (optional) existing Appwrite document for edit mode.
 *          When provided the form pre-fills and updates instead of creating.
 */
function PostForm({ post }) {
  const navigate  = useNavigate();
  const userData  = useSelector((state) => state.auth.userData);
  const isEditing = Boolean(post);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title:         post?.title         ?? "",
      slug:          post?.slug          ?? "",
      content:       post?.content       ?? "",
      status:        post?.status        ?? "active",
      featuredImage: post?.featuredImage ?? "",
    },
  });

  // ─── Auto-generate slug from title ──────────────────────────────────────
  const watchTitle = watch("title");

  const slugTransform = useCallback((value = "") => {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setValue("slug", slugTransform(watchTitle), { shouldValidate: true });
    }
  }, [watchTitle, isEditing, setValue, slugTransform]);

  

  // ─── Submit ──────────────────────────────────────────────────────────────
const onSubmit = async (data) => {
  try {
    const { image, ...postData } = data;

    let featuredImageId = post?.featuredImage;

    // Upload new image if selected
    if (image?.[0]) {
      const file = await databaseService.uploadFile(image[0]);

      if (file) {
        featuredImageId = file.$id;

        if (post?.featuredImage) {
          await databaseService.deleteFile(post.featuredImage);
        }
      }
    }

    // Final data sent to DB
    const payload = {
      ...postData,
      featuredImage: featuredImageId,
    };

    if (isEditing) {
      const updated = await databaseService.updatePost(post.$id, payload);
      if (updated) navigate(`/post/${updated.slug}`);
    } else {
      const created = await databaseService.createPost({
        ...payload,
        userId: userData.$id,
      });

      if (created) navigate(`/post/${created.slug}`);
    }

  } catch (error) {
    console.error("PostForm :: onSubmit ::", error);
  }
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* ── Left column — content ─────────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-4">
        <Input
          label="Post title"
          placeholder="My awesome post"
          error={errors.title?.message}
          {...register("title", { required: "Title is required" })}
        />

        <Input
          label="Slug (auto-generated)"
          placeholder="my-awesome-post"
          error={errors.slug?.message}
          {...register("slug", {
            required: "Slug is required",
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: "Only lowercase letters, numbers, and hyphens",
            },
          })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* ── Right column — meta ───────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Cover image upload */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Cover image
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-600 file:font-semibold hover:file:bg-orange-100 cursor-pointer"
            {...register("image", {
              required: !isEditing && "Cover image is required",
            })}
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Current image preview (edit mode) */}
        {isEditing && post.featuredImage && (
          <img
            src={databaseService.getFileView(post.featuredImage)}
            alt="Current cover"
            className="w-full rounded-lg object-cover aspect-video border border-gray-100"
          />
        )}

        {/* Status */}
        <Select
          label="Status"
          options={["active", "inactive"]}
          error={errors.status?.message}
          {...register("status", { required: "Status is required" })}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditing ? "Updating…" : "Publishing…"
            : isEditing ? "Update post" : "Publish post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
