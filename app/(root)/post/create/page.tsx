'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type IPostSchema } from '@/lib/zod/post-schema';
import RHFInput from '@/components/RHFInputs/RHFInput';
import RHFSelect, {
  SelectOptionWithIcon,
} from '@/components/RHFInputs/RHFSelect';
import { SelectSeparator } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { POST_TYPE } from '@/constants/post';
import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

const CreatePost = () => {
  const { COMPONENT, KNOWLEDGDE, WORKFLOW } = EPostType;

  const postForm = useForm<IPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      type: COMPONENT,
      // continue adding default values
    },
  });

  // const { handleSubmit } = postForm;

  const onSubmit = (data: IPostSchema) => {
    console.log('data on submit', data);
  };

  return (
    <section className="mb-7.5">
      <h1 className="h1-bold my-[30px] lg:my-8">Create Post</h1>
      <p className="mb-6 text-sm uppercase text-white-500">Basic information</p>
      <FormProvider {...postForm}>
        <form onSubmit={postForm.handleSubmit(onSubmit)}>
          <div className="mb-7">
            <RHFInput
              name="title"
              placeholder="Enter your title of your post"
              label="Title"
            />
          </div>
          <div className="mb-7">
            <RHFSelect name="type" label="Create Type">
              {POST_TYPE.map(({ imgUrl, label, value }, index) => (
                <React.Fragment key={value}>
                  <SelectOptionWithIcon
                    key={value}
                    value={value}
                    imgUrl={imgUrl}
                    label={label}
                  />
                  {index !== POST_TYPE.length - 1 && <SelectSeparator />}
                </React.Fragment>
              ))}
            </RHFSelect>
          </div>
        </form>
        <div>
          <Button>Create Post</Button>
        </div>
      </FormProvider>
    </section>
  );
};

export default CreatePost;
