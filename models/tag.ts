import { Model, model, models, Schema } from 'mongoose';

// ----------------------------------------------------------------

export interface IModelTag {
  title: string;
  ownerId: Schema.Types.ObjectId;
}

const tagSchema = new Schema<IModelTag>(
  {
    title: { type: String, required: true, unique: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Tag: Model<IModelTag> = models?.Tag || model<IModelTag>('Tag', tagSchema);

export default Tag;
