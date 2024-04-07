'use client';

import { Fragment } from 'react';
import { X } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type IPostSchema } from '@/lib/zod/post-schema';
import RHFInput from '@/components/RHFInputs/RHFInput';
import RHFSelect, {
  SelectOptionWithIcon,
} from '@/components/RHFInputs/RHFSelect';
import RHFTextarea from '@/components/RHFInputs/RHFTextarea';
import Checklist from '@/components/shared/Checklist';
import { SelectSeparator } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { POST_TYPE } from '@/constants/post';
import { EPostType } from '@/types/post-types';
import LearningResources from '@/components/shared/LearningResources';

// ----------------------------------------------------------------

const CreatePost = () => {
  const { COMPONENT, KNOWLEDGDE, WORKFLOW } = EPostType;

  const postForm = useForm<IPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      type: COMPONENT,
      tags: [], // TODO: Finish when i add: React Select library
      description: '',
      codeExample: '',
      checklist: [],
      content: '',
      learningResources: [],
    },
  });
  const { handleSubmit, getValues } = postForm;

  const onSubmit = (data: IPostSchema) => {
    console.log('data on submit', data);
  };

  const postType = getValues('type');

  return (
    <section className="mb-7.5">
      <h1 className="h1-bold my-[30px] lg:my-8">Create Post</h1>
      <p className="mb-6 text-sm uppercase text-white-500">Basic information</p>
      <Form {...postForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Fragment key={value}>
                  <SelectOptionWithIcon
                    key={value}
                    value={value}
                    imgUrl={imgUrl}
                    label={label}
                  />
                  {index !== POST_TYPE.length - 1 && <SelectSeparator />}
                </Fragment>
              ))}
            </RHFSelect>
          </div>
          <div className="mb-7 bg-black-700">
            TAGS === REPLACE THIS WITH REACT SELECT
          </div>
          <div className="mb-7">
            <RHFTextarea
              name="description"
              label="Description"
              placeholder="Enter a short description"
            />
          </div>
          {postType !== COMPONENT && (
            <div className="mb-7">
              <Checklist postType={postType} />
            </div>
          )}
          <div className="mb-7 bg-black-700">RICH TEXT EDITOR</div>
          <div className="mb-16 gap-7">
            <LearningResources />
          </div>
          <Button type="submit">Create Post</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreatePost;
/** className="bg-black-700 px-3 py-3.5 text-white-300" */
/* <li
                key={field.id}
                className="flex-between my-2 rounded bg-black-700 px-3 py-1"
              >
                <div className="flex flex-1 items-center ">
                  <Image
                    src="assets/images/icn-check-square.svg"
                    alt="Checked"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <RHFInput
                    name={`knowledgeLevel.${index}`}
                    placeholder="Enter your expertise level"
                    className="pl-0"
                  />
                </div>
                <X
                  className="cursor-pointer text-white-500"
                  onClick={() => remove(index)}
                />
              </li> */
