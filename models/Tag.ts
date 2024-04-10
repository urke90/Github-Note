import { Schema, model, models, Model } from 'mongoose';

// ----------------------------------------------------------------

export interface IModelTag {
  title: string;
  ownerId: Schema.Types.ObjectId;
}

export interface ITagWithId extends IModelTag {
  _id: string;
}

const tagSchema = new Schema<IModelTag>({
  title: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const TagModel: Model<IModelTag> =
  models?.Tag || model<IModelTag>('Tag', tagSchema);

export default TagModel;
