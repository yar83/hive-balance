import * as customErrors from '../../utils/errors/CustomErrors';
import fullErrMsg from '../../utils/errors/fullErrMsg';

export default {
  createFrame(title: string, type: string, width: number, height: number, owner?: string): any {
    return this.create({title, type, width, height, owner})
      .then((frame: any) => frame)
      .catch((err: any) => Promise.reject(new customErrors.Error400(fullErrMsg(err))));
  },

  // get all standard and all user's frames
  getAllFrames(owner: string): any {
    return this.find({ $or: [ { type: "standard" }, { owner: owner } ] })
      .orFail(new customErrors.Error404(`Frames don't exist`))
      .then((frames: any) => frames)
      .catch((err: any) => Promise.reject(err));
  },

  getMyFrames(owner: string): any {
    return this.find({owner: owner})
      .ofFail(new customErrors.Error404(`Frame with owner: ${owner} doesn't exist`))
      .then((frames: any) => frames)
      .catch((err: any) => Promise.reject(err));
  },

  getStandardFrames(): any {
    return this.find({type: 'standard'})
      .orFail(new customErrors.Error404('Frame with type: standard doesn\'t exist'))
      .then((frames: any) => frames)
      .catch((err: any) => Promise.reject(err));
  },

  getFrame(id: string) {
    return this.findById(id)
      .orFail(new customErrors.Error404(`Frame: ${id} doesn't exist`))
      .then((frame: any) => frame)
      .catch((err: any) => Promise.reject(err));
  },

  deleteFrame(id: string) {
    return this.findByIdAndRemove(id)
      .orFail(new customErrors.Error404(`Frame: ${id} doesn't exist`))
      .then((frame: any) => frame)
      .catch((err: any) => Promise.reject(err));
  },

  editFrameTitle(id: string, newTitle: string) {
    return this.findByIdAndUpdate(
      id,
      {title: newTitle},
      {new: true, runValidators: true}
    )
      .orFail(new customErrors.Error404(`Frame: ${id} doesn't exist`))
      .then((frame: any) => frame)
      .catch((err: any) => Promise.reject(err));
  },
  
  editFrameSize(id: string, newWidth: number, newHeight: number) {
    return this.findByIdAndUpdate(
      id,
      {width: newWidth, height: newHeight},
      {new: true, runValidators: true},
    )
      .orFail(new customErrors.Error404(`Frame: ${id} doesn't exist`))
      .then((frame: any) => frame)
      .catch((err: any) => Promise.reject(err));
  },
};
