'use client';

import { Fragment, useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
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
import RHFTextEditor from '@/components/RHFInputs/RHFTextEditor';
import RHFCreatableSelect, {
  ISelectOptions,
} from '@/components/RHFInputs/RHFCreatableSelect';
import { useSession } from 'next-auth/react';
import { createTag } from '@/lib/actions/tag-actions';
import CodeExampleTabs from '../shared/CodeExampleTabs';

// ----------------------------------------------------------------

/**
 * 1. Da li treba da dohvatam Usera u Wrapper Page-u da bude Server side i da samo prosledim ovoj komponenti CreatePost (kao sto sam radio sa Onboardingom) ===>
 * 2. create post action proverava tagove. AKo ne postoji kreira nov/e tagove , ako postoji onda ne mora 2 poziva
 *
 * 1.  Mora get poziv za tagove da se  populate dropdown ( Onda imam sve tagove ---> imaju objectIds )
 * 2.
 *
 *
 * 1. crate Post
 */

interface ICreatePostContainerProps {
  userId: string;
  tags: ISelectOptions[];
}

const CreatePostContainer: React.FC<ICreatePostContainerProps> = ({
  tags,
  userId,
}) => {
  const { data: session } = useSession();

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
  const { handleSubmit, getValues, watch, formState } = postForm;

  const onSubmit = (data: IPostSchema) => {
    console.log('data on submit', data);
    // TODO: user id dodajemo tek na submit jer default values u useForm se samo jednom triggeruje
    data.ownerId = session?.user.id || '';
  };

  const postType = getValues('type');

  useEffect(() => {
    const watchTags = watch('tags');
    console.log('watch tags', watchTags);
  }, [watch]);

  console.log('formStaet', formState);
  console.log('formStaetErrors', formState.errors);

  return (
    <section className="mb-7.5">
      <h1 className="h1-bold my-[30px] lg:my-8">Create Post</h1>
      <p className="mb-6 text-sm uppercase text-white-500">Basic information</p>
      <Form {...postForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
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
          <div className="mb-7">
            <RHFCreatableSelect
              name="tags"
              label="Tags"
              placeholder="Search tags"
              options={tags}
            />
          </div>
          <div className="mb-7">
            <RHFTextarea
              name="description"
              label="Description"
              placeholder="Enter a short description"
            />
          </div>
          <div className="mb-[70px]">
            {postType !== COMPONENT ? (
              <Checklist postType={postType} />
            ) : (
              <CodeExampleTabs />
            )}
          </div>
          <div className="mb-7">
            <RHFTextEditor name="content" />
          </div>
          <div className="mb-16 gap-7">
            <LearningResources />
          </div>
          <Button type="submit">Create Post</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreatePostContainer;
